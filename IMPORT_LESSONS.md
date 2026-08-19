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

## Standing rules — the wiring-judgment checklist

*Everything the current importer already does automatically — id/label matching, same-field
duplicate collapse, cross-file columns, indexed table cells/child tables — is NOT here; it needs no
judgment. These are the calls that remain.*

| # | Signal (what you see) | Decision | Why | Ask? |
|---|---|---|---|---|
| 1 | **Label-only control, no DOM id** — `UNWIRED … wire label="Include"` (e.g. `role=checkbox "Include"`) | Name the column **exactly the label**, OR repoint the step's token/SkipIf to your existing id column. | The importer has no id to fall back to. | Ask which column name **once**, then record it. |
| 2 | **Result-name field** — `Result Name` / `#inputId` | Runtime token `<Feat>_Result_${iterationId}` on both the fill and the open-result click; give the **sim** a 2nd distinct name. | Unique per run, no data column, no design/sim link collision. | No |
| 3 | **Label-less radio** — `radio "Power"/"Type 1 Error" recorded without a label`, and it's an **option of a group** | Delete the orphan selector; the group's single dynamic `check ${data.design.<Group>}` (e.g. Computed Parameter) already drives it. | It's not a separate control. | Ask only if it's a standalone control. |
| 4 | **Computed/greyed field** — Optional `assertValue`, no recorded value | Cell = `Computed` (skip) **or** the derived number (assert) **or** drop the step. | The app owns the value. | Ask only if the user wants to verify the app's math. |
| 5 | **Test-card selection** — `react select …`/`Select Test` (value like "Difference of Means"/"Ratio of Proportions") | Column lives in **inputset** (`Select Test`/`SelectTest`). (Importer now cross-file-wires it.) | It's an input-set field, not design. | No |
| 6 | **Study Objective value** | Use the **recording's** value (e.g. `Two Arm Confirmatory`), NOT master.csv's "…Superiority" (that's the design-page *hypothesis*). | A wrong option makes `select` commit nothing → every downstream field "unable to resolve". | No |
| 7 | **Table-cell dropdown** — Endpoint Type, Better Response, Priority ("unable to resolve" on a label-walk) | Open via the **value-trigger** selector `role=button "<current/default value>"`; set the controlling cell (Endpoint Type) **before** dependents (Better Response). | The "label" is a column header with no adjacent control. | No |
| 8 | **Checkbox convention** differs in the same testdata (`TRUE/FALSE` vs `check/uncheck`) | Gate each `check`/`uncheck` on its **own** convention (`…!=TRUE` vs `…!=check`). | A mismatch silently skips the toggle; the section it reveals never renders. | No |
| 9 | **Ambiguous prefix/suffix** — importer logs "ambiguous … seeded/left UNWIRED" | The importer refuses to guess; **you** pick the column and repoint. | Guessing wrong exercises numbers nobody chose. | Yes |
| 10 | **Multi-iteration** — a column has data for some iterations only | Fill each iteration; `N/A` the hypothesis-suffix / period cells that don't apply to that row. | One metadata serves every combination; the recording only exercised one. | No |

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
| S3 | **Enrollment `click Add Period` times out / never found**; screenshot shows *"Enrollment Not Included — toggle Include"* | The sim Enrollment tab's **`#includeSwitch` is off**. Add a gated `check chk_include_Switch` (css `#includeSwitch`) after the Enrollment tab click, `SkipIf ${data.simulation.Include Enrollment}!=check`. Reveals the accrual table. |
| S4 | **A blank enrollment/period row** → "…is required", then an **Unsaved Changes** dialog on nav, then the NEXT tab's field "not found" | An **ungated Add Period** added a row the iteration doesn't use. Gate every Add Period on its period's data: `SkipIf ${data.simulation.<table>.<n>.<col>}==EMPTY`. **Use `==EMPTY`, not `==N/A`**, because an ABSENT child-table period (no `simulation_<table>.csv` row for that PeriodIndex) folds to the empty string, not the literal `N/A`. |
| S5 | **Sim opens the DESIGN/config page instead of the result; `extractAllResultTables … -> ~14 char(s)`; sim baseline is tiny (<2 KB) while the design baseline is normal (8–20 KB)** | The **simulation NODE name (config stage, `#inputId` at step ~20)** must be **distinct from the RESULT name** (set AFTER Save & Simulate). If the same name is used, `click lnk_ResultName` matches the *node* and opens its design/config page — near-empty capture. Fix (mirror DOM steps 20 / 665 / 690 and recording lines 7 / 107 / 111): (a) name the node distinctly at config — `<Feat>_Sim_${iterationId}`; (b) add a **new fill `txt_ResultName` step immediately after `btn_Save_Simulate`** that names the RESULT (`${data.simulation.Sim Result Name}` or `<Feat>_SimRes_${iterationId}`); (c) `click lnk_ResultName` uses the **result** name. **Audit tip:** `wc -c 06_baseline/*/sim_baseline_*` — any sim baseline under ~2 KB was never captured. |
| S6 | **Extra blank interim/period row** invalidates a group-sequential boundary; wrong interim count per iteration | The recording clicks a FIXED number of `Add Interim` (design) / `Add Period` (sim); different iterations need different counts. **Gate each `Add Interim`/`Add Period` on its period's data** — `SkipIf ${data.<phase>.<table>.<n>.<keycol>}==EMPTY` — so each iteration builds exactly its count. (Design boundary + sim enrollment + sim boundary.) |
| S7 | **App validation error naming a boundary cell** (e.g. *"Cum. α Spent should be strictly in increasing order"*, *"Upper/Lower α is required"*) with a blank required cell in the screenshot | A **table-completeness gap**: the recording only captured the recorded config's cells (usually period 0, and only symmetric fields), so an **asymmetric / multi-interim** iteration has testdata values with **no fill step**. Add the missing per-interim fills + selectors: design `boundary.<n>.upperAlpha/lowerAlpha`; sim `boundarySim.<n>.cumAlphaSpentUpper/Lower`, `efficacyZUpper/Lower`, `futilityZ`. They auto-skip on blank, so symmetric iterations are unaffected. See the **Table-completeness rule** below. |
| S8 | **`click btn_Calculate` (design) or `click btn_Recalculate` (sim) times out** on a **fixed** design (Efficacy & Futility Boundary Family both = None → no interims) | Those buttons exist only for **group-sequential** designs. Gate them on boundary presence: design `SkipIf ${data.design.boundary.0.analysisSpacingInfo}==EMPTY`, sim `SkipIf ${data.simulation.boundarySim.0.analysisSpacingInfo}==EMPTY`. Group-sequential iterations keep computing; fixed ones skip. |
| S9 | **Redundant focus-click before a grid-cell fill** hangs on an iteration where the cell is blank in one row but `N/A` in another | **DELETE the click, don't gate it.** The following `fill` auto-skips on **blank AND `N/A`** (covering fixed/symmetric/asymmetric), but a click's `SkipIf` can only test one (`==N/A` misses blank, `==EMPTY` misses `N/A`). Sibling fills (e.g. `upperAlpha`) already work with no preceding click, proving the click is redundant. |
| S10 | **Open-result click `strict mode violation … resolved to 2 elements`** (e.g. `"Result - Sim 6"` also matches `"Result - Result - Sim 6"` on the results list) | The result link matches by **substring** by default. Set the `lnk_ResultName` selector's **`Exact` column = TRUE** so it opens only the exact-named link. Fixes both the design and sim result-open clicks for every iteration. |
| S11 | **A native `<select>` shows the WRONG option with NO error; the dependent fields never appear, so the NEXT step fails "unable to resolve"** (ROP: `select ddl_Input_Method="4"` passed but stayed on the default *Beta Parameters*; `ddl_..._perc_Pi_T1st_Operator` then "unable to resolve"). Symptom: the select's options are **re-mounted by the PREVIOUS field's change** (choosing Distribution=Beta re-renders the Input Method select). | **React re-render race** — a `selectOption` that lands mid-re-render is silently discarded and the control snaps back to its default. Fixed in **core** (`core/keywords/input.ts` `select`): after selecting a native `<select>` by value, **read the value back; if it didn't stick, settle 300 ms and re-select once** (mirrors `fill`'s read-back). No-op on the normal path. **Diagnostic technique:** a temporary `callCustom` that dumps `#<id>.value` + `options[]` for the suspect dropdowns right before the failing select — it prints the true value→label map (e.g. `4=Percentiles of πt`) and the injected delay itself often masks the race, confirming it. |
| S12 | **A many-interim iteration silently builds FEWER analyses than its testdata has** — the run is GREEN but the boundary result has too few rows; the extra periods' cells never get entered. The metadata's `Add Interim` gates + per-period fills stop at period 2 (the recording only built 3 analyses). | **Extend Add-Interim + per-period fills to the max period any iteration uses.** Boundary rows map: **period 0 = IA1 (default, no Add Interim); periods 1..k-1 each need one `Add Interim`; the last period with `analysisSpacingInfo=N/A` is the auto "Final" row (NO Add Interim — but its `efficacyPValue` IS entered as `boundary.<last>.efficacyPValue`).** Add one `click btn_Add_Interim` per period gated `SkipIf ${data.design.boundary.<n>.analysisSpacingInfo}==EMPTY`, plus `fill txt_boundary_<n>_analysisSpacingInfo/efficacyPValue/futilityPValue` (+ selectors `[id="boundary.<n>.<field>"]`). All auto-skip on blank/absent, so few-interim iterations are unaffected. **Silent under-build has no error** — verify by comparing the testdata's period count to the result table's analysis rows (or a post-Calculate screenshot). ROP: extended to period 7 for ITER_10 (7 interims + Final = 8 analyses); this also corrected ITER_04 (4 periods, was building 3). **CSV gotcha:** never put a comma inside a selector/metadata comment column — it shifts every later column (breaks the boolean `Exact`). |

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

- **Two-arm proportions (ROP, RONBR, Fishers):** `min/max πc/πt` prior bounds are `input[name="minPiC"]`
  etc. (id columns `minPiC/maxPiC/minPiT/maxPiT`); hypothesis effect columns are
  `proportionUnderControl_SS/_SP/_NI` + `ratioOfProportions_SS/_SP/_NI` (one suffix valued per
  Hypothesis/Test-Type, rest `N/A`). Reference: `feature_ROP(PD)`.
- **(add survival / means / one-arm family rules as you import them)**

---

## Feature log *(append-only; newest first)*

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
