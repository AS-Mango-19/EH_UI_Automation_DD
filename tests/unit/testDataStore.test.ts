/**
 * TestDataStore.iterationsFor — which iterations a test case actually runs.
 *
 * The list is a UNION across every testdata file that has an IterationID column,
 * so `Run` must veto. The feature owner keeps the column in ONE file (project.csv)
 * and expects Run=FALSE there to skip that iteration everywhere.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsvString } from '../../core/csv/reader.js';
import { TestDataStore } from '../../core/runner/testDataStore.js';

function store(files: Record<string, string>): TestDataStore {
  const m = new Map<string, ReturnType<typeof parseCsvString>>();
  for (const [name, text] of Object.entries(files)) m.set(name, parseCsvString(text, `${name}.csv`));
  return new TestDataStore(m);
}

const PROJECT = (runs: string[]) =>
  ['TC_ID,IterationID,Run,projectName', ...runs.map((r, i) => `TC_05,ITER_0${i + 1},${r},P${i + 1}`)].join('\n');

// design/inputset carry NO Run column — the real layout of feature_MeanofPairedRatios.
const DESIGN = ['TC_ID,IterationID,Hypothesis', 'TC_05,ITER_01,Superiority', 'TC_05,ITER_02,Noninferiority'].join('\n');

test('Run=FALSE in the only file that has the column still skips the iteration', () => {
  const s = store({ project: PROJECT(['TRUE', 'FALSE']), design: DESIGN });
  assert.deepEqual(s.iterationsFor('TC_05'), ['ITER_01']);
});

test('a file without a Run column cannot switch an iteration back on', () => {
  // design.csv lists ITER_02 unconditionally; project.csv vetoes it.
  const s = store({ design: DESIGN, project: PROJECT(['FALSE', 'FALSE']) });
  assert.deepEqual(s.iterationsFor('TC_05'), []);
});

test('all iterations run when every Run is TRUE', () => {
  const s = store({ project: PROJECT(['TRUE', 'TRUE']), design: DESIGN });
  assert.deepEqual(s.iterationsFor('TC_05'), ['ITER_01', 'ITER_02']);
});

test('blank Run means on — the column is opt-out, not opt-in', () => {
  const s = store({ project: PROJECT(['', '']), design: DESIGN });
  assert.deepEqual(s.iterationsFor('TC_05'), ['ITER_01', 'ITER_02']);
});

test('TRUE variants are accepted', () => {
  const s = store({ project: ['TC_ID,IterationID,Run,projectName', 'TC_05,ITER_01,yes,P1', 'TC_05,ITER_02,1,P2', 'TC_05,ITER_03,Y,P3'].join('\n') });
  assert.deepEqual(s.iterationsFor('TC_05'), ['ITER_01', 'ITER_02', 'ITER_03']);
});

test('switching every iteration off runs NOTHING — not a phantom default iteration', () => {
  const s = store({ project: PROJECT(['FALSE', 'FALSE']) });
  assert.deepEqual(s.iterationsFor('TC_05'), []);
});

test('a file with no IterationID column still yields the implicit single iteration', () => {
  const s = store({ inputset: ['collectionName', 'Set1'].join('\n') });
  assert.deepEqual(s.iterationsFor('TC_05'), ['ITER_01']);
});

test('Run only affects its own test case', () => {
  const s = store({
    project: ['TC_ID,IterationID,Run,projectName', 'TC_05,ITER_01,FALSE,P1', 'TC_09,ITER_01,TRUE,P2'].join('\n'),
  });
  assert.deepEqual(s.iterationsFor('TC_05'), []);
  assert.deepEqual(s.iterationsFor('TC_09'), ['ITER_01']);
});
