# Error Reference Guide

This document is a beginner-friendly reference for common terminal/runtime issues in this framework.

It was built by scanning all available run logs in `artifacts/*/logs.jsonl` plus the current terminal session summary.

## 1) Scan Scope

- Total run log files scanned: 93
- Total log rows scanned: 14843
- Error rows (`level=error`): 206
- Warning rows (`level=warn`): 5456
- Info rows (`level=info`): 9181
- Unique error message variants (exact): 99

Current terminal status at scan time:
- Last command: `npm run test -- --testcase TC_10`
- Exit code: 0

## 2) How To Use This Guide

1. Find the same or similar message in the "Exact Messages Seen" section.
2. Check "Likely Root Cause" to understand why it happened.
3. Apply the "Resolution Steps".
4. Re-run the failed testcase or iteration.

## Quick Usage Errors Catalog (consolidated)

These short, high-frequency items were taken from the repository's `USAGE_ERRORS.md` and consolidated here for quick reference.

- CLI flag issues:
  - Exact symptom: `Flag X expects a value` or `Unknown flag` when invoking the CLI.
  - Cause: Missing value after `--flag` or typo in flag name.
  - Fix: Provide the expected value or correct the flag. See [core/cli/args.ts](core/cli/args.ts#L31).

- CSV / schema validation failures (test iteration fails):
  - Cause: Missing or malformed cells in `master.csv` / feature CSVs (required column missing, invalid numeric format).
  - Fix: Validate CSVs against the schema; ensure required columns and correct formats. See [FRAMEWORK_KT.md](FRAMEWORK_KT.md#L358).

- Date parsing / `selectStartDate` errors:
  - Symptoms: `unsupported date value`, `no date column found`, `calendar option not exposed`.
  - Cause: Testdata lacks a date column or uses an unsupported date format; or the date-picker UI uses an unexpected label/markup.
  - Fix: Add a `Start Date` (or `StartDate` / `Date`) column using `M/d/yyyy` or `yyyy-MM-dd`; update selectors if the calendar markup differs. See [custom/_shared/customSteps.ts](custom/_shared/customSteps.ts#L50).

- Table / grid extraction errors:
  - Symptoms: `grid produced no headers`, `reports N rows but only M rendered`.
  - Cause: AG Grid virtualization, missing header cells, or wrong grid selector.
  - Fix: Verify the grid is fully rendered before extraction, increase wait/poll timeout, or adjust selectors. See [core/extractors/tableExtractor.ts](core/extractors/tableExtractor.ts#L91).

- Wait / timeout errors:
  - Symptoms: `waitForText: "..." never contained "..." within Xms`.
  - Fix: Increase timeout, ensure navigation completed, validate the selector. See [core/keywords/wait.ts](core/keywords/wait.ts#L49).

- Date token parsing error:
  - Symptom: `Not a valid date token`.
  - Cause/Fix: Use supported tokens (e.g., `today`, `Now`, `today+30d`) or adjust token format. See [core/utils/dates.ts](core/utils/dates.ts#L33).

- Test-data / iteration completeness errors:
  - Symptom: `No testdata row` or iteration validation fails.
  - Fix: Ensure keyed CSVs include rows for every `TC_ID` + `IterationID` referenced by flows. See [FRAMEWORK_KT.md](FRAMEWORK_KT.md#L360).

- "Prior parameters are too extreme" at Recalculate (Cytel East Horizon design/sim):
  - Symptom: the design **Recalculate** never completes — the boundary's **Final Futility HR** stays empty and the page shows *"Prior parameters are too extreme"*. In GADAR this surfaces as `clickRecalculate: boundary recompute did not complete`.
  - **Root cause (definitively established 2026-08-10, by payload diff): the `POST …/engine/boundary` request is MISSING its `testParams` block — the treatment effect size (hazard rates).** The solver has no effect to work with and returns `returnValue: -10001` (= "prior too extreme"). The app builds `testParams` from the **Response tab's** model, which only populates once that tab has been **mounted**; the sim edited the Design header and clicked Recalculate *before Response was ever visited*, so the effect size was never sent. Confirmed by diffing a failing automated payload against a working manual one on the same design — `testParams` was the only difference.
  - Fix: **mount the Response tab into the model before Recalculate** (`loadResponseTabIntoModel`, called at the start of `enterDesignHeader`): click the "Response" tab, wait for a Response input to render, return to the Design tab. The payload then carries the hazard rates and Recalculate completes on the first attempt. See [ProductDesign/feature_GADAR(PD)/GADAR_SIM_NOTES.md](ProductDesign/feature_GADAR(PD)/GADAR_SIM_NOTES.md) §1.
  - Debugging technique (reusable): when a UI-driven server compute fails but the SAME inputs succeed **by hand**, hook `page.on('request'/'response')` around the action, capture the request body, and diff automated-vs-manual — the differing field is the bug. Do NOT assume a flaky server or a lingering session. (RETRACTED prior theory: this error was mis-attributed to a lingering shared-account session / force-kill / concurrent login. That was never the cause — a fresh env + fresh account reproduced it on the first attempt, and a rested session never fixed it. The missing `testParams` is the whole story.)

How to use these quick notes:
- Search logs for the short phrase shown and follow the recommended fix; this section is intentionally compact for quick triage.


## 3) Common Error Categories

## A. Unused testdata column warnings (very frequent)

How often seen:
- 5288 occurrences

Exact messages seen:
- `[Difference_of_Means] testdata: column "StudyObjective" in project.csv has a value but no step enters it - add a step to apply it or remove the column.`
- `[Difference_of_Means] testdata: column "TargetPopulation" in project.csv has a value but no step enters it - add a step to apply it or remove the column.`
- `[Difference_of_Means] testdata: column "TreatmentArm" in project.csv has a value but no step enters it - add a step to apply it or remove the column.`
- `[Simon2Stage] testdata: column "SelectTask" in inputset.csv has a value but no step enters it - add a step to apply it or remove the column.`
- `[ROM(PD)] testdata: column "Sample Size" in simulation.csv has a value but no step enters it - add a step to apply it or remove the column.`

Likely root cause:
- CSV contains columns with values, but no step reads that column.

Resolution steps:
1. Remove stale/unused columns from feature CSVs.
2. If the column is needed, add a flow step that consumes it.
3. Add a pre-run CSV audit for unused columns.

Recurring pattern:
- This is the most common issue across almost all runs and features.

## B. Optional assertion failures (run continues)

How often seen:
- 93 occurrences

Exact messages seen:
- `OPTIONAL step 310 (assertValue) failed - continuing: locator.inputValue: Timeout 30000ms exceeded.`
- `OPTIONAL step 140 (assertValue) failed - continuing: locator.inputValue: Timeout 30000ms exceeded.`
- `OPTIONAL step 220 (assertValue) failed - continuing: locator.inputValue: Timeout 30000ms exceeded.`
- `OPTIONAL step 240 (assertValue) failed - continuing: Assertion failed: obj_Sample_Size_n value "1" !== "Computed"  [step=240]`
- `OPTIONAL step 350 (assertValue) failed - continuing: Assertion failed: obj_Hazard_Ratio_HR_1_0 value "0.563182" !== "Computed"  [step=350]`

Likely root cause:
- UI value not ready in time, flaky selector, or baseline/expected value mismatch.

Resolution steps:
1. If check is important, remove `Optional` so failure is explicit.
2. Increase read/assert timeout for slow fields.
3. Stabilize selector and ensure page state is ready before assertion.
4. Validate expected baseline values for computed fields.

Recurring pattern:
- Frequent in assertValue steps for computed numeric fields.

## C. Navigation timeout

How often seen:
- 81 occurrences

Exact messages seen:
- `Fatal: page.goto: Timeout 30000ms exceeded.`
- `FAIL  [10] navigate: page.goto: Timeout 30000ms exceeded.`
- `FAIL  [10] callReusable: page.goto: Timeout 30000ms exceeded.`
- `FAIL  [20] navigate: page.goto: Timeout 60000ms exceeded.`
- `Iteration TC_06/ITER_01 -> FAIL: page.goto: Timeout 60000ms exceeded.`

Likely root cause:
- Environment/network slowness, login redirection delays, or transient outage.

Resolution steps:
1. Increase `page.goto` timeout where appropriate.
2. Add retry/backoff around first navigation/login steps.
3. Check environment availability before long runs.
4. Run failed case again to confirm transient vs persistent failure.

Recurring pattern:
- Most impactful hard-failure category in error-level logs.

Cross-note:
- A sudden burst of 200s+ login/navigation timeouts across MANY iterations right after an `.env` change usually means `.env` now points at a different (flaky) East Horizon instance than the baselines were built on — see category R.

## D. Browser/context closed during action

How often seen:
- 28 occurrences

Exact messages seen:
- `Fatal: page.goto: Target page, context or browser has been closed`
- `FAIL  [10] callReusable: locator.waitFor: Target page, context or browser has been closed`
- `FAIL  [70] waitForSelector: locator.waitFor: Target page, context or browser has been closed`
- `Iteration TC_06/ITER_01 -> FAIL: locator.waitFor: Target page, context or browser has been closed`

Likely root cause:
- Browser closed/crashed, context disposed, or unstable auth redirect flow.

Resolution steps:
1. Ensure browser/context lifecycle is not ending early.
2. Add guard checks before actions that depend on page state.
3. Stabilize login redirect and wait conditions.

Recurring pattern:
- Often appears immediately after redirect/login transitions.

## E. Field not found

How often seen:
- 30 occurrences

Exact messages seen:
- `FAIL  [50] fill: fill: field "txt_Project_Name" not found - required value could not be entered  [step=50]`
- `FAIL  [20] fill: fill: field "txt_Username" not found - required value could not be entered  [step=20]`
- `FAIL  [330] fill: fill: field "txt_By_Time_t_Year" not found - required value could not be entered  [step=330]`
- `Iteration TC_09/ITER_02 -> FAIL: fill: field "txt_By_Time_t_Year" not found - required value could not be entered  [step=330]`

Likely root cause:
- Selector mismatch, wrong page state, or field not rendered for this scenario.

Resolution steps:
1. Validate objectName to selector mapping.
2. Confirm the page/section is open before fill.
3. Add conditional checks for scenario-specific fields.
4. Improve selector robustness.

Recurring pattern:
- Common around login fields and conditional design fields.

## F. Element check timeout

How often seen:
- 30 occurrences

Exact messages seen:
- `FAIL  [220] check: locator.check: Timeout 10000ms exceeded.`
- `Iteration TC_06/ITER_02 -> FAIL: locator.check: Timeout 10000ms exceeded.`
- `FAIL  [370] check: locator.check: Timeout 10000ms exceeded.`
- `FAIL  [280] check: locator.check: Timeout 10000ms exceeded.`

Likely root cause:
- Element never reaches expected state, selector mismatch, or slow render.

Resolution steps:
1. Increase timeout for known slow controls.
2. Confirm exact role/label for target element.
3. Add readiness waits before `check` action.

Recurring pattern:
- Often seen on radio/checkbox controls in design steps.

## G. Missing environment variable

How often seen:
- 12 occurrences

Exact messages seen:
- `FAIL  [20] fill: Unresolvable expression ${env.APP_USERNAME}: env var "APP_USERNAME" is not set  [column=InputValue tc=TC_05 iter=ITER_03 step=20]`
- `FAIL  [10] callReusable: Unresolvable expression ${env.APP_USERNAME}: env var "APP_USERNAME" is not set  [column=InputValue tc=TC_05 iter=ITER_04 step=20]`
- `Iteration TC_05/ITER_04 -> FAIL: Unresolvable expression ${env.APP_USERNAME}: env var "APP_USERNAME" is not set  [column=InputValue tc=TC_05 iter=ITER_04 step=20]`

Likely root cause:
- Required environment variable is missing in shell/session.

Resolution steps:
1. Set required env vars before run (`APP_USERNAME`, and related secrets).
2. Validate `.env` loading path and runtime env injection.
3. Add a preflight env check in runner startup.

Recurring pattern:
- Appears in login steps when env-driven credentials are used.

## H. Field disabled but testdata requires a value

How often seen:
- 8 occurrences

Exact messages seen:
- `FAIL  [380] fill: fill: field "txt_Sample_Size_n" is disabled but testdata requires a value - "110" was not entered  [step=380]`
- `Iteration TC_06/ITER_03 -> FAIL: fill: field "txt_Sample_Size_n" is disabled but testdata requires a value - "110" was not entered  [step=380]`
- `FAIL  [300] fill: fill: field "txt_Power" is disabled but testdata requires a value - "0.89898" was not entered  [step=300]`

Likely root cause:
- UI control is disabled for selected mode, but CSV still provides mandatory value.

Resolution steps:
1. Align testdata with active UI mode.
2. Add flow logic: only fill when enabled.
3. Add model-specific data templates to avoid invalid combinations.

Recurring pattern:
- Triggered by mode-dependent input fields.

## I. Selector resolution failure

How often seen:
- 6 occurrences

Exact messages seen:
- `FAIL  [350] select: select: unable to resolve dropoutInputMethod`
- `Iteration TC_09/ITER_01 -> FAIL: select: unable to resolve dropoutInputMethod  [step=350]`
- `Iteration TC_09/ITER_03 -> FAIL: select: unable to resolve dropoutInputMethod  [step=350]`

Likely root cause:
- Target dropdown object could not be resolved from selectors/metadata.

Resolution steps:
1. Verify selector entry for `dropoutInputMethod`.
2. Add fallback selector strategy.
3. Ensure dropdown is visible/open before select.

Recurring pattern:
- Concentrated around dropout method selection.

## J. Simulation status failed

How often seen:
- 6 occurrences

Exact messages seen:
- `FAIL  [420] waitForSimulation: Simulation reported failure status "Failed"  [step=420]`
- `FAIL  [510] waitForSimulation: Simulation reported failure status "Failed"  [step=510]`
- `Iteration TC_08/ITER_03 -> FAIL: Simulation reported failure status "Failed"  [step=420]`

Likely root cause:
- Backend simulation job returned failed state.

Resolution steps:
1. Inspect simulation inputs for invalid combinations.
2. Re-run with same data to separate transient backend failures.
3. Capture backend/API diagnostics when possible.

Recurring pattern:
- Seen in wait-for-simulation checkpoints.

## K. Missing keyed testdata row

How often seen:
- 4 occurrences

Exact messages seen:
- `FAIL  [60] fill: No testdata row in "design" for TC_ID=TC_09 IterationID=ITER_01  [file=C:\Users\divyam.chaudhari\OneDrive - Cytel\E2E_UI_Automation\EH_UI_Automation_DD\ProductDesign\feature_LogrankExponentialDistributionOAD\01_testdata\design.csv tc=TC_09 iter=ITER_01]`
- `Iteration TC_09/ITER_01 -> FAIL: No testdata row in "design" for TC_ID=TC_09 IterationID=ITER_01  [file=C:\Users\divyam.chaudhari\OneDrive - Cytel\E2E_UI_Automation\EH_UI_Automation_DD\ProductDesign\feature_LogrankExponentialDistributionOAD\01_testdata\design.csv tc=TC_09 iter=ITER_01]`

Likely root cause:
- CSV does not include the requested TC_ID + IterationID row.

Resolution steps:
1. Add missing keyed row to feature CSV.
2. Add pre-run validator for row completeness.

Recurring pattern:
- Sporadic but fatal when it occurs.

## L. Result comparison mismatch

How often seen:
- 3 occurrences

Exact messages seen:
- `Compare TC_02/ITER_01: FAIL - ROW_COUNT_MISMATCH, VALUE_MISMATCH; 45 value mismatch(es), 0 missing, 0 extra row(s).`
- `Compare TC_06/ITER_01: FAIL - VALUE_MISMATCH; 4 value mismatch(es), 0 missing, 0 extra row(s).`
- `Compare TC_09/ITER_03: FAIL - VALUE_MISMATCH; 3 value mismatch(es), 0 missing, 0 extra row(s).`

Likely root cause:
- Actual output differs from baseline (data drift, precision/tolerance, or behavior change).

Resolution steps:
1. Inspect `07_actual_results` vs baseline CSV side-by-side.
2. Confirm whether difference is expected business change.
3. Update baseline only after validation.
4. Add tolerance rules for numeric precision if needed.

Recurring pattern:
- Less frequent, but high signal because it directly affects pass/fail outcome.

Cross-note:
- If VALUE_MISMATCH appears suddenly across MANY iterations at once (not just one), suspect an `.env` change rather than data drift: baselines are environment-specific — see category R.

## M. Field value normalization mismatch

How often seen:
- 2 occurrences

Exact messages seen:
- `FAIL  [320] fill: fill: field "txt_Median_Survival_Time_under_Alternative_m1" did not accept the value - expected "2.8998989", field shows "2.899898"  [step=320]`
- `Iteration TC_06/ITER_02 -> FAIL: fill: field "txt_Median_Survival_Time_under_Alternative_m1" did not accept the value - expected "2.8998989", field shows "2.899898"  [step=320]`

Likely root cause:
- UI rounds/truncates numeric input.

Resolution steps:
1. Normalize expected precision in testdata.
2. Compare using numeric tolerance where valid.
3. Match UI-supported precision in entered values.

## N. Navigation aborted/frame detached

How often seen:
- 1 occurrence

Exact message seen:
- `Fatal: page.goto: net::ERR_ABORTED; maybe frame was detached?`

Likely root cause:
- Navigation interrupted by frame/page lifecycle change.

Resolution steps:
1. Add retry around initial navigation.
2. Ensure no unexpected page/context disposal.
3. Add diagnostic trace capture for first-failure repro.

## O. Retry warnings that indicate flakiness

How often seen:
- 30 occurrences (click/select retry patterns)

Exact messages seen:
- `click: retrying txt_sample_Size with force=true after locator.click: Timeout 10000ms exceeded.`
- `click: retrying btn_Inputs with force=true after locator.click: Timeout 10000ms exceeded.`
- `click: retrying btn_Password with force=true after locator.click: Timeout 10000ms exceeded.`
- `select: primary path failed for ddl_Study_Objective; reopening and retrying option click for "Two Arm Confirmatory".`
- `select: primary path failed for dropoutInputMethod; reopening and retrying option click for "Hazard Rates".`

Likely root cause:
- Intermittent UI timing/state instability.

Resolution steps:
1. Prefer stable locators and explicit waits.
2. Reduce force-click dependence where possible.
3. Add targeted waits before fragile interactions.

## P. Save & Simulate button stays disabled (adaptive sim)

How often seen:
- New — first documented 2026-08-13 (DOM(PD) TC_03, CHW/CDL adaptive simulation). Only adaptive iterations reach the Sample-Size-Re-Estimation panel, so plain fixed/GSD sims never hit this.

Exact messages seen:
- `locator.click: ... element is not enabled` targeting `#save-compute` (a `<button disabled id="save-compute">`).
- `waitAndInspectSaveSimulate: Save & Simulate never enabled within 60000ms` (with a dumped reason block: visible toasts / spinner / `[aria-invalid]` / "Not Saved" / the button `outerHTML`).

Likely root cause:
- The adaptive design is INVALID, so the app keeps `#save-compute` disabled — it is a CONFIG invalidity, not a timing/flaky bug. The commonest cause is `Include Enrollment=uncheck` on the sim. A second cause is clicking before the app re-enables: the framework's plain `click` auto-waits ~10s then FORCE-clicks, and a force click CANNOT actuate a `disabled` button (force ≠ enable).

Resolution steps:
1. Set `Include Enrollment=check` on the sim (mirror the design). The app's DEFAULT 1-row accrual is sufficient — no child `simulation_enrollmentTable` rows are needed. Proof: `uncheck` left the button disabled 56s+; `check` enabled it in ~13–21ms.
2. Wait for `#save-compute` to be ENABLED before clicking — add a custom step (`waitAndInspectSaveSimulate` in `custom/DOM(PD)/customSteps.ts`) that polls `isEnabled()` up to 60s and, on timeout, DUMPS the reason (toasts, spinner, `[aria-invalid]`/error text, button `outerHTML`, any "Not Saved" indicator) then throws.
3. See point A of the adaptive-sim notes (§5.1 of `FRAMEWORK_KT.md`) and category Q below for the related SSR-panel toast.

## Q. "Unable to convert values. Reverting to defaults." (toast on the adaptive SSR panel)

How often seen:
- New — first documented 2026-08-13 (DOM(PD) TC_03, adaptive SSR panel).

Exact messages seen:
- Toast: `Unable to convert values. Reverting to defaults.`

Likely root cause:
- An SSR dropdown (Adaptation Method, Adapt At, Interim #, Enroll-Rate-After-Adapt, Promising-Zone Scale, CP-Computation-Based-On) was driven faster than the app recomputed. The Promising-Zone Scale select especially CONVERTS the min/max bounds to the new scale; racing it corrupts the design so Save & Simulate never re-enables (see category P).

Resolution steps:
1. Settle 0.7–1.2s after EACH SSR select so the app finishes recomputing before the next change.
2. Order the SSR selects deliberately and avoid batch-firing them.

## R. Design VALUE_MISMATCH (or 220s login/nav timeouts) appearing suddenly across many iterations after an `.env` change

How often seen:
- New — first documented 2026-08-13 (full DOM(PD) suite run on the wrong East Horizon instance).

Exact messages seen:
- `Compare TC_XX/ITER_YY: FAIL - VALUE_MISMATCH; N value mismatch(es), ...` across several iterations at once.
- `waitForSelector: locator.waitFor: Timeout 220000ms exceeded.` (login/navigation) and `locator.check: Timeout ... exceeded.` on a flaky instance.

Likely root cause:
- Baselines are ENVIRONMENT-SPECIFIC. `06_baseline/<env>/` is tied to the ACTUAL East Horizon server the `.env` `BASE_URL` pointed at when it was approved — not just the `AD` label. Switching `.env` to a different instance produces design `VALUE_MISMATCH` on the sensitive designs (2-Sided-Asymmetric boundaries, Wang-Tsiatis) plus login/navigation timeouts if that instance is flaky. Proof: the full DOM suite gave 5 failures on the wrong instance (2× 220s login `waitForSelector` timeouts, 2× complex-boundary value-mismatches, 1× checkbox `check` timeout) and 0 failures on the correct one.

Resolution steps:
1. When comparisons start failing after any `.env` change, FIRST confirm `.env` points at the instance the baselines were built on. Do NOT "fix" the data.
2. Repoint `.env` to the correct instance and re-run before re-baselining.
3. See point B of the adaptive-sim notes (`FRAMEWORK_KT.md` §9.1/§10.1, Trap 26). Cross-refs: categories C (navigation timeout) and L (result comparison mismatch).

## S. Unwanted empty period/interim row, or an Add-Period gate that misfires on a folded child table

How often seen:
- New — first documented 2026-08-23 (GADAR(PD) TC_12, child-table split + the `skipIf.ts` isNaCell core fix).

Exact messages seen:
- An extra **blank** period/interim row the iteration doesn't use; the group-sequential design won't compute (`"…is required"`, `"Cum. α Spent should be strictly in increasing order"`).
- After moving a table to a normalized child CSV (`<phase>_<table>.csv`), an `Add Period`/`Add Interim` step that was correctly gated `SkipIf …==N/A` starts firing (or stops firing) on the wrong iterations.

Likely root cause:
- A **folded child table** has two different "not applicable" spellings: an **ABSENT period** (no row for that `PeriodIndex`) folds to the **empty string `''`**, while an **unused field** inside a *present* period folds to the **literal `N/A`**. A `SkipIf` that tested only one spelling misfired on the other. (Historically `==N/A` was a literal compare — it missed the empty absent-period; `==EMPTY` missed the present-`N/A` method cell. NEITHER single operator worked for a table with mutually-exclusive methods.)

Resolution steps:
1. Gate every `Add Period`/`Add Interim` on the period's key column with **`==N/A`**: `SkipIf ${data.<phase>.<table>.<n>.<keycol>}==N/A`. Since the **isNaCell** core fix (`core/runner/skipIf.ts`, 2026-08-23) `==N/A` matches **both** `''` and any `N/A` spelling, so it builds exactly the periods that exist — even for a survival table whose present period carries an `N/A` method cell.
2. Keep **`==EMPTY`** only for `loopPeriods` / `reconcilePeriodTable` **count-field** gates (strict empty — they must fire whenever period 0 is present).
3. Author not-applicable cells as the literal **`N/A`**, not blank (self-documenting; `FRAMEWORK_KT.md` §4.5 / §6.3).
4. `npm run validate` warns on non-contiguous/duplicate `PeriodIndex`, orphan rows, inline+child collisions, and blank child cells — fix those first.

## T. Save & Simulate / Calculate / Recalculate disabled or click intercepted mid-compute (app slowness)

How often seen:
- Documented across ROP(PD) TC_21 and GADAR(PD) TC_12 (2026-08). Intermittent — passes on a fast run, fails when the server/app is slow.

Exact messages seen:
- `locator.click: ... element is not enabled` on `#save-compute` / `btn_Save` immediately after a heavy compute.
- `locator.click: Timeout ... exceeded` on Save, with a `#spinner` / `div_Spinner` overlay intercepting pointer events.

Likely root cause:
- The app keeps the button disabled (or an in-flight **spinner** overlays and intercepts clicks) while it recomputes; the framework's plain `click` auto-waits ~10s then FORCE-clicks, and **force cannot actuate a disabled button** nor click through a spinner overlay. This is a **transient timing race** — distinct from category P (a CONFIG invalidity that keeps the button *permanently* disabled; check config first).

Resolution steps:
1. Add a **settle-guard before the action**: `waitForSelector div_Spinner` (or `#spinner`) with `WaitCondition=hidden` at each compute→Save transition (and wait for the design page to render at page transitions).
2. For a button that is disabled until the design is valid, poll `isEnabled()` before clicking (`waitAndInspectSaveSimulate`, category P). **`check` / `select` lack `click`'s force-retry**, so guard them explicitly.
3. Leave a gap between full runs; the app can lag on rapid re-runs (one session per user).
4. If the button NEVER enables, it is category P (config invalid), not slowness — inspect toasts / `[aria-invalid]`.

## U. Design VALUE_MISMATCH from app LABEL DRIFT (result-table labels renamed by the app)

How often seen:
- New — documented 2026-08 (GADSD/GADAR re-baselines: `Alternative`→`Alt.`, `Null`→`Null.`).

Exact messages seen:
- `Compare TC_XX/ITER_YY: FAIL - ... VALUE_MISMATCH` or `ROW_COUNT_MISMATCH` where the DIFFERING cells are **row/column LABELS**, not numbers (a baseline row `Alternative` vs actual `Alt.`), often on otherwise-unchanged iterations.

Likely root cause:
- The East Horizon app **renamed a result-table label** (`Alternative`→`Alt.`, `Null`→`Null.`, …). The numbers are unchanged; only the extracted label text drifted, so the row keys no longer line up with the committed baseline. This is **distinct from category R** (R is an `.env`/instance change that shifts the NUMBERS on sensitive designs).

Resolution steps:
1. Diff `07_actual_results` vs the baseline and confirm the delta is **label text**, not values.
2. If the app's new labels are correct, **re-baseline** the affected iterations (`--update-baseline`) after a human review, then re-run for a real PASS.
3. If numbers ALSO drifted across many iterations at once, suspect an `.env` change first (category R) before re-baselining.

## 4) Recurring Patterns and Known Issues

- The largest recurring issue is unused testdata columns.
- Navigation/login instability causes many hard failures.
- Optional assertions hide instability by allowing runs to continue.
- Some failures are data quality issues (missing rows, wrong combinations).
- Comparison mismatches are less frequent but critical for release confidence.
- Baselines are environment-specific: a burst of VALUE_MISMATCH (or 200s+ login/nav timeouts) across many iterations at once usually traces to an `.env` change pointing at a different East Horizon instance, not data drift — confirm `.env` matches the baseline instance before touching data (category R).
- Period/interim tables are gated by `SkipIf`: use `==N/A` (isNaCell — matches blank OR an `N/A` spelling) for `Add Period`/`Add Interim`; use `==EMPTY` (strict) for `loopPeriods`/`reconcilePeriodTable` count-fields (category S).
- A VALUE_MISMATCH whose diff is only LABEL text (`Alternative`→`Alt.`), not numbers, is app label drift → re-baseline after review, not a data bug (category U). App-slowness can leave Save/Calculate disabled or spinner-blocked → settle-guard, don't force-click (category T).

## 5) Recommended Troubleshooting Order (Beginner-friendly)

1. Check environment and login first (timeouts, closed browser/context, env vars).
2. Check testcase data completeness (missing rows, invalid combinations, unused columns).
3. Check selector health (field not found, unable to resolve).
4. Check simulation outcome (`Simulation reported failure status "Failed"`).
5. Check result comparison output for VALUE_MISMATCH details.

## 6) Full Inventory Files (Generated from all scanned logs)

These files were generated to avoid missing exact messages:

- `reports/error_inventory.json`
  - Full deduplicated exact `level=error` messages with counts.
  - Includes stack/context text where present.

- `reports/error_categories.json`
  - Category-level recurrence counts and top exact messages per category.

## 7) Maintenance Notes

To keep this guide current after future runs:

1. Re-scan all `artifacts/*/logs.jsonl`.
2. Refresh the JSON inventories in `reports/`.
3. Update counts and message examples in this guide.
4. Add new categories if unseen error types appear.
