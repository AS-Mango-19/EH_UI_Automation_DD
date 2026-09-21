# TC_41 Temporary E2E Report

| Iteration | Status | Command / evidence | Changes |
|---|---|---|---|
| ITER_01 | BASELINE_CREATED, 0 failures | Run `20260918T183400_fce01c`; design and simulation completed; screenshots/artifacts generated under `artifacts/20260918T183400_fce01c/TC_41_ITER_01/` | Fixed simulation checkbox gates and N/A count gate |
| ITER_02 | BASELINE_CREATED, 0 failures | Run `20260918T184048_004be2`; design and simulation completed; screenshots/artifacts generated under `artifacts/20260918T184048_004be2/TC_41_ITER_02/` | Checkbox gates and dependent simulation fields verified |
| ITER_03 | BASELINE_CREATED, 0 failures | Run `20260918T190355_a00191`; design and simulation completed; screenshots/artifacts generated under `artifacts/20260918T190355_a00191/TC_41_ITER_03/` | Set generic equivalence ratio to `N/A`; moved hypothesis selection before dependent fields; verified unchecked subject-level data skips its count |
| ITER_04 | Pending | `npm run test -- --testcase TC_41` | Pending |

## Implemented Before E2E

- `03_metadata/metadata.csv`: mapped Better Response to `project.BetterResponse`.
- `03_metadata/metadata.csv`: mapped equivalence ratio to `design.equi_ratioOfMeans`.
- `03_metadata/sim_metadata.csv`: aligned checkbox gates with `checked`/`unchecked` testdata.
- `03_metadata/sim_metadata.csv`: skipped `subLevelDataSimRuns` when the value is `N/A`.

## Validation

- `npm run validate -- --testcase TC_41`: passed with 6 existing unused-column warnings.
