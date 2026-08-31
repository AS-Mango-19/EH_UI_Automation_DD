# Copilot instructions — EH UI Automation

CSV-driven Playwright regression framework that automates Cytel **East Horizon** clinical-trial
design software. **Data and wiring live in CSVs, not code.** Each feature is a folder under
`<Module>/feature_<Name>/` with numbered stages:
`01_testdata` → `02_selectors_repo` → `03_metadata` → `04_generated_pom` → `05_generated_scripts`
→ `06_baseline`. `master.csv` registers the test cases. The deterministic importer
`scripts/import-codegen.ts` (`npm run import-codegen`) turns a Playwright recording into a wired
feature; the runner (`npm run test`) executes it; `npm run validate` checks structure without a
browser.

**The playbooks are the source of truth — follow them, don't improvise:**
- Import & wire a recorded feature → **`AI_IMPORT_AGENT.md`** (also the `/import-feature` prompt).
- Prepare a feature's testdata from its API export → **`AI_TESTDATA_AGENT.md`**.
- Framework reference (keywords, selectors, tokens, baselines, traps) → **`FRAMEWORK_KT.md`**.
- **Self-improving memory → `IMPORT_LESSONS.md`** — READ it before resolving a feature's `UNWIRED`/
  judgment calls (apply the first matching *Signal→Decision* rule instead of asking), and APPEND a
  rule after any non-obvious decision or user correction. This is how you get better each iteration.

## Non-negotiables (every task)

1. **Scope.** Edit only the target feature's folder + its `master.csv` row. Never touch `core/`,
   `scripts/`, or another feature. A genuine framework-tooling change must be tested on a
   throwaway feature and pass `npm run validate` for **all** features first.
2. **The importer wires to existing columns; it never invents them.** It binds each recorded
   field to a testdata column **by DOM id OR label** and adds **no** columns. Fields it can't
   match print as `UNWIRED` (with the field's id, label, and recorded value). Resolve each by
   **adding the real column (named by its id or label)** or renaming an existing one — **never**
   by re-running with `--seed`. `--seed` is only to bootstrap a feature whose `01_testdata` is
   empty; `--strict` fails the import on any `UNWIRED`.
3. **Author testdata first, then import.** The importer conforms to your columns and leaves
   `01_testdata/*.csv` byte-for-byte unchanged (bar a blank-identity backfill).
4. **Follow the testdata.** A valued cell must land (verified by read-back); blank/`N/A` skips; a
   valued field that isn't found **FAILS** — fix the data or selector, never delete the step.
   Every `fill`/`select`/`check` must carry a `${data.*}` token.
5. **Cell decisions:** hidden → `N/A`; editable → the value; greyed showing "Computed" →
   `Computed`; greyed showing a derived number → `assertValue` it, never `fill`.
   **Period tables** (`boundary`/`enrollment`/`dropout`) can be normalized child CSVs
   (`<phase>_<table>.csv`, one row per `PeriodIndex`); the importer loops them **count-agnostically
   by default** (`loopPeriods`). Gate `Add Period`/`Add Interim` with `SkipIf …==N/A` (matches blank
   OR an `N/A` spelling); `loopPeriods` count-fields use `==EMPTY` (strict). See `AI_IMPORT_AGENT.md` §9.1.
6. **Start from the closest existing feature** (same family) and mirror its column names/selectors:
   means → `feature_DOM(PD)`; survival/group-sequential → `feature_GADAR(PD)`, `feature_GADSD(PD)`;
   proportions/binomial → `feature_RONBR(PD)`, `feature_FishersExact(PD)`; one-arm →
   `feature_SinglePoissonRate`, `feature_Simon2Stage`; multi-scenario → `feature_BOIN`.
7. **Verify with your eyes.** Screenshot-verify every iteration — green ≠ correct (a missing
   baseline is green and proves nothing).
8. **Never commit secrets.** `.env`, `.auth/`, and raw credentials in recordings stay out of git.

## The import loop (a small model can run this verbatim)

author `01_testdata` → `npm run import-codegen -- <Module> feature_<Name> --tc TC_XX` → read the
`UNWIRED` list → add/rename exactly those columns (by DOM id or label) → re-run until `UNWIRED`
is empty → `npm run validate` → `npm run test -- --testcase TC_XX` → screenshot-verify → fix.
Simulation flow: add `--sim` (reads `sim_recording.txt` → `sim_metadata.csv`, tokens →
`simulation.csv`, no login/navigate); set `Simulation=YES` in `master.csv`.

When in doubt, open `AI_IMPORT_AGENT.md` and do exactly what it says for the field family in front
of you.
