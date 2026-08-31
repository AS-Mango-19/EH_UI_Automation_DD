# AI Import Agent — Playbook

A **tool-agnostic** workflow for importing and wiring **one** feature into this CSV-driven
Playwright framework. Any AI assistant — **Claude Code, GitHub Copilot, Cursor, …** — or a
knowledgeable QA can follow it verbatim. It sits **on top of** the deterministic importer
(`npm run import-codegen`), which you can always run by itself; this playbook only supplies
the *judgment* the importer can't.

- **Entry points that load this file:** Claude Code → `/import-feature`; GitHub Copilot →
  `/import-feature` prompt (`.github/prompts/import-feature.prompt.md`). Both just say
  "follow this playbook" — the logic lives **here**, once.
- **Framework reference:** `FRAMEWORK_KT.md` explains keywords, selectors, tokens, baselines,
  and every trap. *This playbook is the **process**; the KT is the **reference**.* Read §6
  (keywords), §7 (selectors), §8 (tokens), §4.5 (`Computed`/`N/A`), and §15 (traps).
- **Companion guides (read for the hard field families):** `FIELD_WIRING_PATTERNS.md` (effect-size
  hypothesis suffixes, priors/assurance, early-stopping), `MULTI_SCENARIO_GUIDE.md` (repeated-modal
  `loopOverData` — §9), and `AI_TESTDATA_AGENT.md` (prepare a feature's testdata from its raw API
  export, before wiring). The simulation cases live in **§8** below.
- **Self-improving memory — [IMPORT_LESSONS.md](IMPORT_LESSONS.md):** a cross-platform lessons
  ledger you **READ before** resolving a feature's `UNWIRED`/judgment calls (apply the first rule
  whose *Signal* matches, instead of asking) and **APPEND to after** (record any non-obvious
  decision or user correction as a new rule). This is how the agent gets better each iteration.

---

## The importer contract — read this first (works for any model)

The importer **wires; it does not invent.** For every field in the recording it finds the
testdata column **you already authored** and binds the step's `${data.*}` token to it — matching
your column **by its DOM id OR its on-screen label** (either naming works; the id is tried
first). It writes selectors + steps + one token per field; it does **not** add, rename, or
reorder your testdata columns.

- **Your `01_testdata/*.csv` are left byte-for-byte unchanged** by a normal import (the only
  auto-edit is a one-time backfill of a blank `TC_ID`/`IterationID`). **Author the testdata
  first; the importer conforms to it** — see `AI_TESTDATA_AGENT.md`.
- **A recorded field that matches no existing column is reported `UNWIRED`**, with its **DOM
  id**, its **label**, and the **recorded value**, e.g.
  `! design.csv <- wire id="sampleSize" or label="Sample Size" (recorded value: 100)`.
  Your job for each: **add that one column** to the testdata — named after the field's **DOM id
  OR its label** — or rename an existing column to match, then re-run. The importer never seeds
  a junk/parallel column for it (that is what used to create `input name maxPiC` clutter).
- **`--seed`** flips this off: it *creates* a column for every unmatched field, to **bootstrap a
  brand-new, empty feature**. Use it only when there is no testdata yet — never over
  hand-authored data. **`--strict`** exits non-zero if anything is `UNWIRED` (CI / clean-import gate).
- **Table cells** (`table.<n>.<field>`) wire the same way — to an inline `table.<n>.<field>`
  column or a `<phase>_<tableName>.csv` child row (§3).
- **It wires across files.** If you authored a field's column in a different testdata file than
  the recording implies (a test-card `Select Test` in `inputset.csv`, not `design.csv`), the
  importer finds it and repoints the token — no manual move needed.
- **It collapses same-field duplicates automatically.** A superset recording that touches one
  control two ways — label-first (`getByText('Min. πt')` + `input[name="minPiT"]`) and bare
  (`input[name="minPiT"]`) — is auto-collapsed to a single step by the control's DOM id, so you
  no longer hand-delete the twin.

**The loop, minimally (a small model can run this verbatim):** author testdata → `import-codegen`
→ read the `UNWIRED` list → add/rename exactly those columns (by id or label) → re-run until
`UNWIRED` is empty → `validate` → `test` → screenshot-verify. The importer's warnings name the
exact fix, so little judgment is needed to get to a wired feature.

---

## The 6 golden rules

1. **Scope: touch only the target feature.** Edit only `<Module>/feature_<Name>/…` and that
   feature's row in `master.csv`. Do **not** touch `core/`, other features, or shared files.
   *If you must change `core/` or `scripts/import-codegen.ts` (a real framework bug), first
   test on a throwaway feature and re-run `npm run validate` to prove every committed feature
   still passes.* This is how the agent stays safe for other features.
2. **Follow the testdata.** A cell with a value → the step runs and the value must land
   (verified by read-back). Blank / `N/A` → the step is skipped (field not applicable to that
   iteration). A valued cell whose field **isn't found → the test FAILS** — that's correct;
   **fix the data or the selector, never delete the step to force a pass.**

   **Corollary — every `fill`/`select`/`check` must carry a `${data.*}` token.** A
   value-entering step with a **blank InputValue** is not driven by anything: it can only
   re-assert whatever the recording happened to click, so it fires on every iteration and
   **silently overrides a data-driven choice made earlier in the run**. It is recording
   noise — **delete it** (or bind it to a column). `npm run validate` now rejects a blank
   `check`/`uncheck`, and the importer refuses to emit one; if you see one in the metadata,
   something hand-edited it back in.

   > This is not hypothetical. ROM(PD) had `check radio_Type_1_Error` with a blank
   > InputValue. Step 240 correctly set Computed Parameter = `Power` from the testdata;
   > step 360 then blindly clicked the `Type 1 Error` radio, which greyed out the α the
   > run had just typed and turned Power into a stale `0.9`. The design submitted matched
   > no iteration and the simulation returned **"Failed"**.
3. **Verify with your eyes.** After each run, open the design/failing screenshots in
   `artifacts/<runId>/<TC>_<ITER>/` and confirm the fields hold the intended values and the
   right conditional fields are present. **Green ≠ correct** (a missing baseline is green and
   verifies nothing — KT §9.4).
4. **Never commit secrets.** `recording.txt`, `.env`, `.auth/` are gitignored and hold real
   credentials. Leave the feature's generated files for the tester to review/commit.
5. **The importer wires to your columns; it never invents them.** By default it adds **no**
   testdata columns — it binds each recorded field to an existing column by **DOM id or label**
   and reports the rest as `UNWIRED`. **Do not "fix" an `UNWIRED` warning by re-running with
   `--seed`** (that reintroduces junk columns) — add the real column, named by the field's id or
   label, or correct the name. `--seed` is only for bootstrapping a feature whose testdata is
   still empty. (See "The importer contract" above.)
6. **Learn every iteration — read then feed [IMPORT_LESSONS.md](IMPORT_LESSONS.md).** Apply a
   matching *Signal→Decision* rule instead of asking; when you make a new judgment call or the user
   corrects you, **append it as a rule** so the next feature is easier. The ledger is the agent's
   memory — keep it accurate and it compounds.

---

## Inputs the tester provides

- **Recording** — a Playwright codegen capture saved at
  `feature_<Name>/02_selectors_repo/recording.txt` (gitignored). For **conditional fields**,
  record the **superset**: select each controlling option (Hypothesis, Input Method, …) and
  touch **every** field it reveals, clicking each field's **label first** (KT §13, Step 1).
