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
