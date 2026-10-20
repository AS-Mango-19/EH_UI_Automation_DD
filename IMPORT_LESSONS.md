# Import Agent — Lessons Ledger (self-improving memory)

A **living decision log** the import agent READS before wiring a feature and APPENDS to after —
so a recurring judgment call becomes automatic and the agent gets better every iteration.
**Cross-platform:** Claude Code *and* GitHub Copilot both read and write this repo file (it is the
shared, model-agnostic memory the per-tool Claude `memory/` cannot be). It sits beside
[AI_IMPORT_AGENT.md](AI_IMPORT_AGENT.md): the **playbook is the stable *process***; this ledger is
the **growing set of *"when you see X, do Y"* rules** learned from real features.

## How the agent uses this file (instructions — follow every import)

1. **READ first.** Before you resolve a feature's `UNWIRED` list or make any wiring judgment,
   read the **Standing rules** below and apply the first rule whose *Signal* matches. A matching
   rule **replaces asking the user** — act on it, and note in your summary which rule you applied.
2. **ASK only when no rule fits** (or a rule says "ask"). Keep the question specific and, when the
   user answers, **write the answer back as a new rule** (step 3) so you never ask it again.
3. **APPEND after.** When you finish — or the moment the user corrects you — add/refine a row for
   any **non-obvious decision or correction**: the *Signal* (what the importer/`UNWIRED`/recording
   showed), the *Decision*, the *Why*, and the *Feature/date* in the log. One line per rule; if a
   rule already exists, **refine it in place** rather than duplicating. A correction from the user
   always earns a rule.
4. **PROMOTE.** When a rule has held across ≥3 features, copy it into `AI_IMPORT_AGENT.md` proper
   (the durable playbook) and mark it `[promoted]` here.

> This is how an instruction-following agent "learns" without retraining: the ledger is its
> experience. Its quality depends on faithful appends **and** periodic human review — skim new
> rows, correct any that are wrong, and the agent compounds.

---

> **Standing policy — new/renamed testdata columns are NEVER silent, no matter what a row below
> says.** The `Ask?` column in the table just below governs *wiring, gating, and value* judgment
> calls where no testdata column is being created. The moment a decision would **add a new column
> or rename an existing one** in any `01_testdata/*.csv`, that always requires the user's approval
> first — check whether an existing column already covers the field (rename candidate) before
> proposing a brand-new one, then state the exact column name, which file it lands in, and the
> value(s) per iteration, and wait. This holds even when a row's `Ask?` says "No" (none of those
> rows create a column) and even for a single field that looks obvious. See `AI_IMPORT_AGENT.md`
> §3 and §5a. (User directive, 2026-08-26 — tightens a gap where §3's default action read as
> "just add the column.")

> **Standing policy — two checkpoints, always ask.** (1) The moment `npm run validate` passes
> clean for the target TC, **ask the user** whether to run iteration-by-iteration (stabilize one
> at a time) or all at once — never auto-launch `npm run test` after a clean validate. (2) **Any
> testdata value change needed to get a run green** (not just a wiring rename/add, an actual value
> edit) **requires the user's confirmation first** — state the file/column/value, then wait. See
> `AI_IMPORT_AGENT.md`'s golden rule 7 / "Stabilizing after a clean validate". (User directive,
> 2026-09-02.)

## Standing rules — the wiring-judgment checklist

*Everything the current importer already does automatically — id/label matching, same-field
duplicate collapse, cross-file columns, indexed table cells/child tables — is NOT here; it needs no
judgment. These are the calls that remain.*

