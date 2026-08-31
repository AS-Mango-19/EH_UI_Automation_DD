# EH UI Automation — Framework Knowledge Transfer (KT)

A complete, friendly reference for the **CSV-driven Playwright regression framework** that tests the
Cytel **East Horizon** clinical-trial design web app. Read this top-to-bottom once and you will
understand what the framework is, how to run it, how the files fit together, and how to add or fix a
test — without reading a line of the engine's code.

- **Audience:** QA engineers and developers new to the project.
- **Every claim is code-backed.** File paths (and line numbers where useful) are given so you can
  verify, e.g. `core/runner/orchestrator.ts`. Paths are relative to the repo root.
- **The golden idea:** *tests are **data**, not code.* You never hand-write a `.spec.ts`.

---

## Contents

**In a hurry?**
[Run something now](#2-quick-start) ·
[All commands](#4-command-reference-the-important-one) ·
[Run one feature / all / one iteration](#how-do-i-run--the-cheat-sheet) ·
[Add a feature](#16-adding-a-new-feature) ·
[Something broke](#18-where-to-look-when-something-breaks) ·
[Traps](#17-traps-and-known-issues)

| § | Section | What's in it |
| --- | --- | --- |
| 1 | [What this is & why](#1-what-this-is--why) | The mental model. Start here. |
| 2 | [Quick start](#2-quick-start) | Get a run going in five minutes. |
| 3 | [Core concepts](#3-core-concepts-the-vocabulary) | The words used everywhere. |
| 4 | [Command reference](#4-command-reference-the-important-one) | **Every command, with examples.** Run all / one feature / one iteration. |
| 5 | [Repository layout](#5-repository-layout) | What every folder is for. |
| 6 | [The CSV layers](#6-the-csv-layers) | Reference tables for every file & column. |
| 7 | [How a run executes](#7-how-a-run-executes) | CLI → validate → run → compare → report. |
| 8 | [The keyword catalog](#8-the-keyword-catalog) | Every `Action` you can put in a step (all 43). |
| 9 | [Selector resolution](#9-selector-resolution) | How a name becomes a Playwright locator. |
| 10 | [Variable interpolation](#10-variable-interpolation) | Every `${...}` token that exists. |
| 11 | [Authoring testdata](#11-authoring-testdata) | What to put in each cell; period tables; scenarios. |
| 12 | [Baseline & compare](#12-baseline--compare) | The point of the framework. |
| 13 | [Environments & auth](#13-environments--auth) | How the env is chosen, and login. |
| 14 | [Reports & sharing](#14-reports--sharing) | What is written where, and how to share it. |
| 15 | [Extension points](#15-extension-points) | Reusable flows and custom steps. |
| 16 | [Adding a new feature](#16-adding-a-new-feature) | Two paths — importer + AI agent. |
| 17 | [Traps & known issues](#17-traps-and-known-issues) | **Read before debugging.** |
| 18 | [Where to look when something breaks](#18-where-to-look-when-something-breaks) | Symptom → where to look. |
| 19 | [Glossary](#19-glossary) | Terms used throughout. |

---

## 1. What this is & why

**A test is data, not code.** One test = a row in `master.csv` plus a handful of CSV files in a
feature folder. The engine (`core/`) reads those files and drives a browser through the East Horizon
app: it configures a study design, computes it, optionally runs a simulation, scrapes the result
tables, and compares them against an approved **baseline**. Nobody writes a Playwright script by hand —
they are generated from a recording.

The framework is built from **six layers**, each answering one question:

```
master.csv                       WHICH tests exist, and which ones run
   │
   ▼
00_config/feature.config.json     HOW this feature behaves (auth, results, cleanup)
   │
   ▼
03_metadata/metadata.csv          WHAT the test does — the ordered steps
   │
   ▼
02_selectors_repo/selectors.csv   WHERE things are — a logical name → a locator
   │
   ▼
01_testdata/*.csv                 WHICH values to type — one row per iteration
   │
   ▼
06_baseline/<env>/                WHAT the answer should be — the approved benchmark
```

The **separation** is the whole point:

- A **step** never contains a selector — it names an object (`btn_Save`).
- A **selector** never contains a value — the step supplies it.
- A **value** never lives in a step — it comes from testdata (`${data.project.Phase}`).

So when the UI moves, you edit **one row** of `selectors.csv`. When the data changes, you edit
`01_testdata/`. Neither touches the engine.

**The rule that keeps this honest:** the framework core (`core/`) is **generic** — no selectors, no
URLs, no business logic. Anything app-specific lives in the feature's CSVs or in
`custom/<Feature>/customSteps.ts`. This is what lets one engine serve every feature.

**Two facts about this particular app that shape everything:**

- **One session per user.** The app allows only one active login at a time; a second login forces the
  first out ("Forced Log Out"). So iterations of a feature run **serially** (`serial: true`) — see
  [Trap 15](#17-traps-and-known-issues).
- **A green run can verify nothing.** The first time a test runs there is no baseline, so it *writes*
  one and reports `BASELINE_CREATED` — green, but nothing was checked. **Always read the status
  string, never the exit code** ([§12](#12-baseline--compare)).

---

## 2. Quick start

**Prerequisites:** Node.js + `npm install` (the `prepare` script wires up the git hooks). A `.env`
file at the repo root holds the app URL and credentials (`BASE_URL`, `API_BASE_URL`, `APP_USERNAME`,
`APP_PASSWORD`) — it is **gitignored** and never committed. See [§13](#13-environments--auth).

**The three commands you need on day one:**

```bash
npm run validate                       # check every CSV without opening a browser (~2s)
npm run test -- --testcase TC_04       # run ONE test case (feature ROM(PD))
npm run test -- --all                  # run everything marked Execute=TRUE
```

> Flags go **after `--`** so npm passes them through. You can also skip npm:
> `npx tsx core/cli/index.ts test --testcase TC_04`.

**After a run, look here:**

| Where | What |
| --- | --- |
| `ProductDesign/feature_<Name>/09_html_report/index.html` | per-step report with screenshots |
| `reports/<runId>/results.json` | machine-readable result — **the source of truth** |
| `artifacts/<runId>/<TC>_<ITER>/` | screenshots, `trace.zip`, video |

To send a report to someone, don't email the HTML file directly (its links break) — use
`npm run report:share` ([§14](#14-reports--sharing)).

---

## 3. Core concepts (the vocabulary)

These words appear on every page — learn them once.

| Term | Meaning |
| --- | --- |
| **Feature** | One app workflow under test → a folder `<Module>/feature_<Name>/` (e.g. `ProductDesign/feature_ROM(PD)/`). |
| **Test case (TC)** | One row in `master.csv`, identified by a `TC_ID` (`TC_04`). What `--testcase` runs. |
| **Iteration** | One execution of a TC with one testdata row, identified by an `IterationID` (`ITER_01`). A TC with three testdata rows runs three iterations of the *same* steps with different values. |
| **Step** | One row in `metadata.csv` — one action, e.g. "fill the Sample Size field". |
| **Keyword / Action** | What a step does: `click`, `fill`, `select`, … ([§8](#8-the-keyword-catalog)). |
| **Object** | A logical UI-element name (`btn_Save`) that `selectors.csv` maps to a real locator. |
| **Selector** | The actual locator (`#save-button`, a role, an xpath) behind an object. |
| **Baseline / benchmark** | The approved expected result for a TC+iteration ([§12](#12-baseline--compare)). |
| **Flow** | A reusable step CSV in `flows/` (e.g. `flows/login.csv`), inlined via `callReusable` ([§15](#15-extension-points)). |
| **Custom step** | An app-specific handler in `custom/<Feature>/customSteps.ts`, called via `callCustom`. |
| **Design flow / Simulation flow** | A feature can have two flows: the **design** (configure + compute) and a chained **simulation** that runs after a green design ([§7](#7-how-a-run-executes)). |

**Two rules that trip everyone up at first:**

1. **Steps run in `StepID` order, not file order.** The loader sorts by the numeric `StepID` column
   (`core/loaders/featureLoader.ts`). To move a step earlier, **change its StepID** — reordering rows
   does nothing. StepIDs are gapped (10, 20, 30) so you can insert without renumbering.
2. **One metadata serves every iteration.** A value-entering step whose testdata cell is **blank** or
   **`N/A`** is simply *skipped* for that iteration. You never fork the steps per scenario; you
   data-drive them ([§11](#11-authoring-testdata)).

---

## 4. Command reference (the important one)

Every `npm run <name>` maps to a script in `package.json`. Under the hood each is
`tsx <script>` — e.g. `npm run test` is `tsx core/cli/index.ts test`. **Flags must come after `--`**
so npm forwards them: `npm run test -- --testcase TC_03`.

### How do I run …? — the cheat-sheet

| I want to run… | Command | Notes |
| --- | --- | --- |
| **Validate everything** (no browser) | `npm run validate` | Checks every `master.csv` row, incl. `Execute=FALSE`. ~2s. |
| **Validate one feature** | `npm run validate -- --feature DOM(PD)` | Case-insensitive; a `feature_` prefix is tolerated. |
| **All enabled features** | `npm run test -- --all` | Every row with `Execute=TRUE`. (Bare `npm run test` does the same.) |
| **One feature** (all its enabled TCs) | `npm run test -- --feature DOM(PD)` | **Exact, case-sensitive** match on the `Feature` column (unlike validate). |
| **One test case** | `npm run test -- --testcase TC_03` | Alias `--tc TC_03`. **Runs even if `Execute=FALSE`** — the only way to run a disabled row. |
| **One specific ITERATION** | *(no flag)* — set the `Run` column, then `npm run test -- --testcase TC_03` | See [Running one iteration](#running-one-iteration-there-is-no---iteration-flag). |
| **By tag** | `npm run test -- --tags smoke` | `,`=OR · `+`=AND · `~`=NOT. Never picks `Execute=FALSE`. |
| **Watch it (visible browser)** | `npm run test -- --testcase TC_03 --headed` | Default is headless. |
| **Force serial** | `npm run test -- --testcase TC_03 --workers 1` | Default = 4 workers (auto-serial if any feature is `serial:true`). |
| **Re-approve the baseline** | `npm run test -- --testcase TC_03 --update-baseline` | Overwrites the benchmark; status = `BASELINE_CREATED`. |

**Selection precedence** (highest wins): `--testcase` > `--tags` > `--all` > default (`Execute=TRUE`).
Only `--testcase` runs an `Execute=FALSE` row. Source: `core/runner/select.ts`.

### Running one iteration (there is NO `--iteration` flag)

Iteration selection lives in the **testdata**, not the CLI. Set a **`Run` column** in any testdata file
that has an `IterationID` column (`inputset.csv`, `project.csv`, or `design.csv` — whichever the
author used), then run the whole test case.

- **ON** = `TRUE` / `1` / `YES` / `Y` / **blank** (blank means run — the column is opt-**out**).
- **OFF** = `FALSE` (anything not truthy).
- The iteration list is the **union** across all keyed testdata files; `Run=FALSE` in **any** file is a
  **veto** that switches that iteration off everywhere, and a file lacking the column can't switch one
  back on.
- Source: `RUN_COLUMN` in `core/runner/testdata.schema.ts`; `iterationsFor()` in
  `core/runner/testDataStore.ts`; unit tests in `tests/unit/testDataStore.test.ts`.

**Example — run only `ITER_03` of `TC_03`:** in one testdata file set `Run=TRUE` on the `ITER_03` row
and `Run=FALSE` on the others, then `npm run test -- --testcase TC_03`. Back up the file first and
restore all `Run=TRUE` when you're done.

### The CLI subcommands (`core/cli/index.ts`)

| Command | What it does |
| --- | --- |
| `npm run validate` | Schema-check every CSV. No browser, no Playwright loaded. |
| `npm run test` | **Validates first, then runs** — aborts before opening a browser if validation fails. |
| `npm run generate` | (Re)generate the POM + spec files only — no run. Does **not** pre-validate. |
| `npm run cleanup:orphans` | Delete projects left behind by crashed runs (via the API). |

### `test` flags (`core/cli/args.ts` — exactly 9; anything else → "Unknown flag")

| Flag | Value? | Effect |
| --- | --- | --- |
| `--testcase` / `--tc <ID>` | yes | Run one TC. **Ignores `Execute`.** |
| `--tags "<expr>"` | yes | `,`=OR · `+`=AND · `~`=NOT. |
| `--feature <Name>` | yes | One feature. **Exact match** for `test`/`generate`. |
| `--all` | no | Every `Execute=TRUE` row. |
| `--env <name>` | yes | Override env — selects `.env.<env>` AND `06_baseline/<env>/`. Applies to **every** selected row. |
| `--update-baseline` | no | Overwrite the benchmark. |
| `--headed` | no | Visible browser (default headless). |
| `--workers <n>` | yes | Concurrency (default 4). |
| `--trigger <label>` | yes | Label the run in the report (`local`/`ci`). |

> `--sim`, `--seed`, `--strict` are **not** `test` flags — they belong to `import-codegen` only
> (below). There is no `--iteration`.

### Authoring a feature

```bash
npm run codegen                                                   # record a flow (Playwright recorder); save into the feature's 02_selectors_repo/recording.txt
npm run import-codegen -- ProductDesign DOP(PD) --tc TC_22        # DESIGN flow → metadata.csv (recording auto-discovered)
npm run import-codegen -- ProductDesign DOP(PD) --tc TC_22 --sim  # SIM flow → sim_metadata.csv (reads sim_recording.txt; tokens → simulation.csv)
npm run scaffold-feature -- ProductDesign Simon2Stage            # empty feature tree (import-codegen also creates the folder)
npm run xlsx-to-csv -- path/to/testdata.xlsx 01_testdata/        # Excel → one CSV per sheet
```

`import-codegen` script-only flags: `--sim` (simulation flow), `--seed` (bootstrap — create columns for
unmatched recorded fields; empty features only), `--strict` (fail on any unwired field), `--page NAME`,
`--tc TC_XX`. Full playbook: `AI_IMPORT_AGENT.md`. AI-assisted path: `/import-feature`
([§16](#16-adding-a-new-feature)).

### Reports

```bash
npm run report:share                              # newest run → ONE self-contained HTML (~13 MB, screenshots embedded)
npm run report:share -- --lite                    # ~40 KB, no screenshots (emailable)
npm run report:share -- 20260717T123816_de4b97    # a specific runId
npm run report:share -- --list                    # list shareable runs
```

Every `npm run test` already writes `reports/<runId>/{results.json, combined_report.html, junit.xml}`
plus each feature's `09_html_report/index.html`. **Never** email the on-disk HTML directly — its links
break outside the repo; send the `report:share` output. Source: `scripts/share-report.ts`.

### Maintenance / dev

```bash
npm run check-recordings   # credential guard: scan committed recordings for un-scrubbed creds (also the pre-commit hook)
npm run cleanup:orphans    # delete leftover projects
npm run generate           # regenerate POM + specs
npm run typecheck          # tsc --noEmit
npm run unit               # unit tests (tests/unit/*.test.ts)
npm run itest              # integration tests
npm run pw:test            # DIFFERENT engine — runs the generated specs via Playwright Test (use `npm run test` normally)
```

### Gotchas that live with the commands

- **`test` pre-validates with a narrowed scope.** A targeted run (`--feature`/`--testcase`) validates
  only its target; a broad run validates only the **enabled** features — so a broken or disabled
  *other* feature never blocks the feature you asked for. `generate` does **not** pre-validate.
- **`--feature` matches differently for `validate` vs `test`/`generate`.** `validate` is
  case-insensitive and tolerates a `feature_` prefix (`core/schema/validator.ts`); `test`/`generate`
  need an **exact, case-sensitive** match on the `Feature` column (`core/runner/select.ts`). Use the
  exact `master.csv` value (`DOM(PD)`) for runs.
- **Parallel by default (4 workers), auto-serial** when any selected feature is `serial:true` or any
  row has a non-empty `DependsOn` (`core/runner/orchestrator.ts`). Force serial with `--workers 1`.
- **Headless by default.** `--headed` shows the browser (`HEADLESS` env, default `true`).
- **`npm run test` ≠ `npm run pw:test`.** The CLI is the real path; `pw:test` runs the *generated*
  specs and resolves env differently (its toggles are the env vars `RUN_ALL=1`, `UPDATE_BASELINE=1`).
  Use `npm run test`.

---

## 5. Repository layout

```
master.csv                       the test registry (one row per TC)
.env                             BASE_URL, API_BASE_URL, credentials (gitignored)
flows/login.csv                  reusable step flows (callReusable)
flows/<feature>_<table>_period.csv   generated loopPeriods template flows (§11)
custom/<Feature>/customSteps.ts  app-specific hooks (callCustom)
custom/_shared/customSteps.ts    shared hooks every feature inherits

config/
  framework.config.ts            framework-wide defaults (timeouts, volatile columns)
  environments.ts                .env loading + env resolution

core/                            THE ENGINE — generic, never app-specific
  cli/          index.ts, args.ts               entry point + flag parsing
  schema/       *.schema.ts, validator.ts       CSV shapes + pre-flight validation
  loaders/      featureLoader.ts                reads + folds the CSV layers
  locators/     resolver.ts                     selectors.csv → Playwright Locator
  keywords/     catalog.ts, registry.ts, *.ts   every Action (§8)
  runner/       orchestrator.ts, iterationRunner.ts, stepRunner.ts, testDataStore.ts, select.ts
  comparator/   baseline.ts, runCompare.ts, comparator.ts   benchmark compare
  reporters/    featureHtml.ts, combinedHtml.ts, index.ts
  generators/   pom.generator.ts, spec.generator.ts

scripts/
  import-codegen.ts              codegen recording → a working feature
  scaffold-feature.ts            empty feature tree
  codegen.ts                     launches Playwright's interactive recorder
  share-report.ts                one self-contained shareable HTML
  check-recordings.ts            credential guard (pre-commit)
  xlsx-to-csv.ts                 Excel → CSV

ProductDesign/feature_<Name>/
  00_config/feature.config.json      how this feature behaves
  01_testdata/*.csv                  the values (one row per iteration)
  02_selectors_repo/selectors.csv    the locators   (recording.txt lives here — gitignored)
  03_metadata/metadata.csv           the steps  (+ sim_metadata.csv for the sim flow)
  04_generated_pom/                  GENERATED — do not edit
  05_generated_scripts/              GENERATED — do not edit
  06_baseline/<env>/                 the approved benchmark  (+ compare.config.csv)
  07_actual_results/                 what THIS run captured   (gitignored)
  08_diffs/                          baseline-vs-actual differences (gitignored)
  09_html_report/index.html          the per-feature report  (gitignored)
```

> **The folder numbers are labels, not load order** (`core/utils/paths.ts`). `04_`/`05_` are generated
> — never edit them by hand; they are regenerated on every run.

---

## 6. The CSV layers

### 6.1 `master.csv` — the test registry

One row per test case. Schema: `core/schema/master.schema.ts`. The schema is `.passthrough()`, so
**extra columns are safe and column order does not matter** — everything is mapped by header *name*.

| Column | Required | Default | Meaning |
| --- | --- | --- | --- |
| `TC_ID` | **yes** | — | Unique id, e.g. `TC_04`. What `--testcase` matches. |
| `Module` | **yes** | — | Top folder, e.g. `ProductDesign`. |
| `Feature` | **yes** | — | Resolves to `<Module>/feature_<Feature>/`. |
| `Execute` | no | `FALSE` | Whether `--all` runs it. `--testcase` **ignores** this. |
| `Tags` | no | `''` | For `--tags`. OR `,` · AND `+` · NOT `~`. |
| `StudyObjective` | no | `''` | Human label of the study type (e.g. `Two Arm Confirmatory`). |
| `Browser` | no | `chromium` | `chromium` \| `firefox` \| `webkit`. |
| `Environment` | no | `''` | Env name — selects **both** `.env.<env>` and `06_baseline/<env>/`. Currently `AD`. |
| `TestDataFile` | no | `01_testdata` | The testdata folder (a file inside it also resolves to the folder). |
| `MetadataFile` | no | `03_metadata/metadata.csv` | Relative to the feature dir. |
| `ProjectID` | no | `''` | Reuse an existing app project instead of creating one. |
| `Simulation` | no | `''` | `YES` chains the simulation flow after a green design ([§7](#7-how-a-run-executes)). |

**Current registry (excerpt — `master.csv` is the source of truth):**

```csv
TC_ID,Module,Tags,StudyObjective,Feature,ProjectID,Browser,TestDataFile,MetadataFile,Execute,Environment,Simulation
TC_03,ProductDesign,regression,Two Arm Confirmatory,DOM(PD),,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD,YES
TC_12,ProductDesign,regression,Two Arm Confirmatory,GADAR(PD),,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD,YES
TC_17,ProductDesign,regression,Two Arm Confirmatory,GADSD(PD),,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD,
TC_20,ProductDesign,regression,Two Arm Confirmatory,GADAR_Stratification,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,FALSE,AD,YES
TC_21,ProductDesign,regression,Two Arm Confirmatory,ROP(PD),,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD,YES
TC_22,ProductDesign,regression,Two Arm Confirmatory,DOP(PD),,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD,YES
```

The registry spans ~21 rows (TC_01–TC_23; there is no TC_14/16). Families: **one-arm** (SinglePoissonRate,
Simon2Stage, MeanofPairedRatios, BOP2, *OAD), **proportions** (ROP, DOP, OROP, RONBR, FishersExact),
**means/continuous** (DOM, ROM, ROPR), **survival / group-sequential** (GADAR, GADSD), **dose-escalation**
(3+3, Rolling6). A few reference features used throughout this doc: `ROM(PD)` (TC_04, the simplest
design+sim example), `DOM(PD)` (TC_03, means family), `GADAR(PD)` (TC_12, survival), `ROP(PD)` (TC_21,
the count-agnostic period-table proving feature), `DOP(PD)` (TC_22, imported with today's defaults).

> **Trap.** Validation checks **every** master row's structure regardless of `Execute`, and a broken
> row can abort a run. (A targeted `npm run test` narrows validation to just its target — see the
> [command gotchas](#gotchas-that-live-with-the-commands).)

### 6.2 `00_config/feature.config.json` — feature behaviour

Schema: `core/schema/featureConfig.schema.ts`. Loaded by `core/loaders/featureLoader.ts`.

| Key | Default | Meaning |
| --- | --- | --- |
| `feature`, `module` | — (req) | Identity. |
| `serial` | `false` (schema) | Run this feature's iterations one at a time. **The importer writes `true`** — the app allows one session per user (Trap 15). Any serial feature makes the whole run serial. |
| `reuseAuthState` | `true` (schema) | `true` = log in once, save `.auth/<env>.json`, reuse it. **The importer writes `false`** so a single browser logs in inline via `callReusable flows/login.csv` — see [§13](#13-environments--auth). |
| `testdata.files` | — | Logical name → CSV filename. `{inputset, project, design, simulation}` become the `${data.<name>.<Column>}` namespaces. |
| `testdata.joinKey` | `["TC_ID","IterationID"]` | How a testdata row is matched to an iteration. |
| `simulation` | — | `pollObject`, `successText`, `failureText`, `pollIntervalMs`, `maxWaitMs` for `waitForSimulation`. |
| `resultsExtraction` | — | `mode` (`domTable`\|`download`), `domTableObject`, `outputFileName` (supports `${TC_ID}`/`${IterationID}`), `columnMap` (grid-header → canonical name), `sortBy` (deterministic order). |
| `cleanup.deleteCreatedProjects` | `true` | Delete projects the run created (API safety-net if no `Cleanup` steps). |

### 6.3 `03_metadata/metadata.csv` — the steps

One row per step. Schema: `core/schema/metadata.schema.ts`.

| Column | Default | Meaning |
| --- | --- | --- |
| `Seq` | — | **Documentation only.** Human 1,2,3 ordering; not in the typed model — `StepID` drives execution. |
| `StepID` | req, int | **Execution order** — rows are sorted by StepID. Gapped (10, 20, 30) so steps insert without renumbering. |
| `StepGroup` | req | `Login` \| `CreateProject` \| `OpenProject` \| `CreateInputSet` \| `ConfigureDesign` \| `Simulate` \| `ExtractResults` \| `CompareBaseline` \| `Cleanup`. |
| `Page` | `-` | Namespaces `ObjectName`. `(Page, ObjectName)` is the selectors.csv lookup key. |
| `Action` | req | A keyword — see [§8](#8-the-keyword-catalog). |
| `ObjectName` | `''` | The logical object, resolved via selectors.csv. |
| `InputValue` | `''` | The value / path / flow name. Supports `${...}` tokens ([§10](#10-variable-interpolation)). |
| `StoreAs` | `''` | Save a captured value under this name (`${runtime.<name>}`). |
| `AssertType`, `ExpectedValue` | `''` | For assert / wait keywords. |
| `WaitCondition` | `''` | `visible` \| `hidden` \| `attached` \| `detached` \| … |
| `Timeout` | `30000` | Per-step timeout in ms. |
| `Optional` | `FALSE` | `TRUE` = a failure is downgraded to a warning; the run continues. |
| `Retry` | `0` | Retries for this step. |
| `SkipIf` | `''` | Skip when the condition holds. Grammar `<lhs> (==\|!=) <rhs>`; either side may be the literal `EMPTY`. **`==N/A` matches blank OR any `N/A` spelling (isNaCell); `==EMPTY` is a strict empty-string check** — the two differ ([§8.3](#83-the-skip-rules-blank--na--computed), `core/runner/skipIf.ts`). |
| `DynamicArgs` | `''` | Optional args for a Dynamic selector's `{0}`/`{1}` when they must differ from `InputValue` — a `loopPeriods` flow passes `${runtime.period.n}` here. Falls back to `InputValue` when blank ([§9](#9-selector-resolution)). |
| `Description` | `''` | Why. Shown in the report. Keep commas out or quote the field. |

> **`Seq` is cosmetic; `Screenshot` is dead.** `Seq` never reaches the engine (the report renumbers at
> render time). The `Screenshot` column is parsed and ignored — the runner screenshots **every** step
> unconditionally. Both are historical; don't rely on them.

### 6.4 `02_selectors_repo/selectors.csv` — the locators

One row per UI object. Schema: `core/schema/selectors.schema.ts`. Resolver:
`core/locators/resolver.ts`. Full detail in [§9](#9-selector-resolution).

| Column | Default | Meaning |
| --- | --- | --- |
| `ObjectName` | req | Logical name. Convention: `btn_`, `txt_`, `ddl_`, `chk_`, `opt_`, `lnk_`, `tbl_`, `lbl_`, `div_`. |
| `Page` | req | Namespace. `(Page, ObjectName)` must be unique. |
| `SelectorType` | req | `testid` \| `role` \| `label` \| `placeholder` \| `text` \| `css` \| `xpath`. |
| `SelectorValue` | req | The selector (or the role name for `role`). |
| `RoleName` | `''` | Accessible name when `SelectorType=role`. |
| `FallbackSelector` | `''` | Used if the primary matches 0 elements — **and logs a UI-DRIFT warning**. |
| `Dynamic` | `FALSE` | Enables `{0}`/`{1}` substitution in **both** `SelectorValue` and `RoleName`. |
| `Exact` | `FALSE` | Force exact accessible-name matching. Default is **substring** — this bites ([§9](#9-selector-resolution)). |
| `Description` | `''` | Why. The validator warns on an unjustified `xpath`. |

### 6.5 `01_testdata/*.csv` — the values

Keyed by `joinKey` (`TC_ID` + `IterationID`). Each file becomes a namespace:
`project.csv` → `${data.project.<Column>}`. Column names may contain spaces
(`${data.project.Time Unit}`). One TC runs once per distinct `IterationID` — the iteration list is the
**union** of `IterationID`s across the files, minus any vetoed by a `Run=FALSE` ([§4](#running-one-iteration-there-is-no---iteration-flag)).

Two validator rules keep a half-authored set honest:

- **Iteration completeness (ERROR).** If a keyed file has a row for an iteration another keyed file
  lacks, that would be a guaranteed "No testdata row" at runtime → validation **fails** naming the
  exact missing `file/TC/iteration`.
- **Coverage (WARNING).** A column that holds a value but is read by **no** step is flagged: *"column X
  has a value but no step enters it."* It catches a value that silently never reaches the screen.

**What to actually put in each cell is a decision per field per iteration — see [§11](#11-authoring-testdata).**

### 6.6 `06_baseline/compare.config.csv` — the compare rules

Schema: `core/schema/compareConfig.schema.ts`. One row per result column; it tells the comparator which
columns identify a row and which are checked.

| Column | Meaning |
| --- | --- |
| `ColumnName` | A column in the captured result set. |
| `IsKey` | `TRUE` = part of the row identity. **At least one key is required.** |
| `Compare` | `TRUE` = the value is actually checked. |
| `DataType` | `string` \| `numeric` \| `integer` \| `date` \| `bool`. |
| `AbsTolerance` / `RelTolerance` / `RoundTo` | Numeric tolerance. **A `numeric` compared column with no tolerance is a validation ERROR** — set one (use `0` for exact integers). |
| `Normalize` | `''` \| `trim` \| `lower` \| `upper` \| `trimlower` \| `collapsews`. |
| `Notes` | Why. |

Every feature uses the same shape: `TableName` / `RowLabel` / `ColumnName` are keys, `Value` is
compared, and volatile columns (`RunID` / `Timestamp` / `ProjectID`) are `Compare=FALSE`. The column
list here must match what `extractTable` captures, or the compare reports `SCHEMA_MISMATCH`.

---

## 7. How a run executes

Entry point: `core/runner/orchestrator.ts` (`testCommand`). For `npm run test -- --testcase TC_04`:

1. **Parse** argv (`core/cli/args.ts`).
2. **Validate first.** Every selected CSV is schema-checked (`core/schema/validator.ts`). Any issue →
   abort, exit 1, **no browser**. This is why `[PASS] Validation passed …` prints before the run.
3. **Select** rows (`core/runner/select.ts`) from `--testcase` / `--tags` / `--feature` / `--all`, then
   order by `DependsOn`.
4. **Load the feature** (`core/loaders/featureLoader.ts`): config + metadata + selectors +
   compare.config + testdata. Steps are de-duplicated and **sorted ascending by StepID**. **Child
   period tables are folded** into synthetic `<table>.<n>.<field>` columns ([§11](#child-tables-the-split-alternative)).
5. **Regenerate** the POM + spec (idempotent; skipped if unchanged).
6. **Establish auth** once per (feature, env, browser) if `reuseAuthState` ([§13](#13-environments--auth)).
7. **Expand tasks** — one per `(TC_ID, IterationID)`. Run in parallel (default 4 workers) or serially
   when any feature is `serial:true` or has `DependsOn`.
8. **Per iteration** (`core/runner/iterationRunner.ts`): new browser context (loads storageState,
   records video + trace), `page.goto(baseUrl, {waitUntil:'domcontentloaded'})`, build the `RunContext`.
9. **Per step** (`core/runner/stepRunner.ts`): evaluate `SkipIf` → resolve `${...}` tokens (secrets
   masked) → **skip if the value is blank / `N/A` / `Computed`** for value-entering & value-asserting
   actions → dispatch the keyword handler (with `Retry`) → screenshot → record the result.
   `Optional=TRUE` turns a failure into a warning.
10. **Extract + compare.** `extractTable` scrapes the result grids + narrative panels into
    `07_actual_results/…`; `compareWithBaseline` writes/checks the baseline and sets the status.
11. **Cleanup once**, at the very end (delete the created project unless configured otherwise), then
    write the reports. Exit code is 1 iff `FAIL + ERROR + SIMULATION_TIMEOUT > 0`.

> **Two things worth internalising.** (a) The screenshot is taken *after* the action, outside the
> retry/timeout envelope — it inflates reported durations but never consumes `Timeout`. (b) The
> `page.goto` sits **outside** the step try/catch: a failure there is *Fatal* with **no report**,
> which is why it uses `domcontentloaded`, not `networkidle` (this SPA never goes idle — Trap 2).

### 7.1 The chained simulation flow (`Simulation=YES`)

A feature can run a **second flow** — the simulation — in the **same browser**, on the **same page**,
right after the design comparison. It drives *design → Simulate → simulation results* as one iteration.

- **Turn it on:** set `Simulation=YES` on the master row. Off/blank ⇒ nothing below runs.
- **It runs only if the design phase is GREEN** (`PASS` or `BASELINE_CREATED`) — a red design **skips**
  sim. The browser stays open and the sim steps run from `03_metadata/sim_metadata.csv`, with tokens
  bound to `simulation.csv`. The first sim step is the recorded **Simulate** click.
- **Per-iteration control:** `simulation.csv` has its own `Run` column. A `Run=FALSE` row skips *only*
  the sim phase; a **missing** `simulation.csv` row skips sim there too (reason "no simulation.csv
  row"). So design-only and design+sim iterations coexist under one master `Simulation=YES`.
- **Artifacts are prefixed `sim_`** so they never overwrite the design's:
  `sim_baseline_<TC>_<ITER>.csv`, `sim_results_…`, `sim_diff_…`. The compare rules
  (`compare.config.csv`) are **reused**.
- **`waitForSimulation`** polls the results-list status cell every `pollIntervalMs` up to the step's
  `Timeout` (a sim is a real Monte-Carlo run): `Completed` → pass; `Failed` → `FAIL`; ceiling reached →
  the distinct status `SIMULATION_TIMEOUT`.
- **Status = worst-of** design and sim; **cleanup fires once**, after both phases.

Import the sim flow with `--sim` ([§4](#authoring-a-feature)); consolidate `sim_metadata.csv` the same
way as design, walking the input tabs (Design / Response / Enrollment / Simulation Setup) one at a time.

---

## 8. The keyword catalog

The `Action` column of a step is a **keyword**. The catalog is declared in `core/keywords/catalog.ts`
and wired to handlers in `core/keywords/registry.ts` (which self-checks that the two never drift).
There are **43 keywords in 8 groups**. "req" = required non-blank columns; "locator" = `ObjectName`
must resolve in selectors.csv.

### Navigation
| Keyword | Required | Notes |
| --- | --- | --- |
| `navigate` | InputValue | Goto a URL/path. |
| `goBack` / `reload` | — | Browser back / reload. |
| `switchTab` | InputValue | Switch to a tab/page by index or name. |
| `switchFrame` | ObjectName · locator | Enter an iframe. |

### Input
| Keyword | Required | Notes |
| --- | --- | --- |
| `click` / `doubleClick` / `rightClick` | ObjectName · locator | Mouse clicks. |
| `fill` | ObjectName, InputValue · locator | Set a field's value, then **read it back** to verify it landed; auto-escalates to type+Tab in stubborn grid cells ([§8.2](#82-fill--and-the-computed-rule)). |
| `type` | ObjectName, InputValue · locator | Key-by-key typing (for inputs a `fill` corrupts). |
| `clear` | ObjectName · locator | Empty a field. |
| `select` | ObjectName, InputValue · locator | One step for native **and** custom dropdowns + radios ([§8.1](#81-select--read-this-before-touching-a-dropdown)). |
| `check` / `uncheck` | ObjectName · locator | Tick/untick. **When the selector is `{0}`-parameterised (a radio group), `InputValue` becomes required** — it picks which option. |
| `upload` | ObjectName, InputValue(path) · locator | Set a file input. |
| `hover` | ObjectName · locator | Hover. |
| `press` | ObjectName, InputValue · locator | Press a keyboard key. |
| `dragAndDrop` | ObjectName, InputValue · locator | Drag source → target. |

### Wait
| Keyword | Required | Notes |
| --- | --- | --- |
| `waitForSelector` | ObjectName · locator | Wait for a state (`WaitCondition`: attached/detached/visible/hidden). |
| `waitForText` | ObjectName, ExpectedValue · locator | Poll `textContent` until it contains the value. |
| `waitForNetworkIdle` / `waitForDownload` | — | Wait for network idle / a download. |
| `waitForSimulation` | ObjectName · locator | Poll a status cell until `Completed` / `Failed` / timeout ([§7.1](#71-the-chained-simulation-flow-simulationyes)). |
| `sleep` | InputValue | **Last resort — the validator warns on every use. Poll a condition instead.** |

### Capture (each stores a string under `StoreAs`, read back as `${runtime.<StoreAs>}`)
| Keyword | Required | Notes |
| --- | --- | --- |
| `storeText` | ObjectName, StoreAs · locator | Store an element's text. |
| `storeAttribute` | ObjectName(`obj\|attr`), StoreAs · locator | Store an attribute. |
| `storeValue` | ObjectName, StoreAs · locator | Store an input's value. |
| `storeUrl` | StoreAs | Store the current URL. |
| `extractTable` | ObjectName · locator | Scrape a grid → normalized actual-results CSV; caches rows for the comparator. |
| `downloadFile` | ObjectName · locator | Download a file. |

### Assert (hard-throw; each has a `soft*` mirror that records and continues)
| Keyword | Required | Notes |
| --- | --- | --- |
| `assertVisible` / `assertHidden` / `assertEnabled` | ObjectName · locator | Element state. |
| `assertText` | ObjectName, ExpectedValue · locator | Exact text equality. |
| `assertContains` | ObjectName, ExpectedValue · locator | Substring. |
| `assertValue` | ObjectName, ExpectedValue · locator | Input value equality (used for greyed *derived* fields — [§11](#11-authoring-testdata)). |
| `assertCount` | ObjectName, ExpectedValue · locator | Element count. |
| `assertUrl` | ExpectedValue | URL check. |
| `softAssert…` (8 mirrors) | as above | Record the failure and continue, instead of throwing. |

### Flow
| Keyword | Required | Notes |
| --- | --- | --- |
| `callReusable` | InputValue(path) | Inline another metadata CSV (e.g. `flows/login.csv`). |
| `callCustom` | InputValue | Call an exported handler from `custom/<Feature>/customSteps.ts`, falling back to `custom/_shared/`. |
| `ifExists` | ObjectName, InputValue(path) · locator | Run a sub-flow only if the object is present. |
| `loopOverData` | ObjectName, InputValue(path) | Run a sub-flow once **per child-testdata row** (scoped to TC+iteration); exposes `${runtime.loop.<Column>}`. The engine of the multi-scenario pattern ([§11](#multi-scenario-repeated-modal-records)). |
| `loopPeriods` | ObjectName, InputValue(path), ExpectedValue | Run a template flow once **per PERIOD** of a folded period table. `ExpectedValue = <table>\|<countField>`; exposes `${runtime.period.<field>}` + `${runtime.period.n}`. The count-agnostic period-table engine and the importer default ([§11](#child-tables-the-split-alternative)). |

### API / Comparison
| Keyword | Required | Notes |
| --- | --- | --- |
| `apiRequest` | InputValue(`METHOD /path`) | Fire an API call (a `DELETE` 404 is treated as already-gone). |
| `compareWithBaseline` | — | Compare the captured results to the baseline ([§12](#12-baseline--compare)). |

### 8.1 `select` — read this before touching a dropdown

`select` is **one step that does everything** (`core/keywords/input.ts`), for native `<select>` and
custom dropdowns and radios:

1. Resolves the target (a `label` selector walks from the label to the adjacent control).
2. Detects a native `<select>` by tag name.
3. **Native** → matches the option by **`value` first, then exact text, then substring** and commits.
   On no match it **fails loudly and prints every real option** (`value=text`) — read that list before
   guessing. A numeric sub-method code in testdata (`hazardRatioInputMethod=2`) matches
   `<option value="2">` directly — no label needed.
4. **Custom** → opens the menu and clicks the option.

> **Grouped options repeat.** The same label can appear under two groups; a label-only match +
> `.first()` silently picks the wrong one (a wrong-value PASS). Disambiguate with `"Option (Group)"`.

### 8.2 `fill` — and the `Computed` rule

`fill` enters a value and **reads it back** to confirm it landed; if a grid cell discards the one-shot
value it escalates to typing key-by-key + Tab. It presses **Tab** after every value so controls that
only enable on blur (e.g. an enrollment **Calculate** button) activate.

A field the app computes is **greyed**. Never `fill` a greyed field — the step hard-fails on a disabled
input. Put `Computed` in the cell (it skips), or, if you know the number the app *should* show,
`assertValue` it instead ([§11](#what-to-put-in-a-cell)).

### 8.3 The skip rules (blank / `N/A` / `Computed`)

This is what lets **one** metadata serve **many** iterations. Per step, the resolved testdata value
decides (`core/runner/stepRunner.ts`):

| Situation | `fill` / `select` / `check` / `type` | `assertText` / `assertValue` / … |
| --- | --- | --- |
| a real value | enter it (read back to verify) | assert it |
| **blank / `N/A`** | **skip** — not applicable to this iteration | **skip** |
| **`Computed`** | **skip** — greyed, app-owned output | — |

> **Every value-entering step MUST carry a `${data.*}` token.** A blank `InputValue` has nothing to
> resolve, so it can never skip — it just fires every iteration and can silently override an earlier
> data-driven choice. `validate` rejects a blank `InputValue` on `fill`/`type`/`select`/`check`/`uncheck`.
>
> **`SkipIf` semantics.** `==N/A` matches an empty string **OR** any `N/A` spelling (`isNaCell`);
> `==EMPTY` is a **strict** empty check. Add-Period/Add-Interim gates use `==N/A` (skip an absent period
> *and* a present-`N/A` method cell); `loopPeriods` count-field gates use `==EMPTY`
> ([§11](#child-tables-the-split-alternative), `core/runner/skipIf.ts`).

---

## 9. Selector resolution

`core/locators/resolver.ts` turns a `(Page, ObjectName)` into a Playwright `Locator`.

**Each row carries exactly one `SelectorType`**, mapped to a Playwright builder:

| `SelectorType` | Playwright | Note |
| --- | --- | --- |
| `testid` | `getByTestId` | |
| `role` | `getByRole(SelectorValue, {name: RoleName, exact})` | Accessible role + name. |
| `label` | `getByLabel` | Walks from a form label to its control. |
| `placeholder` | `getByPlaceholder` | |
| `text` | `getByText` | |
| `css` | `locator` | Any CSS. |
| `xpath` | `locator` (auto-prefixes `xpath=`) | The validator warns on an unjustified xpath. |

> **There is no runtime "priority" fallback chain.** A `SELECTOR_PRIORITY` list exists in the schema as
> *authoring guidance* (prefer testid/role/label over xpath) and the only enforcement is the xpath
> warning — resolution simply uses the one type on the row.

- **`FallbackSelector`** — if set, the resolver counts the primary's matches, and on **0** it logs
  `UI-DRIFT: … matched 0 elements; using FallbackSelector …; Update selectors.csv.` and uses the
  fallback. That warning is your signal the markup moved. (Only the async path checks the fallback.)
- **`Exact`** — default **FALSE** = Playwright substring matching, so `"Two Arm Confirmatory"` also
  matches `"Two Arm Confirmatory - Multiple Endpoints"` (a strict-mode violation waiting to happen).
  Set `Exact=TRUE` to force exact accessible-name matching. This one bites (Trap 3).
- **`Dynamic` + `{0}`/`{1}`** — when `Dynamic=TRUE`, `{0}`, `{1}`, … in **both** `SelectorValue` and
  `RoleName` are replaced by args. Args come from the step's `DynamicArgs` column (pipe-split,
  `${...}`-resolved) if present, else from splitting `InputValue` on `|`. This is how one parametric
  selector `[id="boundary.{0}.efficacyCheck"]` serves every period in a `loopPeriods` flow
  ([§11](#child-tables-the-split-alternative)). The validator warns if `Dynamic=TRUE` but no `{d}`
  placeholder is present.

---

## 10. Variable interpolation

`core/runner/resolver.ts` expands `${...}` tokens in **`InputValue`** and **`ExpectedValue`**. Literal
text between tokens is preserved (`Proj_${runId}` works).

| Token | Resolves to | Example |
| --- | --- | --- |
| `${data.<file>.<col>}` | A testdata cell for this TC + iteration. | `${data.project.Time Unit}` |
| `${env.<VAR>}` | A key from the loaded `.env`. | `${env.APP_USERNAME}` |
| `${master.<Column>}` | A column of this test's `master.csv` row. | `${master.ProjectID}` |
| `${runtime.<name>}` | A value captured earlier via **`StoreAs`**. | `${runtime.projectId}` |
| `${runtime.loop.<Column>}` | Inside a `loopOverData` sub-flow: the current child row's column. | `${runtime.loop.curveFamily}` |
| `${runtime.period.<field>}` | Inside a `loopPeriods` template flow: the current period's cell; `${runtime.period.n}` is its 0-based index. | `${runtime.period.analysisSpacingInfo}` |
| `${config.<dotted.path>}` | A scalar from `feature.config.json`. | `${config.simulation.maxWaitMs}` |
| `${runId}` / `${iterationId}` / `${tcId}` / `${timestamp}` | Run/iteration identity. | `${runId}` |
| `${today}`, `${today+30d}`, `${today-7d}`, `${Now}` | Date tokens (`yyyy-MM-dd`; units `d`/`w`/`m`/`y`). | `${today+30d}` |
| `${faker.<method>}` | Random data. Methods: `uuid`, `company`, `firstName`, `lastName`, `email`, `word`, `number`. | `${faker.email}` |

```
${data.project.projectName}_${runId}                 →  MyProject_20260717T012349_c9c5be
${data.project.projectName}_${runId}_${iterationId}  →  MyProject_20260717T012349_c9c5be_ITER_02
```

> **For a name that must be unique across a multi-iteration run, use BOTH `${runId}` and
> `${iterationId}`** — `runId` alone is shared by every iteration, so the app would reject the 2nd as a
> duplicate. The importer already appends both to project-name fields.
>
> **An unresolvable token THROWS** (naming the file/row/column) — it is never silently replaced with
> `''`, because "a blank form field costs a day to debug." A typo in `${data.projct.Phase}` fails loud
> and immediately. Secrets are masked in logs (`${env.APP_PASSWORD}` prints `***MASKED***`).

---

## 11. Authoring testdata

Everything the test types comes from `01_testdata/*.csv`. Adding a new design combination is really
just a per-field decision, repeated. This section is the whole art of it.

### What to put in a cell

Look at the field **on screen with that combination selected** — is it there, and can you type in it?

| On screen, for THIS combination | Cell value | What happens |
| --- | --- | --- |
| **Not on the page** (hidden by a controlling option) | `N/A` | step **skipped** |
| **Editable** — you choose the input | the real value | entered, then **read back** to verify |
| **Greyed, literally showing "Computed"** (the parameter being solved for) | `Computed` | step **skipped** — the app owns it |
| **Greyed, showing a derived number** | the expected number, wired as `assertValue` | the app's arithmetic is **verified** |
| Greyed number you don't care about | `N/A` | step skipped |
| Editable, but you want the app default | blank | step skipped |

`N/A` and `Computed` both skip, so a mix-up won't fail a run — it just mis-documents *why* a field was
left alone. Keep them meaningful: **`N/A` = not on the page; `Computed` = on the page, app-owned.**
Never `fill` a calculated value into a greyed field — it hard-fails; use `assertValue` with the number
in `ExpectedValue` instead (e.g. ROM(PD) verifies `μt0 = Mean Control × NI Margin`).

> **`validate` tells you when a derived field needs wiring.** Add the column with its expected numbers
> and run `npm run validate`: *"column X has a value but no step enters it — add a step or remove the
> column."* That warning is the prompt to add the `assertValue` step (or drop the column).

### Two fields that share a label

When two fields show the **same label** but have distinct DOM ids (both read *"Mean Treatment"*;
`Hazard Ratio (Null)` vs `(Alternative)`), name the columns after the **DOM id**, not the label — a
label-derived name collides. For *editable* fills the importer splits these for you automatically
(one column per id, e.g. `hazardRatio_Null_SS` vs `hazardRatio_Alt_SS`); the hand-naming rule is for
the **greyed** `assertValue` fields it can't record. Across hypotheses the id suffix encodes the
hypothesis (`_SP`/`_SS`/`_NI`) — see `FIELD_WIRING_PATTERNS.md`.

### Period tables (indexed, multi-period values)

Some inputs are **tables** — one row per analysis period (interim spacing, piecewise hazard rates,
dropout periods). The app names each cell with a **dotted, 0-based id** — **UI "Period 1" is index
`0`**:

| Heading (the exact dotted id) | Fills |
| --- | --- |
| `boundary.0.analysisSpacingInfo` | interim spacing at look 1 |
| `boundary.1.analysisSpacingInfo` | interim spacing at look 2 |
| `inputMethodTable.0.hazardRateControl` | period-1 control hazard rate |

An export cell often packs every period into one quoted string (`"0.9, 1.2, 1.5"` = three periods) —
spread it across the indexed columns, **0-based, one value each**. A period a scenario doesn't use is
left `N/A` so its fill skips.

### Child tables (the split alternative)

Those indexed columns may instead live in **their own CSV**, one row per period — often much cleaner:

- **File `<phase>_<tableName>.csv`** — `<phase>` is the parent basename (`design`/`simulation`):
  `design_boundary.csv`, `design_dropoutTable.csv`, `simulation_enrollmentTable.csv`, …
- **Columns `TC_ID, IterationID, PeriodIndex, <field1>, <field2>, …`** — the period index is a
  **column**, one row per period.
- At load time `foldChildTables()` (`core/loaders/featureLoader.ts`) folds each row back to the
  synthetic `<table>.<n>.<field>` column, so `${data.design.boundary.0.efficacyPValue}` resolves
  **identically** whether authored inline or split. Author a table in **one** place only.

**How these tables get filled *count-agnostically*: `loopPeriods` — the importer default.** Instead of
one metadata row + one selector *per field per period* (capped at a hand-written ceiling), the importer
emits, for the allowlisted tables (`boundary` / `enrollmentTable` / `dropoutTable`):

- one **parametric selector** per field (`[id="boundary.{0}.efficacyCheck"]`, `Dynamic=TRUE`),
- a **template flow** `flows/<slug>_<table>_period.csv` driven by `${runtime.period.<field>}` (with
  `DynamicArgs=${runtime.period.n}`),
- a `callCustom reconcilePeriodTable` (adds the rows) + a `loopPeriods` step (fills them), both gated
  `SkipIf ${data.<file>.<table>.0.<countField>}==EMPTY`.

So adding a period becomes a **data-only** edit. The allowlist is `PERIOD_LOOP_CONFIG` in
`scripts/import-codegen.ts`; numeric/computed boundary fields deliberately stay enumerated (a blind
loop would type into a greyed cell). Proven on `feature_ROP(PD)` TC_21. Full recipe:
`AI_IMPORT_AGENT.md` §9.1. Author not-applicable cells as `N/A`, not blank, so the CSV stays
self-documenting.

### Multi-scenario (repeated-modal) records

A different shape: a page that adds the **same kind of record N times through one re-opened "Add …"
modal** (candidate models, scenarios, arms), where the modal **reuses the same DOM ids** and the count
varies per iteration. Wide `scenario1_x … scenario10_x` columns explode — use **`loopOverData`**
instead:

- **`01_testdata/scenarios.csv`** — a *child* table, **one row per record** (not per iteration).
- **`03_metadata/<name>_block.csv`** — a reusable sub-flow (open modal → pick type → gated fills →
  commit) reading `${runtime.loop.<Column>}`.
- **one `loopOverData` step** that runs the sub-flow per matching child row.

Fills inside the sub-flow gate **explicitly** with `SkipIf` on the loop columns (the blank/`N/A`
auto-skip is `${data.*}`-only). The importer does **not** generate this — hand-overlay it per
`MULTI_SCENARIO_GUIDE.md` (reference: `feature_BOIN`).

---

## 12. Baseline & compare

This is the point of the framework: **prove the numbers did not move.**

### Where

```
06_baseline/<env>/baseline_<TC_ID>_<IterationID>.csv          the approved benchmark
06_baseline/<env>/baseline_<TC_ID>_<IterationID>.csv.meta.json   provenance (write-only)
06_baseline/<env>/sim_baseline_<TC>_<ITER>.csv                the simulation phase's benchmark
```

The `.meta.json` sidecar records `runId`/`env`/`approver`/`sourceDataHash`. It is **write-only** —
nothing reads it at runtime (the `sourceDataHash` is recorded for humans, never enforced).

### Lifecycle

1. **First run** — no baseline. The run captures results, **writes** the baseline, reports
   `BASELINE_CREATED`. **Nothing was verified.**
2. **A human reviews the baseline numbers.** This is the real approval gate.
3. **Every later run** — capture, compare → `PASS` / `FAIL`.

Re-approve with `--update-baseline` (or `BaselineMode=update`); `create` writes only if missing.

### How the compare works

Rows are matched by their **key** columns (`IsKey=TRUE`), never by position. Per cell: strings/dates
match exactly after `Normalize`; numbers pass iff within `AbsTolerance` **or** `RelTolerance` (a
`numeric` compared column **must** declare a tolerance — use `0` for exact integers). Mismatches are
reported by class: `SCHEMA_MISMATCH`, `ROW_COUNT_MISMATCH`, `MISSING_ROW`, `EXTRA_ROW`, `VALUE_MISMATCH`
— cell-level detail lands in `08_diffs/`.

### The trap that will fool you

`BASELINE_CREATED` is **excluded** from the failure count. So if the baseline is missing — wrong env,
moved folder, renamed TC — the run captures results, **overwrites your approved benchmark with an
unreviewed capture**, reports `BASELINE_CREATED`, and **exits 0**. Green, verifying nothing.

> **Rule: assert on the status string in `reports/<runId>/results.json`, never on the exit code.** A
> real pass says `"status": "PASS"`.

> **Baselines are ENVIRONMENT-SPECIFIC** — tied to the actual East Horizon *server* the `.env`
> `BASE_URL` pointed at when approved, not just the `AD` label. An `.env` swap to a different instance
> gives `VALUE_MISMATCH` on sensitive designs. When compares fail after an `.env` change, confirm
> `.env` matches the baseline instance **before** touching data (Trap 26). A mismatch that differs only
> in *label text* (`Alternative`→`Alt.`), not numbers, is app label drift → re-baseline after review.

---

## 13. Environments & auth

### How the env is chosen

Precedence (highest first), `core/runner/orchestrator.ts`:

```
--env  >  master.csv Environment  >  process.env.ENV  >  'qa'
```

The env name selects **two** things: the `.env.<env>` file *and* the baseline folder
`06_baseline/<env>/`. `.env.<env>` falls back to `.env` when absent (there is no `.env.AD` on disk — the
real `BASE_URL`/credentials live in `.env`, and `AD` is a label that scopes the baseline).

**Env vars** (`config/environments.ts`, from `.env.<env>` then `.env`; `process.env` overrides so CI
can inject secrets): `BASE_URL`, `API_BASE_URL`, `APP_USERNAME`, `APP_PASSWORD` (masked in logs),
`HEADLESS` (default `true`), `WORKERS` (default 4), `DEFAULT_TIMEOUT_MS` (default 60000), `ENV`.

> **Do not use `--env` to scope one test.** It is highest priority and applies to **every** selected
> row, dragging other features' baselines with it. Use the `Environment` column.

### `reuseAuthState`

- **`true`** — a separate browser logs in once, saves `.auth/<env>.json`, and every iteration reuses
  the cookie (the `Login` step group is dropped). Worth it for many iterations.
- **`false`** (what the importer writes) — one browser; the first step is `callReusable flows/login.csv`,
  logging in inline. Strictly better for a single iteration: one window, no redundant browser.

Either way, remember **one session per user** — parallel logins force each other out, which is why
serial execution is the norm (Trap 15).

---

## 14. Reports & sharing

| Path | Contents |
| --- | --- |
| `09_html_report/index.html` | Per-feature step table (Seq, StepID, Group, Action, Object, masked input, Status, Time, Description, screenshot thumbnail) + the baseline-vs-actual diff. |
| `reports/<runId>/results.json` | Machine-readable. **The source of truth.** |
| `reports/<runId>/combined_report.html` | Feature × TC matrix (no step table). |
| `reports/<runId>/junit.xml` | For CI. |
| `artifacts/<runId>/<TC>_<ITER>/` | `step_<StepID>_<ok\|fail>_<seq>.png`, `trace.zip`, video. |

Screenshots are captured for **every** step. The trailing `<seq>` (not the StepID) is what makes
filenames unique — `flows/login.csv` and your metadata both have steps 10, 20, 30.

> **Neither on-disk HTML can be sent on its own** — the per-feature report links screenshots by
> relative path into `artifacts/` (recipient sees broken images), and the combined report's drill-down
> is a relative path out of `reports/` (404). Both `artifacts/` and `reports/` are gitignored.

**To share, use `npm run report:share`** ([§4](#reports)) — it writes one self-contained
`run_<runId>_shareable.html` (status tiles, the Feature × TC matrix, every step with its Description,
and the full compare table; drill-down is an in-page anchor). Send just that file; it opens in any
browser, offline. `--lite` drops the screenshots for a ~40 KB emailable version. Both re-render from
`results.json`, so they work on any past run.

---

## 15. Extension points

### 15.1 Reusable flows — `flows/*.csv`

A normal metadata CSV, inlined by `callReusable` (e.g. `flows/login.csv`). Its steps run **before** the
parent `callReusable` row is recorded, so the report shows the children first.

> Flow CSVs are parsed by the **same schema** as metadata, but only at **runtime** — `npm run validate`
> does **not** parse them. A column the schema needs but the flow omits breaks login at runtime, not at
> validate time.

### 15.2 Custom steps — `custom/<Feature>/customSteps.ts`

For anything genuinely app-specific (the engine stays generic). A `callCustom` step names an exported
handler:

```ts
export const extractAllResultTables: KeywordHandler = async (page, ctx, step) => {
  // ... discover the result page, return normalized rows for the comparator
};
```

`callCustom` resolves the feature's own module **first**, then falls back to
`custom/_shared/customSteps.ts`. Generic helpers (`selectStartDate`, `extractAllResultTables`,
`reconcilePeriodTable`) live in `_shared`, so a new feature gets them for free.

> **Prefer not to override `extractAllResultTables`.** It is feature-agnostic on purpose — it discovers
> the result grids + narrative panels itself and flattens everything to `TableName | RowLabel |
> ColumnName | Value` so one `compare.config.csv` fits any table shape. A per-feature copy is how bugs
> get fixed in one place and not the other.

---

## 16. Adding a new feature

**You supply a recording + testdata; the tooling turns it into a runnable test.** There are **two
paths** — pick by how much judgment the feature needs:

| Path | What runs | Use it when |
| --- | --- | --- |
| **A — Manual importer** (`npm run import-codegen`) | A deterministic CLI: captures selectors, generates steps + `${data.*}` tokens, dedups a superset recording, wires fields to your existing columns, and now emits `loopPeriods` for period tables by default. | A straightforward, single-path feature, or you want full control. |
| **B — AI agent** (`/import-feature`) | The importer **plus** a judgment layer: consolidates conditional fields, decides `N/A` per iteration, screenshot-verifies each run, fixes quirks — scoped to that one feature. Works in **Claude Code and GitHub Copilot**. | Conditional fields / multiple scenarios, or when you want it wired *and verified* end-to-end. |

Both use the **same importer** and the **same recording**. The full, authoritative playbook is
[`AI_IMPORT_AGENT.md`](AI_IMPORT_AGENT.md); the testdata-authoring companion is
[`AI_TESTDATA_AGENT.md`](AI_TESTDATA_AGENT.md). The short version:

1. **Record** the flow (`npm run codegen`) and save it into the feature's `02_selectors_repo/` as
   `recording.txt`. **Click each field's LABEL before touching it** — the importer names the testdata
   column after the label you clicked, so this is what makes columns line up (and it's gitignored, so
   the recorded password never enters the repo — scrub-and-commit policy in `AI_IMPORT_AGENT.md`).
2. **Author `01_testdata/*.csv` first**, then **import** (`npm run import-codegen -- <Module>
   <Feature> --tc TC_XX`). The importer **wires each recorded field to an existing column by DOM id or
   label** and adds none; unmatched fields print as `UNWIRED` for you to resolve.
3. **Register** the row it prints in `master.csv` (set `Execute=TRUE`, and `Simulation=YES` if there's
   a sim flow).
4. **`npm run validate`** and fix what it reports.
5. **First run** (`npm run test -- --testcase TC_XX`) → `BASELINE_CREATED`. **Review the baseline
   numbers** — this human check is the whole value.
6. **Run again** → a real `PASS`. Screenshot-verify every iteration (green ≠ correct).

Import the **simulation** flow with `--sim` and set `Simulation=YES` ([§7.1](#71-the-chained-simulation-flow-simulationyes)).

---

## 17. Traps and known issues

Ordered by how much time they will cost you.

1. **A green run can verify nothing.** Missing baseline → `BASELINE_CREATED` → exit 0. **Check the
   status string, not the exit code** ([§12](#12-baseline--compare)).
2. **`networkidle` never fires.** This SPA streams telemetry, so it never goes idle. Use
   `domcontentloaded` + a polled `waitForSelector`. In `iterationRunner` the `goto` is outside the
   try/catch, so a `networkidle` timeout there is fatal with **no report**.
3. **Accessible names match by substring.** `Save` matches `Save & Compute`. Use `Exact=TRUE`
   ([§9](#9-selector-resolution)).
4. **Grouped dropdown options repeat.** Label-only + `.first()` silently picks the wrong group — a
   wrong-value PASS. Use `"Option (Group)"` ([§8.1](#81-select--read-this-before-touching-a-dropdown)).
5. **Validation covers every master row.** A broken feature can abort your run (a targeted `test`
   narrows validation — [§4](#gotchas-that-live-with-the-commands)).
6. **AG Grid header cells share the data cells' `col-id`.** `div[col-id=x]` + `.first()` matches the
   *header*. Scope with `div[role=gridcell][col-id=x]`.
7. **Immediate re-runs can crash the app.** Leave a gap between runs.
8. **`Seq` and `Screenshot` columns do nothing** — `StepID` drives order; every step is screenshotted.
9. **`sleep` is almost always wrong.** The validator warns on every use. Poll a condition.
10. **`maxWaitMs` in the config is unreachable for `waitForSimulation`** — it uses the step's `Timeout`
    (which defaults to 30000, never 0). Set the ceiling in the step's `Timeout`.
11. **Excel locks CSVs.** Close the file or writes fail with `EPERM`. Edit CSVs in a text editor
    (UTF-8, no BOM) — a non-ASCII glyph (`π`, `δ`) corrupts on an ANSI Excel save.
12. **CSV commas.** An unquoted comma in `Description` shifts every later column. Keep it comma-free or
    quote the field.
13. **`npm run test` ≠ `npm run pw:test`.** Use the CLI path ([§4](#maintenance--dev)).
14. **The env `--env` flag is global.** It drags every selected feature's baseline. Use the
    `Environment` column ([§13](#13-environments--auth)).
15. **One session per user (Forced Log Out).** The app kills all but the newest session, so iterations
    must run **serially** — `serial: true` (the importer default). `serial:true` on *any* selected
    feature makes the whole run serial.
16. **A recording can't capture a computed field.** If a parameter was greyed (computed) while
    recording, codegen never typed it, so there's no `fill`. When it's an input in another iteration,
    add the `fill` by hand — and re-imports wipe manual additions, so re-add them.
17. **Steps execute in `StepID` order, not row/`Seq` order.** To reorder, change the **StepID**. The
    single biggest time-sink when a controlling `select` "won't run early enough."
18. **A controlling `select` can be reset by a later `fill`.** Filling a dependent table can revert a
    sub-method select to "None", disabling its field. Give the select a StepID **after** the table and
    **just before** the field it enables. Symptom: *"… is disabled but testdata requires a value."*
19. **`select` prints its options on a mismatch; `fill` tabs out after every value.** Read the printed
    `value=text` list before guessing an option.
20. **Recover a real DOM id from `trace.zip`.** `field "X" not found` means the id is wrong. `unzip` the
    run's `artifacts/<runId>/<TC>_<ITER>/trace.zip` and grep the DOM snapshots for
    `["SELECT",{…"id":"…"}]` (or `INPUT`/`BUTTON`).
21. **Duplicate ids; `SkipIf` is single-condition.** Several controls can share one id (`id="addButton"`
    on every "Add Period"); disambiguate with `:nth-match(button:has-text("Add Period"), 2)`. `SkipIf`
    has no AND/OR — gate a not-applicable field by setting its cell to `N/A`, not a compound expression.
22. **Dialogs block the flow.** "Unsaved Changes" → **Save first, never "Leave"** (Leave discards the
    design and hides a real error). The Compute credit dialog needs its primary button
    (`#credit-alert-primary`) **and** a Result Name. Dialog buttons are often not `role=button` —
    target by `text`/`#id`.
23. **An ungated Add-Period/Add-Interim click adds a blank row** and the design won't compute. Gate
    every one: `SkipIf ${data.design.<table>.<idx>.<col>}==N/A`. Trust the *selector*, not a mis-named
    ObjectName. (Since the isNaCell fix, `==N/A` also skips a blank absent-period, so the old
    blank-slips-past bug is gone — but still author `N/A`, not blank.)
24. **Adaptive "Save & Simulate" stays disabled unless `Include Enrollment` is checked.** On a CHW/CDL
    sample-size-re-estimation sim, `#save-compute` never enables while the design is invalid, and the
    commonest invalidity is `Include Enrollment=uncheck`. Mirror the design's enrollment, and **wait for
    the button to be enabled** before clicking (a plain `click` force-clicks after ~10s and force can't
    actuate a disabled button — use `waitAndInspectSaveSimulate`).
25. **App-slowness leaves Save/Calculate disabled or spinner-blocked mid-compute.** `click` force-retries
    but `check`/`select` do not — add a `waitForSelector div_Spinner` (hidden) settle-guard at
    compute→save transitions.
26. **Baselines are environment-specific — an `.env` swap invalidates them.** Confirm `.env` matches the
    baseline instance before "fixing" data ([§12](#12-baseline--compare)).

---

## 18. Where to look when something breaks

| Symptom | Look at |
| --- | --- |
| Exit 1, no browser | Validation output — a CSV is malformed somewhere (maybe another feature). |
| `Locator not found: Page=X ObjectName=Y` | `selectors.csv` — is `(Page, ObjectName)` right? |
| `UI-DRIFT` warning | The primary selector matched 0 elements — the markup moved. |
| Step times out on a dropdown | Is it one `select` step? Is the group in the value? ([§8.1](#81-select--read-this-before-touching-a-dropdown)) |
| Wrong value silently selected | Substring match (Trap 3) or grouped options (Trap 4). |
| `BASELINE_CREATED` when you expected PASS | Baseline isn't where the env points ([§12](#12-baseline--compare) / [§13](#13-environments--auth)). |
| Compare `FAIL` | `08_diffs/` — cell-level differences. If only *labels* differ, it's app label drift → re-baseline. |
| "Forced Log Out" / bounced to login | Iterations ran in parallel against a one-session app. Set `serial: true` (Trap 15). |
| `field "X" not found` / `… is disabled but testdata requires a value` | Wrong selector (recover the id from `trace.zip`, Trap 20), the controlling `select` ran too late / was reset (Traps 17–18), or the field is greyed (should the cell be `Computed`?). |
| `select … has no option matching "V"` | The error lists every real option — map your value to one, or it belongs in a different field (Trap 19). |
| a `check`/`uncheck` step **times out** | The checkbox isn't rendered for this combination → set the cell to `N/A` (Trap 21). |
| a **blank period/interim row** appears / design won't compute | An ungated Add-Period/Add-Interim click (Trap 23). |
| a period gate misfires on a split child table | `==N/A` vs `==EMPTY` — see [§8.3](#83-the-skip-rules-blank--na--computed) and `Error_Reference_Guide.md` category S. |
| `No testdata row for TC/ITER` | A keyed testdata file is missing that iteration's row (`validate` catches this first). |
| Nothing obvious | `artifacts/<runId>/<TC>_<ITER>/` — the screenshots show the actual screen at the failing step. |

**Related docs:** `AI_IMPORT_AGENT.md` (import + wire a feature), `AI_TESTDATA_AGENT.md` (prepare
testdata), `FIELD_WIRING_PATTERNS.md` (effect-size / priors / early-stopping wiring),
`MULTI_SCENARIO_GUIDE.md` (`loopOverData`), `IMPORT_LESSONS.md` (the running lessons ledger),
`Error_Reference_Guide.md` (categorized runtime errors A–U).

---

## 19. Glossary

| Term | Meaning |
| --- | --- |
| **Feature** | One app workflow under test → `<Module>/feature_<Name>/`. |
| **Test case (TC)** | A row in `master.csv`. |
| **Iteration** | One execution of a TC with one testdata row (`ITER_01`). |
| **Step** | One row in `metadata.csv`. |
| **Keyword / Action** | What a step does (`click`, `select`, …) — [§8](#8-the-keyword-catalog). |
| **Object** | A logical UI element name (`btn_Save`) resolved via `selectors.csv`. |
| **Selector** | The concrete locator behind an object. |
| **Baseline / benchmark** | The approved expected result — [§12](#12-baseline--compare). |
| **Flow** | A reusable step CSV in `flows/` — [§15](#15-extension-points). |
| **Custom step** | An app-specific handler in `custom/` — [§15](#15-extension-points). |
| **Design flow / Simulation flow** | The two chained flows of one feature — [§7.1](#71-the-chained-simulation-flow-simulationyes). |
| **Period table / child table** | A per-analysis-period grid, authored inline or split into `<phase>_<table>.csv` and filled count-agnostically by `loopPeriods` — [§11](#child-tables-the-split-alternative). |
| **BASELINE_CREATED** | A run that *wrote* a baseline and verified nothing — never `PASS`. |
