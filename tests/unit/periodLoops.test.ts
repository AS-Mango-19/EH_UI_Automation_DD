/**
 * Importer AUTO-LOOP transform (Option C default). Verifies applyPeriodLoops collapses
 * the enumerated per-cell fills of the ALLOWLIST fields into one reconcile+loopPeriods
 * pair + parametric selectors + a template flow, while leaving numeric/computed fields
 * enumerated and non-configured / disabled tables untouched.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyPeriodLoops } from '../../scripts/import-codegen.js';

type Row = Record<string, string | number | boolean>;
type Sel = {
  page: string; objectName: string; selectorType: string; selectorValue: string; roleName: string;
  fieldType: string; fallbackSelector: string; dynamic: boolean; description: string; exact: boolean;
};

const step = (Action: string, ObjectName: string, over: Row = {}): Row => ({
  Seq: 0, StepID: 0, StepGroup: 'ConfigureDesign', Page: 'ResultsPage', Action, ObjectName,
  InputValue: '', StoreAs: '', AssertType: '', ExpectedValue: '', WaitCondition: '', Timeout: 10000,
  Optional: 'FALSE', Retry: 0, Screenshot: 'never', SkipIf: '', Description: '', DynamicArgs: '', ...over,
});
const sel = (objectName: string, selectorValue: string, over: Partial<Sel> = {}): Sel => ({
  page: 'ResultsPage', objectName, selectorType: 'css', selectorValue, roleName: '', fieldType: 'textbox',
  fallbackSelector: '', dynamic: false, description: '', exact: false, ...over,
});

// applyPeriodLoops mutates the arrays in place; the `as never` casts satisfy its
// LocatorRef/StepRow param types without exporting those internal types.
const run = (steps: Row[], selectors: Sel[], parentFile = 'design'): { flows: { rel: string; content: string }[]; log: string[] } =>
  applyPeriodLoops({ steps: steps as never, selectors: selectors as never, parentFile, featureSlug: 'test' });

/** A design import with a boundary table (loop fields + one numeric field), an
 *  inputMethodTable cell (disabled table), and an Add-Interim click. */
function fixture(): { steps: Row[]; selectors: Sel[] } {
  const steps: Row[] = [
    step('click', 'btn_Add_Interim'),
    step('fill', 'txt_boundary_0_analysis_Spacing_Info', { InputValue: '${data.design.boundary.0.analysisSpacingInfo}' }),
    step('fill', 'txt_boundary_1_analysis_Spacing_Info', { InputValue: '${data.design.boundary.1.analysisSpacingInfo}' }),
    step('check', 'chk_boundary_0_efficacy_Check', { SkipIf: '${data.design.boundary.0.efficacyCheck}!=check' }),
    step('uncheck', 'chk_boundary_0_efficacy_Check', { SkipIf: '${data.design.boundary.0.efficacyCheck}!=uncheck' }),
    step('check', 'chk_boundary_0_futility_Check', { SkipIf: '${data.design.boundary.0.futilityCheck}!=check' }),
    step('uncheck', 'chk_boundary_0_futility_Check', { SkipIf: '${data.design.boundary.0.futilityCheck}!=uncheck' }),
    step('fill', 'txt_boundary_0_efficacy_PValue', { InputValue: '${data.design.boundary.0.efficacyPValue}' }), // NUMERIC — stays enumerated
    step('fill', 'txt_inputMethodTable_0_hazard_Rate_Control', { InputValue: '${data.design.inputMethodTable.0.hazardRateControl}' }), // disabled table — stays
  ];
  const selectors: Sel[] = [
    sel('btn_Add_Interim', 'internal:role=button[name="Add Interim"i]', { selectorType: 'role', roleName: 'Add Interim', fieldType: 'button' }),
    sel('txt_boundary_0_analysis_Spacing_Info', '[id="boundary.0.analysisSpacingInfo"]'),
    sel('txt_boundary_1_analysis_Spacing_Info', '[id="boundary.1.analysisSpacingInfo"]'),
    sel('chk_boundary_0_efficacy_Check', '[id="boundary.0.efficacyCheck"]', { fieldType: 'checkbox' }),
    sel('chk_boundary_0_futility_Check', '[id="boundary.0.futilityCheck"]', { fieldType: 'checkbox' }),
    sel('txt_boundary_0_efficacy_PValue', '[id="boundary.0.efficacyPValue"]'),
    sel('txt_inputMethodTable_0_hazard_Rate_Control', '[id="inputMethodTable.0.hazardRateControl"]'),
  ];
  return { steps, selectors };
}

test('boundary loop fields collapse to a reconcile + loopPeriods pair', () => {
  const { steps, selectors } = fixture();
  const { flows } = run(steps, selectors);

  const actions = steps.map((s) => String(s.Action));
  assert.equal(actions.filter((a) => a === 'loopPeriods').length, 1);
  assert.equal(actions.filter((a) => a === 'callCustom').length, 1);

  const loop = steps.find((s) => s.Action === 'loopPeriods')!;
  assert.equal(loop.ObjectName, 'design');
  assert.equal(loop.InputValue, 'flows/test_boundary_period.csv');
  assert.equal(loop.ExpectedValue, 'boundary|analysisSpacingInfo');
  assert.equal(loop.SkipIf, '${data.design.boundary.0.analysisSpacingInfo}==EMPTY');

  const reconcile = steps.find((s) => s.Action === 'callCustom')!;
  assert.equal(reconcile.InputValue, 'reconcilePeriodTable');
  assert.equal(reconcile.ExpectedValue, 'design|boundary|analysisSpacingInfo|Add Interim|true');

  // reconcile must run BEFORE loop.
  assert.ok(steps.indexOf(reconcile) < steps.indexOf(loop));
});