- **Testdata** — `01_testdata/*.csv`, one row per iteration: values for the fields that apply
  to that iteration's option combination, `N/A` for the ones that don't. **What to put in a
  cell is decided by the table below — get this right and a new combination just works.**
- **master.csv row** — `TC_XX,<Module>,regression,,<Name>,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD`.

---

## What to put in a testdata cell — decide by looking at the field on screen

Adding a new design combination is **only** this decision, per field, per iteration. Open the
page with that combination selected and ask two questions: *is the field there?* and *can I
type in it?*

| On screen, for THIS combination | Put in the cell | What happens | Why |
|---|---|---|---|
| **Not on the page** (hidden by a controlling option — e.g. Noninferiority Margin on a Superiority design) | `N/A` | step **skipped** | The field doesn't exist; there is nothing to enter or check. |
| **Editable** — you are choosing the input | the real value | entered, then **read back to verify it landed** | The normal case. |
| **Greyed, showing the literal word "Computed"** — this is the parameter being solved for | `Computed` | step **skipped** | The app owns it. Trying to set it fails; it is an *output* of this iteration. |
| **Greyed, showing a derived NUMBER** (e.g. Mean Treatment μt0 = Mean Control × NI Margin) | the number you expect | **asserted** via `assertValue` | Best case: your arithmetic becomes a live check on the app's. |
| Greyed derived number, but you don't want to check it | `N/A` | step **skipped** | Fine — you just verify nothing there. |
| Editable, but you want the app's default | leave **blank** | step **skipped** | Blank is treated as `N/A`. |

**`N/A` and `Computed` are not interchangeable.** Both skip the step today, so a mix-up
won't fail the run — it will quietly mis-document *why* a field was left alone, and the next
person (or the next agent) will draw the wrong conclusion about the design. `N/A` = the field
isn't there. `Computed` = the field is there and the app fills it.

**Never put a calculated value in a cell that is `fill`ed into a greyed field.** The step
will hard-fail on a disabled field. If you know the expected number, wire it as `assertValue`
(step's `ExpectedValue`, not `InputValue`) and the derived field is *verified* rather than
skipped — `N/A` still skips it on the iterations where the field isn't rendered, so one
metadata keeps serving every combination.

> Worked example — ROM(PD) `#nonInf_nhMeanTreatment`: greyed, showing `0.99328`, which is
> `Mean Control 2.56 × NI Margin 0.388`. Filling it would fail on a disabled field; `Computed`
> would discard a known-good number. It is asserted, so ITER_02 now proves the app's maths
> and the other four iterations skip it as `N/A`.

### Two fields that share a visible label

Name the column after the **DOM id**, not the label. Both Mean Treatment boxes read
*"Mean Treatment"*, so `nonInf_nhMeanTreatment` / `nonInf_ahMeanTreatment` are the only
unambiguous headings — and the importer's column reuse deliberately refuses to guess between
ambiguous names rather than bind your step to the wrong field. The heading never has to match
the id or the label; it only has to match the metadata token exactly.

**Editable fills are now split for you.** When two *editable* fields share a label but have
distinct DOM ids — `Hazard Ratio (Null)` `#hazardRatio_Null_SS` vs `Hazard Ratio (Alternative)`
`#hazardRatio_Alt_SS` — the importer emits **one column per id automatically**
(`${data.design.hazardRatio_Null_SS}` / `…_Alt_SS`), so the alternative input never mirrors the
null one. The hand-naming rule above is only for the **greyed** `assertValue` fields the importer
can't record. (Split fires only for distinct id-bearing *fills*; a fill sharing its column with a
result *link*, and a dropdown recorded two ways, are left alone.)

---

## Workflow

### 0 — Start from the closest existing feature *(do this first)*
A feature in the same statistical family already solved 90% of your wiring — the same
project→input-set→design→boundary→enrollment→compute→result flow, the same selector patterns, the
same custom steps. **Find it, read it, mirror it**, then adapt values. Pick by family:

| Your feature is… | Mirror this committed feature |
|---|---|
| Two-arm **continuous / means** (DOM, ROM, ROPR, MeanofPairedRatios) | `feature_DOM(PD)` (TC_03) |
| Two-arm **survival / group-sequential** (GADAR, GADSD, Logrank*, ParametricWeibull) | `feature_GADAR(PD)` (TC_12), `feature_GADSD(PD)` (TC_17) |
| Two-arm **binomial / proportions** (ROP, RONBR, FishersExact) | `feature_RONBR(PD)`, `feature_FishersExact(PD)` |
| **One-arm** (SinglePoissonRate, Simon2Stage, BOP2, *OAD) | `feature_SinglePoissonRate`, `feature_Simon2Stage` |
| **Repeated-modal / multi-scenario** (BOIN, dose-response, arms) | `feature_BOIN` (TC_14) + `MULTI_SCENARIO_GUIDE.md` |

Concretely: `diff` the reference feature's `01_testdata/*.csv` **headers**, skim its
`03_metadata/*.csv` and any `custom/<Feature>/customSteps.ts`, and reuse its column names so the
importer's id/label wiring matches on the first pass. The survival and means families share
almost the entire `design.csv` column set — a straight retarget (see `AI_TESTDATA_AGENT.md`).