| # | Signal (what you see) | Decision | Why | Ask? |
|---|---|---|---|---|
| 1 | **Label-only control, no DOM id** — `UNWIRED … wire label="Include"` (e.g. `role=checkbox "Include"`) | Name the column **exactly the label**, OR repoint the step's token/SkipIf to your existing id column. | The importer has no id to fall back to. | Ask which column name **once**, then record it. |
| 2 | **Result-name field** — `Result Name` / `#inputId` | Runtime token `<Feat>_Result_${iterationId}` on both the fill and the open-result click; give the **sim** a 2nd distinct name. | Unique per run, no data column, no design/sim link collision. | No |
| 3 | **Label-less radio** — `radio "Power"/"Type 1 Error" recorded without a label`, and it's an **option of a group** | Delete the orphan selector; the group's single dynamic `check ${data.design.<Group>}` (e.g. Computed Parameter) already drives it. | It's not a separate control. | Ask only if it's a standalone control. |
| 4 | **Computed/greyed field** — Optional `assertValue`, no recorded value | If the testdata cell is **`Computed`** → **DROP** the assert step. If it holds a **real expected number** → keep the assert (point it at the id column, `Optional=FALSE`). | `assertValue` auto-skips ONLY on **N/A**, NOT on `Computed` (stepRunner `assertsNotApplicable`), so a `Computed` ExpectedValue would FAIL the compare; and the end-of-run result-table `compareWithBaseline` already covers app-computed outputs. | Ask only if the user wants to verify the app's math with a hand-supplied number. |
| 5 | **Test-card selection** — `react select …`/`Select Test` (value like "Difference of Means"/"Ratio of Proportions") | Column lives in **inputset** (`Select Test`/`SelectTest`). (Importer now cross-file-wires it.) | It's an input-set field, not design. | No |
| 6 | **Study Objective value** | Use the **recording's** value (e.g. `Two Arm Confirmatory`), NOT master.csv's "…Superiority" (that's the design-page *hypothesis*). | A wrong option makes `select` commit nothing → every downstream field "unable to resolve". | No |
| 7 | **Table-cell dropdown** — Endpoint Type, Better Response, Priority ("unable to resolve" on a label-walk) | Open via the **value-trigger** selector `role=button "<current/default value>"`; set the controlling cell (Endpoint Type) **before** dependents (Better Response). | The "label" is a column header with no adjacent control. | No |
| 8 | **Checkbox convention** differs in the same testdata (`TRUE/FALSE` vs `check/uncheck`) | Gate each `check`/`uncheck` on its **own** convention (`…!=TRUE` vs `…!=check`). | A mismatch silently skips the toggle; the section it reveals never renders. | No |
| 9 | **Ambiguous prefix/suffix** — importer logs "ambiguous … seeded/left UNWIRED" | The importer refuses to guess; **you** pick the column and repoint. | Guessing wrong exercises numbers nobody chose. | Yes |
| 10 | **Multi-iteration** — a column has data for some iterations only | Fill each iteration; `N/A` the hypothesis-suffix / period cells that don't apply to that row. | One metadata serves every combination; the recording only exercised one. | No |
| 11 | **A param field FAILS `not found` right after its own family/spending-function `select`** (e.g. `fill txt_fut_Param_Rho` fails; `select ddl_fut_Spend_Func` is the very next row) | Check the **StepID order**, not row order: the `select` that PICKS the family (e.g. `futSpendFunc=Rho Family`) must have a **lower StepID** than every param field it unlocks (`futParamRho`/`futParamGamma`/…). The importer/recording often captures the select-before-fill in row order but numbers them in reverse. Move the `select`'s StepID earlier — no data change. | The param field doesn't render until the family select commits; a later-numbered select runs too late even if the row looks right above it. Proven on `DOP(PD)` and `OROP(PD)` (`futSpendFunc`). | No |
| 12 | **An unconditional `click` on an object that ALSO has a properly `N/A`-gated `fill`/`select` right after it** — hangs/times out only on SOME iterations | **Delete the click**, never gate it. It's leftover recording noise (a stray focus-click), and the following value-driven step already auto-skips on blank/`N/A`. This applies in **design metadata too, not just sim** — S9 below was written for the sim case but the same signal/fix applies wherever a bare click precedes a data-driven step. | A bare click with no `${data.*}` token can't be "not applicable" for an iteration — it always fires, so it breaks exactly when the field isn't rendered. Proven on `OROP(PD)` (`boundary.0.lowerAlpha` click, `priorDistributionFor` click — 2 separate instances, same fix). | No |
| 13 [promoted — `AI_IMPORT_AGENT.md`'s "Worked family reference — ProductDecide" §1, proven 4× on DOM/ROM/DOP/ROP] | **A child period-table's rows never fold into the parent, OR validate errors `<file> has no row for TC_XX/<iter>, but another referenced testdata file does`** — the SAME symptom shows up two ways: (a) child-table fold — every row warns `no matching design.csv row` and every token referencing the synthetic `<table>.<n>.<field>` column then errors `unknown column`; (b) top-level join — `project.csv`/`inputset.csv`/`design.csv` disagree with each other row-for-row even though each individually looks complete | The join — child-to-parent fold AND the `project`/`inputset`/`design` join itself — is **exact-string, case-sensitive** on `IterationID`. Check EVERY testdata file's `IterationID` values character-for-character against each other — one file typed by hand (or copy-pasted from a different source) can drift to a different casing (`Iter_04` vs `ITER_04`) with no error, it just silently never joins/folds. Fix the drifted file's casing to match the rest (values only, not a rename/new-column decision) — `grep`/eyeball every testdata file's `IterationID` column for the feature at once rather than fixing one file and re-discovering the next. | Proven case (a) on `ProductDecide/feature_DOM` TC_29 (`design_decideInterimTable.csv` used `Iter_04..Iter_11`, `design.csv` used `ITER_04..ITER_11`) — fixing the casing alone resolved 9 of 11 validate errors in one pass. Proven case (b) on `ProductDecide/feature_ROM` TC_30 (`design.csv` used `Iter_01..Iter_04` while `project.csv`/`inputset.csv` used `ITER_01..ITER_04`, imported straight off a recording without cross-checking against the sibling files) — 12 validate errors, one normalize-the-column fix. | No |
| 14 | **`validate` reports `metadata StepID: StepID must be an integer`** after inserting a new row between two existing StepIDs | **Decimals are only valid in the `Seq` column**, never `StepID` (unlike `Seq`, which can be `53.1`, `53.2`, … to insert without renumbering). To insert metadata rows between e.g. StepID 530 and 540 with no free integer left, renumber the block: use plain integers for the new rows and bump the next existing StepID (and only that one, if there's room after it) rather than giving `StepID` a decimal. | `Seq` is a cosmetic ordering label with no schema check; `StepID` is what the runner sorts and executes by, and its schema requires an integer. Proven on `ProductDecide/feature_DOM` TC_29 — a first-pass insert used `539.2`/`539.4`/`539.6` as StepIDs and validate rejected all three; fixed by using plain 540-542 and moving the pre-existing `click btn_Save` from StepID 540→545. | No |
| 15 | **`UNWIRED … wire id="collectionName"` on an input-set page** (`inputset.csv <- wire id="collectionName" (recorded value: "Input Set N")`) | Repoint the step's token to the existing `InputSetname` column (`${data.inputset.InputSetname}`) instead of adding a `collectionName` column — **only if `InputSetname` already exists and `collectionName` does not**. If neither exists, ask before adding either. | `collectionName` is the app's DOM id for the input-set-name field; feature testdata in this framework already names that column `InputSetname` by convention (see `ProductDecide/feature_DOM`, `feature_ROP`, etc.) — same field, different header, so it's a rename-the-token fix, not a new-column one. Proven on `ProductDecide/feature_SingleArmSurv` TC_27. | No (once `InputSetname` is confirmed present) |
| 16 | **`validate` reports `selectors Exact: Expected boolean, received string`** on a row you just hand-added, with NO change to the `Exact` cell itself | Check every hand-typed `Description` cell added in the same edit for an **unquoted internal comma** (e.g. `textbox (period 1, table-completeness)`) — it splits into two CSV fields and shifts every column after it (`Exact` ends up holding the description's tail text instead of a boolean). Fix: remove the comma (use `-` or a space) rather than quoting, to match the file's existing plain-CSV style. | A comma inside an unquoted CSV field is column-shifting, not a schema violation of the field you're being told about — the error surfaces on `Exact` (the last column) but the real defect is upstream in `Description`. Proven on `ProductDecide/feature_SingleMean` TC_28 — 9 hand-added table-completeness selector rows all used a comma in their description and all 9 threw this error simultaneously. | No |
| 17 [promoted — `AI_IMPORT_AGENT.md` §0/§3/§6, proven on `feature_MCPMod_Con` TC_36] | **A field auto-binds cleanly (no `UNWIRED`) or gets the generic `assertValue … "VERIFY selector"` fallback, AND a stable sibling/reference feature exists for the same family** | Before accepting the importer's default, `grep` the reference's `selectors.csv`/`metadata.csv` for `confirmed live\|VERIFY selector\|renamed from\|collided\|Never recorded\|mislabeled`. If the reference already resolved a step on the same recorded id/label (a non-boilerplate Description), copy **that resolution**, don't re-derive one. Run this diff again right before declaring the import done — not only when you first pick the reference feature. | The deterministic importer has no memory between features: it regenerates its own default every run even when a sibling's judgment layer already solved the identical field, and neither `UNWIRED` nor `validate` will flag it because the field looks fully wired. Auto-bound-by-name proves the *column* is right, not that the *selector* is. Proven on `feature_MCPMod_Con` TC_36: shipped a `label` selector on the react-select "Select Test" field and a leftover `assertValue` on the mislabeled "Test Type" field — both already fixed and documented from `feature_MCPMod` TC_35 one folder over, neither caught by `UNWIRED` or `validate`. | No (mechanical diff, not a judgment call) |
| 18 [promoted — `AI_IMPORT_AGENT.md` §9.2, proven on `feature_Dual_LogrankLogrank` TC_37 and `feature_Dual_LogrankDOP` TC_38] | **A dual-endpoint interim/boundary table renders as ONE table with two visual columns sharing a single row-index namespace** (`boundary.<n>.ep1*`/`ep2*`), with a "Synchronize Interims" (or similar) select deciding which endpoint is primary/editable vs secondary/`Determined` — and that select can be **blank** in testdata, silently defaulting live from a derived "Winning Condition" field you can't reliably predict from other testdata codes | Screenshot-verify the live default mode per iteration rather than inferring it. Wire the row-growth `reconcilePeriodTable` calls' **button label** and **countField** per mode — the secondary-side Add button's label flips with the primary endpoint (`Add Interim to EP2` under EP1-primary vs `Add Interim to EP1` under EP2-primary; no such button exists for the currently-primary side). For countField: **don't pick one field across every iteration sharing the metadata** — a single Winning Condition can suppress a checkbox column entirely (all-`N/A`) for exactly one iteration while every other iteration needs that same checkbox as its countField, and swapping to a different field to fix that one breaks the others (proven on TC_38, where `ep1EfficacyCheck` worked for 5 of 6 EP1-primary iterations but was `N/A` everywhere on the 6th, and switching to `AnalysisSpacingInfo` broke a different, previously-fine iteration whose `AnalysisSpacingInfo` is genuinely `N/A`). Instead **run two `reconcilePeriodTable` calls back-to-back on the same gate, one per candidate countField** — the tool no-ops once its own target is met, so whichever field is actually populated for a given iteration does the growing and the other call is a guaranteed no-op. The secondary-only Add button **appends a new row, it does not convert an existing `Determined` row** — don't assume the extra value lands at the next sequential `PeriodIndex`; screenshot-verify which row actually went editable. Two "keep Analysis Info same as other endpoint" checkboxes can exist with **different DOM ids** depending on which endpoint is primary, and neither renders at all when the Winning Condition is a "both endpoints" style value (not single-endpoint) — gate both as separate `check`/`uncheck` pairs and let testdata's `N/A` pick the right one. **Gate the DEFAULT-mode reconcile call on `SkipIf …==Based on EP2` (skip only when EXPLICITLY the other mode), never on `!=Based on EP1`** — a testdata cell that means "not explicitly set" can be an empty string OR the literal string `N/A` (both seen across iterations of the SAME feature), and `!=Based on EP1` demands an exact string match that neither blank nor `"N/A"` satisfies, silently skipping the reconcile for every iteration relying on the live default. Proven on TC_39 ITER_01: `syncInterims="N/A"` (literal), the metadata's only EP1-primary reconcile call was gated `!=Based on EP1`, so it never fired and the boundary table stayed at its default 1 row against a testdata target of 3 — passed `validate` and even passed on OTHER iterations (ITER_06 happened to only need 1 row, masking the gap) until an iteration needing more than the default surfaced it. Fixed by adding a second, idempotent call on the safe `==Based on EP2` gate. **Also: per-period checkbox `check`/`uncheck` steps must be value-gated on their OWN field (`SkipIf ${data...fieldName}!=check`/`!=uncheck`), never on a Winning-Condition/mode field alone** — a mode-only gate can correctly decide an iteration's checkbox SHOULD be interacted with in general, while that specific PERIOD still has no data at all for it (e.g. an iteration with no boundary row whatsoever), producing a `locator.check: Timeout` instead of a clean skip. Proven on TC_39 ITER_08 (no boundary row at all): steps gated only on `${winning-condition-select}!=At least EP2` tried to check a period-1/2 checkbox that doesn't exist; fixed by switching to the field's own value gate, matching every other checkbox step in the same file. | Every one of these was a genuine live-app discovery, not a guessable convention, and each one produced a distinct, confusing failure (`field is disabled but testdata requires a value`, `locator.check: Timeout … waiting for #keep…`, `no "Add Interim to EP2" button found`, an orphan unfilled row after reconcile, a default row count silently never reconciled). Proven across 8 iterations of `feature_Dual_LogrankLogrank` TC_37, 2026-09-22; re-proven (countField refinement) across 8 iterations of `feature_Dual_LogrankDOP` TC_38, 2026-09-23; and re-proven again (blank-vs-`"N/A"` gate + checkbox value-gating refinements) across 8 iterations of `feature_Dual_DOPLogrank` TC_39, 2026-09-27 — see feature log entries for the full diagnostic trails. | Yes — every testdata correction in this family (which field owns a row, which value moves where) was confirmed with the user against a live screenshot/DevTools capture before editing, never guessed. |
| 19 [promoted — `AI_IMPORT_AGENT.md` §9.2, proven on `feature_Dual_LogrankDOP` TC_38] | **(a)** An iteration fails at a step unrelated to anything you changed, immediately after a DIFFERENT iteration failed in the same serial run. **(b)** A `compareWithBaseline` step reports `VALUE_MISMATCH` FAIL against an iteration's EXISTING (not freshly-created) baseline, right after you fixed a real bug in shared metadata | **(a)** Don't debug the later iteration's own steps first — fix the earlier iteration's failure, then re-run the two together in isolation (`Run=TRUE` on just that pair) to confirm the later one was only a cascade (a crashed iteration can leave the shared browser session in a state that breaks the next iteration's fresh start, e.g. `field not found` on its very first fill). **(b)** Don't assume the mismatch means your fix is wrong — screenshot-verify the current run's live design state against testdata directly first. If it now correctly matches testdata (it usually does, when the fix was for a real bug), the OLD baseline was captured from a broken prior state and is simply stale: delete `06_baseline/<env>/baseline_<TC>_<ITER>.csv` + its `.meta.json` and re-run to regenerate it. | **(a)** Proven on TC_38: ITER_04 failed with `field "txt_collection_Name" not found` at StepID 310 (the very first input-set fill) in a full-suite run, but had passed cleanly seconds earlier on its own — the true cause was ITER_03 crashing on the countField bug (rule 18) immediately before it; fixing ITER_03 and re-running the pair together made both pass. **(b)** Proven on TC_38 ITER_01/ITER_02: after fixing the boundary reconcile, both failed against baselines captured before this session (5 and 1 value mismatches) — the diff showed the old baseline was missing a real testdata value entirely (`HR (1.25, 1)` expected vs the testdata-correct `HR (1.25, 1.658)` actual) confirming the baseline, not the fix, was wrong. | **(b)** Yes — deleting/regenerating a baseline discards the previous regression reference, so confirm with the user before doing it, same as any other baseline change. **(a)** No — re-running an isolated pair is non-destructive. |

**Runtime (page-behavior) traps** — dropdown-resets-dependent, ungated Add-Period/Add-Interim,
Unsaved-Changes/credit dialogs, execution-by-StepID ordering, sim "prior parameters too extreme"
(mount Response tab first), adaptive CHW/CDL SSR (Include Enrollment + settle dropdowns) — live in
`AI_IMPORT_AGENT.md` §7/§8. Read them for any survival/adaptive feature.

---

## Simulation-flow rules (runtime — proven on ROP(PD) TC_21 sim, 2026-08-19)

The sim chains after a green design in the same browser; most of its traps are ordering/state, not data. Apply these in order when wiring a sim.

| # | Signal (what you see) | Decision |
|---|---|---|
| S1 | **Start Date** `selectStartDate: unsupported date value "08-10-2026"` | Testdata date must be `M/d/yyyy` or `yyyy-MM-dd` — never `MM-DD-YYYY`/`DD-MM-YYYY` with dashes. |
| S2 | **`select … "unable to resolve ddl_Distribution"`** on the Response tab; earlier a Recalculate ran | The Design-tab **Recalculate fired before the Response tab was mounted** → "prior too extreme" → Response renders no controls. Fix: a `callCustom loadResponseTabIntoModel` that does **Design → Response → back to Design**, placed **before ANY design field is filled** (right after the first `leftPanel.designs` click, before the header fills). Not just before Recalculate — *before filling*. Proven on GADAR/DOM/ROP. |
| S3 | **Enrollment `click Add Period` / reconcile times out or errors** *("no Add Period button found (current=0, target=N)")*; screenshot shows *"Enrollment Not Included — toggle Include"* | The sim Enrollment tab's **Include checkbox is off (or never ran)** — two distinct causes, same symptom: **(a)** the checkbox step is genuinely missing → add a gated `check chk_include_Switch` (css `#includeSwitch`) after the Enrollment tab click, `SkipIf ${data.simulation.Include Enrollment}!=check`; **(b)** the checkbox step EXISTS but its **StepID is numbered higher than the reconcile/`loopPeriods` step that depends on it** (execution is by StepID, not row order — a check/uncheck pair inserted at e.g. StepID 383/384 runs AFTER a reconcile at StepID 370 even though it sits above it in the file). Fix (b) by renumbering the check/uncheck to a StepID **below** the reconcile/loop. Either way, reveals the accrual table before anything tries to use it. Proven (b) on `OROP(PD)` TC_23. |
| S4 | **A blank enrollment/period row** → "…is required", then an **Unsaved Changes** dialog on nav, then the NEXT tab's field "not found" | An **ungated Add Period** added a row the iteration doesn't use. Gate every Add Period on its period's data: `SkipIf ${data.simulation.<table>.<n>.<col>}==EMPTY` (or `==N/A`). **Either operator now works** since the isNaCell core fix (2026-08-23): an ABSENT child-table period folds to the **empty string** while an unused field folds to the **literal `N/A`**, and `==N/A` now matches **both** (isNaCell = blank OR any N/A spelling), while `==EMPTY` stays a **strict-empty** check (what `loopPeriods` count-field gates rely on). Keep whichever convention the feature already uses — but see the GADAR entry below: for a table where a *present* period can carry `N/A` (mutually-exclusive methods), gate on `==N/A` so the present-`N/A` row is not built. |
| S5 | **Sim opens the DESIGN/config page instead of the result; `extractAllResultTables … -> ~14 char(s)`; sim baseline is tiny (<2 KB) while the design baseline is normal (8–20 KB)** | The **simulation NODE name (config stage, `#inputId` at step ~20)** must be **distinct from the RESULT name** (set AFTER Save & Simulate). If the same name is used, `click lnk_ResultName` matches the *node* and opens its design/config page — near-empty capture. Fix (mirror DOM steps 20 / 665 / 690 and recording lines 7 / 107 / 111): (a) name the node distinctly at config — `<Feat>_Sim_${iterationId}`; (b) add a **new fill `txt_ResultName` step immediately after `btn_Save_Simulate`** that names the RESULT (`${data.simulation.Sim Result Name}` or `<Feat>_SimRes_${iterationId}`); (c) `click lnk_ResultName` uses the **result** name. **Audit tip:** `wc -c 06_baseline/*/sim_baseline_*` — any sim baseline under ~2 KB was never captured. |
| S6 | **Extra blank interim/period row** invalidates a group-sequential boundary; wrong interim count per iteration | The recording clicks a FIXED number of `Add Interim` (design) / `Add Period` (sim); different iterations need different counts. **Gate each `Add Interim`/`Add Period` on its period's data** — `SkipIf ${data.<phase>.<table>.<n>.<keycol>}==EMPTY` — so each iteration builds exactly its count. (Design boundary + sim enrollment + sim boundary.) |
| S7 | **App validation error naming a boundary cell** (e.g. *"Cum. α Spent should be strictly in increasing order"*, *"Upper/Lower α is required"*) with a blank required cell in the screenshot | A **table-completeness gap**: the recording only captured the recorded config's cells (usually period 0, and only symmetric fields), so an **asymmetric / multi-interim** iteration has testdata values with **no fill step**. Add the missing per-interim fills + selectors: design `boundary.<n>.upperAlpha/lowerAlpha`; sim `boundarySim.<n>.cumAlphaSpentUpper/Lower`, `efficacyZUpper/Lower`, `futilityZ`. They auto-skip on blank, so symmetric iterations are unaffected. See the **Table-completeness rule** below. |
| S8 | **`click btn_Calculate` (design) or `click btn_Recalculate` (sim) times out** on a **fixed** design (Efficacy & Futility Boundary Family both = None → no interims) | Those buttons exist only for **group-sequential** designs. Gate them on boundary presence: design `SkipIf ${data.design.boundary.0.analysisSpacingInfo}==EMPTY`, sim `SkipIf ${data.simulation.boundarySim.0.analysisSpacingInfo}==EMPTY`. Group-sequential iterations keep computing; fixed ones skip. **Generalizes to any button whose panel only renders for interim/group-sequential iterations** — not just Calculate/Recalculate. Proven a 3rd way on `ProductDecide/feature_DOM` TC_29: `click btn_Add_Interim` (fires twice, unconditionally, to build periods 1 and 2 of a `decideInterimTable`) timed out on the fixed-design iterations (ITER_01-03, 06, 09, 10 — no `interimType`); gated each click on its own period's key column (`SkipIf ${data.design.decideInterimTable.1.analysisSpacingInfo}==EMPTY` / `…2…`) rather than the boundary column, since the table/column name differs per feature — match the gate to whatever period-indexed table the feature actually uses. |
| S9 | **Redundant focus-click before a grid-cell fill** hangs on an iteration where the cell is blank in one row but `N/A` in another | **DELETE the click, don't gate it.** The following `fill` auto-skips on **blank AND `N/A`**, so the click adds nothing. (Historically a click's `SkipIf` could gate only one side — `==N/A` missed blank, `==EMPTY` missed `N/A`; since the isNaCell core fix a single `==N/A` gate now covers **both**, but the fill already self-skips, so deletion stays the clean fix.) Sibling fills (e.g. `upperAlpha`) already work with no preceding click, proving the click is redundant. |
| S10 | **Open-result click `strict mode violation … resolved to 2 elements`** (e.g. `"Result - Sim 6"` also matches `"Result - Result - Sim 6"` on the results list) | The result link matches by **substring** by default. Set the `lnk_ResultName` selector's **`Exact` column = TRUE** so it opens only the exact-named link. Fixes both the design and sim result-open clicks for every iteration. |
| S11 | **A native `<select>` shows the WRONG option with NO error; the dependent fields never appear, so the NEXT step fails "unable to resolve"** (ROP: `select ddl_Input_Method="4"` passed but stayed on the default *Beta Parameters*; `ddl_..._perc_Pi_T1st_Operator` then "unable to resolve"). Symptom: the select's options are **re-mounted by the PREVIOUS field's change** (choosing Distribution=Beta re-renders the Input Method select). | **React re-render race** — a `selectOption` that lands mid-re-render is silently discarded and the control snaps back to its default. Fixed in **core** (`core/keywords/input.ts` `select`): after selecting a native `<select>` by value, **read the value back; if it didn't stick, settle 300 ms and re-select once** (mirrors `fill`'s read-back). No-op on the normal path. **Diagnostic technique:** a temporary `callCustom` that dumps `#<id>.value` + `options[]` for the suspect dropdowns right before the failing select — it prints the true value→label map (e.g. `4=Percentiles of πt`) and the injected delay itself often masks the race, confirming it. |
| S12 | **A many-interim iteration silently builds FEWER analyses than its testdata has** — the run is GREEN but the boundary result has too few rows; the extra periods' cells never get entered. The metadata's `Add Interim` gates + per-period fills stop at period 2 (the recording only built 3 analyses). | **Extend Add-Interim + per-period fills to the max period any iteration uses.** Boundary rows map: **period 0 = IA1 (default, no Add Interim); periods 1..k-1 each need one `Add Interim`; the last period with `analysisSpacingInfo=N/A` is the auto "Final" row (NO Add Interim — but its `efficacyPValue` IS entered as `boundary.<last>.efficacyPValue`).** Add one `click btn_Add_Interim` per period gated `SkipIf ${data.design.boundary.<n>.analysisSpacingInfo}==EMPTY`, plus `fill txt_boundary_<n>_analysisSpacingInfo/efficacyPValue/futilityPValue` (+ selectors `[id="boundary.<n>.<field>"]`). All auto-skip on blank/absent, so few-interim iterations are unaffected. **Silent under-build has no error** — verify by comparing the testdata's period count to the result table's analysis rows (or a post-Calculate screenshot). ROP: extended to period 7 for ITER_10 (7 interims + Final = 8 analyses); this also corrected ITER_04 (4 periods, was building 3). **CSV gotcha:** never put a comma inside a selector/metadata comment column — it shifts every later column (breaks the boolean `Exact`). |

| S13 | **`npm run test --testcase TC_XX` reports "Executing 0 iteration(s)"** for an iteration whose `project.csv` (and `inputset.csv`) `Run=TRUE`, with NO error — it's just silently excluded | `simulation.csv` (or any other testdata CSV) has an EXPLICIT `Run=FALSE` row for that iteration. **This is a GLOBAL veto, not a sim-only skip** — `core/loaders/featureLoader.ts` `loadTestData` reads every `.csv` in `01_testdata/` (not just `feature.config.json`'s `testdata.files` whitelist) into ONE store, and `core/runner/testDataStore.ts` `iterationsFor()` treats **any** file's `Run=FALSE` row as excluding the iteration from the WHOLE run (design + sim), contradicting `FRAMEWORK_KT.md` §5.1's stated "Run=FALSE on a `simulation.csv` row skips only the sim phase; design still runs." A **missing** `simulation.csv` row for an iteration IS safe (matches the docs — sim-only skip); an **explicit `Run=FALSE` row** is not. To enable an iteration's design (with or without sim), `Run` must be `TRUE` (or the row absent) in **every** testdata CSV that carries the column for that iteration — not just `project.csv`. (Confirmed on OROP(PD) TC_23 ITER_02, 2026-08-25; not yet fixed in `core/` — flagged, not patched, per the scope-to-one-feature rule.) |
| S14 | **A `loopPeriods`/`reconcilePeriodTable` call reports `0 period(s)`/`live N, wants 0` for a period-table whose testdata clearly has real values (visible via `awk`/manual dump), and the downstream page then shows a blocking "X is required" validation error** — NOT the same as S7/S12 (a genuinely-missing fill step); here the fill step EXISTS and is wired, but never fires because the period is never *detected* as present. | The single `countField` used to gate period existence (`reconstructPeriods`'s "period exists iff `<prefix>.<n>.<countField>` is non-N/A") is the WRONG field for this iteration. Different iterations can lead the SAME boundary/period table with DIFFERENT fields — e.g. `analysisSpacingInfo` for most, but `efficacyPValue`/`cumAlphaSpent`/`futilityCP` etc. for others that skip the "spacing" input method entirely. **Fix: chain multiple `loopPeriods` (and, if rows must first be ADDED, multiple `reconcilePeriodTable`) calls back-to-back on the same gate, one per candidate leading field** — exactly the pattern §9.2 already prescribes for dual-endpoint `countField`s. Both keywords are naturally idempotent for this: `reconcilePeriodTable` no-ops once `target <= current`; `loopPeriods`'s individual `fill` steps already self-skip on blank/N/A, so a period two passes both detect just gets the same value written twice, harmlessly. **Never replace the original countField — ADD passes**, since removing it risks breaking whichever iterations it already covered. Confirmed live on `StratGADAR` TC_45: ITER_10 defined its entire 5-period boundary via `efficacyPValue`+`cumAlphaSpent` with `analysisSpacingInfo` N/A throughout (both the ADD-rows and the FILL-values logic silently no-op'd); ITER_07 was a PARTIAL case — period 0 used `analysisSpacingInfo` normally but period 1 didn't, so only period 0 got filled and the resulting baseline was silently wrong (recompute + re-baseline needed once caught). **Diagnostic tip:** cross-reference the child CSV's populated columns per iteration (`awk`/`column -t` dump across ALL iterations at once) against which field each `loopPeriods` call actually keys on — a period-row with ANY real value but a blank/N/A countField cell is the tell. A genuinely-required field with no value anywhere (e.g. the app itself demands `analysisSpacingInfo` even when a different field leads) is a **separate, real testdata gap** — screenshot-verify the validation error text before assuming the countField chain alone will fix it. |
| S15 | **A generic "Unsaved Changes" modal (`id="cancelConfirm"`, title "Unsaved Changes", body "Are you sure you want to leave without saving your…", buttons `#primaryButton`="Leave"/`#secondaryButton`="Cancel") blocks a tab-switch click** (`intercepts pointer events` in the Playwright retry log) **— sometimes appearing on the VERY FIRST tab click, before any field has been touched.** Retrying the click with `force=true` (the framework's default retry behavior) can get the click itself to register, but the modal stays open underneath and silently blocks every subsequent interaction until something finally hard-times-out several steps later — a confusing, delayed failure far from the real cause. | Add a plain `click` step on the modal's "Leave" button with **`Optional=TRUE`** immediately after the tab-switch action most likely to trigger it (e.g. right after a "mount the Response tab early" warm-up click) — per `core/keywords/input.ts`'s documented Optional-click behavior, it probes with no wait and silently no-ops when the modal isn't present, so it's safe to leave in place for every iteration/feature even when the modal never appears. Selector: `css`, `#cancelConfirm #primaryButton`. Confirmed live on `StratGADAR` TC_45 sim flow (ITER_06 only, of 8 iterations — modal appeared immediately after the Response-tab warm-up click with zero prior edits; root trigger not fully understood, but the fix doesn't need it to be). **Diagnostic tip:** a step failure screenshot (`artifacts/<run>/<TC>_<ITER>/step_<id>_fail_*.png`, auto-captured on any hard step failure) or a temporary `dumpSubtree` callCustom on the modal's container id is enough to read its exact title/body/button text — don't guess the button label. |
| S16 | **A manually-entered boundary value (`futilityPValue`/`futilityCP`/`futilityHR`/`cumAlphaSpent`/`cumBetaSpent`-family cell) `fill`s successfully — the step passes, read-back confirms the value on screen — but has reverted to an invalid sentinel default (e.g. `"1"`) by the time a LATER screenshot/validation runs**, surfacing as a range-validation error ("X should be in the range […]") plus a blocked "Unsaved Changes" modal on the next tab-switch. **Distinct from S15**: S15 is checkboxes reset by Calculate with no value involved; this is a VALUE field silently wiped. | **The boundary table is a progressive-reveal, multi-stage form, not a single flat page — clicking `btn_Calculate` doesn't just compute, it also ESTABLISHES which fields are genuinely persistent, and wipes any value entered into a field the table hasn't "initialized" yet via a prior Calculate.** Different field families reveal/persist at different stages: fields tied directly to the initially-selected boundary family (`efficacyPValue`, `upperPValue`/`lowerPValue`) are safe to fill before the FIRST Calculate; `futilityPValue`/`computeCP`/`futilityCP`/`futilityHR` need the FIRST Calculate to have already run; `cumAlphaSpent`/`cumBetaSpent`-family fields need a SECOND Calculate. The working recipe is **three staged Calculate clicks**: (1) fill the family-tied fields → Calculate #1 → (2) fill futility-p-value/CP/HR (+ `computeCP` select) → an optional cell-click to defocus/commit → Calculate #2 → (3) fill cumAlpha/cumBeta-family fields → re-assert checkboxes (S15-style, right before the LAST calculate) → Calculate #3 (final) → a short settle sleep → THEN navigate away. This exact 3-stage structure is what `StratGADAR`'s own proven metadata already does (its StepIDs ~3070/3160/3240) but had never been written up as an explicit rule — it had to be independently rediscovered live on `StratGADSD` TC_46 after 3 failed single/double-Calculate attempts (fill-before-calc got wiped; fill-after-calc-with-no-following-calc left the page "dirty" and blocked navigation). **A single Calculate (no staging) only works for fields that don't need the progressive reveal** (e.g. a table using ONLY `analysisSpacingInfo` + checkboxes, no manual p-value/CP/HR/spend entry) — most GSD boundary iterations are fine with one Calculate; reach for the 3-stage version only once a manually-entered value family is confirmed reset. **One open case this did NOT resolve:** `StratGADSD` ITER_04 (`futBoundaryFam=p-value`, `efficacyCheck` left at its default CHECKED state) still resets `futilityPValue` after EVERY Calculate in the 3-stage recipe — StratGADAR's own working p-value-family iteration has `efficacyCheck=uncheck` instead, suggesting Efficacy-checked + Futility-p-value-family together may never persist a manual value in this app; flagged to the user and the iteration held back (`Run=FALSE`) rather than guessed at further. |
| S17 | **A PARAMETRIC selector's `{0}` placeholder is never substituted — the live DOM query ends up literally containing `{0}` (e.g. `[name="boundary.{0}.cumBetaProportion"]`), so `fill`/`click` hard-fails "field not found" after the FULL timeout, even though the attribute pattern itself is independently confirmed correct** (e.g. by the user inspecting the live element). **`npm run validate` reports ZERO issues** — this is NOT the selectors.csv quoting bug it would normally catch. | **An unquoted comma anywhere in a `flows/*.csv` row's `Description` column shifts every column after it by one position — including the LAST column, `DynamicArgs`**, which silently receives stray overflow text instead of the real `${runtime.period.n}` token; the real token gets pushed into a phantom 18th field with no header to bind to and is silently dropped by the parser. This is a nastier variant of the already-known "CSV commas shift columns" rule (`FRAMEWORK_KT.md` Trap 12, S12's closing note) specifically because **flow files (`flows/*.csv`) aren't covered by the strict per-column schema check that catches this in `selectors.csv`** (its boolean `Exact` column reliably trips a type error on a shift; a flow file's `DynamicArgs` column has no such type constraint, so a shifted file parses "successfully" with wrong content and only fails at runtime, with an error that looks exactly like a wrong-selector bug, not a CSV-parsing one). **Diagnostic tip:** when a parametric `{0}`-style selector times out despite a confirmed-correct attribute pattern, parse the SPECIFIC flow-file row with a quote-aware CSV splitter and count fields against the header (`StepID,StepGroup,Page,Action,ObjectName,InputValue,StoreAs,AssertType,ExpectedValue,WaitCondition,Timeout,Optional,Retry,Screenshot,SkipIf,Description,DynamicArgs` = 17) — one extra field is the tell. Found live on `StratGADSD` TC_46's own newly-created `flows/stratgadsd_boundary_cumSpent_period.csv` (a comma in "…Interpolated), replaces StratGADAR's cumBetaSpent" split the row into 18 fields). Fix: wrap the whole `Description` value in double quotes. |
| S18 | **A `select`/`fill` on a tab/panel that JUST mounted appears to succeed — the step passes, and a screenshot taken right after shows the correct value — but a LATER step touching a DIFFERENT field on the SAME panel fails ("field not found"), or a later screenshot shows the EARLIER field has reverted to its fetched default.** The gap between the fill and the revert can be several seconds, well outside any single-step retry window, so it reads as an unrelated failure far from the real cause. **Distinct from S11** (a single `select` reverting within its OWN verification window — fixed in core) **and from S16** (Calculate-triggered multi-stage reveal) — this is a tab/panel MOUNT triggering an async data fetch that overwrites the panel after the automation already moved on. | **The panel's own async fetch-and-hydrate cycle keeps running for a short window AFTER its trigger element becomes visible/attached — a `waitForSelector` keyed on visibility fires the instant the DOM node mounts, well BEFORE that fetch resolves and overwrites whatever the automation just set.** There is no reliable "fetch complete" selector to wait on instead (no spinner, no state attribute observed). Fix: add a plain **settle sleep AFTER the `waitForSelector`**, sized to the panel's typical fetch duration (confirmed ~2.5s sufficient on `GADAR(PE)` TC_55's Simulation Setup panel) — so every field interaction lands after the panel's own overwrite, not racing it. Confirmed live and reproduced TWICE: the first fix attempt (a `waitForSelector(visible)` alone, mirroring the Enrollment tab's own post-mount wait) looked correct on one run but failed identically on a re-run — only the added settle sleep held across two consecutive full-suite confirmations. **Diagnostic tip:** if a field visibly holds the right value in a screenshot taken right after its own fill, but a LATER screenshot (even of a DIFFERENT field on the same panel) shows it reverted, check the log timestamps between the panel's mount click and the first field interaction — a small gap (hundreds of ms) with an intermittent revert several seconds later is the signature; a deterministic, immediate revert is S11 instead. |
| S19 | **`extractAllResultTables` logs `"<Table Name>" reports N data row(s) but only M could be rendered even after scrolling` (M < N), and a later `compareWithBaseline` on that table shows `ROW_COUNT_MISMATCH`/`EXTRA_ROW` or `MISSING_ROW` — NOT consistently, and NOT always on the same table.** This is a **framework-level AG-Grid extraction limitation**, not a feature-wiring bug: `core/extractors/tableExtractor.ts` already scrolls the grid to try to render every row before capturing, and for most tables that's enough — but the LARGEST virtualized tables (confirmed: 30-stratum "Response Generation Parameters"/"Overall Stratum Information" on `GADAR(PE)` TC_55 and `StratGADSD` TC_46) can still under-render some rows, and WHICH rows/table under-renders varies run to run (confirmed: the exact same iteration, re-run twice, under-rendered a DIFFERENT table each time — once "Overall Stratum Information" at 19 of 30 rows, once fully clean). | **Do not assume a `ROW_COUNT_MISMATCH`/VALUE_MISMATCH FAIL against an EXISTING baseline is a regression from whatever you just changed — check whether the baseline itself was captured during an under-render first.** Diagnostic: open the diff file (`08_diffs/<...>_diff_<TC>_<ITER>.json`) and look at the `expected` (baseline) vs `actual` (live) values for the mismatching cells — if `expected` is a suspiciously round/truncated number (e.g. a `Count` cell reading the table's own DEFAULT/partial value) while `actual` looks like the real, fully-rendered figure, the BASELINE is the stale one. Cross-check by grepping the baseline file itself for literal under-capture signatures (e.g. a `Number of Simulations Run` value that doesn't match testdata) before concluding anything. If confirmed stale, delete and regenerate that ONE baseline (confirm with the user first, per the standard stale-baseline protocol) — do NOT touch metadata/selectors to "fix" this, since the flakiness lives in the extraction tool's scroll-and-capture timing, not in how the feature is wired. **This is a known, accepted, NOT-YET-FIXED limitation** — worth a `core/extractors/tableExtractor.ts` look (e.g. a longer settle between scroll and capture, or re-verifying row count after capture and retrying) in a dedicated framework session, not as a side effect of unrelated feature work (scope discipline — don't patch `core/` while fixing one feature). |
| S20 | **A UI "Add &lt;Item&gt;" button (`btn_Add_Arm`/`btn_Add_Dose`/`btn_Add_Period`/…) is clicked UNCONDITIONALLY in a feature's metadata, while a reference/sibling feature in the SAME family already gates the IDENTICAL click with `SkipIf=${data.<file>.<col>-N}==N/A`.** The importer reports no `UNWIRED`, `npm run validate` passes clean, and the live run doesn't FAIL either — the extra click just silently creates one more row/arm than the testdata intends (with a blank/default value), and the downstream design is now structurally WRONG (e.g. "Number of Arms" on the Results page reads one higher than the testdata's real arm count) even though every individual field "landed" exactly as wired. Nothing about this trips any automated check. | **Grep the reference feature's metadata for the SAME ObjectName before trusting an unconditional "Add" click as intentional** — if the reference gates its last Add-click(s) with `SkipIf=${data.<file>.<lastCol>}==N/A` and the new feature's equivalent click has no `SkipIf` at all, that's a missed-mirror bug (§0's "verify the mirroring held" non-negotiable), not a stylistic difference. Fix: copy the reference's exact `SkipIf` onto the new feature's click. **Confirmed live on `feature_MAMS_DOP(Pvalue)` TC_49**: `btn_Add_Arm`'s second click (building the optional 5th arm) ran unconditionally for every iteration; `feature_MAMS_DOM` (same family, already stabilized) had the identical click gated on `${data.project.armName-4}==N/A`. The bug surfaced only by reading "Number of Arms" on the live Results page against the testdata's intended arm count — not from any log, warning, or FAIL. Generalizes to any count-driven "Add" button (doses, periods, scenarios), and is exactly the class of gap `AI_IMPORT_AGENT.md` §4a's full data-to-wiring audit exists to catch. |
| S21 | **`extractAllResultTables` logs `"<Table Name>" reports N data row(s) but only N-1 could be rendered even after scrolling"`, but the captured CSV for that table is actually COMPLETE — NOT the real S19 under-render.** Distinguishing signal: open the captured `07_actual_results/results_<TC>_<ITER>.csv` for that table and check its `RowLabel` column — if the rows read as sequential analysis numbers (`1`, `2`, …) PLUS a final `Total` row with no gap in the numbering, the data is whole; the grid's own `aria-rowcount` attribute is simply over-counting by one on grids that have a pinned "Total"/footer row (the pinned row isn't part of the scrollable body `aria-rowcount` describes, but the extractor's `target = aria-rowcount - 1` math doesn't know that). | **Do not delete/regenerate a baseline over this warning alone — verify the `RowLabel`s first.** A true S19 under-render shows a GAP in the row numbering or a materially smaller table than the design implies, and is non-deterministic (varies run to run, table to table). This benign pattern instead always resolves to exactly "N-1 sequential rows + Total", and reproduces identically on EVERY iteration and EVERY re-run — the opposite signature of S19. Confirmed live on `feature_MAMS_DOP(Pvalue)` TC_49: every grid with a pinned Total row ("Interim and Final Analysis Summary", "Probability of Claiming Efficacy and Futility") warned 100% reproducibly across all 7 iterations and every re-run, yet the captured data matched the design's actual interim-count exactly every time. Sibling rule to S19 — read both before reacting to this warning. |
| S22 | **Two fields that share a generic recorded label (e.g. "Parameter") but have DIFFERENT DOM ids AND different action types (one `select`, one `fill`) can both get bound to the SAME testdata column** — contradicting the documented "editable fills are split automatically" behavior (`AI_IMPORT_AGENT.md`'s "Two fields that share a visible label"), which only reliably fires when BOTH fields are the same action type. `validate` stays clean (both tokens resolve to a real column) and nothing is `UNWIRED` — the bug only surfaces when the SELECT's live id is read directly off `selectors.csv` and found to differ from the column it was bound to. | **Before trusting an auto-bound `select` next to a same-labeled `fill`, grep `selectors.csv` for both ObjectNames' `SelectorValue` and confirm they're genuinely the same element** — if the ids differ (e.g. `#effParam` vs `#effParamRho`), the select is almost certainly meant to hold a DIFFERENT, sibling column (here, a named-option column like `effParam` holding `Pocock`/`O'Brien-Fleming`, vs a numeric `effParamRho` column) and needs its token manually repointed. Confirmed live on `feature_MAMS_DOP` TC_50: `ddl_Parameter` (`#effParam`, a select of named Lan-DeMets shapes) and `txt_Parameter` (`#effParamRho`, a numeric fill) both got bound to `effParamRho` by the importer; the `effParam` column sat unused and the select silently drove the wrong field on every iteration where it mattered (confirmed live after the fix: `ddl_Parameter = "Pocock"` landed correctly once repointed). |
| S23 | **A sim flow's "Result Name"-style field (`#inputId` or similar) is recorded TWICE at genuinely different moments for different purposes — once early (naming a derived input set) and once late (naming the simulation's own result, right before the Simulate click) — but the importer's duplicate-step collapse keeps only ONE occurrence**, binding it to whichever testdata column it happened to match first. No `UNWIRED`, no `validate` warning — the flow runs and reports green, but the WRONG name lands in the WRONG place (or the correct-looking name lands at the wrong moment and the later "open result by name" step then can't find it). | **When a sim (or any multi-stage) flow's testdata has two distinct "name" columns that look similar (e.g. `CreateInputSet` vs `Sim Result Name`), don't assume the importer's single generated fill step covers both moments** — check the live app directly: does naming happen once, or does a SEPARATE "Name your result before simulating" dialog/field appear again later, right before the actual compute/simulate action? If so, split the single generated step into two: the EARLY one bound to the input-set-naming column, a NEW step inserted right after the Save/Compute-triggering click (mirroring wherever the design flow's own end-of-flow `ResultName` fill sits) bound to the result-naming column. Confirmed live on `feature_MAMS_DOP` TC_50 (user-supplied clarification, not import-tool-discovered): `CreateInputSet` names the sim's own input set at the START of the flow; `Sim Result Name` names the result in the "Simulate" confirmation dialog, confirmed via screenshot showing "Name your result before simulating" pre-filled with the correct value after the fix. |
| S24 | **A boundary/futility-family `select` option can completely change WHICH per-period fields are real on the page — testdata authored assuming one family's field set (e.g. `cumAlphaSpent`+`futilityPValue`) silently has no field to land in under a DIFFERENT family selection, and vice versa.** Symptom 1: a `fill` on a field that's simply not rendered for this family hard-fails "field not found" (or the loop that tries to fill it does). Symptom 2 (more dangerous): the OTHER family's actual required field is left `N/A` because testdata was authored for the wrong family, and the live app blocks Save with an inline "X is required" validation error that never surfaces as a step FAIL — only as the NEXT step (e.g. "fill ResultName") failing because the page never left the Design tab. A family's visible dropdown LABEL can also be a single Greek letter (e.g. "δ") rendered from a plain numeric testdata value (e.g. `"4"`) via the option's underlying `value` attribute — don't assume a bare number in a family-selector column is a typo before checking what it actually renders as live. | **Screenshot the live boundary table for EVERY distinct family value a feature's testdata uses, before assuming one generic per-period flow/column set covers all of them** — different families are not just different presets of the SAME fields, they can be different field SETS entirely. When a `fill`/loop FAILs or an app validation error blocks Save right after a family `select`, read the live table's actual column headers from a screenshot rather than guessing which testdata column should supply the missing value. Confirmed live on `feature_MAMS_DOP` TC_50, three ways on the SAME `futBoundaryFam` column: (1) ITER_03's family rendered as "δ" (Delta) — a `cumAlphaSpent` value in testdata had no field to land in (only a "Futility δ" field existed, which maps to the `futilityDelta` column instead); (2) ITER_04's family ("p-value") required `cumAlphaSpent` to be populated (it was `N/A`), blocking Save with "Cum. α Spent is required" even though `futilityPValue` filled correctly; (3) a THIRD, unrelated pattern — `simulation_boundarySim.csv`/`simulation_trtmntSelectionTable.csv` had real per-period rows for an iteration whose parent family/gating column was `N/A`, making that data permanently orphaned (same root cause as S14/S20's "data present but the controlling field doesn't let it render" family, now confirmed recurring on child-table data specifically). |
| S25 | **An unconditional "Add &lt;Item&gt;" click INHERITED FROM THE RECORDING (not a human-authored gap) builds one more row/item than a SMALLER-count iteration needs — and unlike S20, there is no sibling feature to diff against, because the recording itself only ever demonstrated the maximum-count case.** The importer never flags this: the click isn't `UNWIRED`, `validate` is clean, and the blank/unfilled fields in the new extra row auto-skip exactly like any other `N/A` cell, so nothing LOOKS wrong at the wiring level. The live app then silently fills the new row's fields with its OWN default (e.g. `previous value + a fixed increment`), and that phantom value can corrupt a COMPLETELY UNRELATED later calculation — surfacing as a confusing app-side validation error on a DIFFERENT step, not as a "field not found" anywhere near the real cause. Confirmed live on `feature_mTPI` TC_56: a 4th unconditional `btn_Add_Dose` click (needed by the recording's own 7-dose project) silently gave every 6-dose iteration a phantom 7th dose slot; the app auto-filled it as `last real dose + 10`, and that phantom dose later blew up an UNRELATED Add-Scenario curve's toxicity validation ("Calculated Probability of Toxicities are greater than 1") on a Quadratic-family scenario, blocking the whole iteration at a step that had nothing to do with doses. A sibling iteration with the SAME bug (4 Parameter Logistic family) passed silently — its curve math just didn't happen to cross the threshold. | **Treat EVERY "Add &lt;Item&gt;" click the importer carried over from the recording as a candidate for count-based gating, not just the ones a reference feature already gates** — if ANY iteration's testdata uses FEWER items than the recording's own demonstrated count, add `SkipIf ${data.<file>.<countedColumn>-N}==N/A` on that click (same pattern as S20, just self-derived instead of mirrored from a sibling). When a live run fails with an app-side validation error on a step that looks unrelated to anything you changed (wrong curve family, wrong boundary values, etc.), don't assume the error is about the field it's complaining over — check whether an EARLIER, seemingly-successful "Add" step in the SAME iteration built one row too many. The `--help`-free tell: count the iteration's real items against every unconditional Add-click StepID before trusting a "builds fine, fails later" run. |
| S26 | **A hand-authored per-period child testdata CSV (`PeriodIndex`-keyed, e.g. `SETIfMTDDetermined.csv`) that's missing the required `<parent>_` filename prefix (should be `design_SETIfMTDDetermined.csv`) is silently NOT folded into the parent's wide model** — `core/loaders/featureLoader.ts`'s `foldChildTables` only treats a file as a child table when the part of its basename before the first underscore matches an already-loaded parent (`design`, `simulation`). A non-prefixed file just sits in `01_testdata/` as an inert, ordinary sibling CSV: its own blank/TC_ID-continuation rows raise no error, and every dotted token referencing it (`${data.design.SETIfMTDDetermined.0.thresholdTarget}`) prints as plain `UNWIRED` with no hint that a rename — not a new column — is the fix. | **When the importer's `UNWIRED` list shows a cluster of dotted `<TableName>.<n>.<field>` tokens and `01_testdata/` already has a same-named `<TableName>.csv` with a `PeriodIndex` column, rename it to `design_<TableName>.csv` (or `simulation_<TableName>.csv`) before concluding new columns are needed** — the data is usually already there, just invisible to the fold mechanism. Confirmed on `feature_mTPI` TC_56: renaming `SETIfMTDDetermined.csv` → `design_SETIfMTDDetermined.csv` resolved 24 of 38 `UNWIRED` lines with zero data changes. Also check such a file for the OTHER pre-fold symptom: TC_ID left blank on every row after the first of each iteration group (looks like an Excel merged-cell export) — the fold's join key is `TC_ID|IterationID` read literally per row with no forward-fill, so those rows would silently orphan even after the rename; repeat the real TC_ID on every row, matching every other working period table in the repo (e.g. `feature_GADAR(PD)`'s `design_boundary.csv`). |

*Custom step template — `loadResponseTabIntoModel` (per-feature `custom/<Feat>/customSteps.ts`): click `[id="leftPanel.designs"]` → click role=button "Response" → wait for a Response control (e.g. `#distributionSelect`) → click `[id="leftPanel.designs"]` → wait for Recalculate. Wire as `callCustom` before the first design-field fill.*

### Table-completeness rule (design + sim) — NON-NEGOTIABLE

**Every non-blank, non-`N/A` testdata cell MUST have a fill step that enters it.** A recording only
captures the cells the *recorded* configuration used — typically **period 0** and only the
**symmetric** fields. Other iterations (asymmetric Upper/Lower boundaries, more interims/periods,
NI vs Superiority) carry values in cells the metadata never fills, and the app then throws a
validation error naming the blank cell and blocks the page.

**How to find and fix it (per iteration):**
1. Run the iteration; when it fails, **screenshot-verify** the failing tab — the app's red error text
   names the missing cell (e.g. "Cum. α Spent should be strictly in increasing order").
2. **Audit the table's testdata** for that iteration: list every non-blank/non-`N/A` cell —
   `awk -F, 'NR==1{for(i=1;i<=NF;i++)h[i]=$i} ($1==TC&&$2==ITER){for(i=4;i<=NF;i++)if($i!=""&&$i!="N/A")print h[i]"="$i}' <table>.csv`.
3. **Cross-check the metadata** for a fill step per cell (`grep '<table>\.<n>\.<field>' *_metadata.csv`).
4. **Add the missing fills + selectors** (mirror the period-0 selector's id pattern for the new
   period). They **auto-skip on blank**, so adding them never affects the iterations that don't use them.

This is why the *importer's* wire-to-existing contract matters at import time **and** why the agent
must still complete per-iteration coverage the single recording could not capture.

### AG Grid cell rule

When a recorded or added field targets an AG Grid cell, inspect the live grid's `row-id` and `col-id`
attributes and bind the cell by those stable identifiers. Treat a modal grid (for example `#modalGrid`)
as a separate coordinate system from its parent grid: never reuse the parent's column index. For each
editable cell, double-click the resolved cell, fill the shared editor, press Enter, wait for the grid to
commit, and read the cell back before continuing. Verify every authored non-`N/A` cell, including rows
with explicit `row-id` values; a clean `validate` or coverage report does not prove an AG Grid cell
actually landed. Proven on `ProductDesign/feature_MAMS_Logrank(Pvalue)` TC_51 ITER_02 (2026-10-08).

## Family-specific rules *(grows per family)*

- **Two-arm proportions (ROP, RONBR, Fishers, OROP):** `min/max πc/πt` prior bounds are `input[name="minPiC"]`
  etc. (id columns `minPiC/maxPiC/minPiT/maxPiT`); hypothesis effect columns are
  `proportionUnderControl_SS/_SP/_NI` + `ratioOfProportions_SS/_SP/_NI` (one suffix valued per
  Hypothesis/Test-Type, rest `N/A`). Reference: `feature_ROP(PD)`. **Odds Ratio of Proportions (OROP)**
  is the same family with `oddsRatioOfProportions_SP/_SS/_NI` as the effect metric instead of
  `ratioOfProportions`; same suffix convention, same `custom/<Feat>/customSteps.ts`
  `loadResponseTabIntoModel` sim fix (copy verbatim — `#distributionSelect`/`#propUnderControl` ids match
  across the whole family). Reference: `feature_OROP(PD)` TC_23, all 10 iterations green 2026-08-25.
- **Difference of Proportions (DOP):** direct sibling of ROP — mirror it. Effect columns
  `proportionUnderControl_{SP,SS,NI}` (real input) + `differenceInProportions_{SP,SS,NI}` (real input) +
  `proportionUnderTreatment_{SP_AH, SS_NH, SS_AH, NI_NH, NI_AH}`. **πt (Proportion under Treatment) is
  ALWAYS `Computed`** (app derives it from πc + δ) — the recording captures it as a **label-only click**
  (`getByText('Proportion under Treatment (πt0/πt1)')`, NO id), the labels **collide** across the SS/NI
  blocks, and the testdata cells are `Computed` → **DROP all πt assert steps** (rule 4; result table
  covers them). The sim's `propUnderTreatment` is likewise `Computed` → drop. Sim runtime = ROP's S2/S3/S5/S8
  verbatim (`loadResponseTabIntoModel`, `#includeSwitch`, distinct node-vs-result name, Optional Recalculate).
  **DESIGN enrollment is SINGLE-PERIOD → wire it as a SCALAR fill, NOT loopPeriods** (mirror ROP:
  `fill txt_enrollment_Table_0_avg_Subjects_Enrolled ${data.design.enrollmentTable.0.avgSubjectsEnrolled}`).
  The importer's loopPeriods DEFAULT loops the design enrollment too, but the enrollment template flow is
  SHARED with the sim, and the sim import adds a `startingAtTime` row (sim enrollment is multi-period). The
  design table has no `startingAtTime`, so `${runtime.period.startingAtTime}` throws "runtime variable never
  captured" — an ABSENT per-period field does NOT auto-skip the way an N/A cell does. Replace the design
  enrollment loop with the scalar fill; the sim keeps its loop. Reference: `feature_DOP(PD)` TC_22, ITER_01 GREEN
  (design + sim baselines created) 2026-08-22; re-confirmed identically on `feature_OROP(PD)` TC_23 2026-08-25.
  **`[promoted]` — this rule now holds across 3 features (ROP, DOP, OROP), so it has been copied into the durable
  playbook: `AI_IMPORT_AGENT.md` §3 "Indexed table cells and multi-period values" and the Workflow §2 ordering note.**
  The importer follow-up (don't emit a loopPeriods block for a single-period design enrollment, OR make
  `${runtime.period.<field>}` resolve to `''` when the field is absent, resolver.ts:66) is still deferred/unbuilt.
- **(add survival / means / one-arm family rules as you import them)**

---

## Feature log *(append-only; newest first)*

- **2026-10-20 · `ProductDesign/feature_mTPI` TC_56 — fresh import from a real recording over stale `feature_i3+3`-copied metadata; all 38 `UNWIRED` fields + 6 skipped radios resolved with ZERO new testdata columns; one new systemic bug class found + fixed live (S25); the `<parent>_` child-table naming trap formalized (S26).**
  The feature folder existed with `TC_16`/`i3+3`-labeled testdata and a `metadata.csv` that was a
  byte-for-byte copy of `feature_i3+3`'s own flow (dose-escalation project setup matches, but every
  mTPI-specific Design-page field — `maxSampleSize`, `switchToMtpi`, `SETIfMTDNotDetermined.*`,
  `SETIfMTDDetermined.*` — was absent). A fresh `recording.txt` already existed; running the importer
  regenerated `metadata.csv`/`selectors.csv` against it from scratch.
  **Repeated-modal Add-Scenario block** (curveFamily/E0/Emax/.../modalDose1-7 + 14 more fields) was
  flagged unusable by the importer, same as every other `feature_i3+3`-family dose-escalation feature —
  replaced with `loopOverData` + a NEW local `03_metadata/scenario_block.csv` (own copy, not a
  cross-feature reference to `feature_i3+3`'s, matching `feature_BOIN`'s established local-copy
  convention) mirroring `feature_i3+3`'s own proven block almost field-for-field.
  **S26 (new): 24 of 38 `UNWIRED` lines were `SETIfMTDDetermined.0-3.*` dotted tokens with data that
  already existed** in a hand-authored `01_testdata/SETIfMTDDetermined.csv` — missing only the
  `design_` filename prefix the fold mechanism requires. Renaming it resolved all 24 with no data
  changes. The same file also had blank `TC_ID` on every continuation row (Excel-merged-cell style) —
  fixed by repeating the real TC_ID per row, confirmed necessary since the fold's join key has no
  forward-fill. See S26 above.
  **5 UNWIRED checkboxes resolved by REUSE, not new columns**: `MTD Above Highest Dose` /
  `Minimum Sample Size Observed` / `Target Rule` / `CI Rule` / `Allocation Rule` each sit immediately
  before one specific period's fields in the recording — matched 1:1 against the ALREADY-EXISTING
  `SETIfMTDNotDetermined.1.stoppingRuleIfNotMTD` / `SETIfMTDDetermined.<0-3>.stoppingRuleIfMTD`
  per-period enable columns (confirmed by position in the recording, then confirmed live). Saved 5
  columns a less careful import would have created as pure duplicates of data already on disk.
  **6 unlabeled radios** (`Next Recommended Dose (NRD)`/`Current MTD`, 2× `Compute Average
  Allocations…`, 2× `Compute Isotonic Estimates…`) were SKIPPED by the importer (selector captured,
  no step emitted — codegen recorded them without a bindable accessible label). Hand-added `click`
  steps gated on pre-existing `SRAppliedOn-1`/`SRAppliedOn-2`/`avgAllocation-1`/`isotonicEstimates-1`
  columns, confirmed live on all 5 iterations (every mutually-exclusive combination exercised: both
  SRAppliedOn values, both avgAllocation values, both isotonicEstimates values).
  **§4a manual audit caught what the static coverage tool could not**: the tool flagged
  `scenarios.csv`'s loop-driven fields and the `SETIfMTDNotDetermined.*` inline dotted fields as
  "no step references this field" — cross-checked against the ALREADY-STABLE `feature_i3+3` (same
  tool, same false positives there too) to confirm it's a known blind spot (the tool doesn't trace
  `${runtime.loop.*}` tokens through a `loopOverData`-referenced child metadata file), not a real gap.
  The audit DID catch one real gap the tool missed: ITER_05 is a "General" curve-family scenario with
  10 real doses, needing `modalDose1` through `modalDose10`, but the scenario block (mirrored from
  `feature_i3+3`, whose own project never exceeds 6-7 doses) only filled through `modalDose7`. Added
  `modalDose8-10` with pattern-inferred selectors (`#modalDose8/9/10`, following the confirmed
  `#modalDose1-7` id convention) — confirmed correct on the live ITER_05 run.
  **S25 (new, found only during the live stabilization run, not by any static check)**: see S25 above.
  A 4th unconditional `btn_Add_Dose` click (needed by the 7-dose recording) silently gave every
  6-dose iteration (ITER_02, ITER_03) a phantom 7th dose slot that the app auto-defaulted to
  `last dose + 10`. ITER_03 (Quadratic curve family) failed outright with a blocked "Add Scenario"
  modal and a `defaultModal` intercepting every subsequent click, traced via screenshot to "Calculated
  Probability of Toxicities are greater than 1" — recomputing the Quadratic curve by hand against the
  testdata's real 6 doses showed max toxicity ~0.83, well under 1; only the phantom 7th dose (51)
  pushed it over. ITER_02 (Four Parameter Logistic) had the IDENTICAL phantom-dose bug but its curve
  math didn't cross the threshold, so it passed silently on the first pass — its baseline was deleted
  and regenerated after the fix per the standard stale-baseline protocol, confirmed clean the second
  time (404 captured cells vs 443 before, consistent with the phantom dose's data no longer present).
  **End state:** all 5 iterations (`BASELINE_CREATED`, `PASS 0/FAIL 0/ERROR 0`), `npm run validate`
  clean (0 warnings), stabilized one iteration at a time per §5a with the single-iteration `Run`
  toggle restored to all-`TRUE` afterward.

- **2026-10-08 · `ProductDesign/feature_MAMS_DOP` TC_50 — fresh import, all 6 iterations PASS; §4a's data-to-wiring audit caught two importer mis-wirings before any live run; three new systemic bug classes found + fixed (S22, S23, S24).**
  Non-Pvalue sibling of `feature_MAMS_DOP(Pvalue)` TC_49 (same session, see the entry below). Config
  had the same `"feature": "ROM(PD)"` copy-paste leftover as TC_49 — this whole MAMS_* scaffold family
  was seeded from a ROM(PD) template. Testdata (already authored) was audited first per the user's
  explicit instruction: every file's `TC_ID` column fixed, every genuinely blank table cell filled with
  `N/A`, one fully-orphaned blank row removed — all BEFORE running the importer.
  **S20/S21 (from TC_49) both confirmed recurring here** — the identical unconditional `btn_Add_Arm`
  click and the identical pinned-Total-row AG-grid false positive, both on a DIFFERENT feature in the
  same family, reinforcing these are systemic MAMS-family patterns, not one-offs.
  **S22 (new): `ddl_Parameter` (`#effParam`, select) and `txt_Parameter` (`#effParamRho`, fill) — two
  DIFFERENT ids, two DIFFERENT action types, same generic recorded label — both got bound to
  `effParamRho` by the importer.** Caught by directly cross-referencing `selectors.csv`'s id attributes
  against the bound column, not by any automated check; confirmed the fix live (`Pocock` correctly
  selected on ITER_02 once repointed to `effParam`). See S22 above.
  **S23 (new): a sim flow's "Result Name" field is recorded TWICE for different purposes** (naming the
  sim's own input set at the START vs naming the result right before Simulate) **but the importer's
  duplicate-step collapse kept only the early occurrence**, binding it to the wrong testdata column
  (`Sim Result Name` instead of `CreateInputSet`) and leaving the LATE naming moment completely
  unwired. Found from the user's own domain clarification, not import-tool output — fixed by splitting
  into two steps at the two real moments, confirmed via the "Name your result before simulating"
  dialog screenshot. See S23 above.
  **S24 (new): the SAME `futBoundaryFam` column drove three distinct orphaned-data failure modes
  across different iterations** — a family rendering as "δ" (Delta, from a bare numeric testdata value
  `"4"`) needing `futilityDelta` instead of `cumAlphaSpent`; a "p-value" family requiring `cumAlphaSpent`
  that testdata had left `N/A`, blocking Save with no step-level FAIL (the NEXT step failed instead);
  and orphaned per-period sim data for an iteration whose family was `N/A`. All three were root-caused
  by screenshotting the live boundary table per family, not guessed from testdata alone. See S24 above.
  **End state:** all 6 iterations (`ITER_01`-`ITER_06`) confirmed real `PASS` on both design and sim
  phases across a full serial suite run (`PASS 6, FAIL 0`), after an earlier full-suite attempt crashed
  from a genuine environment/browser failure (confirmed non-reproducible on immediate re-run — not a
  regression). Several live FAILs during iteration-by-iteration stabilization were deliberately NOT
  treated as wiring bugs once their signature matched known transient-environment patterns (a full
  browser closure, a blank-page login) rather than reproducing on retry — see the "two full-suite
  diagnostic traps" non-negotiable; don't over-fit a fix to a failure that doesn't reproduce.

- **2026-10-07 · `ProductDesign/feature_MAMS_DOP(Pvalue)` TC_49 — reviewed and stabilized a feature another agent (Copilot) had already "validated"; all 7 iterations PASS; two new systemic bug classes found + fixed (S20, S21); prompted the new §4a mandatory pre-run data-to-wiring audit.**
  User's instruction was explicit and now standing policy: a clean `npm run validate`/Copilot
  "validation" is not proof a feature is actually wired correctly — before any live run, manually
  trace every non-blank/non-`N/A` testdata cell (including every child/table CSV) to a step that
  actually runs for its row and reads the value back. See `AI_IMPORT_AGENT.md` §4a (new this
  session) and the mirrored non-negotiable in the `import-feature` skill.
  **S20 (new): found via the §4a audit's live-screenshot discipline, not any automated check.**
  `btn_Add_Arm`'s second click (StepID 210, builds the optional 5th arm) ran UNCONDITIONALLY for
  every iteration — no `SkipIf`, no `UNWIRED`, `validate` clean. For the 4 of 7 iterations whose
  `armName-4=N/A` (meant to be 4-arm designs), this silently built a 5th arm with a blank name,
  changing the actual statistical design: the live Results page read "Number of Arms = 5" instead
  of the intended 4. Caught only by screenshot-verifying the Results page's own summary against
  testdata's arm-name columns — not by any log line or FAIL. Fix: mirrored the already-proven gate
  from the sibling `feature_MAMS_DOM` (`SkipIf=${data.project.armName-4}==N/A`) onto the identical
  click here. See S20 in the table above.
  **Also found and fixed (not promoted to a numbered rule, since it's a direct reuse of an
  existing convention rather than a new pattern): a missing post-Create-Project spinner wait.**
  Reproduced twice in a row: clicking `btn_Inputs`/`btn_New_Input_Set` immediately after
  `btn_Create_Project` force-clicked through a `#spinner` loading overlay before the page settled,
  failing downstream at `txt_Name_Input_Set not found`. The shared `flows/login.csv` already has
  the exact right pattern (`waitForSelector div_Spinner` with `WaitCondition=hidden`) for the
  landing-page spinner after login; this feature (and presumably its siblings, since the reference
  `feature_MAMS_DOM` has the identical gap) never applied the SAME convention to the
  Create-Project→Inputs transition. Added `div_Spinner` on `ProjectPage` to `selectors.csv` and a
  `waitForSelector … hidden` step between `btn_Create_Project` and `btn_Inputs`. Worth checking any
  OTHER major page-transition click sequence for the same missing wait, not just this feature.
  **S21 (new): a benign AG-Grid false-positive, found while investigating whether S19 had struck
  again.** Several result tables warned "reports N data rows but only N-1 rendered" on EVERY
  iteration, 100% reproducibly — the opposite signature of S19's non-determinism. Verified the
  captured data was actually complete (sequential analysis rows + a pinned "Total" row) before
  concluding this is a distinct, harmless `aria-rowcount` miscount on grids with a pinned footer
  row, not a real missing-data bug — no baseline was deleted over it. See S21 in the table above.
  **Also hit, and correctly did NOT chase as wiring bugs:** two live failures (a full browser
  closure mid-run, and a completely blank login page after a retry) that both resolved on a plain
  re-run with zero code changes — confirmed as transient app/network unavailability, not
  regressions, by their total lack of reproducibility and their unrelated, inconsistent failure
  points.

- **2026-10-06 · `ProductDesign/feature_GADAR(PE)` TC_55 — reviewed and fixed a feature another agent (Copilot) had stabilized; one new systemic bug class found + fixed (S18); a real credential leak caught and scrubbed across 3 features.**
  Repurposed the `feature_GADAR(PE)` folder (previously stale `TC_12` content) for a fresh `TC_55`
  import. The user asked for a REVIEW of Copilot's prior stabilization pass, not a from-scratch
  import — different task shape: check wiring, look for repeated steps, and chase a specific suspicion
  ("simulation runs field resets to 10000, but changing Fixed Seed live doesn't cause that").
  **Found a genuine duplicate block.** StepIDs 800-805 (6 `complementTable` period 1-3 fields) were an
  exact re-fill of a SUBSET of StepIDs 792-799 — same ObjectName, same token, no gating difference.
  Harmless (idempotent re-fill) but real bloat, most likely from merging two overlapping recorded
  passes without de-duplicating the overlap. Removed; `validate` + `check-testdata-coverage.ts` stayed
  clean. **General review tip:** group a feature's metadata by `Action+ObjectName`, excluding the
  legitimately-repeating `loopPeriods`/`reconcilePeriodTable`/`callCustom` actions — any remaining
  duplicate pair is either this class of bug or (check context first) a legitimate warm-up-then-real-use
  tab click like the one found alongside it (`btn_Enrollment` at two StepIDs, correctly NOT a duplicate —
  the first was a mount-and-return-to-Design warm-up, the second the real visit right before its fields
  get filled).
  **S18 (new): confirmed the user's suspicion was a real bug, not a false alarm.** The Simulation Setup
  panel has no equivalent of the Enrollment tab's own post-mount `waitForSelector` before its first field
  interaction. Live screenshots showed the exact mechanism: right after `select
  ddl_Random_Number_Seed="Fixed"`, the panel correctly showed Fixed/100 — but by the time the NEXT step
  ran, Random Number Seed had reverted to the fetched default `Clock` (so `Fixed Seed`'s input no longer
  rendered, and `fill txt_Fixed_Seed` hard-failed "not found"), and `Number of Simulations Run` sat at its
  own untouched default `10000`. First fix attempt — a `waitForSelector(visible)` on the dropdown, mirroring
  the Enrollment tab's pattern — looked right on one run but failed identically on a re-run: the element is
  visible the instant the panel mounts, well before its async data fetch actually completes and overwrites.
  Real fix: a settle sleep AFTER the wait, before touching any field. Held clean across two consecutive
  full 4-iteration runs. **The bug had already contaminated one baseline**: `ITER_04`'s baseline (the only
  one of 4) had captured `10000` simulations instead of testdata's `100`, cascading into 64 value
  mismatches once the fix made the live run correctly use `100` — confirmed via the diff file itself
  (`expected=10000, actual=100` on several `Count` cells) that this was the STALE baseline, not a
  regression; deleted and regenerated, matching rule 19b's stale-baseline protocol. ITER_01-03's baselines
  were already correct, confirming the race was intermittent, not deterministic.
  **Pre-commit hook caught a real, un-scrubbed credential in `feature_GADAR(PE)`'s own `recording.txt`**
  (literal username+password in plaintext) — scrubbed to `<<USERNAME>>`/`<<PASSWORD>>` per the established
  policy. **The hook also blocked on two UNRELATED, uncommitted features' recordings** (`feature_MAMS_DOP`,
  `feature_MAMS_DOP(Pvalue)`) with the identical leaked credential — `scripts/check-recordings.ts` scans
  the WHOLE working tree on every commit, not just the staged diff, so an unrelated un-scrubbed recording
  anywhere in the repo blocks ANY commit until fixed. Scrubbed those two as well (real security fix, safe
  regardless of feature ownership since they were untracked/not yet committed) but did NOT stage or commit
  them — left them in the working tree for whoever owns that work. **Also caught and fixed a factual error
  in `FRAMEWORK_KT.md`** (claimed recordings are gitignored; `.gitignore` itself says the opposite — they
  ARE committed, with `check-recordings.ts` as the enforcement mechanism, not gitignore).
  **Committed scoped**, same surgical `master.csv` technique as TC_45/TC_46 (reconstructed blob with only
  the `TC_55` row, since the working copy had ~15 unrelated pending rows interleaved). Landed as `98ad238`
  — 75 files (old `TC_12` content fully replaced).

- **2026-10-01 · `ProductDesign/feature_StratGADSD` TC_46 — 10 of 11 iterations stabilized (BASELINE_CREATED), one held back on a genuine open issue; two new systemic bug classes found + fixed (S16, S17); the multi-countField chaining pattern trimmed back down once proven over-broad.**
  Stratified GADSD (survival, up to 3 stratification factors, same family as `StratGADAR` TC_45 but with
  real DOM differences: a `singlePieceStratTable` sim section instead of GADAR's `strata` table, a
  GADSD-only `cumBetaProportion` boundary field, and an enrollment table whose always-present auto-final
  row needed its compensating-click gate widened). Imported via the deterministic importer against a
  fresh recording, then stabilized iteration-by-iteration exactly like TC_45's arc.
  **S16 (new): boundary Calculate is a progressive-reveal multi-stage form, not idempotent for manually-
  entered values.** ITER_04's `futilityPValue` fill kept passing (read-back confirmed) but reverted to an
  invalid default (`"1"`) by the next screenshot, blocking navigation with a range-validation error. Three
  live attempts before the fix landed: pre-Calculate fill (wiped by the Calculate that follows it),
  post-Calculate fill with no further Calculate (value stuck, but the page stayed "Not Saved" and the
  Unsaved-Changes modal still blocked navigation), then the real fix — **staging fills across THREE
  Calculate clicks**, matching exactly what `StratGADAR`'s own already-proven metadata does (its StepIDs
  ~3070/3160/3240) but had never been written up as an explicit rule until now. See S16 in the table above
  for the full field-to-stage mapping. **ITER_04 itself is still unresolved** (`Run=FALSE`, held back):
  with `efficacyCheck` left at its default CHECKED state, `futilityPValue` keeps resetting after every
  Calculate even with full 3-stage staging — StratGADAR's own working p-value-family iteration has
  `efficacyCheck=uncheck` instead. Flagged to the user rather than guessed at further; a future session
  should pick this up with that comparison in hand.
  **S17 (new): an unquoted comma in a flow file's `Description` column corrupts `DynamicArgs` specifically
  — `npm run validate` does NOT catch it.** A newly-created GADSD-specific flow file
  (`flows/stratgadsd_boundary_cumSpent_period.csv`, needed because GADSD's `cumBetaProportion` field has
  no StratGADAR equivalent) had a comma in its Description, which silently shifted the real
  `${runtime.period.n}` DynamicArgs token out of the row. Every `{0}`-parametric selector that row touched
  resolved to a literal unsubstituted `{0}` in the DOM query, producing a generic "field not found" after a
  full 10s timeout that looked exactly like a wrong-selector bug — cost three live-run cycles and two
  rounds of asking the user to inspect the live DOM before the actual CSV field-count mismatch was found by
  parsing the row directly. See S17 in the table above.
  **Discovered the GADSD-specific `cumBetaProportion` field.** `futSpendFunc=Interpolated` renders a
  differently-named futility-spend column than StratGADAR's `cumBetaSpent` — confirmed live by the user
  (`[name="boundary.0.cumBetaProportion"]`, no `input` tag restriction unlike its `cumAlphaSpent`/
  `cumBetaSpent` siblings). Wired via a new GADSD-specific flow file (`flows/stratgadsd_boundary_cumSpent_period.csv`)
  rather than editing StratGADAR's shared one.
  **Fixed the enrollment table's "always-present disabled final row" gate for the 1-period case.** The
  existing compensating `Add Period` click (from the TC_45 session) was gated on whether PERIOD 1 was real,
  so it correctly fired for 2-period iterations but under-fired for ITER_05's single-period case — the
  lone live row was the auto-computed final row, not period 0. Regated on period 0 instead of period 1 (any
  iteration using this input mode needs the compensating click, not just 2+-period ones).
  **Trimmed the S14 multi-countField chaining back down once it was proven over-broad for this feature's
  actual testdata.** All 9 reconcile passes + most of the "keyed on itself" fallback fill passes were kept
  from the original import, but cross-checking every GADSD iteration's testdata showed only `efficacyPValue`
  (ITER_07's period 1, where `analysisSpacingInfo` is N/A but `efficacyPValue` is real) ever needed its own
  fallback — every other field (`futilityPValue`/`futilityCP`/`futilityHR`/`cumAlphaSpent`/
  `cumBetaProportion`/`upperPValue`/`lowerPValue`) always has `analysisSpacingInfo` populated too, so their
  "keyed on itself" passes were pure dead weight, visibly double-filling the boundary table on every run
  (the user watched this live and flagged it). Removed the 7 provably-unnecessary reconcile passes and 5
  fill passes; kept `efficacyPValue`'s own-keyed pass since it's the one field actually needed. **This
  does not contradict S14's "ADD passes, never remove" guidance** — S14 is about not regressing an already-
  working iteration; this trim only removed passes with zero current testdata exercising them, verified by
  re-running the FULL 10-iteration suite afterward (9 PASS unaffected by the trim, the 1 FAIL was an
  unrelated pre-existing stale baseline on ITER_01 — see below). If a future iteration needs one of the
  removed fallbacks, re-add it; don't assume "trimmed once" means "never needed."
  **Full-suite confirmation run (10 iterations, ITER_04 excluded) found one pre-existing, unrelated issue:**
  ITER_01's sim `compareWithBaseline` failed `ROW_COUNT_MISMATCH` (88 extra rows, 0 value mismatches) — not
  a regression from anything touched this session (ITER_01 is a Fixed design with no boundary table at
  all). Traced to `extractAllResultTables`'s AG-grid virtualized-scroll capture under-rendering the
  "Response Generation Parameters" table's 30-stratum rows at baseline-creation time (88 = 11 missing
  strata × 8 columns exactly); the SAME under-capture warning pattern recurred on a DIFFERENT table
  ("Overall Stratum Information", 19 of 30 rows) during the baseline regen itself — confirming this is
  **non-deterministic scroll-capture flakiness in the extraction tool for the largest (30-stratum) tables,
  not a one-off.** User confirmed; stale baseline deleted and regenerated. **The same WARN pattern (`"X"
  reports N data row(s) but only M could be rendered even after scrolling`) also appeared repeatedly on
  `GADAR(PE)` TC_55 (2026-10-06)**, on different tables than here — in that session baselines were freshly
  created each run so no comparison FAIL resulted, but the recurrence across two unrelated features
  confirms this is a genuine, recurring framework-level pattern rather than a one-off — now formalized as
  rule S19 (see the table above) rather than left as only a narrative mention.
  **Committed scoped, same technique as the TC_45 session:** `master.csv` had several UNRELATED pending
  rows (TC_40-44/47-51, features not yet built) interleaved with the wanted TC_46 row — staged a
  reconstructed version (`git show HEAD:master.csv` + a single-line insert, written as a blob via
  `git hash-object -w` + `git update-index --cacheinfo`) containing ONLY the TC_46 addition, leaving the
  rest in the working tree unstaged for whoever added them. Landed as `026103f` — 110 files, 18297
  insertions.

- **2026-09-30 · `ProductDesign/feature_StratGADAR` TC_45 — all 11 iterations stabilized (BASELINE_CREATED), a new static coverage-gate script added, and two new systemic bug classes found + fixed (S14, S15).**
  Stratified GADAR (survival, up to 2-3 stratification factors, cross-product Strata/Weights/Marginal-
  Allocation tables on top of a standard GADAR design+sim). ITER_01-09 built earlier in the session (see
  prior context); this entry covers ITER_06-11 stabilization and the durable lessons that came out of it.
  **New tool: `scripts/check-testdata-coverage.ts`** (`npx tsx scripts/check-testdata-coverage.ts <TC_ID>
  [IterationID]`) — a per-iteration static gate, built in direct response to the user's complaint that
  manual review kept missing wired-but-incomplete fields. It scans metadata + every referenced `flows/*.csv`
  for `${data.*}`/`${runtime.period.*}` tokens (plus `reconcilePeriodTable`/`loopPeriods`/`loopChildRows`/
  `fillCompactIndexedCells` config strings) and cross-checks every non-N/A testdata cell has SOME reachable
  reference. It caught real gaps (`SelectTask`, `criticalPoint`, `margin_NI`/`margin_SS`, duplicate/unwired
  `shapeParamDelta`, ITER_11's `upperPValue`/`lowerPValue`) but — by its own documented limitation — is a
  STATIC reference check: it cannot see that a `loopPeriods` call's `countField` silently excludes a period
  whose OTHER fields are populated. That deeper class of bug (S14) only surfaced via live runs + manual
  `awk`/`column -t` dumps of the full child-table CSV across all iterations at once.
  **S14 (new): `loopPeriods`/`reconcilePeriodTable` single-`countField` under-detection.** `design_boundary.csv`'s
  value columns (`efficacyPValue`/`futilityPValue`/`futilityCP`/`futilityHR`/`cumAlphaSpent`/`cumBetaSpent`/
  `upperPValue`/`lowerPValue`) were all gated for period-existence purposes on ONE shared field,
  `analysisSpacingInfo`. ITER_10 defines its whole 5-period boundary via `efficacyPValue`+`cumAlphaSpent`
  alone (`analysisSpacingInfo` N/A throughout) — both the row-ADD (`reconcilePeriodTable`) and value-FILL
  (`loopPeriods`) logic silently no-op'd for every period, and the app then blocked navigation with an
  "Analysis Spacing (%) Info is required" modal (screenshot-verified) that turned out to be a SEPARATE, real
  testdata gap on top (the app requires that field regardless of leading field — user supplied real values).
  ITER_07 was a sneakier PARTIAL case: period 0 used `analysisSpacingInfo` normally but period 1 didn't, so
  the iteration looked green (it WAS green — `PASS`/`BASELINE_CREATED`) while silently only ever filling
  period 0; the baseline had to be identified as stale, deleted, and regenerated once the gap was found.
  Fixed by chaining extra `reconcilePeriodTable`/`loopPeriods` passes per candidate field (idempotent —
  see S14 above) rather than swapping the countField, so no iteration's already-working detection regresses;
  confirmed via a clean ITER_02 spot-check re-run (938 cells/854 within tolerance, zero mismatch) after the
  chain was added feature-wide.
  **S15 (new): generic "Unsaved Changes" modal blocking a tab-switch with no prior edit.** Blocked the sim
  flow's Response-tab mount for ITER_06 only (of 8 sim iterations) — diagnosed via a temporary `dumpSubtree`
  callCustom that printed the modal's exact title/body/button ids, fixed with an `Optional=TRUE` "Leave"
  click that no-ops everywhere else.
  **Also fixed this arc:** `margin_SS` selector was an unverified camelCase guess (`#marginSS`) that FAILED
  live for ITER_08 — the real id, `#margin_SS` (underscore, matching the testdata column literally), was
  found by grepping the closest sibling `feature_GADAR(PD)`'s already-wired `txt_Margin_SS`; ITER_11's
  `upperPValue`/`lowerPValue` were completely unwired (no selector, no metadata step at all) until this
  session — wired parametrically from the start (mirroring the already-proven `boundary.{0}.<field>`
  convention) rather than copying sibling features' period-0-only hardcoded form, since three siblings
  (`feature_DOP(PD)`, `feature_OROP(PD)`, `feature_SingleMean`) all independently confirmed the DOM id
  convention `[id="boundary.<n>.upperPValue"]`/`.lowerPValue`.

- **2026-09-27 · `ProductDesign/feature_Dual_DOPLogrank` TC_39 — Copilot handoff resumed and stabilized end-to-end; all 8 iterations PASS.**
  A third dual-endpoint sibling (EP1=Difference of Proportions, EP2=Logrank — the mirror of TC_38's
  EP1/EP2 assignment), continued from ITER_01–04 a teammate had stabilized in Copilot. Copilot's
  metadata for this feature was noticeably more elaborate than TC_38's handoff (multiple
  `reconcilePeriodTable` calls already combining `syncInterims`- and `winning-condition-select`-based
  gates, evidently drawing on the by-then-updated `AI_IMPORT_AGENT.md` §9.2), but two gate-direction
  bugs remained, both invisible to `npm run validate` and to ITER_01–04/05/06 (which didn't happen to
  exercise them) until a broader iteration set did:
  1. **The EP1-primary DEFAULT reconcile call was gated on the wrong string.** It used
     `SkipIf ${syncInterims}!=Based on EP1` (only fires when `syncInterims` is the EXACT string
     `"Based on EP1"`), but a "not explicitly set" cell in this testdata could be either an empty
     string OR the literal string `"N/A"` — neither satisfies that exact match. ITER_01
     (`syncInterims="N/A"`) silently never grew its boundary table past the default 1 row (target 3);
     ITER_06 (`syncInterims=""`, blank) happened to only need 1 row, masking the same gap until ITER_01
     exposed it. Fixed by adding a second, idempotent reconcile call gated the proven-safe way
     (`SkipIf …==Based on EP2` — skip only when EXPLICITLY the other mode), matching the TC_37/TC_38
     pattern exactly.
  2. **Per-period checkbox steps gated on Winning Condition alone, not the field's own value.** Several
     `check`/`uncheck` pairs were gated only on `${winning-condition-select}!=At least EP2`, with no
     fallback to the period's own data. ITER_08 (a fixed/no-interim design with NO boundary row at
     all, same shape as TC_38's ITER_08) has `winning-condition-select=At least EP2`, so the gate let
     the step through — straight into a `locator.check: Timeout` on a checkbox that doesn't exist for
     an iteration with zero boundary periods. Fixed by switching to the field's own value gate
     (`SkipIf ${data...}!=check`/`!=uncheck`), matching every other checkbox step already in the file.
  Also reused the already-known TC_38-ITER_07-style fix directly (a reconcile call using
  `ep2AnalysisSpacingInfo` for the explicit-`Based on EP2` case, since that mode's boundary checkboxes
  are all `N/A` here too) — no rediscovery needed, applied from the ledger on the first pass.
  Two full-suite runs were interrupted by the user closing the browser mid-run (HEADLESS=false, watched
  runs) — both times produced a cascade of `page.goto: Target page, context or browser has been closed`
  across every iteration after the closure point; correctly recognized as operator interruption, not a
  regression, confirmed by simply re-running.
  **[PROMOTED] `IMPORT_LESSONS.md` rule 18 extended (2 new refinements)**: the blank-vs-literal-`"N/A"`
  gate-string trap, and the checkbox-steps-need-their-own-value-gate rule — both written generally
  enough to apply to any dual-endpoint feature's boundary metadata, not just this one.

- **2026-09-23 · `ProductDesign/feature_Dual_LogrankDOP` TC_38 — Copilot handoff resumed and stabilized end-to-end; all 8 iterations PASS.**
  A sibling of `feature_Dual_LogrankLogrank` TC_37 (same dual-endpoint shared-row-index boundary
  table, EP1=Logrank/EP2=Difference of Proportions instead of EP1/EP2 both Logrank), continued from
  a partial import a teammate had started in GitHub Copilot but couldn't finish there (ITER_01/02
  were reported "already stabilized" with existing baselines; the rest were untouched).
  **Auditing the handed-off metadata against `npm run validate` and the TC_37 §9.2 pattern surfaced
  gaps the prior session had missed** (none of these tripped `validate` as hard errors, only WARNs):
  a whole missing checkbox variant (`keepAnalysisInfoForEP2SameAsEP1` had no step at all — only its
  EP2-primary counterpart was wired), an un-tokened `click btn_Select_Task` (fires but selects
  nothing without `${data.inputset.SelectTask}`), a blank enrollment cell that should have been
  `N/A`, and `ep1InputMethodTable` wired only through period 2 via a single hand-counted `Add Piece`
  click (same bug class as TC_37 — one iteration needed period 4, another period 6) — replaced with
  the proven mode-gated `reconcilePeriodTable` pair, extended through period 6.
  **New bug class not seen on TC_37 — same shared boundary-reconcile metadata needed OPPOSITE
  countFields for different iterations:** `ep1EfficacyCheck` (the field that worked for
  5 of 6 EP1-primary iterations, since it stays real even when EP1 is the `Determined` side) was
  `N/A` on every row for exactly one iteration, because that iteration's Winning Condition ("At
  least EP1") renders no EP1 efficacy/futility checkboxes at all. The straightforward "swap the
  countField" fix (proven on TC_37 ITER_07) broke a DIFFERENT, previously-working iteration whose
  `AnalysisSpacingInfo` is genuinely `N/A` instead. Resolved by running BOTH candidate-countField
  `reconcilePeriodTable` calls back-to-back on the same gate rather than choosing one —
  `reconcilePeriodTable` no-ops once its own target is met, so this needed no per-iteration branching.
  Same fix applied a second time to the EP2-primary "Both" call for a different iteration whose
  boundary checkboxes were ALL `N/A` (only `AnalysisSpacingInfo` carried real values), mirroring
  TC_37 ITER_07's exact bug.
  Two straightforward data-entry corrections (same class as a TC_37 finding): a value in
  `ep1HazardRateControl` instead of `ep1CumPercSurvivalControl` for a Cumulative % Survival
  iteration, twice (once flagged mid-run, once pre-emptively recognized from the TC_37 precedent and
  confirmed in one round-trip).
  **Two full-suite runs surfaced process lessons, not feature bugs** — a cascading failure (a crashed
  iteration broke the very next iteration's fresh start in the same serial run; fixed the real bug
  and re-ran the pair to confirm) and two stale pre-existing baselines (captured before this
  session's fixes, missing real testdata values; screenshot-verified the corrected design was right,
  then deleted and regenerated both baselines with the user's confirmation).
  **[PROMOTED] Standing rule 19 (new) + rule 18 extended + `AI_IMPORT_AGENT.md` §9.2**: the
  idempotent-dual-countField-call technique, and the two full-suite diagnostic patterns
  (cascading failures, stale-baseline mismatches).

- **2026-09-22 · `ProductDesign/feature_Dual_LogrankLogrank` TC_37 — imported, wired, and stabilized end-to-end; all 8 iterations PASS.**
  A structurally novel "Dual Endpoint" Logrank-Logrank design: two endpoints (EP1, EP2), each with its
  own boundary/interim setup, sharing ONE physical boundary table via a shared row-index namespace
  (`boundary.<n>.ep1*`/`ep2*`) — see **[PROMOTED] standing rule 18 + `AI_IMPORT_AGENT.md` §9.2** for
  the full reusable pattern. Also two InputMethodTable sections (`ep1InputMethodTable`/
  `ep2InputMethodTable`), each rendering a different field set per the shared `inputMethod` column
  (Hazard Rate / Median Survival Times / Cumulative % Survival) — handled with two mode-gated
  `reconcilePeriodTable` calls per endpoint (`SkipIf ${data.design.inputMethod}!=<mode>`), same
  mechanism as the boundary table.
  **Chain of real bugs found and fixed, in order:**
  (1) Hand-counted "click Add-X N times" gating (an `interimSource`=`Both`/`EP2Only` testdata column,
  devised early because `SkipIf` can't express compound conditions) assumed a fixed default row count
  that turned out wrong on more than one iteration — replaced entirely with `reconcilePeriodTable`
  (already proven on `enrollmentTable`), which reconciles live-vs-target and needs no default-count
  assumption. The `interimSource` column became obsolete and was removed once the boundary table also
  moved to this mechanism.
  (2) The boundary table's `Final` row shares the same disabled-checkbox id pattern as real interim
  rows, inflating `reconcilePeriodTable`'s live count by 1 and causing under-click (one iteration never
  grew past its first row) — fixed with the already-documented `excludeDisabled=true` flag
  (`customSteps.ts` literally names "the East-Horizon GSD boundary table" in its own doc comment for
  this exact case).
  (3) Two DIFFERENT "keep Analysis Info same as other endpoint" checkboxes exist
  (`#keepAnalysisInfoForEP2SameAsEP1` vs `#keepAnalysisInfoForEP1SameAsEP2`) depending on which
  endpoint the (sometimes-blank, live-defaulted) "Synchronize Interims" select resolves to as primary
  — confirmed via user DevTools screenshots on two different iterations landing in each mode.
  (4) The secondary-side "Add Interim to `<X>`" button's label flips with the primary endpoint
  (`…to EP2` vs `…to EP1`) and simply doesn't exist for the currently-primary side — a hand-picked
  button label that worked for EP1-primary mode threw `no "Add Interim to EP2" button found` under
  EP2-primary mode.
  (5) On the one iteration needing an EP1-side extra row (EP2-primary + `Planned End of Trial=Full Info
  for both endpoints` — confirmed live to be the mirror of the already-known EP1-primary+Full-Info-both
  → EP2-gets-the-extra-row case), the checkbox-based `reconcilePeriodTable` countField couldn't
  distinguish "EP2's own row" from "EP1's extra row" because EP2's checkbox stayed real/checked on
  BOTH — switched countField to `AnalysisSpacingInfo` itself (`excludeDisabled=true`), which genuinely
  reads `N/A` wherever a side doesn't own the row.
  (6) `Add Interim to EP1` turned out to APPEND a brand-new row rather than convert an existing
  `Determined` row to editable — the testdata's `PeriodIndex` for the extra value had to move to match
  where the click actually landed (index 4, a genuinely new 5th row, not index 3 as first assumed),
  confirmed by reading the failure screenshot directly rather than continuing to reason from the log
  alone.
  Two unrelated, smaller data-typo fixes along the way: a value in the wrong `InputMethodTable` field
  for one iteration's `inputMethod` mode (`ep1HazardRateControl` instead of `ep1CumPercSurvivalControl`
  for a `Cumulative % Survival` iteration), and dead `boundary.4.*` metadata rows left over from an
  earlier testdata restructuring, caught by `validate`'s `unknown column` errors.
  **[PROMOTED] New standing rule 18 + `AI_IMPORT_AGENT.md` §9.2**: the full dual-endpoint
  shared-row-index pattern, written so the next dual-endpoint feature (including a GitHub Copilot
  session) starts from the discovered mode/button/countField rules instead of re-deriving them from
  scratch through the same failure chain.

- **2026-09-14 · `ProductDesign/feature_MCPMod_Con` TC_36 — audited after user report "repeating the same errors we fixed for TC 35"; ITER_01 re-verified green.**
  A `_Con` (Continuous-endpoint) sibling of `feature_MCPMod` TC_35, imported by mirroring it per §0 —
  structurally the mirroring worked well (the `loopOverData` SkipIf gating, the `ObjectName`-basename
  rule, and the 25s background-retry `sleep` all carried over correctly, because those fixes live
  behind prominent callout boxes in `AI_IMPORT_AGENT.md`/`MULTI_SCENARIO_GUIDE.md`). **But two TC_35
  fixes that were NOT given the same visual prominence got silently re-broken**, invisible to both
  `UNWIRED` and `npm run validate`:
  **(1)** StepID 370 ("Select Test") used a plain `label` selector — the exact pre-TC_35 default —
  instead of TC_35's `.react-select__input-container` fix (documented, but buried in §3's
  UNWIRED-resolution reference table, never called out as a standalone rule).
  **(2)** a leftover `assertValue obj_Test_Type` step (StepID 420) re-appeared, asserting a
  never-verified `label:has-text("Test Type")` selector against `design.csv`'s `testtype` column —
  the exact importer default TC_35 had already concluded was a mislabeled duplicate of the real
  `#type1Error` field and removed. Also found (cosmetic, no functional impact): a dead `btn_Yes` row
  from the same importer selector-naming-collision pattern TC_35 hit, and a dead duplicate
  `txt_ResultName,Page,...` row — both orphaned, never referenced by any metadata step, left over
  from raw codegen output.
  **[PROMOTED] New standing rule 17 + `AI_IMPORT_AGENT.md` §0/§3/§6/Guardrails**: mirroring a
  reference feature must be **verified, not assumed** — right before finishing, `grep` the
  reference's selectors/metadata for judgment-call markers (`confirmed live`, `VERIFY selector`,
  `renamed from`, `collided`, `Never recorded`, `mislabeled`) and diff each hit's resolution against
  the new feature's equivalent field, even fields that auto-bound cleanly. **Meta-lesson for how this
  ledger and the playbook get written**: the fixes that transferred cleanly were the ones with a
  visible callout box; the ones that silently regressed were correct-but-buried in prose/tables.
  Prefer callouts/standalone rules over reference-table rows for anything that must survive into a
  sibling import.
  Fixed in place: StepID 370 repointed to `ddl_react_select_input_container` (+ new selectors.csv
  row), StepID 420 removed, `obj_Test_Type`/`btn_Yes`/duplicate-`txt_ResultName` selector rows
  removed, `btn_Calculate_Allocations` added alongside `btn_Calculate` to match TC_35's naming, and
  the carried-over fixes' terse descriptions enriched to match TC_35's rationale (self-documentation
  for the next reader). Re-validated clean (`[PASS]`, 8 warnings — one new expected "testtype unused"
  warning, matching TC_35's own documented pattern) and re-ran ITER_01 live: StepID 370 passed with no
  fallback warning, StepID 420 no longer present, `BASELINE_CREATED`, 11 result tables / 133 cells
  captured. ITER_02-08 remain untouched/unrun (out of scope for this audit — `project.csv` still has
  `Run=TRUE` on ITER_01 only, as found).

- **2026-09-14 · `ProductDesign/feature_MCPMod` TC_35 — imported + all 8 iterations stabilized (dose-finding, candidate models via `loopOverData`).**
  A genuinely different shape from every prior import this ledger covers: multiple-comparison-procedure dose-finding,
  with a growing Arms table (flat `armName-N`/`doseLevel-N` columns in `project.csv`, same convention as `feature_BOIN`'s
  dose table) AND a repeated candidate-model "Add Model" modal (one model per iteration here, so `design_model.csv` is
  one row per iteration — the `loopOverData` single-record variant of `MULTI_SCENARIO_GUIDE.md`'s pattern).
  **[PROMOTED] Two corrections copied straight into the durable docs** (not just this ledger) since they're
  general-purpose, not MCPMod-specific: `AI_IMPORT_AGENT.md` §9's callout box and `MULTI_SCENARIO_GUIDE.md` §4/§7 —
  **(1)** `${runtime.loop.*}` tokens never auto-skip on blank/`N/A` the way `${data.*}` tokens do (every field needs
  its own `SkipIf`, type- or value-gated) — this was already implied by the guide's own BOIN example but not stated
  as a standalone rule, and cost a full debug cycle here. **(2)** a `loopOverData` step's `ObjectName` must equal the
  child CSV's own basename — `loadTestData` keys `testDataParsed` by filename regardless of `feature.config.json`
  registration, so a "logical" name like `model` (vs the real `design_model`) silently finds 0 rows.
  **Two real app-behavior discoveries, not wiring bugs** (now in `AI_IMPORT_AGENT.md` §6/§7's diagnose material):
  **(3)** an entire required action (a "Calculate" button for the Optimized-Allocations path) was absent from the
  recording — Save/Save & Compute stayed disabled with no metadata error until it was added by hand, discovered from
  the app's own on-screen banner, not from any log. **(4)** a background models-list fetch 400s on page load and
  silently self-heals ~25s later; iterations reaching "Add Model" before that window closed had the click land
  correctly (confirmed via Playwright's own actionability checks — no retry warning) yet produce **zero** network
  activity — diagnosed by comparing `trace.network` between a passing and a failing iteration for the same feature
  (new technique, now documented in `AI_IMPORT_AGENT.md` §7), not by guessing. Fixed with an unconditional `sleep`
  early in the flow (no pollable DOM signal exists for this one). Also fixed: an importer selector-naming collision
  (two different recorded interactions auto-named `btn_Yes`, and the LATER one's selector silently won — the real
  "Add Model" button, not a "Yes" confirm — leaving the actual "Yes" dialog-confirm with no selector at all) and a
  duplicate `ed50` testdata header (two model families' fields both auto-named `ed50`; safe to merge since no row
  ever populated both).

- **[PROMOTED] The whole `ProductDecide` "Decide" checklist (casing check → `collectionName` →
  `SelectTask` → results-grid mirror → `Add_Interim` gating → CSV-comma gotcha) is now copied into
  `AI_IMPORT_AGENT.md`'s "Worked family reference — ProductDecide 'Go/No-Go' decision family"
  section, proven across `DOM`/`ROM`/`DOP`/`ROP` below. Read it there first for any new Decide
  feature — this ledger keeps the detailed per-feature history for context.**

- **2026-09-02 · `ProductDecide/feature_SingleArmSurv` TC_27 — imported, wired, ALL 4 iterations stabilized.**
  1 `UNWIRED` (`collectionName`) — resolved via rule 15 (repointed to existing `InputSetname` column,
  no new column). `npm run validate` passed clean. Ran ITER_01 alone (`Run=TRUE` on ITER_01 only in
  `project.csv`, the only file carrying `Run`) — got `BASELINE_CREATED`, but the log showed
  `select: no option element matched "Larger Value" for ddl_Better_Response; using type+Enter
  fallback`; screenshot-verified the fallback silently landed on the wrong option. **Root cause:
  `project.csv`'s `BetterResponse` column held `Larger Value`/`Smaller Value` (copied from a
  different family) but this app's actual Endpoint Type=Time to Event options are `Longer
  Duration`/`Shorter Duration`.** User confirmed the value fix; `project.csv` updated
  (`Larger Value`→`Longer Duration`, `Smaller Value`→`Shorter Duration`). Re-ran ITER_01: clean
  select (no fallback warning), `PASS` 70/70 cells. **New family rule: for a Time-to-Event /
  survival one-arm design, `BetterResponse`'s valid values are `Longer Duration` / `Shorter
  Duration`, NOT `Larger Value`/`Smaller Value` (that pair belongs to a different endpoint-type
  family) — check the live dropdown options before authoring this column for any new
  Time-to-Event feature.** Stabilized ITER_02/03/04 one at a time (`Run=TRUE` toggled per
  iteration in lockstep), each screenshot-verified against `01_testdata` (Design Summary /
  Go-Stop-Calculation cells matched exactly, no further fallback warnings) — all 4 `BASELINE_CREATED`,
  0 fails. `Run` restored to `TRUE` on all 4 rows when done.

- **2026-09-02 · `ProductDecide/feature_SingleMean` TC_28 — imported, wired, ALL 11 iterations stabilized (0 fails).**
  Same `collectionName`→`InputSetname` UNWIRED (rule 15). Found the rule-13 casing mismatch BEFORE
  running anything this time (habit from TC_27) — but with a twist: `design.csv` used a hyphen
  (`Iter-01`) not just different case, and `design_decideInterimTable.csv` used yet a third variant
  (`Iter_04`), while `project.csv`/`inputset.csv` used `ITER_01`. **Confirmed the normalization with
  the user before editing** per the new two-checkpoint policy (this session) rather than
  auto-applying rule 13 — user made the edit themselves. After that, hit the **table-completeness
  gap (rule S12)**: importer only wired `decideInterimTable` period 0 (recording only exercised one
  period); iterations use up to period 2 (`ITER_05`/`ITER_08`). Added period-1/2 selectors + fills
  for `stopCutoff`/`interimARTV`/`maxStopPP`/`goCutoff`/`interimDCLRV`/`minGoPP` (metadata-only, no
  testdata change, so applied directly without asking) — hit rule 16's CSV-comma bug immediately on
  the first attempt (description text `"period 1, table-completeness"` shifted `Exact` into a
  string), fixed by removing the commas. Also gated the importer's 2 flagged ungated `Add Interim`
  clicks (`SkipIf` on `decideInterimTable.1/2.analysisSpacingInfo`==EMPTY) — metadata-only.
  Validated clean (1 benign coverage warning). Ran ITER_01 alone first (`Endpoint Type=Continuous`
  here, unlike TC_27's Time-to-Event — `BetterResponse=Larger Value` is CORRECT for this endpoint
  type, no fallback warning, confirming rule 15's TC_27 finding is endpoint-type-scoped, not
  global) — PASS 65/65 cells, screenshot-verified. Then ran all remaining 10 iterations together
  per user's "first one only, then all the rest" instruction — 0 fails, 0 timeouts, 0 errors, all
  `BASELINE_CREATED`, spot-checked ITER_08 (2-interim Futility design) against its Design
  Summary/Interim Design grid — exact match, 3-period table-completeness fills confirmed working.

- **2026-09-02 · `ProductDecide/feature_ROP` TC_32 — importer + validate + all 4 iterations, validate-clean on the FIRST run, zero live-run fixes — every known fix applied before running anything.**
  Simplest "Decide" feature yet (proportions, no interim table — same shape as `feature_ROM`). Checked
  `IterationID` casing across all 3 testdata files BEFORE running the importer this time (habit formed from
  ROM/DOP) — found and fixed rule 13's top-level-join shape immediately (`design.csv` was `Iter_01..04`, the
  rest `ITER_01..04`). Ran the importer: 1 `UNWIRED` (`collectionName`, as always) — applied the standard
  `→InputSetname` mapping, bound `SelectTask`, and mirrored `tbl_Results`/`btn_ExportResults` all before ever
  running `validate`. Result: `npm run validate` → 0 issues on the very first run, no correction cycle needed.
  All 4 iterations then ran in one pass, every one `BASELINE_CREATED`, zero FAIL/TIMEOUT/ERROR. Confirms the
  by-now-standard "Decide" import checklist (casing check → collectionName → SelectTask → results-grid mirror →
  gate any Add-Interim if a decideInterimTable exists) is complete enough to front-load entirely, skipping the
  discover-via-validate-error loop altogether for this family.

- **2026-09-02 · `ProductDecide/feature_DOP` TC_31 — importer run + validate + all 7 iterations stabilized, THIRD `ProductDecide` feature in a row, every fix predicted in advance from the ledger before running anything.**
  Same "Decide" family, this time proportions (binomial) with an interim table, closest to `feature_DOM`'s shape.
  Went in checking rule 13 proactively (before even running validate) by diffing `IterationID` casing across all
  4 testdata files at once — caught it immediately: `design_decideInterimTable.csv` used `Iter_04..07` against
  the rest's `ITER_04..07` (rule 13's child-table shape, 3rd occurrence). Applied `collectionName→InputSetname`,
  the `tbl_Results`/`btn_ExportResults` mirror, and the `btn_Add_Interim` S8-gate up front too — the importer's
  own new warning ("2 ungated Add-Period/Add-Interim click(s)") now catches this pattern at import time, so the
  gate was applied before ever running the app. Table-completeness (`stopCutoff`/`interimARTV`/`maxStopPP`
  periods 1–2) extended the same way — symmetric to the table's max period depth (2) even where a field's own
  data only reached period 1, per the established convention. **Self-inflicted, instructive:** the first
  selectors.csv edit put an unquoted comma inside a Description field (`"...(table-completeness, unused yet...)"`)
  — validate immediately caught it as `selectors Exact: Expected boolean, received string` + a follow-on
  `locator not found`, the exact S12 CSV-comma gotcha, self-inflicted this time. Fixed by removing the comma
  (semicolon instead). `npm run validate` → 0 issues on the first re-run after that. All 7 iterations then ran
  `ITER_01→07` in one pass, every one `BASELINE_CREATED`, zero FAIL/TIMEOUT/ERROR/repeat-fix — confirms the
  ledger's Standing rules are now sufficient to take a `ProductDecide` "Decide" feature from raw import to a
  stable baseline without any live-run surprises, only validate-time ones.

- **2026-09-02 · `ProductDecide/feature_ROM` TC_30 — importer run + validate + all 4 iterations stabilized in one pass, first feature run through the full import→validate→stabilize loop start-to-finish under the new module.**
  Testdata/recording were pre-authored (same "Decide" family as `feature_DOM`); ran `npm run import-codegen --
  ProductDecide ROM --tc TC_30` fresh. One `UNWIRED` (`collectionName`) — resolved instantly by applying the
  already-documented `collectionName→InputSetname` mapping from the DOM(PD) family-reference table (Standing
  rule match, no fresh judgment needed). `npm run validate` then found rule-13's OTHER shape: not a child-table
  fold this time but the top-level join itself — `design.csv` used `Iter_01..04`, `project.csv`/`inputset.csv`
  used `ITER_01..04` (12 errors, "no row for TC_30/Iter_0N, but another referenced testdata file does"/reverse).
  Normalized `design.csv` to `ITER_0N`; also bound `${data.inputset.SelectTask}` to `btn_Select_Task`'s
  `InputValue` (same fix already applied to DOM). Validate went to 0 issues. Mirrored `tbl_Results`/
  `btn_ExportResults` selectors from the sibling again (same generic results-grid gap as DOM — this feature has
  no interim table, so no `S8`-style gating was needed). All 4 iterations (`ITER_01→04`) then ran in one pass,
  every one `BASELINE_CREATED`, zero FAIL/TIMEOUT/ERROR — no live-run fixes needed at all, confirming the fixes
  found by `validate` alone were sufficient (no runtime-only surprise this time).

- **2026-09-02 · `ProductDecide/feature_DOM` TC_29 — validate-clean, then all 11 iterations stabilized (design-only) — first feature imported under a NEW module folder.**
  Picked up a feature that already had testdata/metadata/selectors hand-authored (real, non-trivial content — a
  Go/No-Go decision-analysis variant of the "Difference of Means" family, module `ProductDecide` alongside the
  pre-existing `ProductDesign`) but never validated or run. Confirmed the framework needed ZERO code changes to
  support a second module — `core/` has no hardcoded module name, it's read from each master.csv row (see
  `AI_IMPORT_AGENT.md` §0). Fixed in order: **(1)** `design_decideInterimTable.csv` child rows used `Iter_04..11`,
  parent `design.csv` used `ITER_04..11` — case mismatch broke the fold silently (rule 13). **(2)** Two metadata
  tokens pointed at columns that didn't exist — `${data.project.Follow-up Time}` (user added the real column,
  `followUpTime`) and `${data.inputset.collectionName}` (repointed to the already-populated `InputSetname`,
  matching the SAME mapping already documented for `DOM(PD)` in the family-reference table — mirroring the closest
  feature would have caught this immediately). **(3)** Table-completeness: `decideInterimTable` periods 1/2 had
  real values for 6 fields with no metadata step at all — extended `stopCutoff/interimARTV/maxStopPP/goCutoff/
  interimDCLRV/minGoPP` to periods 1 and 2, mirroring the id/name-attribute selector pattern of period 0 exactly
  (rule 14 caught along the way: decimal StepIDs are invalid, only `Seq` allows them). **(4)** `results-grid`/
  `export-results` selectors were missing entirely (feature.config.json's generic `resultsExtraction` referenced
  them) — mirrored verbatim from the sibling `ProductDesign/feature_DOM(PD)`, since the results UI is shared
  app-wide, not per-feature. **(5)** `click btn_Add_Interim` (fires twice, builds periods 1/2) was unconditional
  and timed out on the 6 fixed-design iterations — gated on `decideInterimTable.1/2.analysisSpacingInfo==EMPTY`
  (S8 generalized a 3rd way, see S8 entry). After fix (1)+(2)+(3)+(4), `npm run validate` went from 11 errors to 0.
  After fix (5), all 11 iterations ran ITER_01→11 sequentially via `project.csv`'s `Run` flag and every one hit
  `BASELINE_CREATED` with zero FAIL/TIMEOUT/ERROR on the first full pass — no repeat fixes needed across iterations.

- **2026-08-25 · OROP(PD) TC_23 — all 10 iterations taken GREEN (design + sim where applicable), one iteration at a time.**
  Picked up a feature that already had `import-codegen` + prior consolidation done (metadata/selectors/config in place,
  `master.csv` registered) but had never been run on-app. Ran ITER_01→10 sequentially via the `project.csv`/`simulation.csv`
  `Run` flag (never touched testdata *values*, only the `Run` execution-control cells, per explicit user instruction), fixing
  structural issues as they surfaced — most fixes generalized and prevented repeat failures on later iterations:
  **(1)** Table-completeness gap on `simulation_boundarySim.csv` (S7/S12 pattern) — validate itself warned
  `analysisSpacingInfo[periods 2]; cumAlphaSpentUpper/efficacyZUpper/futilityZUpper[periods 1]`; added the 4 missing
  period-1/2 fills + selectors (mirror period-0 id pattern).
  **(2) `futSpendFunc` recorded AFTER its Rho/Gamma params** (same bug class as DOP #4) — moved the
  `select ddl_fut_Spend_Func` StepID earlier than the param fills (params render only once the spending function is chosen).
  **(3)** Redundant unconditional `click txt_boundary_0_lower_Alpha` immediately before the real (properly N/A-skipping)
  `fill` of the same object — deleted per S9 (a bare click with no data token is recording noise; it hangs when the field
  isn't rendered for an iteration, here an asymmetric-only field on a plain 2-Sided design).
  **(4) Design-side enrollment is single-period but was wired with the SAME `loopPeriods` flow the sim uses** →
  `${runtime.period.startingAtTime}` throws "never captured" (design enrollment has no `startingAtTime` column) — this is
  the *exact* DOP family rule already in this ledger; replaced with a scalar `fill txt_enrollment_Table_0_avg_Subjects_Enrolled`
  mirroring `feature_ROP(PD)`.
  **(5) NEW FRAMEWORK FINDING (S13, added to Standing rules above):** `simulation.csv`'s own `Run` column is a
  **GLOBAL** veto (excludes the WHOLE iteration, design included), not a sim-only skip as `FRAMEWORK_KT.md` §5.1
  documents — `core/loaders/featureLoader.ts` loads every CSV in `01_testdata/` into one iteration-selection pool, and
  `testDataStore.ts` `iterationsFor()` doesn't distinguish which file the `Run=FALSE` came from. A *missing* row is safe
  (matches the docs); an *explicit* `Run=FALSE` row is not. Not patched in `core/` (out of scope for a single-feature
  session) — just documented + worked around (kept `simulation.csv`'s `Run` in lockstep with `project.csv`'s).
  **(6) Sim `Include Enrollment` checkbox/uncheckbox pair (StepID 383/384) numbered HIGHER than the enrollment
  reconcile/loop (StepID 370/380)** — execution is by StepID not row order, so the reconcile ran before Include was ever
  checked, and "no Add Period button found (current=0, target=2)" resulted. Renumbered the check/uncheck to 365/366.
  **(7) Sim Response-tab race ("unable to resolve ddl_Distribution" after Recalculate), intermittent** — the classic S2
  "prior parameters too extreme" (Recalculate fired before Response was ever mounted). No `custom/OROP(PD)/` existed yet;
  created it, copying `loadResponseTabIntoModel` verbatim from `custom/ROP(PD)/customSteps.ts` (proportions family, same
  `#distributionSelect`/`#propUnderControl` ids) and wired it at sim StepID 45 (mirrors ROP/DOP placement — right after
  landing back on Design, before any design field fill).
  **(8) Systematic completeness audit paid off** — wrote a one-off Node script comparing every non-N/A cell in
  `design_boundary.csv` against `metadata.csv` for a matching `boundary.<n>.<field>` token; found 14 gaps across
  ITER_02/05/09/10 in ONE pass (vs. discovering them one iteration-run at a time) — including the S12 many-interim case
  (ITER_10, 8-analysis Haybittle-Peto, `efficacyPValue` periods 1–7 all unwired). Fixed all 14 before re-running.
  **(9)** `btn_Calculate` (design) / `btn_Recalculate` (sim) on FIXED designs (ITER_03: no `effBoundaryFam` at all) —
  same S8 case as DOP; design gated `SkipIf ${data.design.boundary.0.analysisSpacingInfo}==EMPTY`, sim marked
  `Optional=TRUE` (OROP's `boundarySim` mixes `analysisSpacingInfo`- and `cumAlphaSpentUpper`-driven iterations like DOP,
  so a single-column gate doesn't fit — mirrors DOP's exact choice).
  **(10)** A second orphaned unconditional `click txt_prior_Distribution_For` (no `InputValue`, no `SkipIf`) broke ITER_05
  (`includeAssurance=FALSE` → the whole Assurance panel including this field is absent) — deleted, same S9 pattern as (3).
  A follow-up Node-script sweep confirmed no other object name was shared between an ungated `click` and a gated
  fill/select. **Self-inflicted mistake worth flagging:** while fixing (6), an `Edit` whose `old_string` anchored on two
  adjacent rows (for context) accidentally dropped one of them (`check chk_Include`, StepID 1280) from the `new_string` —
  the bug didn't surface until the NEXT run, as a totally different-looking failure ("Include" checkbox timeout returned,
  even though the S3 fix should have resolved it). **Lesson: after any multi-line `old_string`/`new_string` edit, grep the
  metadata for every StepID that was in the old block to confirm none silently vanished.**
  End state: ITER_01–10 all `BASELINE_CREATED` on first pass through, then a full-suite re-run (all `Run=TRUE`) to convert
  them into real `PASS`es. Hypothesis coverage: Superiority (01,02,05,08,10), Noninferiority (03,04,06), Super Superiority
  (07,09); boundary families: Spending Functions/Lan-DeMets/Interpolated, Wang-Tsiatis, Haybittle-Peto, Gamma/Rho,
  Conditional-Power futility, and FIXED (no boundary); priors: Beta/Uniform across multiple `assuranceInputMethod`s.

- **2026-08-23 · GADAR(PD) TC_12 — child-table SPLIT + full format conversion, all 6 iters green (design + sim).**
  GADAR had no child tables (105 inline `<table>.<n>.<field>` columns across design + sim). Split them into 8
  normalized child CSVs (fold-verified value-exact vs the inline originals). **Hard lessons for the split + `==N/A`
  features (dose-escalation, survival):**
  **(1) Omitting empty periods changes gate semantics.** The child fold yields `''` for an ABSENT period but the
  literal `'N/A'` for an unused field. GADAR's enumerated Add-Period/Add-Interim gates were `==N/A` (literal), which
  then misfired on absent periods (empty ≠ 'N/A') → extra empty rows / timeouts. `==EMPTY` fixes absent-period but
  breaks mutually-exclusive method fields (a present-period `'N/A'` field ≠ empty → misfire). **NEITHER single
  operator works.** **CORE FIX (skipIf.ts):** make the RHS `N/A` mean isNaCell (matches empty OR any N/A spelling);
  `==EMPTY` stays a strict empty check (loopPeriods count-field gates rely on it). Then GADAR's gates stay/return to
  `==N/A` and work for BOTH cases. Verified regression-free: unit test + 3+3 spot-run PASS 5/5 (uses `==N/A` for
  Add-Dose); DOP/DOM/GADSD/ROP don't use `==N/A`; BOIN/i3+3 use it only on all-N/A cells (no-op). **(2) Reduced
  testdata leaves DEAD higher-period fills** (the 35→7 reduction dropped the only period-3 users) → the omit fold
  drops those columns → unknown-column errors; prune metadata fills referencing periods beyond the data's max.
  **(3) Malformed blank-key rows** in the reduced testdata folded to blank-IterationID child rows → strip them (loader
  ignores blank IterationID anyway). **(4) App-slowness settle-guard:** ITER_02's Save stayed disabled mid-compute
  (spinner intercepting) → added `waitForSelector div_Spinner`(hidden) before Save (see [[rop-computed-parameter-settle-guard]]).
  **(5) App label drift** (`Alternative`→`Alt.`, `Null`→`Null.`) + ~0.2% accrual drift on the disabled/WIP iterations
  (03/04/06) → stale baselines → re-baselined with `--update-baseline` (same as GADSD `ceedad0`). GADAR's boundary was
  left ENUMERATED (interleaved spacing/pValue/Add-Interim/multi-Calculate, too hand-tuned to loop safely) — only the
  child-table split + gate conversion were applied. `Run` gate lives in **design.csv** (+ project.csv); enabled ITER_01–06.
- **2026-08-22 · GADSD(PD) TC_17 — boundary loopPeriods retrofit, all 5 enabled iters green.** Survival GSD,
  design-only. Same means/survival recipe as DOM: kept `reconcileBoundaryInterims`, removed the 3 enumerated
  `boundary.<n>.analysisSpacingInfo` fills, added one `loopPeriods` (flows/gadsd_pd_boundary_period.csv) + a parametric
  selector at a fresh StepID (2269, no renumber); efficacy/futility CHECKS stay enumerated LAST, numeric fields
  enumerated. **Left the survival period tables `inputMethodTable` / `dropoutTable` ENUMERATED** — they have
  mutually-exclusive methods (hazard-rate vs median-survival vs cum-%-survival; hazard vs prob dropout) so they are
  NOT safe to blanket-loop (inputMethodTable is OFF in PERIOD_LOOP_CONFIG; dropout unproven) — plus DOM's
  `hazardRatioInputMethod` re-select-after-Add-Period gotcha lives there. Verified: full enabled suite (ITER_01–05,
  gated by project.csv Run; 06/07 are Run=FALSE WIP) **PASS 5 / FAIL 0** vs committed baselines. **Iteration-selection
  gotcha:** GADSD's `Run` column is in **project.csv**, NOT inputset.csv — toggle the right file for single-iteration runs.
- **2026-08-22 · DOM(PD) TC_03 — loopPeriods retrofit of an existing green feature (design boundary), all 10 green.**
  Targeted retrofit (NOT a re-import — preserves all hand-crafted judgment). **KEY means/survival-family rule:**
  loop ONLY `analysisSpacingInfo` (the spacing that varies 0–N); the boundary **efficacy/futility CHECKS must stay
  ENUMERATED and LAST** (means-family "checks-last, before Calculate" requirement — DOM/GADSD), so do NOT use the
  importer's default boundary flow that interleaves checks per period (that shape is proportions-only, proven on DOP).
  Mechanics: kept DOM's tested `reconcileBoundaryInterims` (it sizes the table), removed the 8 enumerated
  `boundary.<n>.analysisSpacingInfo` fills, inserted ONE `loopPeriods design flows/dom_pd_boundary_period.csv`
  (ExpectedValue `boundary|analysisSpacingInfo`, gated `${data.design.boundary.0.analysisSpacingInfo}==EMPTY`) right
  after the reconcile at a fresh StepID (785) — **no renumbering**, so checks-last + all numeric fills keep their exact
  order. Added ONE parametric selector `[id="boundary.{0}.analysisSpacingInfo"]` (Dynamic). Flow has the trailing
  `DynamicArgs=${runtime.period.n}` column even though DOM's parent metadata has no DynamicArgs column (only the flow
  needs it). Numeric boundary fields (upper/lowerAlpha, cumAlphaSpent, efficacyPValue 0-7, futilityCP, futilityDeltaBySigma,
  cumBetaSpent, futilityPValue) stay enumerated. Design enrollment was already a scalar fill (`avgSubjectsEnrolled`) — no
  change. Smoke-tested ITER_10 (7 interims) then full suite: **PASS 10 / FAIL 0** vs committed baselines (incl. adaptive
  CHW/CDL sims), so the loop reproduces the enumerated behavior exactly. Sim enrollment left enumerated (marginal;
  already green). Same recipe applies to GADSD next.
- **2026-08-22 · DOP(PD) TC_22 — ALL 11 ITERATIONS GREEN on-app (design; sim ITER_01–08).** First live run of
  the wired feature, one iteration at a time (§5a). Six fixes, each re-running that same iteration:
  **(1)** StartDate `08-10-2026`→`2026-08-10` (S1; testdata → user-confirmed). **(2)** stray `click opt_3` — an
  orphan `option "3"` between Study Objective and Phase with no open dropdown → dropped (recording noise).
  **(3)** `includeAssurance` is TRUE/FALSE but was gated check/uncheck → both toggles skipped, Assurance never
  enabled, `ddl_Prior_Distribution_For` "unable to resolve" → re-gate `!=TRUE`/`!=FALSE` (rule 8; minor→autonomous).
  **(4)** futility `ddl_fut_Spend_Func` recorded AFTER its Rho param → moved before it (params render only once the
  spending function is chosen; §7; minor→autonomous). **(5)** design enrollment scalar-fill vs loopPeriods (see
  family rule; user-directed). **(6)** `btn_Calculate` times out on FIXED designs (ITER_03/08/11, no boundary) →
  `SkipIf ${data.design.boundary.0.analysisSpacingInfo}==EMPTY` (S8; minor→autonomous). The count-agnostic boundary
  loopPeriods proved out across 2/3/4/7-analysis designs up to ITER_10's **8-analysis Haybittle-Peto** (efficacyPValue
  at all 8 looks incl. Final); per-period numeric completeness fills (upper/lowerAlpha, cumAlphaSpent, futilityCP,
  efficacyPValue 0-7) fired where valued and auto-skipped elsewhere. Sim hardening (S2/S3/S5/S8) worked on the FIRST
  live sim. 11 design + 8 sim baselines written (3.8-34.8 KB, none empty). **Second run CONFIRMED all 11 as real
  PASSes** (design + 8 sims, every cell within tolerance; `PASS 11, FAIL 0, ERROR 0`, ~25 min) — the baselines
  are reproducible, so TC_22 is a working regression suite. Uncommitted; 2 benign warnings remain (`SelectTask`,
  `CreateInputSet` — unused admin columns).
- **2026-08-22 · DOP(PD) TC_22 imported + wired to validate-clean (design + sim; live run pending).**
  Deterministic importer emitted `loopPeriods` by DEFAULT for boundary (analysisSpacingInfo/efficacy/futility
  checks) + enrollment; `boundarySim` stayed enumerated (correct). Judgment layer:
  **(1)** 3 UNWIRED "Proportion under Treatment" (design ×2 + sim ×1) → all πt cells are `Computed` (label-only
  clicks, colliding labels) → **DROPPED the 5 πt asserts + the merged-label artifact** (rule 4; not Path A —
  testdata says Computed, and ROP dropped them too).
  **(2)** `Include` ambiguous-prefix (of includeExactComputation/includeAssurance/IncludeEnrollment) → repointed
  the `check`/`uncheck` SkipIf to **IncludeEnrollment** by panel context (fires right after `btn_Enrollment`) (rule 1/§3.1).
  **(3)** Table-completeness: recording captured only period-0 numeric boundary cells → added per-period fills
  (design efficacyPValue 1-7, cumAlphaSpent/futilityDelta/upperAlpha/lowerAlpha .1, futilityCP .2; sim boundarySim
  efficacyZ.0 + efficacyZUpper/futilityZUpper/cumAlphaSpentUpper/futilityZ .1) — new selectors derived from each
  period-0/1 sibling (preserves the exact id-vs-name selector type). All auto-skip on N/A.
  **(4)** `allocationRatio` had a bare `click` (no fill) in the design though the sim filled it and design.csv has
  per-iteration values → changed the click to a data-driven **fill** (cleared the last real warning).
  **(5)** Sim runtime hardening mirrored from ROP (proportions sibling): `custom/DOP(PD)/customSteps.ts`
  `loadResponseTabIntoModel` before the first design fill (S2); `check chk_include_Switch` gated after the Enrollment
  tab (S3); node name `DOP_Sim_${iterationId}` distinct from the result `Sim Result Name` + a result-name fill after
  Save&Simulate + `lnk_ResultName` Exact=TRUE (S5/S10); `btn_Recalculate` Optional=TRUE (DOP mixes analysisSpacingInfo-
  and cumAlphaSpent-driven boundaries, so ROP's single-column gate doesn't fit — Optional lets fixed-design iterations
  skip). Result: **DOP validate = 0 errors, 2 benign warnings** (`SelectTask`="Design" is fixed by the static task
  button; `CreateInputSet` is an unused sim column). typecheck clean. Live `npm run test -- --testcase TC_22` +
  screenshot-verify still pending (needs the app; sim hardening is preemptive and unverified on-app).
- **2026-08-19 · ROP(PD) TC_21 ITER_08–11 GREEN (all 11 designs now green).** Each iteration exercised a
  different assurance/boundary shape and all passed with the S11 core fix + existing gating:
  **08** Uniform prior (both πc/πt, min/max) + sim real (9 tables/99 cells); **09** Percentiles-of-ρ input
  method (`assuranceInputMethod=3`), design-only (no simulation.csv row — sim correctly skipped);
  **10** πc-only Beta-Parameters prior + **8-analysis Haybittle-Peto boundary** — hit **S12** (metadata only
  built 3 of 8 analyses, silent under-build); extended Add-Interim + per-period fills/selectors to period 7
  (7 interims + Final row), which also corrected **ITER_04** (was 3 of 4); **11** asymmetric 2-Sided fixed
  design (upper/lower Type-1-Error split), no assurance/boundary. Design-only for 09/10/11 (simulation.csv
  stops at ITER_08). Discovered ALL ITER_01–06 sims wrote empty baselines (S5) → re-baselined at the end.
- **2026-08-19 · ROP(PD) TC_21 ITER_07 GREEN (design + sim) + TWO systemic fixes.**
  **(1) Assurance input-method silently wrong (S11, core fix).** ITER_07 (`priorDistributionFor=2`=πt,
  `assuranceInputMethod=4`) failed at `select ddl_..._perc_Pi_T1st_Operator "unable to resolve"`. Root cause:
  `select ddl_Input_Method="4"` *passed* but the dropdown stayed on its default `1`=Beta Parameters — a
  **React re-render race** (Distribution=Beta re-mounts the Input-Method select; the `selectOption` landed
  mid-render and reverted). Proved with a temporary `dumpAssuranceState` callCustom that printed
  `#assuranceInputMethod options=[1=Beta Parameters | 4=Percentiles of πt | 3=Percentiles of ρ]` (so `4` was
  correct all along) — and the dump's own delay masked the race. Fixed in `core/keywords/input.ts` `select`:
  read the value back after a native-select and re-select once if it didn't stick. Testdata was correct
  (user confirmed); no data change.
  **(2) Sim captured an EMPTY results page (S5, feature fix).** Every ROP sim baseline was 187–1973 B (design
  baselines were 8–20 KB) — `extractAllResultTables … -> 14 char(s)`. The sim named the **node and the result
  the same** (`Result - Sim 7` at config step 20 *and* the `lnk_ResultName` click), so opening it landed on
  the **design/config page**, not the result. Fix (sim_metadata): step 20 → `ROP_Sim_${iterationId}` (node);
  new step 575 after `btn_Save_Simulate` → fill `txt_ResultName=${data.simulation.Sim Result Name}` (result);
  step 600 opens the result name. Re-run: sim captured **9 tables / 135 cells**, baseline 12.8 KB.
  *Both fixes are generic — they apply to every iteration and every feature; earlier ROP "green" sims had
  empty baselines and must be re-baselined.*
- **2026-08-19 · ROP(PD) TC_21 ITER_01 GREEN (design + sim).** Sim shakeout applied rules S1–S4:
  Start Date `MM-DD-YYYY`→`yyyy-MM-dd` (S1); Assurance checkbox `!=check`→`!=TRUE/!=FALSE` (rule 8 — the
  toggle silently never fired, blocking Prior Distribution For); stray `boundary.0.lowerAlpha` focus-click
  → `SkipIf …lowerAlpha==N/A`; Recalculate "prior too extreme" → `loadResponseTabIntoModel`
  (Design→Response→Design) placed **before any field fill** (S2, new `custom/ROP(PD)/customSteps.ts`);
  Enrollment `#includeSwitch` ON gated (S3); enrollment blank row → Add Periods gated `==EMPTY` per period
  (S4). Design compared **PASS (222 rows)**; sim baseline created.
- **2026-08-18 · ROP(PD) TC_21** — Select Test → inputset (cross-file, now automatic).
  `Include` checkbox (label-only, no id) → wired to existing `IncludeEnrollment` via SkipIf repoint
  (rule 1, user chose the id column). `Result Name` → `ROP_Result_${iterationId}` (rule 2).
  `Min/Max πc/πt` + Spending-Function duplicates auto-collapsed (importer dedup-by-selector).
  Computed `Proportion under Treatment` asserts → dropped (rule 4). `enrollmentTable.0.avgSubjectsEnrolled`
  → user renamed the scalar to the dotted id so it wires. Result: design 0 validate errors.
