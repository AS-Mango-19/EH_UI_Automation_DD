# EH UI Automation — Framework KT

A complete working reference for the CSV-driven Playwright regression framework.
Read this top to bottom once and you will understand how a test runs, how to add
one, and where the sharp edges are.

- **Audience:** QA engineers and developers joining the project.
- **Reference features (all working end-to-end):**
  - `feature_ROM(PD)` (`TC_04`) — the canonical single-iteration example. When in
    doubt, copy it.
  - `feature_SinglePoissonRate` (`TC_01`) — a **multi-iteration** example (two
    iterations that compute different parameters), showing the `Computed` rule
    (§6.2) and per-iteration unique names.
  - `feature_Simon2Stage` (`TC_02`) — a group-stage design with a native `<select>`.
  - `feature_MeanofPairedRatios` (`TC_05`) — the **conditional-fields, multi-scenario**
    example: one metadata, four iterations (Superiority/Non-Inferiority × Ratio-of-Means/
    Individual-Means), driven entirely by `N/A` cells and disabled-field skips (§6.3, §4.5).
  - `feature_BOIN` (`TC_14`) — the **repeated-modal / multi-scenario** example: 1..N
    candidate-model scenarios entered through a single re-opened "Add Scenario" modal (Emax /
    4PL / Quadratic / Linear / General), driven by a child `01_testdata/scenarios.csv` + a
    reusable `03_metadata/scenario_block.csv` sub-flow + **one `loopOverData` step** ("Option A").
    Also shows **data-driven dose entry** (each Add-Dose gated on the iteration's dose count).
    Full recipe: **`MULTI_SCENARIO_GUIDE.md`**.
- **Every claim here is code-backed.** File and line references are given so you
  can verify rather than trust.

---

## Contents

**In a hurry?** → [Run a test](#2-quick-start) · [Add a feature](#13-adding-a-new-feature) · [AI import agent](#139-the-ai-agent-path--import-feature) · [All commands](#14-command-reference) · [Share a report](#111-sharing-a-report--use-npm-run-reportshare) · [Something broke](#16-where-to-look-when-something-breaks) · [Traps](#15-traps-and-known-issues)

| § | Section | What's in it |
| --- | --- | --- |
| 1 | [The idea in one page](#1-the-idea-in-one-page) | The mental model. Start here. |
| 2 | [Quick start](#2-quick-start) | The three commands you need on day one. |
| 3 | [Repository layout](#3-repository-layout) | What every folder is for. |
| 4 | [The CSV layers](#4-the-csv-layers) | **Reference tables for every column.** |
| 5 | [How a run executes](#5-how-a-run-executes) | CLI → validation → runner → report. |
| 6 | [The keyword catalog](#6-the-keyword-catalog) | Every `Action` you can write in a step. |
| 7 | [Selector resolution](#7-selector-resolution) | How a name becomes a Playwright locator. |
| 8 | [Variable interpolation](#8-variable-interpolation) | Every `${...}` token that exists. |
| 9 | [Baseline and compare](#9-baseline-and-compare) | The point of the framework. |
| 10 | [Environments and auth](#10-environments-and-auth) | How `AD` is chosen, and login. |
| 11 | [Reports and artifacts](#11-reports-and-artifacts) | What is written where, and sharing. |
| 12 | [Extension points](#12-extension-points) | Reusable flows and custom steps. |
| 13 | [Adding a new feature](#13-adding-a-new-feature) | **Two paths — manual importer + the AI agent (§13.9).** Step-by-step. |
| 14 | [Command reference](#14-command-reference) | Every command and flag. |
| 15 | [Traps and known issues](#15-traps-and-known-issues) | **Read before debugging.** |
| 16 | [Where to look when something breaks](#16-where-to-look-when-something-breaks) | Symptom → where to look. |
| 17 | [Glossary](#17-glossary) | Terms used throughout. |

<details>
<summary><strong>Full index (every subsection)</strong></summary>

- **[1. The idea in one page](#1-the-idea-in-one-page)**
- **[2. Quick start](#2-quick-start)**
- **[3. Repository layout](#3-repository-layout)**
- **[4. The CSV layers](#4-the-csv-layers)**
  - [4.1 `master.csv` — the test registry](#41-mastercsv--the-test-registry)
  - [4.2 `feature.config.json` — feature behaviour](#42-00_configfeatureconfigjson--feature-behaviour)
  - [4.3 `metadata.csv` — the steps](#43-03_metadatametadatacsv--the-steps) · [`Seq` is documentation only](#431-seq-is-documentation-only) · [the `Screenshot` column does nothing](#432-the-screenshot-column-does-nothing)
  - [4.4 `selectors.csv` — the locators](#44-02_selectors_reposelectorscsv--the-locators)
  - [4.5 `01_testdata/*.csv` — the values](#45-01_testdatacsv--the-values)
  - [4.6 `compare.config.csv` — the compare rules](#46-06_baselinecompareconfigcsv--the-compare-rules)
- **[5. How a run executes](#5-how-a-run-executes)**
- **[6. The keyword catalog](#6-the-keyword-catalog)**
  - [Navigation](#navigation) · [Input](#input) · [Wait](#wait) · [Capture](#capture) · [Assert](#assert) · [Flow](#flow) · [API / Comparison](#api--comparison)
  - [6.1 `select` — read this before touching a dropdown](#61-select--read-this-before-touching-a-dropdown)
  - [6.2 `fill` — every value must land, and the `Computed` rule](#62-fill--every-testdata-value-must-land-and-the-computed-rule)
  - [6.3 Disabled fields, grid cells, and the skip rules at a glance](#63-disabled-fields-grid-cells-and-the-skip-rules-at-a-glance)
- **[7. Selector resolution](#7-selector-resolution)**
  - [7.1 Types and priority](#71-types-and-priority)
  - [7.2 FallbackSelector](#72-fallbackselector)
  - [7.3 `Exact` — the substring trap](#73-exact--the-substring-trap)
  - [7.4 `Dynamic` and `{0}`](#74-dynamic-and-0)
- **[8. Variable interpolation](#8-variable-interpolation)**
- **[9. Baseline and compare](#9-baseline-and-compare)**
  - [9.1 Where](#91-where) · [9.2 Lifecycle](#92-lifecycle) · [9.3 Modes](#93-modes)
  - [9.4 The trap that will fool you](#94-the-trap-that-will-fool-you)
- **[10. Environments and auth](#10-environments-and-auth)**
  - [10.1 How the env is chosen](#101-how-the-env-is-chosen)
  - [10.2 `reuseAuthState`](#102-reuseauthstate)
- **[11. Reports and artifacts](#11-reports-and-artifacts)**
  - [11.1 Sharing a report — use `npm run report:share`](#111-sharing-a-report--use-npm-run-reportshare)
- **[12. Extension points](#12-extension-points)**
  - [12.1 Reusable flows — `flows/*.csv`](#121-reusable-flows--flowscsv)
  - [12.2 Custom steps — `custom/<Feature>/customSteps.ts`](#122-custom-steps--customfeaturecustomstepsts)
- **[13. Adding a new feature](#13-adding-a-new-feature)**
  - [Step 1 — Record the flow](#step-1--record-the-flow)
  - [Step 2 — Import](#step-2--import)
  - [Step 3 — Register the test](#step-3--register-the-test)
  - [Step 4 — Review testdata](#step-4--review-testdata)
  - [Step 5 — Validate](#step-5--validate-no-browser-2s)
  - [Step 6 — First run: create the benchmark](#step-6--first-run-create-the-benchmark)
  - [Step 7 — Approve the benchmark](#step-7--approve-the-benchmark)
  - [Step 8 — Real runs](#step-8--real-runs)
  - [What still needs a human](#what-still-needs-a-human)
  - [13.9 The AI agent path — `/import-feature`](#139-the-ai-agent-path--import-feature)
- **[14. Command reference](#14-command-reference)**
  - [Everyday](#everyday) · [`test` flags](#test-flags-corecliargsts) · [Authoring a feature](#authoring-a-feature) · [Sharing results](#sharing-results-111) · [Maintenance](#maintenance)
- **[15. Traps and known issues](#15-traps-and-known-issues)**
- **[16. Where to look when something breaks](#16-where-to-look-when-something-breaks)**
- **[17. Glossary](#17-glossary)**

</details>

---

## 1. The idea in one page

**Tests are data, not code.** A test is a row in `master.csv` plus a few CSVs in a
feature folder. Nobody writes a `.spec.ts` by hand.

```
master.csv            WHICH tests exist, and which run
   |
   v
00_config/feature.config.json    HOW this feature behaves (auth, results, cleanup)
   |
   v
03_metadata/metadata.csv         WHAT the test does — the ordered steps
   |
   v
02_selectors_repo/selectors.csv  WHERE things are — logical name -> locator
   |
   v
01_testdata/*.csv                WHICH values to type
   |
   v
06_baseline/<env>/               WHAT the answer should be (the benchmark)
```

The engine reads those five layers and drives the browser. The separation is the
whole point:

- A **step** never contains a selector — it names an object (`btn_Save`).
- A **selector** never contains a value — the step supplies it.
- A **value** never lives in a step — it comes from testdata (`${data.project.Phase}`).

So when the UI moves, you edit one row of `selectors.csv`. When the data changes,
you edit `01_testdata/`. Neither touches the framework.

**§14, the rule that keeps this honest:** framework core (`core/`) must never
contain anything app-specific — no selectors, no URLs, no business logic. If you
need app-specific behaviour, it goes in `custom/<Feature>/customSteps.ts` or the
CSVs. Core stays generic.

---

## 2. Quick start

```bash
npm run validate                      # check every CSV without opening a browser (~2s)
npm run test -- --testcase TC_04      # run one test case
npm run test -- --tags smoke          # run by tag
npm run test -- --all                 # run everything marked Execute=TRUE
```

After a run:

| Where | What |
| --- | --- |
| `ProductDesign/feature_ROM(PD)/09_html_report/index.html` | per-step report with screenshots |
| `reports/<runId>/results.json` | machine-readable result |
| `artifacts/<runId>/<TC>_<ITER>/` | screenshots, trace, video |

**Always read the status string, never the exit code.** See §9.4 — a run can exit
`0` while verifying nothing.

---

## 3. Repository layout

```
master.csv                     the test registry
.env                           BASE_URL, credentials (gitignored)
flows/login.csv                reusable step flows (callReusable)
custom/<Feature>/customSteps.ts app-specific hooks (callCustom)

config/
  framework.config.ts          framework-wide defaults
  environments.ts              .env loading + env resolution

core/                          THE ENGINE — generic, never app-specific (§14)
  cli/          index.ts, args.ts          entry point + flag parsing
  schema/       *.schema.ts, validator.ts  CSV shapes + pre-flight validation
  loaders/      featureLoader.ts           reads the CSV layers
  locators/     resolver.ts                selectors.csv -> Playwright Locator
  keywords/     catalog.ts, registry.ts, <group>.ts   every Action
  runner/       orchestrator.ts, iterationRunner.ts, stepRunner.ts, context.ts
  comparator/   baseline.ts, runCompare.ts  benchmark compare
  reporters/    featureHtml.ts, combinedHtml.ts
  generators/   pom.generator.ts, spec.generator.ts

scripts/
  import-codegen.ts            codegen recording -> a working feature
  scaffold-feature.ts          empty feature tree
  codegen.ts                   launches Playwright codegen

ProductDesign/feature_<Name>/
  00_config/feature.config.json
  01_testdata/*.csv
  02_selectors_repo/selectors.csv
  03_metadata/metadata.csv
  04_generated_pom/            generated, do not edit
  05_generated_scripts/        generated, do not edit
  06_baseline/<env>/           the approved benchmark
  06_baseline/compare.config.csv
  07_actual_results/           what this run captured
  08_diffs/                    baseline vs actual differences
  09_html_report/index.html    the report
```

> **Folder numbering:** `02_selectors_repo` and `03_metadata`. The numbers are
> labels, not load order. Defined in `core/utils/paths.ts:18-36` (`featurePaths`).

---

## 4. The CSV layers

### 4.1 `master.csv` — the test registry

One row per test case. Schema: `core/schema/master.schema.ts`. The schema is
`.passthrough()` (line 46) and every non-required column defaults when blank, so
**extra columns are safe and column order does not matter** — `core/csv/reader.ts`
maps by header *name*.

| Column | Required | Default | Meaning |
| --- | --- | --- | --- |
| `TC_ID` | **yes** | — | Unique id, e.g. `TC_04`. What `--testcase` matches. |
| `Module` | **yes** | — | Top folder, e.g. `ProductDesign`. |
| `Feature` | **yes** | — | Resolves to `<Module>/feature_<Feature>/`. |
| `Execute` | no | `FALSE` | Whether `--all` runs it. `--testcase` **ignores** this. |
| `Tags` | no | `''` | For `--tags`. OR `,` · AND `+` · NOT `~`. |
| `Browser` | no | `chromium` | `chromium` \| `firefox` \| `webkit`. |
| `Environment` | no | `''` | Env name. **Selects `.env.<env>` AND `06_baseline/<env>/`.** Currently `AD`. |
| `BaselineMode` | no | `compare` | `compare` \| `create` \| `update`. |
| `MetadataFile` | no | `03_metadata/metadata.csv` | Relative to the **feature** dir. Default at `config/framework.config.ts:18`. |
| `TestDataFile` | no | `''` | The testdata **directory**. Accepts either the folder (`01_testdata`) or a file inside it (`01_testdata/inputset.csv`) — both resolve to the folder, and the whole folder is loaded. Blank → default `01_testdata`. |
| `ProjectID` | no | `''` | Reuse an existing project instead of creating one. |
| `StudyObjective`, `Priority`, `IterationID`, `DependsOn`, `Owner`, `Description` | no | `''` | Metadata / gating. |

Current contents (one row per working feature):

```csv
TC_ID,Module,Tags,StudyObjective,Feature,ProjectID,Browser,TestDataFile,MetadataFile,Execute,Environment
TC_01,ProductDesign,regression,One Arm Exploratory / Confirmatory,SinglePoissonRate,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD
TC_02,ProductDesign,regression,One Arm Exploratory / Confirmatory,Simon2Stage,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD
TC_03,ProductDesign,regression,Two Arm Superiority,Difference_of_Means,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD
TC_04,ProductDesign,regression,Two Arm Confirmatory,ROM(PD),,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD
```

> **Trap.** Validation checks **every** row regardless of `Execute`
> (`core/schema/validator.ts:45` has no filter), and any issue aborts the whole
> run (`core/cli/index.ts:66-71`). A broken feature you are not running still
> stops the one you are.

### 4.2 `00_config/feature.config.json` — feature behaviour

Schema: `core/schema/featureConfig.schema.ts`.

| Key | Meaning |
| --- | --- |
| `feature`, `module` | Identity. |
| `serial` | Run iterations one at a time. **Keep this `true`** — the app allows only **one active session per user**, so two iterations logging in at once force each other out ("another session started from a different location"). The importer now defaults it to `true`. See Trap 15. |
| `reuseAuthState` | `true` = log in once in a **separate** browser, save `.auth/<env>.json`, reuse it. `false` = one browser, log in inline via a `callReusable` step. Features use **false** — see §10.2. |
| `testdata.files` | Logical name -> CSV. `{inputset, project, design}` become the `${data.<name>.<Column>}` namespaces. |
| `testdata.joinKey` | How a testdata row is matched to an iteration — `["TC_ID","IterationID"]`. |
| `simulation` | `pollObject`, `successText`, `failureText`, `pollIntervalMs`, `maxWaitMs` for `waitForSimulation`. |
| `resultsExtraction` | Shape of result capture (`mode`, `domTableObject`, `outputFileName`, ...). |
| `cleanup.deleteCreatedProjects` | Delete projects the run created. |

### 4.3 `03_metadata/metadata.csv` — the steps

One row per step. Schema: `core/schema/metadata.schema.ts:29`.

| Column | Default | Meaning |
| --- | --- | --- |
| `Seq` | — | **Documentation only.** Human 1,2,3 ordering. Not in the typed model (§4.3.1). |
| `StepID` | required, integer | Execution order — rows are **sorted by StepID**, not file order. Gapped (10, 20, 30) so steps can be inserted without renumbering. |
| `StepGroup` | required | One of `Login`, `CreateProject`, `OpenProject`, `CreateInputSet`, `ConfigureDesign`, `Simulate`, `ExtractResults`, `CompareBaseline`, `Cleanup` (`metadata.schema.ts:10-20`). |
| `Page` | `-` | Namespaces `ObjectName` in selectors.csv. `(Page, ObjectName)` is the lookup key. |
| `Action` | required | A keyword — see §6. |
| `ObjectName` | `''` | The logical object, resolved via selectors.csv. |
| `InputValue` | `''` | The value / path / flow name. Supports `${...}` tokens (§8). |
| `StoreAs` | `''` | Save a captured value under this name. |
| `AssertType`, `ExpectedValue` | `''` | For assert / wait keywords. |
| `WaitCondition` | `''` | `visible` \| `hidden` \| `domcontentloaded` \| ... |
| `Timeout` | `30000` | Per-step timeout in ms (`framework.config.ts:8`). |
| `Optional` | `FALSE` | `TRUE` = failure does not fail the test. |
| `Retry` | `0` | Retries for this step. |
| `Screenshot` | `never` | **Currently dead — see §4.3.2.** |
| `SkipIf` | `''` | Skip when the condition holds. |
| `Description` | `''` | Why. Shown in the report. Keep commas out or quote the field. |

#### 4.3.1 `Seq` is documentation only

`MetadataStepSchema` is a bare `z.object()` with **no** `.strict()`, so zod
silently strips unknown keys. `Seq` therefore never reaches the typed model and
**cannot** drive ordering — `StepID` does. Two consequences:

- Adding `Seq` is backwards compatible and cannot break parsing.
- The report's Seq column is numbered at **render time** from the array index
  (`core/reporters/featureHtml.ts`), not from this column. It must be, because the
  report also shows steps inlined from `flows/login.csv`, which have no metadata row.
- **So metadata Seq and report Seq differ.** ROM(PD) metadata Seq 1 (StepID 5) is
  report Seq 10, because the login flow's 9 child steps render before their parent.

#### 4.3.2 The `Screenshot` column does nothing

`core/runner/stepRunner.ts` screenshots **every** step unconditionally — the only
guard is `if (!ctx.page)`. It reads `step.StepID` for the filename and never reads
`step.Screenshot`. Proof: a run captured 60/60 steps while 46 rows said `never`.

The column is parsed (`metadata.schema.ts:46`) and then discarded. All ROM(PD)
rows are now set to `always` so the data matches reality — if the policy is ever
implemented, behaviour will not silently change.

### 4.4 `02_selectors_repo/selectors.csv` — the locators

One row per UI object. Schema: `core/schema/selectors.schema.ts`.

| Column | Default | Meaning |
| --- | --- | --- |
| `ObjectName` | required | Logical name. Convention: `btn_`, `txt_`, `ddl_`, `chk_`, `opt_`, `lnk_`, `tbl_`, `lbl_`, `div_`. |
| `Page` | required | Namespace. `(Page, ObjectName)` must be unique. |
| `SelectorType` | required | `testid` \| `role` \| `label` \| `placeholder` \| `text` \| `css` \| `xpath`. |
| `SelectorValue` | required | The selector, or the role for `role` type. |
| `RoleName` | `''` | Accessible name when `SelectorType=role`. |
| `FallbackSelector` | `''` | Used if the primary matches 0 elements — **and logs a UI-DRIFT warning**. |
| `Dynamic` | `FALSE` | Enables `{0}` substitution in **both** SelectorValue and RoleName. |
| `Description` | `''` | Required in practice for `xpath` (validator warns without it). |
| `Exact` | `FALSE` | Force exact accessible-name matching. **See §7.3 — this one bites.** |

### 4.5 `01_testdata/*.csv` — the values

Keyed by `joinKey` (`TC_ID` + `IterationID`). Each file becomes a namespace:
`project.csv` -> `${data.project.<Column>}`. Column names may contain spaces
(`${data.project.Time Unit}`).

**Multiple iterations.** One TC runs once per distinct `IterationID` in the
testdata. Two rows (`ITER_01`, `ITER_02`) → two runs of the same steps with
different values. Iterations are the **union** of `IterationID`s across the files.

**The `Run` column — switching one iteration off.** An optional `Run` column
parks an iteration without deleting its data. `TRUE` / `1` / `YES` / `Y` **and
blank** all mean *run it* — the column is opt-**out**, so a row is on unless you
explicitly say `FALSE`.

You only need the column in **one** file (`project.csv` by convention). Because
the iteration list is a union, `Run` is a **veto**: `FALSE` anywhere switches that
iteration off for the whole feature, and a file without the column cannot switch
it back on. Keeping the flag in one place is the intended usage — you do not
repeat it across `design.csv` / `inputset.csv`.

| `project.csv` | result |
| --- | --- |
| `TC_05,ITER_02,FALSE,...` | ITER_02 is skipped; the other iterations still run |
| `TC_05,ITER_02,,...` | blank → ITER_02 **runs** |
| every row `FALSE` | the test case runs **nothing** (not a phantom `ITER_01`) |

Leave the row in place — deleting it instead would trip the iteration-completeness
error below, because the other keyed files still have a row for that iteration.

Two rules the validator enforces so a half-authored multi-iteration set fails at
`npm run validate`, not mid-run:

- **Iteration completeness (error).** If a file *keyed* by `TC_ID`+`IterationID`
  has a row for an iteration another keyed file lacks, that's a guaranteed
  "No testdata row" at runtime → validation **fails** with the exact missing
  `file/TC/iteration`. (A file with no `TC_ID`/`IterationID` columns — e.g. a
  one-row inputset — uses a first-row fallback and is exempt.)
- **Coverage (warning).** A column that holds a value but is referenced by **no**
  step is flagged: *"column X has a value but no step enters it."* It's how you
  catch a testdata value that silently never reaches the screen (columns consumed
  by a `callCustom` step are recognised and not flagged).

#### What to put in a testdata cell

Adding a new data combination is this decision, per field, per iteration. Look at the
field **on screen with that combination selected**: is it there, and can you type in it?

| On screen, for THIS combination | Cell value | Result |
| --- | --- | --- |
| **Not on the page** (hidden by a controlling option) | `N/A` | step skipped |
| **Editable**, you choose the input | the real value | entered + read back to verify |
| **Greyed, literally showing "Computed"** (the parameter being solved for) | `Computed` | step skipped — the app owns it |
| **Greyed, showing a derived number** | the expected number, wired as `assertValue` | the app's arithmetic is **verified** |
| Greyed derived number you don't care about | `N/A` | step skipped |
| Editable but you want the app default | blank | step skipped |

`N/A` and `Computed` both skip, so mixing them up won't fail a run — it just
mis-documents *why* the field was left alone. `N/A` = not on the page.
`Computed` = on the page, app-owned.

**Never `fill` a calculated value into a greyed field** — the step hard-fails on a
disabled field. Put the number in `ExpectedValue` with `assertValue` instead.

**The `Computed` convention.** A cell value of `Computed` means "this field is the
computed output — leave it blank/greyed." The skip is central in
`core/runner/stepRunner.ts`, so it holds for `fill` / `select` / `check` / `type` /
`uncheck` alike — a greyed *dropdown* marked `Computed` is skipped too, rather than
sending `select` hunting for an option named "Computed" (§6.2).

> **If you know what the app *should* compute, assert it instead of skipping it.**
> A greyed field can't be filled, but it can be verified: give the column the
> expected number and use `assertValue` with `ExpectedValue = ${data.<file>.<Column>}`.
> ROM(PD) does this for the two derived Mean Treatment fields — `μt0 = Mean Control ×
> NI Margin` and `μt1 = Mean Control × Ratio of Means` — so the testdata checks the
> app's arithmetic rather than ignoring it. `N/A` still skips the assertion on
> iterations where the field doesn't exist, so one metadata still serves them all.
>
> Two fields can share a visible label (both of those read *Mean Treatment*). Name
> such columns after the **DOM id** (`nonInf_nhMeanTreatment`), not the label —
> a label-derived name collides, and the importer's reuse deliberately refuses to
> guess between ambiguous names. For *editable* inputs the importer now splits such
> collisions for you by DOM id (§ "Null / Alternative paired fields" below); this
> hand-naming rule is for the **greyed** `assertValue` fields it can't record.

#### Two kinds of greyed field — only one needs you to do anything

The importer can only emit what codegen recorded, and **codegen cannot type into a
disabled field**. That single fact splits greyed fields in two:

| | Greyed in **some** iterations (the computed *parameter* rotates) | Greyed in **all** iterations (permanently derived) |
| --- | --- | --- |
| Example | Sample Size / Power / Type 1 Error | Mean Treatment `μt0`, `μt1` |
| In the recording? | **yes** — you typed it in the iteration where it was the input | **no** — never typeable, so absent |
| Importer emits | a normal `fill` step | **nothing** — no selector, no step |
| You do | **nothing.** Keep the `fill`; put `Computed` in the greyed cells | add the selector + an `assertValue` step **by hand** (optional) |

You never *convert* a `fill` into an `assertValue`. In the right-hand case no step ever
existed — you are *adding* one, and only if you want that field covered.

**`validate` tells you when one is missing.** Add the column with its expected numbers
and run `npm run validate`:

```
column "nonInf_nhMeanTreatment" in design.csv has a value but no step enters it
  — add a step to apply it or remove the column.
```

That warning is the prompt to wire the `assertValue` step (or drop the column), so a
derived field gets noticed without anyone remembering to look for it. The workflow for a
new data combination is therefore: **import → add testdata → `npm run validate` → wire
whatever it warns about.**

**Blank / `N/A` = not applicable to this iteration → the step is SKIPPED.** A
value-entering step (`fill` / `select` / `type` / `check`) whose testdata cell is
**blank** or **`N/A`** is skipped for that iteration (`core/runner/stepRunner.ts`).
The field doesn't apply to this data combination — it may not even exist on the
page (e.g. a Non-Inferiority margin on a Superiority design). The **same** step
still runs for iterations whose row *does* supply a value.

> **This is the answer to "one metadata or many?" — you keep ONE metadata per test
> case.** Different iterations switch steps on/off by leaving cells blank; you never
> fork the metadata. Records the superset of steps once, data-drive the rest.
>
> Two caveats: (1) skipping only triggers when the cell is fed by a `${data.*}`
> token, so a static step with a deliberately empty InputValue is never skipped;
> (2) a cell left blank *by accident* is silently skipped — write `N/A` when you
> mean "not applicable" so intent is explicit. This also means the rule only helps
> for fields that are **optional** across scenarios; if two scenarios use
> *different* fields (different ids), that's a different flow — re-record it.

#### Indexed table cells and multi-period values

Some design inputs are **tables** — one row per analysis period (interim spacing,
piecewise hazard rates, dropout periods). The app names each cell with a **dotted,
0-based id**: `inputMethodTable.0.hazardRateControl`, `boundary.2.analysisSpacingInfo`,
`dropoutTable.1.dropoutHazardRateControl`. **UI "Period 1" is index `0`.**

**Testdata heading = the exact dotted id.** Give each cell its own column named after
that id — one column per (table, period, field):

| Heading | Fills |
| --- | --- |
| `inputMethodTable.0.hazardRateControl` | period-1 control hazard rate |
| `inputMethodTable.1.hazardRateControl` | period-2 control hazard rate |
| `boundary.0.analysisSpacingInfo` | interim spacing at look 1 |
| `boundary.1.analysisSpacingInfo` | interim spacing at look 2 |

**Recording:** click the cell by its real locator so codegen emits the id —
`page.locator('[id="inputMethodTable.0.hazardRateControl"]')` or
`input[name="boundary.0.cumAlphaSpent"]`. The importer takes a **dotted** `[id=]` /
`[name=]` / `#id` **verbatim** as the column (it no longer mangles it into
`id inputMethodTable 0 …`), so the recording and the heading line up with zero
hand-editing. A non-dotted id still keeps its readable label column (§4.5 above).

**Multi-period values arrive comma-packed — split them per period.** An API/export cell
often holds every period in one quoted string: `hazardRateControl = "0.9, 1.2, 1.5"` is
three periods. Spread it across the indexed columns, **0-based, one value each**:

| Export cell | `…Table.0.hazardRateControl` | `…Table.1.…` | `…Table.2.…` |
| --- | --- | --- | --- |
| `"0.9, 1.2, 1.5"` | `0.9` | `1.2` | `1.5` |
| `"0.03466"` (one period) | `0.03466` | blank | blank |

Interim **spacing is period-wise the same way** — `"25, 50, 75"` becomes
`boundary.0/1/2.analysisSpacingInfo`. A period a scenario doesn't use is left blank /
`N/A`, so its fill is skipped (§ blank/`N/A` rule above). Record **as many period rows
as your deepest scenario needs**: the recording captures a fixed number of periods, so a
scenario with *more* periods than were recorded needs the extra rows re-recorded.

#### Normalized child-table files (the split alternative)

The indexed columns above may instead live in their **own CSV** — same model, your choice
of layout. A wide multi-period table that would otherwise sprawl across
`inputMethodTable.0.… inputMethodTable.1.…` columns of `design.csv` (or the sim's
`boundarySim.0.…`) can be authored **normalized** — one row per period — in a sibling file,
and the loader folds it back into exactly the inline shape before anything downstream runs.
The tester may choose **either** layout.

- **File name `<phase>_<tableName>.csv`** — `<phase>` is the parent basename (`design` or
  `simulation`), `<tableName>` the table: `design_inputMethodTable.csv`, `design_boundary.csv`,
  `design_dropoutTable.csv`, `design_enrollmentTable.csv`, `simulation_boundary.csv`,
  `simulation_accrual.csv`.
- **Columns `TC_ID, IterationID, PeriodIndex, <field1>, <field2>, …`** — the table's fields
  become plain columns; the period index is a **column**, not part of the heading.
- **One row per period** — `PeriodIndex` `0,1,2,…` (0-based, matching the inline `.0/.1/.2`),
  so a `(TC_ID, IterationID)` spanning three periods is three rows.

**Same model, either way.** `core/loaders/featureLoader.ts` → `foldChildTables()` folds each
child row back onto its parent's `(TC_ID, IterationID)` row **at load time**: cell
`(PeriodIndex=n, field=v)` becomes the synthetic column `<tableName>.<n>.<field>=v`, then the
child file is dropped from the loaded set. So
`${data.design.inputMethodTable.0.hazardRateControl}` resolves **identically** whether that
cell was authored inline in `design.csv` **or** as a row in `design_inputMethodTable.csv`.
Metadata tokens, the runtime blank/`N/A`/`Computed` skip, the importer, and the resolver are
all **unchanged** — this is purely a load-time reshape.

**Authoring rules (a child table):**

- `PeriodIndex` is **0-based and contiguous** per iteration (`0,1,2,…` — no gaps, no
  duplicates). A period an iteration doesn't use is simply **absent** (no row), or a single
  placeholder row `PeriodIndex=N/A` (all fields `N/A`) meaning "table absent this iteration";
  both fold to nothing.
- Not-applicable cells are **`N/A`, not blank** (runtime treats blank as N/A for fills, but a
  literal-comparison `SkipIf …==N/A` Add-Period gate can let a blank slip past and add an empty
  period — Trap 23).
- Author each table in **one place only** — inline in the parent **or** the child file, never
  both (the loader keeps the inline value and the validator warns on the collision).
- The **hypothesis-suffix rule still applies** to the child's field columns (e.g.
  `hazardRateTrmt_Null_SS` / `_Alt_SPSS` / `_Null_NI`): exactly one suffix per effect is valued
  per the row's `Hypothesis`, the rest `N/A` — same as inline (see the box below and
  `FIELD_WIRING_PATTERNS.md`).

`core/schema/validator.ts` → `validateChildTables` **warns** (never errors) on non-integer /
non-contiguous / duplicate `PeriodIndex`, orphan rows, an inline+child collision, and blank cells.

#### Null / Alternative (and NI/SP) paired fields — the split is automatic

Forms that show the **same label** under a Null and an Alternative section —
`Hazard Ratio (Null)` + `Hazard Ratio (Alternative)`, and likewise `Ratio of Medians`
and `Log Hazard Ratio` — have **distinct DOM ids** (`#hazardRatio_Null_SS`,
`#hazardRatio_Alt_SS`). The importer gives each its **own** column keyed by that id —
`${data.design.hazardRatio_Null_SS}` vs `${data.design.hazardRatio_Alt_SS}` — so the
alternative input never silently mirrors the null one. Your testdata headers are those
ids, which also match the app's exported field names. This fires **only** for genuinely
distinct **fill** fields, each with its own id; a field that shares its column with a
result *link*, and a dropdown recorded two ways, are deliberately left alone.

> **Across hypotheses (`_SP` / `_SS` / `_NI`) — see `FIELD_WIRING_PATTERNS.md`.** The DOM id
> suffix encodes the hypothesis (Superiority / Super-Superiority / Non-inferiority), so the
> same effect field renders as `hazardRatio_Alt_SP` / `_SS` / `_NI` depending on the row's
> `Hypothesis`. The adopted convention (built out in GADAR): **one testdata column per DOM id
> incl. suffix**, **one prefix selector per side** (`[id^="hazardRatio_Alt_"]` — resolves any
> suffix), and **one value-driven fill step per hypothesis column** (only the row's-hypothesis
> column is populated, so exactly one fires). That doc also carries the priors and
> early-stopping (eff/fut) wiring patterns and the `HazardRatioInputSet` legend.

#### Repeated-modal / multi-scenario records — the `loopOverData` pattern (see `MULTI_SCENARIO_GUIDE.md`)

The rules above cover *conditional* fields on one page. A different shape is a page that adds the
**same kind of record N times through a re-opened "Add …" modal** — candidate models, scenarios,
arms, looks — where the modal **reuses the same DOM ids every time** and the count varies per
iteration. Wide indexed columns (`scenario1_x … scenario10_x`) explode; instead use **"Option A"**:

- **`01_testdata/scenarios.csv`** — a *child* table, **one row per record** (not per iteration),
  keyed `TC_ID, IterationID, …`. Add a record = add a row. `N/A` in cells that don't apply.
- **`03_metadata/<name>_block.csv`** — a reusable sub-flow authored **once** (open modal → select
  the record type → gated fills → commit), reading `${runtime.loop.<Column>}`.
- **One `loopOverData` step** in `metadata.csv` (§6 Flow) that runs the sub-flow per matching child row.

Because the blank/`N/A` auto-skip is `${data.*}`-only, fills inside the sub-flow must be gated
**explicitly with `SkipIf`** on the loop columns — a family-tag gate (`SkipIf
${runtime.loop.curveFamily}!=Emax`) or a value gate (`SkipIf ${runtime.loop.modalDoseN}==N/A`).
`loopOverData` scopes child rows by `TC_ID`+`IterationID`, and the coverage check skips a
`loopOverData`-consumed file so its columns don't read as unused.

**The importer does NOT generate this pattern** (§13 / Trap): record the flow, keep the modal
selectors it captures, then hand-overlay the loop per **`MULTI_SCENARIO_GUIDE.md`**. Reference:
`feature_BOIN` (TC_14) — including the *delete-app-default-rows* trick and data-driven dose entry.

### 4.6 `06_baseline/compare.config.csv` — the compare rules

| Column | Meaning |
| --- | --- |
| `ColumnName` | Column in the captured result set. |
| `IsKey` | `TRUE` = part of the row identity. |
| `Compare` | `TRUE` = the value is actually checked. |
| `DataType` | `string` \| `number` \| ... |
| `AbsTolerance` / `RelTolerance` / `RoundTo` | Numeric tolerance. |
| `Normalize` | e.g. `trim`. |
| `Notes` | Why. |

Every feature uses the same shape: `TableName`/`RowLabel`/`ColumnName` are keys,
`Value` is compared, and `RunID`/`ProjectID` are volatile (never compared —
`framework.config.ts:22`).

> **There is no `Timestamp` column.** It changed on every run, so it could never
> be compared — it only added noise to the captured CSV. If you are looking at an
> old baseline that still has one, re-record it with `--update-baseline`; the
> column list here and the one in `extractAllResultTables` must match exactly or
> the compare reports `SCHEMA_MISMATCH`.

---

## 5. How a run executes

`npm run test -- --testcase TC_04`:

1. **`core/cli/index.ts`** parses argv via `core/cli/args.ts`.
2. **Validation runs first.** `core/schema/validator.ts` checks every master row,
   every metadata row, every selector. Any issue -> abort, exit 1, **no browser**.
   This is why `[PASS] Validation passed: 4 test case(s), 3 feature(s)` prints
   before `Selected 1 test case(s): TC_04`.
3. **Selection.** `core/runner/select.ts` applies `--testcase` / `--tags` /
   `--feature` / `--all`. `--testcase` **bypasses `Execute`** but never validation.
4. **Per entry** (`core/runner/orchestrator.ts`): resolve env (§10.1), load the
   feature (config + metadata + selectors + testdata), regenerate POM + spec.
5. **Auth setup**, only if `reuseAuthState` is true.
6. **Tasks** = one per iteration, run across workers (`WORKERS`, default 4;
   `--workers` overrides).
7. **`core/runner/iterationRunner.ts`**: launch browser, build `RunContext`,
   `page.goto(baseUrl, {waitUntil:'domcontentloaded'})`, then execute steps.
8. **`core/runner/stepRunner.ts`** per step: resolve locator -> dispatch keyword
   (wrapped in `withRetry`) -> screenshot -> record `StepResult`.
9. **Comparator** (`compareWithBaseline`), then **reporters**.

**Two things worth internalising:**

- The **screenshot is taken *after* the action**, outside the retry/timeout
  envelope. It never consumes `Timeout`, but it does inflate reported
  `durationMs` — which is why summed step durations exceed wall-clock.
- The `page.goto` in `iterationRunner` sits **outside** the step try/catch. A
  failure there is *Fatal*: the run dies with **no report**. That is why it uses
  `domcontentloaded` and not `networkidle`.

### 5.1 The chained simulation flow (`Simulation=YES`)

A feature can run a **second flow** — the simulation — in the **same browser**, on
the **same page**, right after the design comparison. It's how you drive
*design → Simulate → simulation results* as one iteration.

**Turn it on:** set `Simulation` to `YES` on the master row. Off/blank ⇒ the design
flow is byte-for-byte unchanged; nothing below runs.

**What runs, per iteration:**

1. The design flow executes as normal and ends in `compareWithBaseline`.
2. **Only if the design phase is GREEN** (`PASS` or `BASELINE_CREATED`) — a red
   design **skips** sim — the browser stays open and the sim flow runs:
   `03_metadata/sim_metadata.csv`, on the same `page`, tokens bound to
   `simulation.csv`. Its first step is the recorded **Simulate** click.
3. The sim flow ends in its own `extractAllResultTables` + `compareWithBaseline`,
   written under a `sim_` prefix.
4. **Cleanup is deferred** to after sim (the design phase created the project;
   deleting it before sim would break the flow).

**The two phases never collide** — a `ctx.resultPrefix` flips to `sim_` for the
second phase:

| | Design | Simulation |
| --- | --- | --- |
| captured | `07_actual_results/results_<TC>_<ITER>.csv` | `07_actual_results/sim_results_<TC>_<ITER>.csv` |
| baseline | `06_baseline/<env>/baseline_<TC>_<ITER>.csv` | `06_baseline/<env>/sim_baseline_<TC>_<ITER>.csv` |
| diff | `08_diffs/diff_<TC>_<ITER>.*` | `08_diffs/sim_diff_<TC>_<ITER>.*` |
| metadata | `metadata.csv` | `sim_metadata.csv` |
| testdata | inputset/project/design | `simulation.csv` |
| compare rules | `compare.config.csv` | **the same** `compare.config.csv` (reused) |

**Per-iteration control.** `simulation.csv` has its own `Run` column (same veto as
§4.5): `Run=FALSE` on a row skips *only the sim phase* for that iteration; the
design phase still runs. A missing `simulation.csv` row for an iteration skips sim
there too.

**Status.** The iteration's reported status is the **worst of** design and sim, and
the report tags the sim phase (`+SIM PASS` / `SIM skipped`). `sim_metadata` is
validated up front too — `Simulation=YES` with a missing/broken `sim_metadata.csv`
fails `npm run validate` before a browser opens.

#### The sim flow shape, end to end

The `sim_metadata.csv` walks the whole simulation and ends by opening its result —
exactly like design, but the result opens from the **Results list**, not inline:

1. **Simulate** — the first step clicks the `Simulate` button on the design result.
2. **Fill the input tabs** — the sim input page is multi-tab (Design / Response /
   Enrollment / Simulation Setup). Navigate each with a `click` on its tab button,
   then fill/select its fields. Controls that a controlling option already fixed
   are `select`ed and skip as *"disabled, already correct"*; greyed **derived**
   fields are `assertValue` (below).
3. **Save & Simulate** — `click btn_Save`, then `click btn_Save_Simulate`, then
   confirm any credit alert. The app navigates to the **Results list** page.
4. **Wait for Completed** — `waitForSimulation lbl_RunStatus` polls the status cell
   on the Results list until it reads `Completed` (a simulation is a Monte-Carlo run
   and takes real time; that is why the status is polled, not assumed).
5. **Open the result** — `click lnk_ResultName ${data.simulation.Result Name}` opens
   the simulation result **detail** (the same view design produces).
6. **Extract + compare** — `callCustom extractAllResultTables` captures every table
   and narrative panel on the result page, then `compareWithBaseline` writes/checks
   `sim_baseline_<TC>_<ITER>.csv`.

#### Consolidating a sim recording (the judgment pass)

A `--sim` import is a **flat superset** and needs the same on-screen consolidation
the design flow does (§13), walking the input tabs one at a time. The recurring
sim-specific shapes, all seen on ROM(PD):

| On the sim page | Do this |
| --- | --- |
| A control the recording only **label-clicked** (Hypothesis, Randomization Method, Test Type) — no data-driven step exists | Add a `select` with `${data.simulation.<Col>}`. If a prior choice fixes it, it skips as *disabled, already correct*; otherwise it sets it. |
| A **greyed / derived** field with a testdata value (Critical Point Lower = −Upper; a mirrored value) | `assertValue`, `ExpectedValue = ${data.simulation.<Col>}` — never `fill` (disabled fields hard-fail). §6.3. |
| A **checkbox that reveals or frees** a field ("Common Coefficient of Variation" greys Treatment; "Include" hides the enrollment grid; "Save Subject-Level Data" reveals its runs field) | Add a `check`/`uncheck` step (no InputValue needed — its selector is fixed, not `{0}`-parameterised). Order it **before** the fields it controls. |
| A field only present under one option combination | Leave the cell `N/A` for the iterations where it is absent — the step skips (§4.5). |

**Status cell / result name are app-specific** — verify `lbl_RunStatus` (its
`col-id`) and the `Result Name` value against your app, exactly as for design.

#### The Save & Simulate result flow (learned the hard way on ROM(PD))

After **Save & Simulate** the app opens a *"Name your result before simulating"*
modal, runs the simulation, and lands on the **Results list** where a new row
(Run Type **"Simulation"**) goes *In-progress → Completed*. Four things that are
not obvious and cost real debugging:

- **Do NOT fill the result-name field.** The modal pre-fills a valid name, and a
  programmatic `fill` corrupts the controlled-input's React state so the confirm
  button silently does nothing. Leave it — the app auto-names the result
  (`Result - <input set>`). If you must set a name, `type` it key-by-key.
- **The confirm button is inside an `aria-hidden` modal**, so `getByRole('button')`
  can't see it and a synthetic click can be swallowed by the backdrop. ROM(PD)
  uses a tiny custom step (`confirmSimulateModal`) that fires a **native DOM click**
  on the last `.modal.show #credit-alert-primary`.
- **No explicit navigate.** Confirming the modal navigates to the Results list on
  its own — an added `navigate` step races it and loses the run.
- **Scope the wait AND the open to the Simulation row.** `waitForSimulation` must
  poll the *simulation* row's status (an xpath scoped to the row whose Run Type is
  "Simulation"), not the design result that is already "Completed"; open the result
  via that same row's name link. Otherwise you match the design result and try to
  open a sim result that does not exist yet.

Proven on ROM(PD) TC_04 ITER_01: design PASS (79 cells) → sim runs → **9 tables /
77 cells** (Simulation Summary, Simulation Boundaries, Overall Simulation Results,
Enrollment, Plan) → `sim_baseline` written, and a second run compares **PASS 77/77**.

> **Importing the sim flow:** `npm run import-codegen -- <Module> <Feature> --tc TC_XX --sim`
> (§13, §14). It reuses selectors and compare.config, adds no login/navigate, and
> writes `sim_metadata.csv`. The generated Playwright specs (`npm run pw:test`) run
> the design flow only; the chained sim runs under `npm run test`.

#### End-to-end walkthrough (design + simulation for one feature)

```bash
# 1. Record BOTH flows in the app (npm run codegen), saved into the feature's
#    02_selectors_repo/ as recording.txt (design) and sim_recording.txt (sim,
#    starting on the design result at the Simulate click).

# 2. Import each flow (design writes metadata.csv; --sim writes sim_metadata.csv,
#    sharing selectors.csv + compare.config.csv):
npm run import-codegen -- ProductDesign feature_MyFeature --tc TC_09
npm run import-codegen -- ProductDesign feature_MyFeature --tc TC_09 --sim

# 3. In master.csv set Execute=TRUE and Simulation=YES for the row.

# 4. Consolidate metadata.csv AND sim_metadata.csv against the live pages (§13),
#    then validate (no browser):
npm run validate

# 5. Run — design then, if green, the chained simulation, one browser:
npm run test -- --testcase TC_09

# 6. Screenshot-verify BOTH phases, review the baseline + sim_baseline, run again
#    to turn BASELINE_CREATED into a real PASS.
```

---

## 6. The keyword catalog

`core/keywords/catalog.ts` is the single source of truth for **both** the
validator and the runtime registry. If an Action is not in this list, validation
rejects it.

### Navigation
| Keyword | Required | Notes |
| --- | --- | --- |
| `navigate` | InputValue | `WaitCondition` sets `waitUntil`. **Use `domcontentloaded`** (§13.1). |
| `goBack`, `reload` | — | |
| `switchTab` | InputValue | |
| `switchFrame` | ObjectName | |

### Input
| Keyword | Required | Notes |
| --- | --- | --- |
| `click` | ObjectName | Walks a `label` selector to the real control. |
| **`fill`** | ObjectName, InputValue | **Enters the value and verifies it landed — see §6.2.** |
| `type` | ObjectName, InputValue | Types key-by-key. |
| `clear` | ObjectName | |
| **`select`** | ObjectName, InputValue | **Does the whole dropdown — see §6.1.** |
| `check` / `uncheck` | ObjectName | |
| `hover`, `press`, `upload`, `dragAndDrop`, `doubleClick`, `rightClick` | varies | `upload` InputValue is a path. |

### Wait
| Keyword | Required | Notes |
| --- | --- | --- |
| `waitForSelector` | ObjectName | `WaitCondition`: `visible` / `hidden`. **The workhorse.** |
| `waitForText` | ObjectName, ExpectedValue | |
| `waitForSimulation` | ObjectName | Polls until `successText`; throws on `failureText`. |
| `waitForNetworkIdle` | — | **Avoid** — this SPA never goes idle (§13.1). |
| `waitForDownload` | — | |
| `sleep` | InputValue | **Every use is flagged by the validator.** Poll instead. |

### Capture
`storeText`, `storeAttribute` (ObjectName = `"object\|attr"`), `storeValue`,
`storeUrl`, `extractTable`, `downloadFile`.

### Assert
`assertVisible`, `assertHidden`, `assertText`, `assertContains`, `assertValue`,
`assertCount`, `assertEnabled`, `assertUrl` — each with a `softAssert*` variant
that records the failure and continues.

### Flow
| Keyword | Required | Notes |
| --- | --- | --- |
| `callReusable` | InputValue (path) | Inline a flow CSV, e.g. `flows/login.csv`. |
| `callCustom` | InputValue | Call an exported handler from `custom/<Feature>/customSteps.ts`. |
| `ifExists` | ObjectName, InputValue | Conditional sub-flow. |
| `loopOverData` | ObjectName, InputValue | **Runs a reusable sub-flow once per row of a child testdata file.** `ObjectName` = the child CSV's basename (e.g. `scenarios`); `InputValue` = the sub-flow CSV path (e.g. `ProductDesign/feature_BOIN/03_metadata/scenario_block.csv`). Rows are scoped to the current `TC_ID`+`IterationID`; each row's columns are exposed as `${runtime.loop.<Column>}` inside the sub-flow. This is the engine of the **multi-scenario / repeated-modal** pattern — see §4.5 and `MULTI_SCENARIO_GUIDE.md`. |

### API / Comparison
`apiRequest` · `compareWithBaseline`.

### 6.1 `select` — read this before touching a dropdown

`select` is **one step that does everything**, for native *and* custom dropdowns
(`core/keywords/input.ts`):

1. Resolves the target — if `SelectorType=label`, walks from the label text to the
   adjacent interactive control (`input, textarea, select, button, [role=combobox], ...`).
2. Detects a native `<select>` by evaluating `tagName`.
3. **Native** → resolves the option **by `value` attribute first, then exact visible text, then text substring**, and commits with `selectOption({value})` (`core/keywords/input.ts:387-403`). On no match it **fails loudly and prints the option list** (`value=text`) — read it before guessing. So a numeric sub-method code in testdata (e.g. `hazardRatioInputMethod=2`) matches `<option value="2">` **directly** — you do **not** need the label text. See `FIELD_WIRING_PATTERNS.md` for the `HazardRatioInputSet` code legend.
4. **Custom** -> clicks to open the menu, then commits the option in this order:
   1. **grouped** match — `clickOptionInGroup(label, group)`,
   2. `role=option` exact,
   3. exact text,
   4. keyboard type + Enter.

**Never** write "click the dropdown, then click the option" as two steps. One
`select` step is correct and far more robust.

**Grouped dropdowns.** When option names repeat across groups, the option is only
unique as *(group, label)*. Testdata carries the combined form the control
displays:

```
${data.inputset.SelectTest}  ->  "Ratio of Means (Parallel Design)"
                                  ^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^
                                  option          group
```
Matching on the label alone and taking `.first()` silently picks whichever group
renders first — a **wrong-value PASS**, which is worse than a failure.

### 6.2 `fill` — every testdata value must land, and the `Computed` rule

A value that sits in the testdata but never reaches the screen is a silent bug.
So `fill` (`core/keywords/input.ts`) is strict:

1. **Field missing** → the step **fails** with `field "X" not found`, not a vague
   timeout.
2. **Field disabled** with a real value to enter → **fails** (`field "X" is
   disabled but testdata requires a value`). The app disabled a field you needed.
3. **Value entered, then read back** to confirm it actually took. If the field
   didn't accept it → **fails**.
4. **The one exception — `"Computed"`.** If the testdata value is the literal
   `Computed`, the field is skipped. In these design tools the *computed* parameter
   is greyed out (you can't type into it), and `"Computed"` is how the testdata
   says "this one is the output, not an input."

**Why this matters for multi-iteration.** The same field can be an input in one
iteration and the computed output in another — the metadata has **one** `fill`
step; the testdata decides per iteration:

```
design.csv:
  IterationID  Computed Parameter  Sample Size  Power
  ITER_01      Sample Size         Computed     0.88     <- Sample Size skipped, Power=0.88 entered
  ITER_02      Power               155          Computed  <- Power skipped, Sample Size=155 entered
```

One `fill txt_Power ${data.design.Power}` step handles both: 0.88 is typed for
ITER_01, and `"Computed"` is skipped for ITER_02. (Radios use `check`, and a
radio value drives which field becomes `"Computed"`.)

> **Corollary:** a recording can only capture fields that were *editable* when you
> recorded. If Power was the computed field during recording, codegen never typed
> it, so the importer emits no Power step. For the *other* iteration (where Power
> is an input) you must **add the `fill` step by hand** — see the worked example in
> §13 "What still needs a human". `npm run validate` will warn you: *"column
> `Power` has a value but no step enters it."*

### 6.3 Disabled fields, grid cells, and the skip rules at a glance

The framework handles these app behaviours the **same** way across `fill` / `select`
/ `check`, which is what lets **one metadata serve many data-combination iterations**
(§4.5). Per iteration, the resolved testdata value decides:

| Situation | `fill` | `select` |
| --- | --- | --- |
| a real value | enter it, then **read back to verify it landed** | pick the option |
| **blank / `N/A`** | **skip** — field not applicable to this iteration | **skip** |
| **blank / `N/A`** in a data-driven `ExpectedValue` | **skip** — same rule for `assertText` / `assertContains` / `assertValue` / `assertCount`: a field that doesn't exist for this data combination can't be *asserted* either | — |
| `"Computed"` | **skip** — greyed computed-output field | — |
| field **disabled but already shows the intended value** — *fixed by another control* (e.g. Test Type forced to "1-Sided" for Non-Inferiority; Input Method fixed to "Ratio of Means" when computing the ratio) | — | **skip** — intent already met |
| field **disabled, shows something else** | **fail** | **fail** |
| field **not found** but a value is required | **fail** (`field not found`) | **fail** |
| **grid cell** that discards a one-shot fill and reverts | auto-escalates to **type key-by-key + Tab** to commit | — |

The disabled-and-fixed skip (`select`) and the grid escalation (`fill`) fire **only**
when the plain path fails, so ordinary fields are never affected. All of these are in
`core/keywords/input.ts`; the blank/`N/A` skip is central in `core/runner/stepRunner.ts`.

> **Every one of these rules assumes the step is driven by the testdata.** A step with a
> **blank InputValue** has nothing to resolve, so none of the rows above apply: it can't be
> skipped for an iteration, it can't be verified, it just fires. `validate` therefore
> **rejects a blank `InputValue` on `fill` / `type` / `select` / `check` / `uncheck`**
> (`core/keywords/catalog.ts`), and the importer refuses to emit one.
>
> `check` needs the value even though the handler only calls `.check()` — the value
> parameterises the selector's `{0}`, so it is what picks **which** radio in the group.
> A blank one is a blind click that re-asserts whatever the recording happened to select.
> This is not theoretical: ROM(PD)'s `check radio_Type_1_Error` (blank) silently undid the
> `Computed Parameter = Power` that the previous step had set from the testdata, greying out
> the α just typed and leaving a stale `0.9` Power. The app rejected the design and the
> simulation returned `"Failed"` — six steps later, with nothing in the log pointing at the
> cause. To tick a plain checkbox, data-drive it (`${data.project.Include}`); blank/`N/A`
> then skips it per iteration, which is the behaviour you actually want.

---

## 7. Selector resolution

`core/locators/resolver.ts`.

### 7.1 Types and priority
Priority is `testid` > `role` > `label` > `text` > `css` > `xpath`. Prefer the top
of that list: `testid` and `role` survive redesigns; `xpath` does not (and the
validator warns unless you justify it in `Description`).

### 7.2 FallbackSelector
If the primary matches **0** elements and a fallback exists, the fallback is used
and a `UI-DRIFT` warning is logged. **That warning is a signal, not noise** — the
markup moved and `selectors.csv` needs updating.

### 7.3 `Exact` — the substring trap

**Playwright matches accessible names by SUBSTRING by default.** So:

```
getByRole('button', { name: 'Save' })     ALSO matches "Save & Compute"
```

This is a real bug we hit. `Exact=TRUE` opts a row into exact matching. It applies
to `role`, `label`, `placeholder` and `text`. When Playwright codegen emits
`exact: true`, it is telling you the name is ambiguous — the importer now carries
that through automatically.

### 7.4 `Dynamic` and `{0}`

With `Dynamic=TRUE`, `{0}`, `{1}`... are substituted from the step's dynamic args.
**Substitution happens in BOTH `SelectorValue` and `RoleName`** (`buildLocator`),
so this is valid and correct:

```csv
lnk_ResultName,ResultsPage,role,link,{0},,TRUE,Open a result by name,TRUE
```

> Historical note: the validator used to warn only if `SelectorValue` lacked
> `{0}`, which flagged every legitimate `role` selector. Fixed — it now accepts
> `{0}` in either field.

---

## 8. Variable interpolation

`core/runner/resolver.ts`. Applies to **`InputValue` and `ExpectedValue`**
(`stepRunner.ts:32-33`). The regex is `/\$\{([^}]+)\}/g`, and literal text between
tokens is preserved — so `Proj_${runId}` works.

**Every supported namespace** (`resolveToken`, `resolver.ts:42-89`):

| Token | Resolves to | Example |
| --- | --- | --- |
| `${data.<file>.<col>}` | A testdata cell for this TC + iteration. | `${data.project.Time Unit}` |
| `${env.<VAR>}` | A key from `.env`. | `${env.APP_USERNAME}` |
| `${master.<Column>}` | A column of this test's `master.csv` row. | `${master.ProjectID}` |
| `${runtime.<name>}` | A value captured earlier via **`StoreAs`**. | `${runtime.projectId}` |
| `${config.<dotted.path>}` | A scalar from `feature.config.json`. | `${config.simulation.successText}` |
| `${runId}` | This run's id — unique across **runs**. | `${runId}` |
| `${iterationId}` | This iteration's id (`ITER_01`, `ITER_02`) — unique across **iterations within a run**. | `${iterationId}` |
| `${tcId}` | This test case's id. | `${tcId}` |
| `${timestamp}` | Run timestamp. | `${timestamp}` |
| `${today}`, `${today+30d}`, `${today-7d}`, `${Now}` | Date tokens (`core/utils/dates.ts`). | `${today+30d}` |
| `${faker.<method>}` | Random data. Supported: `uuid`, `company`, `firstName`, `lastName`, `email`, `word`, `number`. | `${faker.email}` |

Combine freely:

```
${data.project.projectName}_${runId}                 ->  MyProject_20260717T012349_c9c5be
${data.project.projectName}_${runId}_${iterationId}  ->  MyProject_20260717T012349_c9c5be_ITER_02
```

> **For a globally-unique name across a multi-iteration run, use BOTH `${runId}`
> and `${iterationId}`.** `runId` alone is shared by every iteration of a run, so
> the 2nd iteration would try the same name and the app rejects it as a duplicate.
> The importer already appends both to project-name fields.

> **Hard rule: an unresolvable token THROWS.** It is never silently replaced with
> an empty string. `resolver.ts:7` says why — *"a blank form field costs a day to
> debug"*. The error names the file, row and column. So a typo in
> `${data.projct.Phase}` fails loudly and immediately.

Secrets are masked in logs — `${env.APP_PASSWORD}` prints as `***MASKED***`
(`core/utils/logger.ts:12`).

---

## 9. Baseline and compare

This is the point of the framework: prove the numbers did not move.

### 9.1 Where
```
06_baseline/<env>/baseline_<TC_ID>_<IterationID>.csv       the approved benchmark
06_baseline/<env>/baseline_<TC_ID>_<IterationID>.csv.meta.json   provenance
```
Today: `06_baseline/AD/baseline_TC_04_ITER_01.csv` (124 rows).

The `.meta.json` sidecar records runId/env/approver/hash. It is **write-only** —
nothing reads it at runtime. It is for humans.

### 9.2 Lifecycle
1. **First run** — no baseline. The run captures results, **writes** the baseline,
   reports `BASELINE_CREATED`. Nothing was verified.
2. **A human reviews the baseline.** This is the real approval gate.
3. **Every later run** — capture, compare, `PASS` / `FAIL`.

### 9.3 Modes
- `--update-baseline` / `BaselineMode=update` — overwrite the benchmark.
- `BaselineMode=create` — write if missing.
- `BaselineMode=compare` (default) — compare.

### 9.4 The trap that will fool you

`BASELINE_CREATED` is **excluded** from the failure count:
`bad = FAIL + ERROR + SIMULATION_TIMEOUT` (`core/runner/orchestrator.ts`).

So if the baseline is missing — wrong env, moved folder, renamed TC — the run:
- captures results,
- **overwrites your approved benchmark with an unreviewed capture**,
- reports `BASELINE_CREATED`,
- and **exits 0**.

Green. Verifying nothing.

> **Rule: assert on the status string in `reports/<runId>/results.json`, never on
> the exit code.** A real pass says `"status": "PASS"` and
> `"summary": "PASS — 124 row(s), 124 cell(s) within tolerance."`

---

## 10. Environments and auth

### 10.1 How the env is chosen

`orchestrator.ts` `envNameFor`, highest priority first:

```
--env  >  master.csv Environment  >  process.env.ENV  >  'qa'
```

**The env name selects two things:** the `.env.<env>` file *and* the baseline
folder `06_baseline/<env>/`. They are the same knob — you cannot rename the
baseline folder without renaming the env.

`.env.<env>` falls back to `.env` when absent (`config/environments.ts`). There is
**no `.env.AD` on disk** — the real `BASE_URL` / credentials live in `.env`, so
`AD` is a label that scopes the baseline. That is by design.

> **Do not use `--env`** to scope one test. It is highest priority and applies to
> **every** selected row, dragging other features' baselines with it. Use the
> `Environment` column.

> **Trap:** `.env` contains `ENV=beta`, which does **not** reach `process.env` on
> the `npm run test` path (`environments.ts` uses `dotenv.parse`, not
> `dotenv.config`). Do not "fix" that — adding `dotenv.config()` would silently
> move the whole suite to env `beta` and orphan every baseline.

### 10.2 `reuseAuthState`

- **`true`** — a separate browser logs in, saves `.auth/<env>.json`, closes; each
  iteration reuses the cookie. Worth it for many iterations across workers.
- **`false`** (ROM(PD)) — one browser; the first step is
  `callReusable flows/login.csv`, logging in inline. For a single iteration this
  is strictly better: one window, no redundant browser.

---

## 11. Reports and artifacts

| Path | Contents |
| --- | --- |
| `09_html_report/index.html` | Per-feature. Step table: **Seq**, StepID, Group, Action, Object, resolved input (masked), Status, Time, **Description**, **screenshot thumbnail**, Notes. Plus baseline-vs-actual diff. |
| `reports/<runId>/results.json` | Machine-readable. **The source of truth.** |
| `reports/<runId>/combined_report.html` | Feature x TC matrix. **No step table.** |
| `artifacts/<runId>/<TC>_<ITER>/` | `step_<StepID>_<ok\|fail>_<seq>.png`, trace, video. |
| `07_actual_results/` | What this run captured. |
| `08_diffs/` | Cell-level differences on FAIL. |

Screenshots are captured for **every** step (§4.3.2) at viewport size, and land in:

```
artifacts/<runId>/<TC_ID>_<IterationID>/step_<StepID>_<ok|fail>_<seq>.png
```

The trailing `<seq>` is what makes filenames unique, **not** the StepID: StepIDs
collide, because `flows/login.csv` and your metadata both have steps 10, 20, 30.
`step_10_ok_0.png` is login's step 10; `step_10_ok_10.png` is metadata's.
`trace.zip` and the `.webm` video sit in the same folder.

> **Trap:** the report links artifacts by **relative path** into
> `artifacts/<runId>/`. Deleting old artifacts silently breaks the images in any
> report you kept. The report is overwritten each run; the artifacts it points at
> are not. Nothing prunes `artifacts/` — it grows without limit (~10 MB of PNGs
> per run). Both `artifacts/` and `reports/` are gitignored.

### 11.1 Sharing a report — use `npm run report:share`

**Neither report on disk can be sent on its own.** Do not try:

| File | Why it breaks when sent alone |
| --- | --- |
| `09_html_report/index.html` | Screenshots are relative links into `artifacts/`. Recipient sees ~60 broken images. |
| `combined_report.html` | Its Drill-down link is a relative path *out of* `reports/` into the feature folder. Recipient gets a 404. |

**The answer:**

```bash
npm run report:share                 # ~13 MB — everything, screenshots embedded
npm run report:share -- --lite       # ~25 KB — everything except screenshots
npm run report:share -- <runId>      # a specific run
npm run report:share -- --list       # what is available to share
```

Writes `reports/<runId>/run_<runId>_shareable.html` — **one file containing the
whole run**: status tiles, run metadata, the Feature × TC matrix, every step with
its Description, and the baseline-vs-actual comparison. Drill-down is an
**in-page anchor**, so there is no link to break. Send just that file; the
recipient opens it in any browser, offline.

**Which to send**

- **Default** when it can travel (Teams / Slack / Drive / a shared folder). ~1.35×
  the run's PNG bytes — base64 overhead. Near the 25 MB limit for email.
- **`--lite`** when it must be small or go by email. ~25 KB, and the recipient
  still reads **every step, description, status, timing and the full compare
  table** — only the screenshots are gone. It *omits* them rather than linking
  them, precisely so no broken images appear.

Both re-render from `reports/<runId>/results.json`, so they work on **any past
run** — nothing is re-executed. If artifacts were pruned, the full version reports
how many screenshots it could not embed instead of silently shipping dead images.

The on-disk report stays **linked** (~37 KB) because it is rewritten every run;
only `report:share` embeds.

---

## 12. Extension points

### 12.1 Reusable flows — `flows/*.csv`
A normal metadata CSV, inlined by `callReusable`:

```csv
Seq,StepID,StepGroup,Page,Action,ObjectName,InputValue,...
1,10,Login,-,navigate,,/,...
```
```csv
5,Login,-,callReusable,,flows/login.csv,,,,,300000,FALSE,0,always,,Log in inline
```

The flow's steps run **before** the parent step is recorded, so the report shows
children first, then the `callReusable` row.

> Flow CSVs are parsed by the **same schema** as metadata. A column that is
> required in the schema but missing from `flows/login.csv` breaks login at
> runtime — and `npm run validate` will **not** catch it, because flows are only
> parsed at runtime.

### 12.2 Custom steps — `custom/<Feature>/customSteps.ts`
For anything genuinely app-specific (§14 keeps it out of core):

```ts
export const extractAllResultTables: KeywordHandler = async (page, ctx, step) => {
  // ... returns a value; may set ctx.lastActualRows for the comparator
};
```
```csv
480,ExtractResults,ResultsPage,callCustom,,extractAllResultTables,...
```

ROM(PD) exports `selectStartDate`, `uniqueProjectName`, `selectTestOption`
(currently unused — the generic keywords cover those cases now). It used to carry
its **own copy** of `extractAllResultTables`; the copies drifted, so fixes landed
on one and not the other. That copy is gone — ROM(PD) now inherits the shared one.

> **Shared fallback — `custom/_shared/customSteps.ts`.** `callCustom` resolves a
> handler from the feature's own module **first**, then falls back to
> `custom/_shared/`. Generic helpers (`selectStartDate`, `extractAllResultTables`)
> live in `_shared`, so a new feature gets them for free without its own file. A
> feature can still override by exporting its own handler of the same name.
>
> Prefer **not** to override `extractAllResultTables`. It is feature-agnostic on
> purpose, and a per-feature copy is how the ROM(PD) drift happened.

#### What `extractAllResultTables` captures

It discovers the result page rather than assuming a fixed set of tables, and
flattens everything to one cell per row (`TableName | RowLabel | ColumnName |
Value`) so any table shape fits the schema `compare.config.csv` describes once.

| It handles | Why it has to |
| --- | --- |
| **Leaf grids only** | AG Grid wraps a nested `.ag-root` for grouped views. Reading every `.ag-root` captured each cell **twice** — once flat, once through the wrapper, whose blank first column produced `row_1`-style placeholder keys. |
| **Scrolls each grid** | AG Grid only keeps *visible* rows in the DOM. A tall table silently truncated; it now scrolls the body viewport and merges rows until it has the `aria-rowcount` the grid claims, and warns if it still falls short. |
| **Cells keyed by `col-id`/`row-index`** | Pinned columns emit one `[role=row]` per container; positional binding would silently bind cells to the wrong headers. |
| **Narrative panels** | The headline numbers live in prose ("a total of **571** pairs … power of **88.02%**"), not in any grid. A heading with no grid/table of its own is captured as a single `Narrative` cell. |
| **Skips hidden + chrome panels** | A single-page app keeps hidden dialogs mounted (the "Sign Out" confirmation) and toolbars read as panel text (`RenameDeleteHomeDetails`). Panels must be **visible**, and their text is measured with buttons/links/tabs/icons stripped out. |

Grids that share a heading are numbered in document order (`Design Summary #1`,
`#2`). Those names are **baseline keys** — if the app reorders the panels, expect
a diff and re-record.

---

## 13. Adding a new feature

**You supply a recording + testdata; the tooling turns it into a runnable test.**
There are **two ways** to do the turning — pick by how much judgment the feature needs:

| Path | What runs | Use it when |
| --- | --- | --- |
| **A — Manual importer** (`npm run import-codegen`) | A deterministic CLI: captures selectors, generates steps + `${data.*}` tokens, dedups a superset recording, derives clean column names. | A straightforward single-path feature, or you want full control and will wire the details yourself. |
| **B — AI agent** (`/import-feature`) | The importer **plus** a judgment layer: consolidates conditional fields, sets/verifies `N/A` per iteration, screenshot-verifies each run, fixes quirks — scoped to that one feature. | A feature with conditional fields / multiple scenarios, or when you want it wired *and verified* end-to-end. Works with **Claude Code and GitHub Copilot** — see §13.9. |

Both use the **same importer** and the **same recording** — the agent just does the
steps a deterministic parser can't (understanding intent, seeing the page). Steps 1-8
are Path A in full; **§13.9** is Path B. Either way you start by recording (Step 1),
and the golden rule holds for both: **follow the testdata** — a value must land
(verified), blank/`N/A` skips, and a valued field that isn't found fails the test.

### Step 1 — Record the flow, and save it INTO the feature folder
```bash
npm run codegen
```
Walk the app exactly as the test should. Then **save the recording inside the
feature's `02_selectors_repo/` folder** as `recording.txt` (or `recording.ts`):

```
ProductDesign/feature_MyFeature/02_selectors_repo/recording.txt
```

Why there: the recording lives *with* the feature it produces, and the importer
**auto-discovers it** from that folder (Step 2) — you never pass a file path.

> **The recording is gitignored and never committed.** Playwright codegen writes
> the login steps verbatim, including the typed **password**, so recordings hold
> real credentials. `.gitignore` **allowlists** this folder — everything under
> `**/02_selectors_repo/` is ignored except `selectors.csv` and `locators.json` —
> so a recording is excluded whatever it is named or however it is saved. Share
> recordings out-of-band, not through the repo.

> **⭐ The single most important recording habit: click a field's LABEL before you
> touch it — for EVERY field, not just dropdowns.**
>
> ```
> getByText('Sample Size (n)').click();   // 1. click the label
> #sampleSize.fill('100');                //  2. then fill/select
> ```
>
> The importer names each testdata column after the **label** you clicked. So if
> you click "Sample Size (n)" first, the column becomes `Sample Size (n)` and
> **merges with the column you already have**. If you skip the label and only do
> `#sampleSize.fill(...)`, the importer can only name the column after the field
> **id** (`sampleSize`) — which won't match your `Sample Size (n)` column, so it
> **adds a duplicate**. (The reuse logic bridges case/spacing/punctuation, not
> id-vs-human-name differences like `sampleSize` ↔ `Sample Size (n)`.)
>
> For dropdowns the pattern also collapses the label + option into one `select`
> step. Two rules of thumb: **click the label first**, and **don't click stray
> labels** between fields — a stray `getByText('Test Type').click()` right before a
> different field's fill makes the importer mis-name that field's column.

### Step 2 — Import (auto-discovers the recording)
```bash
npm run import-codegen -- ProductDesign feature_MyFeature --tc TC_05
```
No recording path — it finds `recording.txt`/`recording.ts` in the feature's
`02_selectors_repo/`. (You *may* still pass an explicit path as a 3rd argument,
but it must be relative to the repo root, e.g.
`ProductDesign/feature_MyFeature/02_selectors_repo/recording.txt`.)

This creates the whole feature (no separate scaffold needed):

| Created | Contents |
| --- | --- |
| `00_config/feature.config.json` | skeleton (`serial:true`, `reuseAuthState:false`) |
| `01_testdata/*.csv` | columns **and values seeded from the recording** |
| `02_selectors_repo/selectors.csv` | locators, with `Exact` carried from codegen |
| `03_metadata/metadata.csv` | ordered steps with `Seq` |
| `06_baseline/compare.config.csv` | compare-rules skeleton |

What it does for you:
- Okta/login -> one `callReusable flows/login.csv` step, placed **first**.
- `navigate` with `domcontentloaded` + a polled readiness `waitForSelector`.
- **Dropdowns -> one `select` step each** (custom, native `<select>`, radios).
- Codegen's `exact: true` -> the `Exact` column.
- A result tail (`waitForSimulation` -> `callCustom` -> `compareWithBaseline`)
  when the recording shows a compute.
- **`serial: true`** in the config — the app allows one session per user, so
  iterations must run one at a time (see §4.2 / Trap 15).
- **Reuses your existing testdata columns.** If you already made a column
  `TestType`, a recorded field "Test Type" is matched to it (case/spacing
  ignored) instead of adding a duplicate. Only genuinely-new fields are added.
- **Clean column names from labels** — a field you clicked the label for becomes
  `Sample Size (n)`, `Target Population`, etc. (not the id `sampleSize`). It even
  reads `getByText('Power').nth(1).click()` labels (codegen adds `.nth()` when the
  text repeats on the page). Only a field recorded with **no** label falls back to
  its id name.
- **Dedups a superset recording.** If you toggled a control to reveal conditional
  fields (Input Method 1→2→1, Hypothesis 2→1), the repeated `select`/`check`/`fill`
  on the same object collapse into one data-driven step. Single-path recordings are
  untouched. *(The one case where this collapse is **unwanted** is a repeated **modal**
  filled once per record — see "What still needs a human" → repeated-modal, and
  `MULTI_SCENARIO_GUIDE.md`. The importer now warns when it detects it.)*
- **Project name made unique per iteration** — `..._${runId}_${iterationId}` — so
  two iterations don't collide on "name already exists".
- **Backfills blank `TC_ID`/`IterationID`** in the seeded rows so they resolve.

### Step 3 — Register the test
Add the row the importer prints to `master.csv`:
```csv
TC_05,ProductDesign,regression,,MyFeature,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD
```

### Step 4 — Review testdata
```bash
# 01_testdata/*.csv is seeded from the recording — check the column names.
# Make values unique where the app demands it:
#   ${data.project.Project Name}_${runId}
```

### Step 5 — Validate (no browser, ~2s)
```bash
npm run validate
```
Fix anything it reports before spending a browser run.

### Step 6 — First run: create the benchmark
```bash
npm run test -- --testcase TC_05
```
Expect **`BASELINE_CREATED`**. This is correct — it is green but has verified
**nothing**.

### Step 7 — Approve the benchmark
Open `06_baseline/AD/baseline_TC_05_ITER_01.csv` and **check the numbers are
right**. This human review is the entire value of the framework. Everything after
this is compared against it.

### Step 8 — Real runs
```bash
npm run test -- --testcase TC_05     # now a true PASS/FAIL
```

### What still needs a human

The importer cannot infer these from a recording — it prints them as NEXT STEPS:

| Thing | Why | Fix |
| --- | --- | --- |
| **Date pickers** | A date must be *picked*, not typed. The import clicks the recorded day cell, pinned to the recorded month. | Data-drive it, or use a `callCustom` hook. |
| **A label-less field's name** | If you *don't* click a field's label while recording, the importer can only name the column after the field id (`sampleSize`, `type 0`). | Click the label when recording (Step 1) → clean name. Otherwise rename the column and I'll repoint the token. |
| **A computed field that is an input elsewhere** | If a parameter was *computed* (greyed) while recording, codegen never typed it → no `fill` step. In another iteration it's an input. | Add a `fill` step + selector by hand (§6.2). `validate` warns which column. |
| **A permanently derived field** (e.g. Mean Treatment `μt0` = Mean Control × NI Margin) | Never typeable, so it is absent from the recording entirely — the importer emits **no** selector and **no** step. | Optional: add the selector + an **`assertValue`** step so the testdata verifies the app's arithmetic (§4.5). Never `fill` it — that hard-fails on a disabled field. `validate` warns if the column has values but no step. |
| **Unique names** | The recording used one literal name. | Project names are auto-suffixed `_${runId}_${iterationId}`. For other must-be-unique fields, append the same. |
| **`extractAllResultTables`** | Nothing — it is feature-agnostic and lives in `custom/_shared/`. | Nothing to write. It discovers the tables and narrative panels itself (§12.2). Only override it if this app's result page is genuinely unlike the others. |
| **`lbl_RunStatus` col-id** | Grid internals differ per app. | Verify the selector. |
| **Tolerances** | Only you know what "close enough" means. | Edit `compare.config.csv`. |
| **A repeated-modal / multi-scenario flow** (N records added via one re-opened "Add …" modal — candidate models, scenarios, arms) | The modal reuses the **same** DOM ids each time, so the dedup (below) collapses its fills to **one** occurrence and leaves N ungated open/commit clicks — a garbled, non-looping block. The importer now **prints a WARNING** when it detects this fingerprint. | Delete the recorded modal block and hand-build the **`loopOverData` (Option A)** pattern: child `01_testdata/scenarios.csv` (one row per record) + reusable `03_metadata/<name>_block.csv` sub-flow + one `loopOverData` step (§4.5, §6 Flow). Recipe: **`MULTI_SCENARIO_GUIDE.md`**; reference `feature_BOIN` (TC_14). |

### 13.9 The AI agent path — `/import-feature`

Path A (the importer) does the deterministic ~80%. The **AI agent** does the
judgment ~20% the importer can't — and it is **tool-agnostic**: the whole workflow
lives in one playbook, [`AI_IMPORT_AGENT.md`](AI_IMPORT_AGENT.md), that any AI
assistant follows. The importer still runs on its own (Path A); the agent sits on
top of it.

**Invoke it** — both entry points load the same playbook:

| Tool | Command | Entry file |
| --- | --- | --- |
| **Claude Code** | `/import-feature` | `.claude/skills/import-feature/SKILL.md` |
| **GitHub Copilot** | `/import-feature` | `.github/prompts/import-feature.prompt.md` |

Then name the feature (Module, feature folder, TC id), e.g.
`ProductDesign feature_MeanofPairedRatios TC_05`. Adding another AI tool later = one
more small pointer to the same playbook.

**What the agent does** (detail is in the playbook):
1. Runs `npm run import-codegen` — the **same** manual importer.
2. **Consolidates** a superset recording — one data-driven step per control,
   ordered controls-before-dependent-fields.
3. **Reconciles columns** and adds steps the recording couldn't capture (a computed
   field that is an input in another iteration; mutually-exclusive `_NI`/`_SP`
   variants).
4. `npm run validate`.
5. Runs the test and **screenshot-verifies every iteration** — confirms `N/A`
   cells skip, valued fields land, and the right conditional fields are present.
6. Fixes quirks (grid cells, disabled-fixed selects, wrong ids) and reports.

**Guardrail:** the agent edits **only that feature's folder + its `master.csv`
row** — never `core/` or another feature. If a genuine framework bug forces a
`core/` change, it tests on a throwaway feature and re-runs `npm run validate` to
prove every committed feature still passes.

**Manual vs agent — the split that keeps this scalable:**

| Deterministic → the **importer** (Path A) | Judgment → the **agent** (Path B) |
| --- | --- |
| selectors, steps, tokens, dedup, clean names | consolidate a toggling superset recording |
| reuse columns, unique names, `serial: true` | decide `N/A` per iteration; check scenario consistency |
| validate structure | screenshot-verify; fix disabled/grid/id quirks |

Use the importer alone for a simple, single-path feature. Add the agent when the
feature has conditional fields, multiple data-combination iterations, or you want it
wired **and verified** end-to-end.

---

## 14. Command reference

### Everyday
```bash
npm run validate                          # check every CSV, no browser (~2s)
npm run test -- --testcase TC_04          # one test case (ignores Execute)
npm run test -- --tc TC_04                # same, short form
npm run test -- --all                     # everything with Execute=TRUE
npm run test -- --tags smoke              # by tag
npm run test -- --tags "smoke+regression" # AND
npm run test -- --tags "smoke,regression" # OR
npm run test -- --tags "~slow"            # NOT
npm run test -- --feature ROM(PD)         # one feature
npm run test -- --testcase TC_04 --headed # watch it run
npm run test -- --testcase TC_04 --workers 1
npm run test -- --testcase TC_04 --update-baseline   # re-approve the benchmark
```

### `test` flags (`core/cli/args.ts`)
| Flag | Effect |
| --- | --- |
| `--testcase` / `--tc <ID>` | Run one TC. **Ignores `Execute`.** |
| `--tags <expr>` | OR `,` · AND `+` · NOT `~`. |
| `--feature <Name>` | Restrict to a feature. |
| `--env <name>` | Override env. **Applies to every row — see §10.1.** |
| `--all` | Ignore `Execute`. |
| `--update-baseline` | Overwrite benchmarks. |
| `--headed` | Show the browser. |
| `--workers <n>` | Concurrency (default 4 / `WORKERS`). |
| `--trigger <name>` | Label the run (`local` / `ci`). |

### Authoring a feature

**Path A — manual importer** (deterministic, runnable on its own):
```bash
npm run codegen                                              # record; save into the feature's 02_selectors_repo/ as recording.txt
npm run import-codegen -- ProductDesign feature_MyFeature --tc TC_05          # design flow; recording auto-discovered
npm run import-codegen -- ProductDesign feature_MyFeature --tc TC_05 --sim    # SIM flow; reads sim_recording.txt -> sim_metadata.csv
npm run scaffold-feature -- <Module> <Feature>               # empty tree (import does this too)
npm run xlsx-to-csv -- <file.xlsx>                           # Excel -> CSV
```

> **Design vs simulation import** (§5.1). The `--sim` flag reads
> `02_selectors_repo/sim_recording.txt` → `03_metadata/sim_metadata.csv`, binds
> tokens to `simulation.csv`, adds **no** login/navigate (the flow starts on the
> results page at the Simulate click), and **shares** `selectors.csv` +
> `compare.config.csv`. Then set `Simulation=YES` in master.csv and the sim chains
> after a green design run — `npm run test -- --testcase TC_05` runs **both**.

**Path B — the AI agent** (importer + judgment + screenshot verification, §13.9):
```text
/import-feature ProductDesign feature_MyFeature TC_05
```
Same command in **Claude Code** and **GitHub Copilot** — both follow
`AI_IMPORT_AGENT.md`. It runs the importer above, then consolidates the metadata,
validates, runs, and screenshot-verifies each iteration — scoped to that one feature.

> The recording is **auto-discovered** from `feature_MyFeature/02_selectors_repo/`
> (`recording.txt`/`recording.ts`) — do not pass a path. If you must, it is a 3rd
> positional arg **relative to the repo root**, not the feature folder.

### Sharing results (§11.1)
```bash
npm run report:share                # ~13MB — one file, screenshots embedded
npm run report:share -- --lite      # ~25KB — one file, no screenshots (emailable)
npm run report:share -- <runId>     # a specific run
npm run report:share -- --list      # list shareable runs
```
Never send `09_html_report/index.html` or `combined_report.html` on their own —
their links break outside the repo. Always send the `report:share` output.

### Maintenance
```bash
npm run generate            # regenerate POM + specs
npm run cleanup:orphans     # delete projects left behind by runs
npm run typecheck           # tsc --noEmit
npm run unit                # unit tests
npm run itest               # integration tests
npm run pw:test             # raw Playwright runner (DIFFERENT path — see below)
```

> `npm run test` and `npm run pw:test` are **not** the same. The CLI (`npm run
> test`) is the real path; it calls the runner directly and never executes
> `05_generated_scripts/`. `pw:test` runs those generated specs and resolves env
> differently. Use `npm run test`.

---

## 15. Traps and known issues

Ordered by how much time they will cost you.

1. **A green run can verify nothing.** Missing baseline -> `BASELINE_CREATED` ->
   exit 0. **Check the status string, not the exit code** (§9.4).
2. **`networkidle` never fires.** This SPA streams telemetry beacons, so it never
   goes idle. Use `domcontentloaded` + a polled `waitForSelector`. In
   `iterationRunner` the `goto` is outside the try/catch, so a `networkidle`
   timeout there is fatal with **no report**.
3. **Accessible names match by substring.** `Save` matches `Save & Compute`. Use
   `Exact=TRUE` (§7.3).
4. **Grouped dropdown options repeat.** Label-only matching + `.first()` silently
   picks the wrong group — a wrong-value PASS. Use `"Option (Group)"` (§6.1).
5. **Validation covers every master row.** A broken feature you are not running
   still aborts your run (§4.1).
6. **AG Grid header cells carry the same `col-id` as data cells.** `div[col-id=x]`
   + `.first()` matches the *header* and polls the literal word "Status" forever.
   Scope with `div[role=gridcell][col-id=x]`.
7. **Immediate re-runs can crash the app.** Leave a gap between runs.
8. **The `Screenshot` column does nothing** (§4.3.2).
9. **Metadata `Seq` != report Seq** (§4.3.1).
10. **`sleep` is always wrong.** The validator flags every use. Poll a condition.
11. **`maxWaitMs` in `feature.config.json` is unreachable** — `waitForSimulation`
    uses `step.timeout || sim.maxWaitMs`, and `Timeout` defaults to `30000`, never
    `0`. Set the ceiling in the step's `Timeout`.
12. **`npm run typecheck` is currently red** — pre-existing type-signature errors
    in `core/keywords/input.ts` and `scripts/scaffold-feature.ts`. They do not
    affect execution (`npm run test` runs through tsx, which strips types without
    checking them).
13. **Excel locks CSVs.** Close the file or writes fail with `EPERM`.
14. **CSV commas.** An unquoted comma in `Description` shifts every later column.
    Keep descriptions comma-free or quote the field.
15. **One session per user (Forced Log Out).** The app kills all but the newest
    session for a login. So iterations must run **serially** — `serial: true` in
    the feature config (now the importer default). With `serial: false`, two
    iterations log in at once and you get a spurious login failure / "Forced Log
    Out" screen. Note: `serial: true` on *any* selected feature makes the whole
    run serial.
16. **A recording can't capture a computed field.** If a parameter was the
    *computed* (greyed) field while you recorded, codegen never typed it, so the
    importer emits no `fill` for it. When that field is an **input** in another
    iteration, add the `fill` step by hand (§6.2 / §13). A re-import wipes manual
    additions — re-add them.
17. **Steps execute in `StepID` order, not row/`Seq` order.** The loader sorts by
    `StepID` (`core/loaders/featureLoader.ts`). To reorder a step, change its
    **StepID** — moving the row or editing `Seq` does nothing. This is the single
    biggest time-sink when a controlling `select` "won't run early enough": its row
    was moved, but its StepID wasn't.
18. **A controlling `select` can be *reset* by a later `fill`.** Filling the
    input-method table reverts the effect sub-method (`#hazardRatioInputMethod`) to
    "None", which disables its effect field. Give the select a StepID **after** the
    table it depends on and **just before** the field it enables. Symptom:
    `… is disabled but testdata requires a value` on a field you did populate.
19. **`select` prints its options on a mismatch; `fill` tabs out after every value.**
    A no-match `select` error now lists every `value=text` — map your testdata value
    to one (§6.1). `fill` presses **Tab** after a value lands, so controls that only
    enable on blur (e.g. the enrollment **Calculate** button) activate.
20. **Recover a real DOM id from `trace.zip`.** `field "X" not found` means the id is
    wrong. `unzip` the run's `artifacts/<runId>/<TC>_<ITER>/trace.zip` and grep the
    DOM snapshots for `["SELECT",{…"id":"…"}]` (or `INPUT` / `BUTTON`) — that is the
    true id, no live browser needed.
21. **Duplicate ids, and `SkipIf` is single-condition.** Several controls can share
    one id (`id="addButton"` on *every* "Add Period"); `.first()` grabs the wrong one
    — disambiguate with a Playwright CSS `:nth-match(button:has-text("Add Period"), 2)`.
    `SkipIf` is one `lhs (==|!=) rhs` with no AND/OR — gate a not-applicable field
    (checkbox absent because Futility=None; effect field computed by a different
    sub-method) by setting its testdata cell to **`N/A`**, not a compound expression.
22. **Dialogs block the flow.** "Unsaved Changes" on navigation → **Save first,
    never click "Leave"** (Leave discards the design and hides a real validation
    error). The **Compute** credit dialog needs its primary button
    (`#credit-alert-primary`) *and* a **Result Name** (the result link is keyed on
    it). Dialog buttons are often not semantic `role=button` — target by `text`/`#id`.
23. **An ungated Add-Period/Add-Interim click adds a blank row.** It makes the design
    invalid so it won't compute. Gate every period/interim-add on the new period's
    key column: `SkipIf ${data.design.<table>.<idx>.<col>}==N/A`. The recording may
    **mis-name** the button (captured `role=button "Add Period"`, named after a nearby
    label) — trust the *selector*, not the ObjectName. This token/gate is **unchanged**
    when the table is authored as a normalized child file (§4.5) — the fold reconstructs the
    same `<table>.<idx>.<col>` column — but there the not-applicable cell must be `N/A`, **not
    blank**, or the literal `==N/A` compare misses it and the blank row is added anyway.

---

## 16. Where to look when something breaks

| Symptom | Look at |
| --- | --- |
| Exit 1, no browser | Validation output — a CSV is malformed *somewhere*, maybe another feature. |
| `Locator not found: Page=X ObjectName=Y` | `selectors.csv` — is `(Page, ObjectName)` right? |
| `UI-DRIFT` warning | The primary selector matched 0 elements. The markup moved. |
| Step times out on a dropdown | Is it one `select` step? Is the group in the value (§6.1)? |
| Wrong value silently selected | Substring match (§7.3) or grouped options (§6.1). |
| `BASELINE_CREATED` when you expected PASS | Baseline is not where the env points (§9.4/§10.1). |
| Compare FAIL | `08_diffs/` — cell-level differences. |
| "Forced Log Out" / bounced to the login page | Iterations ran in parallel against a one-session app. Set `serial: true` (Trap 15). |
| `field "X" not found` / `... is disabled but testdata requires a value` | The `fill` value can't land — wrong selector (recover the real id from `trace.zip`, Trap 20), the controlling `select` ran too late / was reset (Traps 17-18), or the field is greyed (should its value be `Computed`?). §6.2. |
| `select … has no option matching "V"` | The error now lists every real option (`value=text`) — map your value to one, or the value belongs in a different field (§6.1 / Trap 19). |
| a `check`/`uncheck` step **times out** | The checkbox isn't rendered for this option combination (e.g. efficacy/futility checks exist only with a futility boundary) → set the cell to `N/A` (Trap 21). |
| a **blank period/interim row** appears / design won't compute | An ungated Add-Period/Add-Interim click (Trap 23) — gate it on the new period's data column. |
| `No testdata row for TC/ITER` | A keyed testdata file is missing that iteration's row. `validate` now catches this first (§4.5). |
| Nothing obvious | `artifacts/<runId>/<TC>_<ITER>/` — the screenshots show the actual screen at the failing step. |

---

## 17. Glossary

| Term | Meaning |
| --- | --- |
| **Feature** | One app workflow under test -> `<Module>/feature_<Name>/`. |
| **Test case (TC)** | A row in `master.csv`. |
| **Iteration** | One execution of a TC with one testdata row (`ITER_01`). |
| **Step** | One row in `metadata.csv`. |
| **Keyword / Action** | What a step does (`click`, `select`, ...). §6. |
| **Object** | A logical UI element name (`btn_Save`) resolved via `selectors.csv`. |
| **Baseline / benchmark** | The approved expected result. §9. |
| **Flow** | A reusable step CSV in `flows/`. §12.1. |
| **Custom step** | An app-specific handler in `custom/`. §12.2. |
| **§14** | The rule: framework core is never app-specific. |
