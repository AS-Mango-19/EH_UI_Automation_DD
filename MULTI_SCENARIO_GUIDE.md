# Multi-Scenario (Repeated-Modal) Pattern — Author Guide

**Use this when a page lets you add the _same kind of record_ many times** — candidate
models, dose-response scenarios, arms, looks — usually through an **"Add …" modal** that
you reopen for each entry (up to some max). One test iteration can hold **1…N** such records,
and the count varies per iteration.

The naive fix (`scenario1_e0, scenario2_e0, … scenario10_e0`, ×N params) explodes to ~130
mostly-empty columns. **Don't do that.** Use the child-table + loop pattern below: **adding a
scenario is one new row, and it scales to any count with no metadata edits.**

The reference implementation is **`ProductDesign/feature_BOIN`**. Copy it. A second, simpler
variant — one record per iteration rather than a variable N — is
**`ProductDesign/feature_MCPMod`** (TC_35, candidate dose-response models); its `scenario_block.csv`
equivalent (`model_block.csv`) shows the value-gate style (rule 4 below) instead of BOIN's
type-gate style, since MCPMod's fields are shared across several record "families" rather than
exclusive to one each.

> **Not the same as a period child-table.** This guide's child CSV (`scenarios.csv`) is keyed
> `(TC_ID, IterationID, ScenarioIndex)` and drives **repeated sub-flows** via `loopOverData` +
> `${runtime.loop.*}` — one modal record per row. A `<phase>_<tableName>.csv` **period** child
> table (e.g. `design_boundary.csv`) is a *different* shape: the loader **folds** it into the
> parent's wide `${data.<phase>.<table>.<n>.<field>}` model at load time — no loop, no runtime
> tokens. Use that for multi-period tables; use this for repeated records. See FRAMEWORK_KT §4.5 /
> AI_TESTDATA_AGENT for the period-table fold.

---

## 1. The three moving parts

| Part | File | What it is |
|---|---|---|
| **Child table** | `01_testdata/scenarios.csv` | **One row per scenario** (not per iteration). Keyed by `TC_ID` + `IterationID`, like every other testdata file. |
| **Reusable sub-flow** | `03_metadata/scenario_block.csv` | The modal steps for **one** scenario: open → pick type → fill fields → commit. Authored **once**. |
| **The loop** | one step in `03_metadata/metadata.csv` | A single `loopOverData` step that runs the sub-flow **once per matching row** of `scenarios.csv`. |

**To change how many scenarios a test adds: add or delete ROWS in `scenarios.csv`. Nothing
else changes.**

---

## 2. How it runs (one paragraph)

`loopOverData` looks at `scenarios.csv`, keeps the rows whose `TC_ID` **and** `IterationID`
match the running test, and for each row: exposes every column as `${runtime.loop.<Column>}`,
then runs `scenario_block.csv` top-to-bottom. So the sub-flow fills the modal from
`${runtime.loop.*}`, commits, and the loop moves to the next row.

---

## 3. Step-by-step: adding a BOIN-like feature (no AI needed)

1. **Record the modal ONCE** with codegen — add just **one or two** scenarios. You only need
   to see the DOM ids; you will *not* keep the repeated blocks.
2. **Selectors** — put each modal field in `02_selectors_repo/selectors.csv` (open button,
   the type dropdown, every parameter field, the commit button). **Copy the selector codegen
   produced verbatim** — it mixes `input[name="e0"]` and `#emax`; both are fine, just match it.
3. **`scenarios.csv`** — header is `TC_ID, IterationID, ScenarioIndex, <typeColumn>,` then the
   **union of every type's parameters**. Write **one row per scenario**; put `N/A` in the
   cells that don't apply to that row's type.
4. **`scenario_block.csv`** — open-modal click → `select` the type from
   `${runtime.loop.<typeColumn>}` → **one `fill` per field**, each gated
   `SkipIf ${runtime.loop.<typeColumn>}!=<TypeValue>` → commit click.
5. **`metadata.csv`** — delete the recorded repeated blocks and put **one** `loopOverData`
   step in their place (see §5).
6. **Validate, then run** and screenshot-verify (`npm run validate`, then a real run).

---

## 4. The rules that make it work