test('looped-field cells and the Add click are removed; numeric + disabled cells stay', () => {
  const { steps, selectors } = fixture();
  run(steps, selectors);
  const objNames = new Set(steps.map((s) => String(s.ObjectName)));

  // gone: the enumerated loop-field cells + the Add-Interim click
  for (const on of [
    'txt_boundary_0_analysis_Spacing_Info', 'txt_boundary_1_analysis_Spacing_Info',
    'chk_boundary_0_efficacy_Check', 'chk_boundary_0_futility_Check', 'btn_Add_Interim',
  ]) {
    assert.ok(!objNames.has(on), `expected ${on} to be removed`);
  }
  // no enumerated value-step still enters a looped field (the loopPeriods ==EMPTY guard may name it, that's fine)
  const valueSteps = steps.filter((s) => ['fill', 'check', 'uncheck'].includes(String(s.Action)));
  const entersLooped = valueSteps.some((s) => /boundary\.\d+\.(analysisSpacingInfo|efficacyCheck|futilityCheck)/.test(`${s.InputValue} ${s.SkipIf}`));
  assert.ok(!entersLooped, 'no enumerated step should still enter a looped boundary field');

  // kept: the numeric boundary field (enumerated) and the disabled inputMethodTable cell
  assert.ok(objNames.has('txt_boundary_0_efficacy_PValue'));
  assert.ok(objNames.has('txt_inputMethodTable_0_hazard_Rate_Control'));
});

test('parametric selectors replace the per-cell ones; numeric selector kept', () => {
  const { steps, selectors } = fixture();
  run(steps, selectors);
  const byName = new Map(selectors.map((s) => [s.objectName, s]));

  for (const on of ['txt_boundary_analysisSpacingInfo', 'chk_boundary_efficacyCheck', 'chk_boundary_futilityCheck']) {
    const s = byName.get(on);
    assert.ok(s, `missing parametric selector ${on}`);
    assert.equal(s!.dynamic, true);
    assert.match(s!.selectorValue, /\[id="boundary\.\{0\}\.[A-Za-z]+"\]/);
  }
  // enumerated per-cell selectors gone; numeric one stays
  assert.ok(!byName.has('txt_boundary_0_analysis_Spacing_Info'));
  assert.ok(!byName.has('chk_boundary_0_efficacy_Check'));
  assert.ok(byName.has('txt_boundary_0_efficacy_PValue'));
});

test('template flow has DynamicArgs + one fill row and a check/uncheck pair per field', () => {
  const { steps, selectors } = fixture();
  const { flows } = run(steps, selectors);
  assert.equal(flows.length, 1);
  const [flow] = flows;
  assert.equal(flow!.rel, 'flows/test_boundary_period.csv');
  const lines = flow!.content.trim().split('\n');
  assert.ok(lines[0]!.startsWith('StepID,'));
  assert.ok(lines[0]!.trimEnd().endsWith('DynamicArgs'));
  const body = lines.slice(1);
  // analysisSpacingInfo: 1 fill; efficacyCheck: check+uncheck; futilityCheck: check+uncheck = 5 rows
  assert.equal(body.length, 5);
  assert.equal(body.filter((l) => l.includes(',fill,')).length, 1);
  assert.equal(body.filter((l) => l.includes(',check,')).length, 2);
  assert.equal(body.filter((l) => l.includes(',uncheck,')).length, 2);
  for (const l of body) assert.ok(l.endsWith('${runtime.period.n}'), `row missing DynamicArgs: ${l}`);
  assert.match(flow!.content, /\$\{runtime\.period\.analysisSpacingInfo\}/);
  assert.match(flow!.content, /\$\{runtime\.period\.efficacyCheck\}!=check/);
});

test('no-op when no enabled+present period table is present', () => {
  const steps: Row[] = [
    step('fill', 'txt_Sample_Size_n', { InputValue: '${data.design.sampleSize}' }),
    step('fill', 'txt_inputMethodTable_0_hazard_Rate_Control', { InputValue: '${data.design.inputMethodTable.0.hazardRateControl}' }), // disabled
  ];
  const selectors: Sel[] = [
    sel('txt_Sample_Size_n', '[id="sampleSize"]'),
    sel('txt_inputMethodTable_0_hazard_Rate_Control', '[id="inputMethodTable.0.hazardRateControl"]'),
  ];
  const before = JSON.stringify({ steps, selectors });
  const { flows } = run(steps, selectors);
  assert.equal(flows.length, 0);
  assert.equal(JSON.stringify({ steps, selectors }), before, 'transform must not mutate when no enabled table present');
});