### 1 — Run the deterministic importer (standalone-capable)
```bash
npm run import-codegen -- <Module> feature_<Name> --tc TC_XX
```
It auto-discovers the recording, captures selectors, generates steps + `${data.*}` tokens, and
**wires each field to an existing testdata column by DOM id or label** (§ "The importer
contract"). It adds **no** columns by default; unmatched fields print as `UNWIRED`. Add `--seed`
only to bootstrap an empty feature, `--strict` to fail the import on any `UNWIRED`. **The tester
can run this alone** — the agent's job is steps 2-6.

> **Two flows, one feature.** A feature can have a **design** flow and a chained **simulation**
> flow. They are imported and consolidated the SAME way; only the inputs and the command flag
> differ:
>
> | | Design flow | Simulation flow |
> |---|---|---|
> | recording | `02_selectors_repo/recording.txt` | `02_selectors_repo/sim_recording.txt` |
> | testdata | `inputset.csv` / `project.csv` / `design.csv` | `simulation.csv` |
> | metadata out | `03_metadata/metadata.csv` | `03_metadata/sim_metadata.csv` |
> | command | `npm run import-codegen -- <Module> feature_<Name> --tc TC_XX` | `npm run import-codegen -- <Module> feature_<Name> --tc TC_XX --sim` |
> | selectors / compare.config | `selectors.csv` / `compare.config.csv` | **shared** — merged into the same files |
> | login/navigate | synthesised | **none** — sim starts on the results page at the `Simulate` click |
>
> Turn it on with `Simulation=YES` in the master row. At run time, **after a GREEN design
> comparison**, the same browser stays open, clicks Simulate, runs the sim steps, and captures
> `sim_results_<TC>_<ITER>.csv` / `sim_baseline_<TC>_<ITER>.csv`. A red design skips sim.

### 2 — Consolidate a superset recording *(judgment)*
A superset recording toggles controls, so the raw metadata has **duplicated, self-cancelling**
steps. The importer already **collapses exact same-object repeats** of `select`/`check`/`fill`
(it logs `Collapsed N duplicate … step(s)`); your job is the judgment it can't make — ordering and
genuinely-distinct fields. Turn it into the clean data-driven form:
- **One data-driven step per control** — `select ddl_X ${data.design.X}`. The importer drops an
  exact repeat on the same object automatically; delete any that remain (e.g. the *same* dropdown
  recorded via two different selectors). The recorded value doesn't matter — the token reads the
  testdata.
- **One `fill` per field.**
- **Order = controls before their dependent fields**, e.g.
  `Hypothesis → Test Type → Computed Parameter → Input Method → (the fills) → Test Statistic`.
  A controlling select must run **before** the fields it reveals, or the fill hits a
  not-yet-visible field.

### 3 — Wire `UNWIRED` fields & add missing steps *(judgment)*
- **Resolve every `UNWIRED` line.** The importer already wired each field it could match to an
  existing column by **id or label**; what remains is the `UNWIRED` list. For each one it prints
  the field's **id**, **label**, and **recorded value**. Decide, per field:
  - **A field you meant to drive** → add exactly one column, named after the printed **DOM id or
    label**, and give it the value (or `N/A`/`Computed` per the cell-decision table). Re-run;
    the line disappears.
  - **A field this iteration doesn't use** (a hidden/greyed/branch field) → it needs no column;
    remove or gate its step, or set the cell `N/A` on the iterations that don't apply.
  - **Recording noise** (a stray label click, a `1`, a computed-parameter mirror) → delete the step.

  The importer matches case/spacing and a **truncated recorded label** (`Sample Size` →
  `Sample Size (n)`) and tries the **id first**, so an id-named column always wins; it
  deliberately gives up when a prefix is **ambiguous** (`Mean` matches both `Mean Control` and
  `Mean Treatment`) and leaves those `UNWIRED` for you rather than guessing wrong.

  > **Check the values, not just the names.** If you ever run with `--seed` (bootstrap), a
  > seeded column holds the value **from the recording**, so the test would silently exercise
  > numbers nobody chose. ROM(PD) once typed `123`/`0.56` while the testdata said `120`/`0.58`.
  > Open the design screenshot and compare it to the row. Default (no `--seed`) can't create
  > this drift — it wires to *your* column — but it is why `--seed` output must be reviewed.
- **Fields the recording couldn't capture** — add the step + selector by hand:
  - a **computed/greyed** field that is an *input* in another iteration (e.g. Power),
  - a field the recording only **clicked as a stray label** (e.g. Test Type),
  - a field that is **always greyed** (see below).
  Infer the `#id` from the app's pattern and **confirm from the live DOM (DevTools) or a
  probe** before trusting it.

- **Two kinds of greyed field — only one needs you to do anything.** The importer can only
  emit what codegen recorded, and codegen cannot type into a disabled field.

  | | Greyed in SOME iterations (the computed *parameter* rotates) | Greyed in ALL iterations (permanently derived) |
  |---|---|---|
  | Example | Sample Size / Power / Type 1 Error | Mean Treatment `μt0`, `μt1` |
  | Recorded? | **Yes** — you typed into it in the iteration where it was an input | **No** — never typeable, so it is absent from the recording |
  | Importer emits | a normal `fill` step | **nothing at all** — no selector, no step |
  | You do | **nothing.** Keep the `fill`; put `Computed` in the greyed cells | add the selector + an `assertValue` step **by hand**, if you want it verified |

  So you are never *converting* a `fill` into an `assertValue`. In the second case the step
  never existed — you are *adding* one. It is also **optional**: skip it and you simply have
  no coverage of that field.

- **`validate` tells you when one is missing.** Add the column with its expected numbers and
  run `npm run validate`:
  `column "nonInf_nhMeanTreatment" in design.csv has a value but no step enters it — add a
  step to apply it or remove the column.`
  That warning is the prompt to add the `assertValue` step (or drop the column). It is how a
  derived field gets noticed without anyone remembering to look for it.
- **Mutually-exclusive variants** (`#ratioOfMeans_NI` vs `#ratioOfMeans_SP`) → separate
  columns + separate steps; each iteration `N/A`s the variant it doesn't use. The importer now
  produces the separate **id-named columns** for distinct editable fills automatically (see
  "Two fields that share a visible label" above); you still add the per-iteration `N/A` gating,
  and any `SkipIf` needed.
- **Indexed table cells + multi-period values.** Table inputs (interim spacing, piecewise
  hazard rates, dropout periods) use **dotted 0-based ids** — `inputMethodTable.0.hazardRateControl`,
  `boundary.1.analysisSpacingInfo`. Record the cell by its real `[id="…"]` / `[name="…"]` / `#id`
  and the importer takes that dotted id **verbatim** as the column (no more `id inputMethodTable 0 …`
  mangling). An export cell that packs every period comma-separated (`"0.9, 1.2, 1.5"`) is split one
  value per indexed column (`…0.…` / `…1.…` / `…2.…`); unused periods are left blank/`N/A`.
  **Or author the table as a normalized child CSV** — `<phase>_<tableName>.csv` (phase = the
  parent basename `design` / `simulation`: `design_inputMethodTable.csv`, `design_boundary.csv`,
  `design_dropoutTable.csv`, `design_enrollmentTable.csv`, …) keyed
  `TC_ID,IterationID,PeriodIndex,<field…>`, **one row per period**. The loader folds each child row
  into the parent as the same synthetic `<table>.<n>.<field>` column at load time, so
  `${data.design.boundary.0.efficacyPValue}` resolves identically whether inline or in the child
  file. The importer is **child-table-aware**: when a child owns a table it will **not** seed a
  duplicate `<table>.<n>.<field>` cell inline into design.csv/simulation.csv (the recorded token
  resolves via the fold; the child CSV stays the human-authored source of truth). Full rules:
  FRAMEWORK_KT.md §4.5 "Indexed table cells and multi-period values". **For the allowlisted
  tables (boundary / enrollment / dropout) the importer now emits ONE count-agnostic `loopPeriods`
  block instead of per-cell fills — see §9.1.**
- **Checkbox toggles** (`getByTestId('variable')`, a role/id checkbox) import as a data-driven
  `check` **and** `uncheck` pair, each `SkipIf`-gated on the column value (`…!=check` / `…!=uncheck`),
  so one testdata cell drives the box on or off per iteration.

### 3.1 — Ambiguous-prefix, read-only asserts & non-ASCII labels *(judgment — the DOP(PD) cases)*

- **Ambiguous-prefix `UNWIRED` → disambiguate by PANEL CONTEXT, don't leave it.** When the
  importer reports `recorded field "Include" is an ambiguous prefix of 3 existing columns
  (includeExactComputation, includeAssurance, IncludeEnrollment) — NOT auto-wired … NOT seeded`,
  it has correctly refused to guess. **You** resolve it: look at the **preceding navigation step**
  to see which panel the control is in. `chk_Include` fires right after `click btn_Enrollment`, so
  it is the **Enrollment** panel's checkbox → `IncludeEnrollment`. Rewire the token **and its
  `SkipIf`** (`${data.design.Include}` → `${data.design.IncludeEnrollment}` on the `check`/`uncheck`
  pair). Same method for any `X is an ambiguous prefix of …` line — the candidate list is printed;
  pick by context, never by guessing. **Durability:** a metadata token edit is **regenerated away on the
  next re-import**. To make it stick, prefer the stable side — name the column after the control's
  real **DOM id** (wired by id, which is tried first and is unambiguous), or, if you must keep a
  semantic name that collides, move the step into a hand-authored flow (below).

- **Read-only / computed-field assertions — make them survive re-import.** A bare label click on a
  computed field (`getByText('Proportion under Treatment (πt0)')` with no fill) becomes an
  `assertValue`, `Optional=TRUE`, pointed at a label-derived column. Two ways to complete it:
  - **Path A (in-metadata, easiest — use for a CLEAN, UNIQUE label):** add the expected-value
    column, fix the selector to the real `#id`, flip `Optional=FALSE`. Works end-to-end, but
    `metadata.csv` **and** `selectors.csv` are **regenerated on re-import**, so the selector fix and
    the `Optional=FALSE` are **clobbered** for any label the importer can't auto-wire (ambiguous /
    merged). Fine when you are basically done re-importing.
  - **Path B (durable — use for AMBIGUOUS/MERGED labels like the πt fields):** do **not** click those
    labels while recording; instead hand-author `flows/<feature>_asserts.csv` (assertValue rows with
    real `#id` selectors, `Optional=FALSE`, `ExpectedValue=${data.design.<asciiCol>}`), add the
    columns to `design.csv`, add the selectors under **new** object names (a `page::objectName` the
    codegen never emits is **preserved** by `mergeSelectorRows`), and invoke with **one**
    `callReusable flows/<feature>_asserts.csv` step. Everything except that one step lives in files
    the importer never rewrites.
  - **Or skip both:** if the value appears in a **result-page table**, the end-of-run
    `extractAllResultTables` + `compareWithBaseline` already asserts it (with tolerance) — no
    per-field `assertValue` needed. Only assert design-panel values that never reach a result table.