- **One row = one scenario.** Adding a scenario is one new line in `scenarios.csv`.
- **`${runtime.loop.*}` NEVER auto-skips on blank/`N/A` — this is the #1 way people get bitten.**
  Unlike `${data.*}` tokens (which the runner self-skips when the testdata cell is blank/`N/A`),
  a `${runtime.loop.<col>}` field is filled with whatever string is in that row's cell, **including
  the literal text "N/A"** if you leave it ungated. Every field needs its own `SkipIf`, one of two
  styles:
  - **Type-gating** (BOIN style, use when fields are exclusive to one record type):
    `SkipIf ${runtime.loop.<typeColumn>}!=<Type>` — the field only fills when the row is that type.
  - **Value-gating** (MCPMod style, use when a field is simply optional / shared across types):
    `SkipIf ${runtime.loop.<col>}==N/A` — the field fills whenever that row actually has a value,
    regardless of type. Simpler when several record types legitimately share the same field.
  Skipping this shows up as `field "X" not found` on a field whose testdata cell is blank for that
  row — it looks exactly like a selector bug, not a missing gate.
- **`N/A` convention.** Put `N/A` (or leave blank) in any cell that doesn't apply to the row's
  type. It's documentation; the type-gate is what actually skips it.
- **Scoping = `TC_ID` + `IterationID`.** Rows are matched to the running test exactly like
  `design.csv`. Different iterations can carry different scenario sets, or none.
- **`select` matches value-then-label.** The `<typeColumn>` cell may hold either the option's
  numeric `value` (e.g. `2`) **or** its exact visible label (e.g. `Emax`). This guide uses
  labels — they read better.
- **Scenario COUNT is implicit.** There is no "number of scenarios" column. The loop simply
  runs every matching row.

---

## 5. Copy-paste templates (real BOIN content)

### `01_testdata/scenarios.csv`
Curve families and their fields: **Emax** (`e0, emax, ed50, hill`) · **Four Parameter
Logistic** (`beta, delta, theta, tau`) · **Quadratic** (`intercept, linCoefficient,
quadCoefficient`) · **Linear** (`linIntercept, slope`) · **General** (`modalDose1…6`).

```csv
TC_ID,IterationID,ScenarioIndex,curveFamily,e0,emax,ed50,hill,beta,delta,theta,tau,intercept,linCoefficient,quadCoefficient,linIntercept,slope,modalDose1,modalDose2,modalDose3,modalDose4,modalDose5,modalDose6
TC_10,ITER_01,1,Emax,0.05,0.75,50,1,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A
TC_10,ITER_01,2,Four Parameter Logistic,N/A,N/A,N/A,N/A,0,1,25,10,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A
TC_10,ITER_01,3,Quadratic,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,0.01,0.007,0.0001,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A
TC_10,ITER_01,4,Linear,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,0.01,0.008,N/A,N/A,N/A,N/A,N/A,N/A
TC_10,ITER_01,5,General,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,N/A,0.05,0.1,0.15,0.3,0.24,0.2
```
**Want a 6th scenario — another Emax with different numbers?** Add:
`TC_10,ITER_01,6,Emax,0.08,1.20,30,1,N/A,…`  ← that's the entire change.

### `03_metadata/scenario_block.csv` (the reusable sub-flow — the shape, abbreviated)
```csv
Seq,StepID,StepGroup,Page,Action,ObjectName,InputValue,StoreAs,AssertType,ExpectedValue,WaitCondition,Timeout,Optional,Retry,Screenshot,SkipIf,Description
1,10,ExtractResults,ResultsPage,click,btn_Add_Scenario,,,,,,10000,FALSE,0,never,,Open the Add-Scenario modal
2,20,ExtractResults,ResultsPage,select,ddl_curve_Family,${runtime.loop.curveFamily},,,,,10000,FALSE,0,always,,Pick this row's Curve Family
3,30,ExtractResults,ResultsPage,fill,txt_E0,${runtime.loop.e0},,,,,10000,FALSE,0,never,${runtime.loop.curveFamily}!=Emax,Emax: E0
4,40,ExtractResults,ResultsPage,fill,txt_emax,${runtime.loop.emax},,,,,10000,FALSE,0,never,${runtime.loop.curveFamily}!=Emax,Emax: Emax
... (one gated fill per field of every family) ...
22,220,ExtractResults,ResultsPage,click,txt_add_Sce_But,,,,,,10000,FALSE,0,always,,Commit this scenario, then loop
```
Every parametric field is gated `SkipIf ${runtime.loop.curveFamily}!=<Family>`. Only the open
click, the `select`, and the commit click are ungated (they run for every row).

