# GADAR(PD) Simulation Flow — Notes & Gotchas

TC_12 drives the **2-Sided Asymmetric group-sequential** design plus a per-iteration
**simulation** (`01_testdata/simulation.csv`, keyed by `TC_ID`+`IterationID`). The sim
opens the design created in the design phase and re-configures it via
`03_metadata/sim_metadata.csv`, then runs 100 fixed-seed simulations and compares the
result tables against `06_baseline/<env>/sim_baseline_TC_12_<ITER>.csv`.

Custom steps live in [custom/GADAR(PD)/customSteps.ts](../../custom/GADAR(PD)/customSteps.ts)
(feature-scoped — never edit `core/`).

## 1. "Prior parameters are too extreme" = the Recalculate payload is MISSING the effect size

If the Design-tab **Recalculate** (`callCustom clickRecalculate`, StepID 180) never
completes — Final Futility HR stays empty, page shows *"Prior parameters are too
extreme"* — the cause is an **incomplete solve payload**, NOT the data, NOT the server,
NOT the session. Root-caused (2026-08-10) by diffing the `POST …/engine/boundary` request
of a failing automated run vs. a working **manual** Recalculate on the same design:

- The manual payload carries a **`testParams`** block — the treatment effect (hazard
  rates): `{"inputMethod":"Hazard Rates","hrVal":[0.5],"ctrl":[0.03466],"trmt":[0.01733]}`.
- The automated payload **omitted `testParams` entirely** → the solver has no effect size
  → returns `returnValue: -10001` (= "prior too extreme"). Every other field matched.

**Why:** the app builds `testParams` from the **Response tab's** model, which only
populates once that tab has been **mounted**. The sim edited the Design header and clicked
Recalculate *before Response was ever visited*, so the effect size was never in the model.

**The fix** (`loadResponseTabIntoModel`, called at the start of `enterDesignHeader`, before
the header edits): click the **Response** tab (role button "Response"), wait for a Response
input to render, then return to the Design tab (`[id="leftPanel.designs"]`). Now the payload
carries the hazard rates and Recalculate completes on the first attempt.

**Debugging lesson:** when a UI-driven server compute fails but the SAME inputs succeed by
hand, **capture the request payload** (`page.on('request'/'response')` around the action)
and diff automated-vs-manual — the differing field *is* the bug. Do NOT assume flaky
server/session. (Ruled out with evidence before the payload diff: session/account,
input values, half-rendered tab, retry count, entry order, headless-vs-headed, edit pacing.)

**Discipline (still true, unrelated to the above):** never force-kill runs — let them finish
gracefully so the browser logs out cleanly. See [../../Error_Reference_Guide.md](../../Error_Reference_Guide.md).

## 2. `enterDesignHeader` — fill-if-changed, selects before texts (StepID 50)

The sim's Design-tab header is entered by the custom step `enterDesignHeader`, **not**
plain `fill`/`select` steps, for two reasons:

1. **Fill-if-changed.** Re-entering an *already-correct* interdependent header field
   (Sample Size / Number of Events / Fix at Each Analysis / Test Statistic) marks it
   "user-modified" and over-constrains the group-sequential solver → "prior too
   extreme" **even in a clean session**. The step only touches a field whose live value
   differs from the target (a human leaves correct fields alone). Plain metadata
   fill/select re-touch every field every run — verified to reproduce the failure.
2. **Selects run BEFORE text fields.** Some text inputs only *render* after a select is
   set — notably Harrington-Fleming's **p** and **q**, which exist only once Test
   Statistic = Harrington-Fleming. Filling p/q before selecting the statistic silently
   skips them (fields not on the page yet). Ordering: fix / randomization / test
   statistic selects first, then sampleSize / events / p / q / margins.

## 3. Recalculate completion signal (`clickRecalculate`, StepID 180)

After the header, click **Recalculate** only if it is enabled, then wait for the
recompute to finish. The reliable "done" signal is the **highest-indexed
`boundarySim.<n>.futilityHR`** (the Final row) becoming non-empty with no "too extreme"
error; for adaptation iterations also require `#adaptationMethod` to re-enable. If the
header changed nothing, Recalculate stays disabled and the step is a no-op.

## 4. Piecewise period reconciliation (survival / dropout / enrollment)

The sim inherits the design's piecewise tables but may change the **method** and the
**number of periods** per iteration; the inherited count is only known at runtime.
`callCustom reconcileSurvivalPeriods|reconcileDropoutPeriods|reconcileEnrollmentPeriods`
click "Add Period" until the live table matches the count the sim testdata specifies.
Row *deletion* is not implemented — a method that needs fewer periods relies on the
method select (e.g. "None") to clear the table.

## 5. Survival table field wiring by method (period index `inputMethodTable.<n>`)

Each period's fields depend on the input method. **Hazard Rates** needs
`startingAtTime` (periods > 0) + `hazardRateControl` + `hazardRatio`; **Cum % Survival**
needs `byTime` + `cumPercSurvivalControl` (+ `hazardRatio`); **Median Survival Times**
needs `medianSurvivalTimeControl`. All index-2 (3rd period) fields must be wired,
including `inputMethodTable.2.startingAtTime` (630) and `.hazardRateControl` (655) — a
missing period-2 field leaves the added row half-filled → invalid design → the app can
close the page mid-run.

## 6. Enrollment: wait for the accrual `<select>` before selecting (StepID 852)

After clicking the Enrollment tab, the native `#accrualInfoInputMethod` select can lag
the render. If the `select` keyword samples it before it attaches, it misclassifies the
native select as a combobox and fails ("unable to resolve"). A `waitForSelector` on the
dropdown (852) before the select (855) forces the native path. The accrual **method
select must precede the accrual-duration fill** (860) — for method 2 the duration field
only renders after the method is chosen.

## 7. Baselines

Sim baselines are the regression source of truth and are **fixed-seed deterministic**
(seed 100, 100 sims). When the sim testdata changes (methods, periods, margins, header),
old baselines become stale — regenerate with `--update-baseline` (with sign-off), then a
plain run must PASS. A structural diff (missing/extra rows, e.g. "Analysis Time" vs
"Number of Events", or missing `p`/`q`) means the design *config* changed — verify the
new result is correct (e.g. p/q present for Harrington-Fleming) before regenerating.