- **Non-ASCII labels (π, δ, α) — keep them OUT of column names & tokens.** Columns/tokens are
  matched byte-for-byte and the CSVs are **UTF-8 without BOM**, so an ANSI **Excel/WPS save
  corrupts** `π`→`?`. Name assert columns in **ASCII** (`piT0_SS`, `delta0`, `alpha`), not with the
  glyph. The importer now strips a codegen-**truncated** trailing `(π` fragment, so `Proportion under
  Treatment (π` collapses to the clean `Proportion under Treatment`; a **merged** label
  (`Proportion under Treatment (πt0)Super Superiority Margin`) is a recorder artifact it can't split —
  **drop that step** (or re-record clicking only one label). Edit these CSVs in VS Code (UTF-8), not
  Excel.

### 4 — Validate (no browser)
```bash
npm run validate
```
Fix **errors** (unknown column, missing selector, iteration-completeness — a keyed testdata
file missing a row another file has). **Warnings** are signal: "column X has a value but no
step enters it" means wire a step or confirm it's intentional.

### 5 — Run + screenshot-verify **every iteration** *(judgment)*
```bash
npm run test -- --testcase TC_XX
```
- In the step log, confirm blank/`N/A` cells show `SKIP … (field not applicable)` and valued
  cells fill/select.
- Open the **design-page screenshot per iteration** and confirm the values landed and the
  correct conditional fields are on the page.
- First green run = `BASELINE_CREATED` (verifies nothing) → **review the baseline numbers**.
  A **second** run turns it into a real `PASS`.
- The app allows **one session per user**, so iterations run **serially** and take a while;
  leave a gap between runs (the app can crash on rapid re-runs).

#### 5a — Interactive run protocol (MANDATORY once wiring is resolved) *(judgment)*

Running the feature is **outward-facing** — it creates real projects on the server, consumes
Compute/Simulate credits, and locks the one-session-per-user app. So the agent does **not**
launch it unprompted. After the feature reaches validate-clean (steps 1-4 done, `UNWIRED`
resolved), follow this protocol exactly:

1. **ASK FIRST.** Summarise what's ready and **ask the user for approval to run** the feature.
   Do not start any live run until the user approves. (No approval → stop here; hand off.)
2. **ONE ITERATION AT A TIME.** On approval, run a **single iteration**, then wait for it to
   **fully complete** (design, and the chained sim if `Simulation=YES`) before touching the next
   one. Never launch the next iteration while one is in flight, and never run the whole `--testcase`
   set at once for a first import. Select the single iteration by the **`Run` column** (there is no
   `--iteration` flag): set `Run=TRUE` for the target iteration and `Run=FALSE` for the rest in
   `01_testdata/inputset.csv` (a `switchedOff` iteration wins across all testdata files, so this one
   file governs; **back it up first and restore all `Run=TRUE` when finished**). Then
   `npm run test -- --testcase TC_XX`.
3. **After each iteration, report the outcome** (per-iteration screenshot-verify; note
   `BASELINE_CREATED` vs `PASS`/`FAIL`). If it completed cleanly, proceed to the next iteration.
4. **ON ANY ERROR, analyse first, then act by tier.** Always **analyse the failure** (step log +
   screenshot + trace) and identify the root cause before doing anything. Then act according to
   what the fix touches — never skip ahead to the next iteration with a failure unresolved:
   - **Minor issue → FIX AUTONOMOUSLY, then re-run the same iteration.** A minor issue is one whose
     fix stays inside **this feature's own `03_metadata/*.csv` or `02_selectors_repo/selectors.csv`**
     — a recorded-noise step to drop, a `SkipIf` convention mismatch (rule 8), a wrong/again selector,
     a missing per-period fill, a step-order/StepID tweak, an `Optional` flip. Apply it, **report what
     you changed and why**, and re-run. No approval needed for these (they are the importer's normal
     wiring work).
   - **Any TESTDATA change → CONFIRM WITH THE USER first.** Editing `01_testdata/*.csv` (a value, a
     date format, `N/A`/`Computed` discipline, a Run toggle beyond the single-iteration selection,
     adding/removing a column) **always** needs approval — explain the change and wait. The data
     encodes the intended design; the agent does not silently alter it.
   - **Major issue, or a change in ANY other file → CONFIRM first.** Anything touching `core/`,
     `custom/`, `flows/`, `00_config/`, `master.csv`, shared files, or a structurally significant
     redesign is **major** — analyse, propose in detail, and get approval before editing.

   When in doubt about the tier, treat it as needing confirmation. After a minor autonomous fix,
   still **report it** in the per-iteration summary so the user sees every change.
5. **Baselines are human-reviewed.** A first green run only writes the baseline (verifies nothing)
   — surface the numbers for the user before trusting them; never auto-bless a baseline.