### `03_metadata/metadata.csv` — the single loop step that replaces all the recorded blocks
```csv
60,600,ExtractResults,ResultsPage,loopOverData,scenarios,ProductDesign/feature_BOIN/03_metadata/scenario_block.csv,,,,,120000,FALSE,0,never,,"For each scenarios.csv row matched to this TC_ID+IterationID, add one scenario via the modal loop."
```
- `ObjectName` = the child file's basename (`scenarios` → `scenarios.csv`).
- `InputValue` = repo-root-relative path to the sub-flow.

---

## 6. Extending it later

- **New parameter for a family:** add one column to `scenarios.csv` + one gated `fill` step in
  the sub-flow + its selector. (Still no ×N columns.)
- **New curve family / record type:** add rows with `<typeColumn> = <NewType>`, add its fill
  steps gated `!=<NewType>`, and add its selectors. Existing rows are untouched.

---

## 7. Gotchas (read before your first run)

- **The modal reuses the SAME ids for every scenario** (no per-scenario DOM index) — that is
  exactly why we loop a sub-flow instead of using indexed columns.
- **Selector convention is mixed.** Codegen emitted `input[name="e0"]` / `input[name="ed50"]`
  but `#emax` / `#hill` in the *same* modal. Don't "normalise" them — use what codegen gave.
- **Variable sub-count types (e.g. General doses).** The sub-flow has one `fill` per dose your
  study has. If a study has fewer doses, trim the extra `modalDoseN` steps in *its* copy of
  the sub-flow — otherwise a General row fills a dose field that isn't rendered and fails.
- **The sub-flow is checked at runtime, not deep-validated.** `npm run validate` confirms the
  `loopOverData` step is well-formed and the sub-flow file exists, but it does **not** verify
  the sub-flow's selectors/tokens. A real, screenshot-verified run is the check — same as the
  shared `flows/login.csv`.
- **No false "unused column" warnings.** The validator knows a `loopOverData` file is consumed
  whole, so populated `scenarios.csv` columns don't trip the coverage check.
- **`ObjectName` must be the child file's own basename, not a name you choose.** `loadTestData`
  (`core/loaders/featureLoader.ts`) reads **every** CSV in `01_testdata/` and keys the parsed-data
  map by filename-minus-`.csv`, regardless of anything registered in `feature.config.json`'s
  `testdata.files`. If your child file is `design_model.csv`, the `loopOverData` step's
  `ObjectName` must be exactly `design_model` — not `model`, not whatever you registered in the
  config (registering it there does nothing for this purpose). Get it wrong and every populated
  column in the child file silently shows as "unused" and the loop finds 0 rows, with no error.
- **A required action can be missing from the recording entirely, not just mis-wired.** If
  `Save`/`Save & Compute` stay disabled with no metadata error, screenshot the live page before
  assuming a wiring bug — the app may show its own banner naming what's missing (e.g. a
  "Calculate" button the recording session never clicked). A clean recording doesn't guarantee
  every required step was captured.
- **A click that "succeeds" but does nothing may be blocked by an async precondition, not a
  selector bug.** If the modal never closes / the page never advances despite no retry warning,
  compare `trace.network` (inside `trace.zip`) between this run and a passing iteration — see
  `AI_IMPORT_AGENT.md` §7's trace.network recipe. Proven on `feature_MCPMod`: a `GET 400` on the
  design's model list self-healed in the background ~25s later; iterations that reached "Add
  Model" before that window closed failed with no visible cause.

---

## 8. Under the hood (for maintainers)

Two small, backward-compatible framework capabilities support this pattern; both are guarded so
features that don't use `loopOverData` are unaffected:

- **`core/keywords/flow.ts` — `loopOverData`** filters child rows by **`TC_ID` and
  `IterationID`** (a file lacking either column falls back to matching on whichever it has, or
  loops every row).
- **`core/schema/validator.ts` — coverage check** skips any file named by a `loopOverData`
  step, because its columns are consumed via `${runtime.loop.*}` in the sub-flow rather than
  `${data.*}` tokens in `metadata.csv`.

See also **[FIELD_WIRING_PATTERNS.md](FIELD_WIRING_PATTERNS.md)** (effect-size / priors /
early-stopping field conventions) and **[AI_IMPORT_AGENT.md](AI_IMPORT_AGENT.md)** (the full
import playbook).