### 6 — Diagnose common issues *(judgment)*
| Symptom | What it means / fix |
|---|---|
| `SKIP … (field not applicable)` | blank/`N/A` cell — expected for that iteration |
| `field "X" did not accept the value` | grid cell reverted; `fill` auto-escalates to type+Tab. If the field strips characters, use an allowed value |
| `field "X" not found` on a **valued** cell | wrong selector, or the field isn't shown for this option combination → the testdata row is **inconsistent** (fix the data/selector; don't delete the step) |
| a field's value is ignored (app computes it) | set that cell to `Computed` |
| "Forced Log Out" / login bounce | parallel logins — ensure `serial: true` (importer default) |
| duplicate testdata columns | reconcile to the human-named column (step 3) |
| `select … has no option matching "V"` | the error now **prints every real option** (`value=text`); map your testdata value to one — or the value belongs in a *different* field (a `select` recorded onto a text input; delete the bogus select) |
| `field "X" is disabled but testdata requires a value` | X's **controlling `select` isn't active** — either it never ran, or a later `fill` **reset** it. Order that select **after** the table X depends on and **immediately before** X. Execution is by **StepID**, not row order (§7 below) |
| a `check`/`uncheck` step **times out** | the checkbox isn't rendered for this combination (e.g. the efficacy/futility checkboxes exist only when a **futility boundary** does) → set the cell to **`N/A`** |
| a **blank period/interim row** appears and the design won't compute | an **ungated** Add-Period / Add-Interim click. Gate every one with `SkipIf ${data.design.<table>.<idx>.<col>}==N/A`. Watch for a **mis-named** button whose *selector* is really `role=button "Add Period"` (§7) |
| navigating shows an **"Unsaved Changes"** dialog | the design has unsaved edits — **Save it first; never add a "Leave" click** (Leave *discards* the design and masks a real validation error) |
| `select … "unable to resolve"` on a **table-cell dropdown** (Endpoint Type, Better Response, Priority) | the "label" is a **column header** with no adjacent control, so a label-walk finds nothing. Use the **value-trigger** selector — `role=button "<the cell's current/default value>"` (stable: each fresh project starts at the default) — to open the menu; the option then commits. Set a controlling cell (Endpoint Type) **before** the cells whose options depend on it (Better Response) |
| a `select` logs **OK** but the field still shows the placeholder ("Select"), then every dependent field reports **"unable to resolve"** | the value matched **no option**, so the type+Enter fallback fired — it logs OK but commits **nothing**, and a wrong **controlling** value silently starves every field it should reveal. Fix the value to a real option; the **recording** is authoritative (e.g. Study Objective is `Two Arm Confirmatory`, not the master's "…Superiority" — that is the design-page *hypothesis*) |
| a `check`/`uncheck` **never fires** though its column has a value | the `SkipIf` convention doesn't match the column's values. Checkbox columns in the SAME testdata can differ — one `TRUE`/`FALSE`, another `check`/`uncheck`. Gate each on its own convention (`…!=TRUE` vs `…!=check`), or the section it reveals never renders and the next field is "unable to resolve" |
| an administrative field (`Phase`, Program, Indication) is **absent on this app version** | the project page is app-version-dependent (fields move between General and the post-Study-Objective Plan section). Fields with **no effect on the computed design** should be `Optional=TRUE` so a missing one warns instead of failing the run |

### 7 — Scenario-conditional wiring, dialogs & recovering a real `#id` *(judgment — the GADAR cases)*

A second iteration with a **different option combination** touches fields the first never did. Each blocker is one of these patterns — none needs a code change, only correct ordering, gating, or an `N/A`.

- **Execution order is by `StepID`, not row/`Seq` order.** The loader sorts steps by `StepID` before running (`core/loaders/featureLoader.ts`). To move a step earlier, **change its StepID** — reordering rows or editing `Seq` does nothing. A controlling `select` must have a **lower StepID** than the fields it reveals.
- **A controlling select can be *reset* when you fill a dependent table.** The effect sub-method (`#hazardRatioInputMethod`) reverts to "None" — greying its effect field — *after* the input-method table is filled. Place that select **after** the table fills and **immediately before** the effect field (by StepID). Symptom: `… is disabled but testdata requires a value`.
- **A section's Input-Method dropdown must be set before its sub-fields exist.** Piecewise Dropout and Assurance each have their own `select` (e.g. `#piecewiseInputMethod` → `"Hazard Rate"`); until it is set the section renders nothing and the fills report `not found`. Add the `select`, gated on the section's data.
- **Fields that only render alongside a companion option are `N/A` when it's absent.** The per-analysis efficacy/futility checkboxes exist only when a **futility boundary** is configured; with `Futility = None` the interim table has no checkboxes, so `boundary.*.efficacyCheck` must be `N/A` (a `check` on an absent box just times out).
- **Gate every Add-Period / Add-Interim click.** An ungated one adds a blank, unfilled row and the design won't compute. Gate on the new period's key column: `SkipIf ${data.design.<table>.<idx>.<col>}==N/A`. The recording can also **mis-name** the button — it captured `role=button "Add Period"` but named it after a nearby label — so check the **selector**, not the ObjectName.
- **Enrollment "Add Period" inserts at the TOP, not the bottom.** In the Enrollment table **only**, clicking *Add Period* inserts the new blank row at the **top** and shifts the existing rows **down** (the final 100%-accrued row ends up last) — every other period table appends at the **bottom**. Any Add-Period gating, reconcile, or period-fill ordering for `enrollmentTable` must account for this top-insertion (a bottom-append assumption fills the wrong row). *(Runtime special-case handling is pending until a GADSD recording exists — author/gate around it for now.)*
- **Duplicate ids → disambiguate positionally.** Every "Add Period" button shares `id="addButton"`; `.first()` grabs the wrong one. Use a Playwright CSS `:nth-match(button:has-text("Add Period"), 2)` for the 2nd (dropout-table) one.
- **Dialogs are steps too.** *Unsaved Changes* on navigation → **Save first**, never "Leave". *Compute* (a credit dialog) → fill the **Result Name** (`#inputId`), then confirm its primary button (`#credit-alert-primary`) to start the sim — the result link is `getByRole('link', {name:<Result Name>})`, so the `Result Name` column must hold a value. Dialog buttons are frequently **not** semantic `role=button` — target them by `text` or a stable `#id`.

**Recovering a field's real `#id` from the trace** (when a valued cell reports `not found` and DevTools isn't handy). Every run writes `artifacts/<runId>/<TC>_<ITER>/trace.zip`, whose DOM snapshots carry the true ids:
```bash
unzip -o trace.zip -d /tmp/tr
grep -rohE '\["SELECT",\{[^}]*"id":"[^"]+"' /tmp/tr | grep -oE '"id":"[^"]+"' | sort -u
```
Swap `SELECT` for `INPUT` / `BUTTON` for other controls. This is how `#piecewiseInputMethod`, `#shapeParamDelta`, and `ratioOfPercSurv_Alt_SP` were found with no live browser. The hardened `select` also **prints the option list** on a mismatch — read it before guessing.

### 8 — Simulation import — the hard cases *(judgment — the GADAR sim)*

The sim runs on the **same page after a green design**, so its Design tab **inherits the computed design**. The recording captures a full re-configuration, but most of it must become *inheritance*, not re-entry. Hard-won rules (proven on GADAR(PD) TC_12, sim green end-to-end; deep detail in memory `gadar-simulation-flow`):

- **Inherit the design header — `N/A` it, do NOT re-enter it.** `sampleSize` / `numberOfEvents` / `allocationRatio` / `fixAtEachAnalysis` / `testStatistic` are **interdependent**: the app recomputes them from each other, so re-typing the sim's values makes them **revert** and the "Logrank Given Accrued Information" prior go **"Prior parameters are too extreme"** — Efficacy Z empties, the design turns invalid, and the Response tab then renders **no controls** (every later select/fill reports `not found`). Set those `simulation.csv` columns to `N/A` so the sim simulates the design **as computed**. Gate the leftover structural clicks (e.g. Randomization) on their data column too.
- **Name the SIMULATION result SEPARATELY.** The design's Result Name becomes a `/designs` **nav link**; opening the sim result by the same name matches **two** links (substring). After **Save & Simulate**, fill `#inputId` (`txt_ResultName`) with a **distinct** name (a `Sim Result Name` column, e.g. `Result - Sim - Set1`) and open the result by **that**. This fill sits **between** Save & Simulate and the credit-confirm and is the single easiest step to miss.
- **Value-drive every period table exactly like design.** Input-method / dropout / enrollment / boundary use `…Table.<n>` / `boundary.<n>` indices; gate each Add-Period on the next period's data column; `N/A` an unused period **fully**. A **mutually-exclusive branch** cell that doesn't apply this iteration (enrollment multiplier-vs-fixed, input-method hazard-rate-vs-cum%, an input-method period beyond the study's periods) is `N/A` — a stray recorded value there is the classic sim `not found`. Each of these sim period tables (including `boundarySim.*`) may likewise be authored as a normalized `simulation_<tableName>.csv` child file (`simulation_boundary.csv`, `simulation_accrual.csv`, …) that folds to the same `${data.simulation.<table>.<n>.<field>}` tokens — same contract as design (§3).
- **`waitForSimulation` uses the step `Timeout`**, not `config.simulation.maxWaitMs` — set it generous (e.g. `900000`) or a slow sim trips `SIMULATION_TIMEOUT`.
- **Two boundary tables + AG-Grid.** The analytical design's boundary is `boundary.*` (Design page); the sim's own boundary is `boundarySim.*` (Simulation Setup). The sim's **Analysis Spacing is app-computed** (information fractions from the event schedule) — overriding it is **rejected**; drive **Cum α Spent** if you must exercise a boundary recompute. Grid cells register a **typed** value (real keystrokes), not a JS `fill`. Editing a boundary clears **Efficacy Z** — you must click **Recalculate** and *verify it recomputed* (no "too extreme") before proceeding. *(The boundary-override case is still open on GADAR — see memory.)*
- **Delete app-seeded default rows before adding yours.** Some pages seed a **varying** number of defaults (BOIN scenarios). Add your record first, then `click #btn-delete0 ×N (Optional, small timeout)`; the new record is the protected last row (its delete button is *removed*, so over-clicks safely no-op "target not present"). Never hard-code a delete count.

### 9 — Repeated-modal / multi-scenario records (`loopOverData`) *(judgment)*

When a page adds **N same-kind records through one re-opened "Add …" modal** (candidate models, dose-response scenarios, arms), the modal **reuses the same DOM ids** every time, so the importer's dedup **collapses the repeats into one** and leaves N ungated open/commit clicks — a garbled, non-looping block (the importer now **warns** when it detects this fingerprint). Do **not** try to salvage the emitted block. Replace it with the **Option A** pattern: a child `01_testdata/scenarios.csv` (one row per record, keyed `TC_ID`+`IterationID`+`ScenarioIndex`) + a reusable `03_metadata/<name>_block.csv` sub-flow (fills gated `SkipIf ${runtime.loop.<col>}…`, since the blank/`N/A` auto-skip is `${data.*}`-only) + one `loopOverData` step. Full recipe: **`MULTI_SCENARIO_GUIDE.md`** (reference `feature_BOIN`, TC_14).

### 9.1 — Count-agnostic period-table FILLS (`loopPeriods`) — now the importer DEFAULT

A folded period table (`boundary.<n>.*`, `enrollmentTable.<n>.*`, `dropoutTable.<n>.*`) used to cost **one metadata fill row + one selector PER field PER period**, capped at a hand-written ceiling. **The importer now emits `loopPeriods` automatically** for an allowlist of safe per-period INPUT fields — you usually do NOTHING here. When it fires you'll see `loopPeriods: <table> → looped <fields>; wrote flows/<slug>_<table>_period.csv`, and per table it generates: one parametric selector per field (`[id="<table>.{0}.<field>"]`, `Dynamic=TRUE`), a per-field template flow `flows/<slug>_<table>_period.csv` (trailing `DynamicArgs=${runtime.period.n}` column), and a `reconcilePeriodTable` + `loopPeriods` pair (both `SkipIf ${data.<file>.<table>.0.<countField>}==EMPTY`) that REPLACES the enumerated cell fills and the per-period `Add …` clicks. Non-allowlisted cells stay enumerated, exactly as before.

> **`==N/A` vs `==EMPTY` in these gates — they differ (core `skipIf.ts`).** `SkipIf …==N/A` matches an
> empty string OR any `N/A` spelling (`isNaCell`); `SkipIf …==EMPTY` is a **strict** empty-string check.
> The reconcile/loop **count-field** gates use `==EMPTY` (they must fire whenever period 0 is present). An
> **enumerated Add-Period / Add-Interim** gate uses `==N/A`, so it skips **both** an ABSENT child-table
> period (which folds to `''`) AND a *present* period whose method cell is a literal `N/A` — which is why a
> survival table with mutually-exclusive methods (e.g. GADAR dropout) gates on `==N/A`, not `==EMPTY`.
> (Before the 2026-08-23 isNaCell fix, `==N/A` was a literal compare that let a blank absent-period slip
> past; that is fixed. Still author the literal `N/A` in not-applicable cells — it keeps the CSV self-documenting.)

**The allowlist is `PERIOD_LOOP_CONFIG` in `scripts/import-codegen.ts`** — the ONE place to change coverage:
- **ON:** `boundary` (`analysisSpacingInfo`, `efficacyCheck`, `futilityCheck`), `enrollmentTable` (`startingAtTime`, `avgSubjectsEnrolled`), `dropoutTable` (its raw inputs).
- **OFF:** `inputMethodTable` (`enabled:false` — dense mutually-exclusive input methods; prove it, then flip `enabled`).
- **Never:** `boundarySim` (absent) — the sim boundary's spacing is app-computed and its Z/p-values are outputs; leave it enumerated/assert-only.

**Why the allowlist (the SAFETY rule):** only loop fields that are a TRUE per-period INPUT at every look. A field that is editable at period 0 but a **computed/greyed output at higher looks** in some boundary families (per-analysis p-values, α/β-spent, boundary-Z, the family futility parameter) must stay **enumerated** — a blanket loop would type into a greyed cell and fail. This is why numeric boundary fields are deliberately absent from the config.

**To extend coverage:** add a field to a table's `fields` (or flip a table `enabled`), re-import a feature that uses it, `validate`, and screenshot-verify one run (greyed period-0 cells must auto-skip). Values route through the ordinary core `fill`/`check`, so read-back/retry/N/A-skip are inherited. **Proven on `feature_ROP(PD)` TC_21**; the importer reproduces that exact shape.

**Hand-authoring (rare — only for a table the config can't cover):** one parametric selector per field; a template flow driven by `${runtime.period.<field>}` with `DynamicArgs=${runtime.period.n}` (checkbox rows gated `SkipIf ${runtime.period.<field>}!=check`/`!=uncheck`); one `loopPeriods` step (`ObjectName=<parentFile>`, `InputValue=flows/…`, `ExpectedValue=<table>|<countField>`); and `reconcilePeriodTable` BEFORE it (`<file>|<table>|<countField>|<addLabel>[|excludeDisabled]`) — reconcile ADDS the rows, loop FILLS them, in StepID order.

---

## Worked family reference — two-arm continuous "Difference of Means" (DOM / ROM / ROPR)

*Proven end-to-end on `feature_DOM(PD)` TC_03, FULLY GREEN 2026-08-13: all 10 designs PASS-verified; all 7
defined sims (ITER_01–07, incl. CHW/CDL adaptive) run + baseline; ITER_08/09/10 are design-only (no sim data
yet). ITER_02 = 2-Sided-Asymmetric, ITER_05 = CHW SSR, ITER_06 = CDL SSR. This family is the sibling of the
survival family (GADAR/GADSD) — the SAME project → input-set → design → boundary → enrollment → save → compute →
result flow; only the effect section differs (means + variance/SD instead of hazard ratios). Import a new
means/continuous feature the same way and expect every note below. A lesser model can follow this section
verbatim.*

**1. Config coupling (settle it first).** The importer ends the design flow with `callCustom
extractAllResultTables` + `compareWithBaseline` (GENERIC shape `TableName/RowLabel/ColumnName/Value`) and
OVERWRITES `00_config/feature.config.json` to a skeleton. Keep the three coupled: generic tail ⇄ generic
`compare.config.csv` (that 4-column fingerprint) ⇄ `feature.config.json` with `columnMap:{}`. If a stale
STRUCTURED config is lying around, do NOT restore it — mirror the green sibling: `serial:true,
reuseAuthState:false, resultsExtraction.mode:"domTable", columnMap:{}, sortBy:[]`. `extractAllResultTables`
and `selectStartDate` come from `custom/_shared/` (callCustom resolves feature > shared per keyword), so the
feature's own `customSteps.ts` holds only its NEW handlers (e.g. a boundary reconcile).

**2. The "no new columns" pass is now automatic** — the importer wires each of these to your
existing column by **id or label** and adds nothing. This table is the reference for what the
fields ARE, so that if one shows up `UNWIRED` (your column is named something else entirely) you
know which column to point it at. You no longer back up / restore testdata around the run.

| recorded field (id / label) | real field id | existing column |
|---|---|---|
| `react select input container` | `.react-select__input-container` | `${data.inputset.SelectTest}` (the test card) |
| `collectionName` | `#collectionName` | `${data.inputset.InputSetname}` |
| `Noninferiority Margin (δ0…` / `Super Superiority Margin (δ0…` | `#nonInf_margin` / `#supsup_margin` | `nonInf_margin` / `supsup_margin` |
| `E` / `SD` (bare 1-letter labels) | `#eDelta` / `#sdDelta` | `eDelta` / `sdDelta` (assurance prior) |
| `Efficacy Boundary Family` / `Spending Function` | `#effBoundaryFam` / `#effSpendFunc` | `effBoundaryFam` / `effSpendFunc` (dups of `ddl_eff_*`) |
| `Include` (under the Enrollment tab) | role checkbox "Include" | `IncludeEnrollment` |
| `enrollmentTable.0.avgSubjectsEnrolled` | that id | scalar `avgSubjectsEnrolled` (design enrollment is single-period) |
| `Result Name` | `#inputId` / result link | runtime token `<Feat>_Result_${iterationId}` (no column) |
| `1`, stray `Mean Treatment (μt0)` clicks | — | GARBAGE — drop the step |

**3. VERIFY each reused token against the selector's real #id.** The importer binds a fill to whichever
existing column shares its truncated label; on a shared prefix it guesses WRONG. Read each step's `#id` in
selectors.csv and fix the token to the id, not the label: `#sdControl`/`#sdTreatment` (not `standardDeviation`);
`#nonInf_differenceInMeans` (not `differenceInMeans`); `#effParamRho`/`#effParam` (not `Computed Parameter`).

**4. Project page — five silent failures.**
- **Study Objective is `Two Arm Confirmatory`, NOT the master's "Two Arm Superiority"** (Superiority is the
  design-page `hypothesis`). A wrong option makes the `select` type+Enter fallback log OK but commit NOTHING,
  so every downstream field then reports "unable to resolve". The recording is authoritative.
- **Endpoint Type / Better Response are TABLE-CELL dropdowns** — open via the value-trigger selector
  (`role=button "Time to Event"` / `"Larger Value"`, the fresh-project default), NOT a label-walk. Set
  Endpoint Type BEFORE Better Response (its options depend on it).
- **Endpoint Name strips underscores** (`EP_Cont`→`EPCont`) though Project Name keeps them — administrative
  label, use a value the field accepts.
- **`Phase`/Program/Indication are app-version-dependent** — make administrative project fields `Optional=TRUE`
  (they don't affect the computed design).
- **Computed Parameter is a RADIO group** — `check opt_Computed_Parameter ${data.design.Computed Parameter}`
  with a Dynamic `{0}` role=radio selector; the greyed solved-for field's cell is `Computed` (auto-skips).

**5. Checkbox columns can use DIFFERENT conventions in the SAME testdata.** DOM `includeAssurance`=TRUE/blank
but `IncludeEnrollment`=check/uncheck. Gate each `check`/`uncheck` on its own convention (`…!=TRUE` vs
`…!=check`) — a mismatch silently skips the toggle and the section it reveals never renders.

**6. 2-Sided (Asymmetric) efficacy boundary** (Test-Type-gated; SkipIf supports exact `==`/`!=`):
- Type 1 Error splits into `#upperType1Error`/`#lowerType1Error` (fill after Test Type). Single `#type1Error`
  is N/A on asymmetric.
- Efficacy family is **`#asymEffBoundaryFam`** (NOT `#effBoundaryFam`); the spend function splits into
  `#upperSpendFunc`/`#lowerSpendFunc`.
- **Interpolated** spend REQUIRES per-analysis cumulative alpha `[id="boundary.<n>.upperAlpha"]` /
  `[id="boundary.<n>.lowerAlpha"]` at each interim (Final auto-fills). Omit them → "Upper/Lower α is required",
  the design never computes, Enrollment's Include checkbox times out.
- Recover unknown cell ids from `artifacts/<run>/<TC>_<ITER>/trace.zip`:
  `grep -rohaE '"id":"boundary\.[0-9]+\.[a-zA-Z]+"'`.

**7. Boundary interims vary 0→8 per iteration** → data-driven `reconcileBoundaryInterims` (count non-N/A
`boundary.<n>.analysisSpacingInfo` = target; count ENABLED analysisSpacingInfo inputs live, excluding the
disabled 100% Final; click "Add Interim" to match). Runs before the per-period fills; the Final is auto, NOT
a testdata row. Boundary checkbox toggles go LAST, just before Calculate.

**8. Simulation flow** (DOM sim is ADAPTIVE / SSR). Import `--sim`; then:
- The sim boundary DOM ids are `boundarySim.*`, but a `simulation_boundary.csv` child folds to `boundary.*` —
  **rename the child to `simulation_boundarySim.csv`** so it folds to `boundarySim.*` matching the ids, then
  restore simulation.csv (drop the importer's inline `boundarySim.*` columns).
- Remap recorded-label tokens to the sim testdata's real columns (`upperLimitStudyDuration`→`Upper Limit on
  Study Duration`, `refCPChart`→`Reference HR for CP Chart`, `meanControl`→`meanCtrl`, `meanTreatment`→`meanTrmt`,
  `sdControl`→`stdDeviationCtrl`, `sdTreatment`→`stdDeviationTrmt`, `probabilityOfDropout`→`probOfDropout`).
- Give the sim TWO distinct runtime result-names (setup at the Simulate click; result at Save & Simulate — the
  importer captures only the first, so ADD the 2nd `#inputId` fill before the credit confirm) so the sim result
  link never collides with the design's.
- Drop bare cell-CLICK steps (token-less `click txt_boundarySim.*` grid noise) — but NEVER delete the
  `credit_alert_primary` confirms or the `leftPanel.*` nav clicks (also named `txt_*` yet essential).
- Drop only token-less `click txt_boundarySim.*` grid clicks (recording noise); NEVER delete the
  `credit_alert_primary` confirms or `leftPanel.*` nav clicks (also named `txt_*` but essential to the flow).
- **GADAR Recalculate fix DOES apply** (proven on DOM ITER_01 sim): editing the header/boundary and clicking
  Recalculate BEFORE the Response tab is mounted → "prior parameters are too extreme" (then an Unsaved-Changes
  dialog that blocks the next tab-nav). Fix: MOUNT the Response tab (click `leftPanel.response`, let it bind,
  return to `leftPanel.designs`) BEFORE any header edit, while the inherited design is still clean (no dialog).
  DOM DOES re-enter the header (it's adaptive) — that part is fine; the "too extreme" is purely the un-mounted
  Response model.
- **Separate tabs — click the leftPanel id before each field block** (a valid state navigates with no dialog):
  `[id="leftPanel.response"]` (distribution/means/SD), `[id="leftPanel.enrollment"]` (accrual),
  `[id="leftPanel.simulation-setup"]` (seed/sim-runs — HYPHENATED id; the recording reached it via a goto that
  `--sim` drops). Sim boundary INHERITS the design's rows (no Add-Period).
- **Response tab**: uncheck `#commonStandardDeviation` (testid) to enable per-arm `#sdControl`/`#sdTreatment`.
- **Enrollment tab**: `#includeSwitch` ON reveals the accrual table (1 row) → a custom reconcile (count sim
  `enrollmentTable.<n>` periods, click "Add Period", INTEGER StepID before the fills) → fill each row's
  `avgSubjectsEnrolled` AND `startingAtTime` (a missing per-period startingAtTime shows "Starting At Time is
  required" and blocks the next nav).
- **Simulation Setup**: `saveSubjectLevelData` (testid checkbox) ON to enable `#subLevelDataSimRuns` (+
  `saveSummaryStats`). Then Save → Save & Simulate → the (2nd, distinct) result name → credit → waitForSimulation.

**8b. ADAPTIVE (CHW/CDL) sample-size re-estimation — the "Save & Simulate stays disabled" trap** (proven on
DOM ITER_05=CHW / ITER_06=CDL; whole feature green 2026-08-13). Only the adaptive iterations show the SSR
(Sample-Size-Re-Estimation) panel, so a non-adaptive recording never captured it. Four silent blockers:
- **Include Enrollment MUST be checked or the adaptive design is INVALID and `#save-compute` (Save & Simulate)
  stays DISABLED.** It looks like a timing/flaky bug (the button never actuates) but it is a CONFIG invalidity.
  Proof: sim `Include Enrollment=uncheck` → button disabled 56s+; `=check` → enabled in ~13ms. Mirror the DESIGN's
  enrollment into the sim (`Include Enrollment=check`); the app's DEFAULT 1-row accrual is enough — no child
  `simulation_enrollmentTable` rows required (the reconcile no-ops, the per-period fills skip on blank).
- **Wait for `#save-compute` to be ENABLED before clicking it.** The plain `click` auto-waits ~10s then
  FORCE-clicks, and force CANNOT actuate a `disabled` button. Add a custom `waitAndInspectSaveSimulate` that polls
  `isEnabled()` up to ~60s and, on timeout, DUMPS the reason (visible toasts, spinner, `[aria-invalid]`/error text,
  the button outerHTML, "Not Saved") then throws — a silent "element is not enabled" becomes diagnosable.
- **Settle after EACH SSR dropdown** (Adaptation Method, Adapt At, Interim #, Enroll-Rate-After-Adapt,
  Promising-Zone Scale, CP-Computation-Based-On). Driving them faster than the app recomputes fires the toast
  **"Unable to convert values. Reverting to defaults."** (the Scale select CONVERTS the promising-zone min/max),
  corrupting the design so Save & Simulate never re-enables. A 0.7–1.2s sleep after each avoids it.
- **Wire the SSR controls the recording missed** (mirror GADAR): `cpComputationBasedOn`→`#cpComputationBasedOn`
  (native select, value-matched), `numOfSimRun`→`input[name="numOfSimRun"]`. While `numOfSimRun` is unwired the
  app default (10000) runs, IGNORING the testdata count — wiring it CHANGES results, so re-baseline every sim
  built before it was wired.

**8c. Baselines are ENVIRONMENT-SPECIFIC.** They live under `06_baseline/<env>/` but are tied to the ACTUAL
server the `.env` points to. Swapping `.env` to a different East Horizon instance → design `VALUE_MISMATCH` on the
sensitive designs (2-Sided-Asymmetric, Wang-Tsiatis) **plus** 220s login/nav `waitForSelector` timeouts if that
instance is flaky (a full DOM run on the wrong env = 5 fails: 2 login timeouts, 2 complex-boundary mismatches, 1
checkbox timeout; the identical suite on the correct env = 0 fails). When comparisons start failing after any
`.env` change, confirm `.env` points to the env the baselines were built on BEFORE touching data or selectors.
The sim chains only for iterations that have a `simulation.csv` row with `Run=TRUE`; a row-less iteration
auto-skips ("no simulation.csv row"), so design-only and sim iterations coexist under one master `Simulation=YES`.

## What is deterministic vs. judgment (why this split scales)

| Deterministic — the **importer** does it | Judgment — the **agent/QA** does it |
|---|---|
| capture selectors, generate steps + tokens | consolidate a toggling superset recording |
| wire fields to existing columns by **id or label**; warn on `UNWIRED` (never invent columns) | resolve each `UNWIRED` field: add the real column, gate it, or drop noise |
| backfill identity, unique names, `serial` | add steps for computed/label-only fields; find their `#id` |
| validate structure | screenshot-verify; fix grid/timing/id issues |

Keep the importer deterministic and **guarded** (additive changes, no per-feature logic). Push
everything that needs *seeing the page* or *understanding intent* into this agent pass. That's
what lets it handle a new feature **without destabilising the ones already committed**.

---

## Guardrails checklist (run before you finish)
- [ ] Only the target feature's files + its `master.csv` row changed.
- [ ] **No `UNWIRED` fields remain** in the last import run (or each was deliberately dropped/gated).
- [ ] Testdata columns are the ones **you authored** — the import added none (no `--seed` over real data).
- [ ] **[IMPORT_LESSONS.md](IMPORT_LESSONS.md) read before wiring, and any new judgment call / user correction appended** as a rule.
- [ ] `npm run validate` passes for **all** features (not just this one).
- [ ] **User approval obtained before any live run**; iterations run **one at a time**; on error, analyse then fix by tier — minor metadata/selector fixes **autonomously** (reported), but **testdata** edits and **major/other-file** changes only **with user approval** (§5a).
- [ ] Each iteration screenshot-verified; blank/`N/A` skipped, valued fields landed.
- [ ] No `recording.txt` / `.env` / `.auth` staged for commit.
- [ ] Baseline reviewed by a human before it's trusted — and built on the SAME `.env` server it will be compared against (baselines are env-specific; an `.env` swap invalidates them, §8c).
- [ ] Adaptive (CHW/CDL) sim: `Include Enrollment=check`, SSR dropdowns settled, and a wait-for-enabled before Save & Simulate (§8b).
