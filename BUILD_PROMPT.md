# BUILD PROMPT — CSV-Driven Playwright Test Automation Framework

> **How to use:** paste everything below the line into Cursor / Claude Code / Copilot / any coding agent.
> If your tool has a small context window, paste §1–§4 first (it will scaffold + build the engine), then paste one §12 phase at a time.
> Keep this file in the repo as `docs/BUILD_PROMPT.md` so regeneration is reproducible.

---

## ROLE

You are a senior SDET/framework architect. Build a **production-grade, CSV-driven, metadata-driven UI test automation framework** using **TypeScript + Playwright**. Write real, compiling, runnable code — not pseudocode, not stubs, not "// TODO: implement". Where you must guess an application detail, mark it clearly with `// ASSUMPTION:` and keep going; do not stop to ask.

---

## 1. CONTEXT — the application under test

The AUT is a **clinical-trial design web platform** (statistical study design). The core user journey is a wizard:

**Login → Create Project → Create Input Set → Configure Design → Compute/Simulate → Results grid**

- A **Project** holds study-level metadata (time unit, start date, study objective, phase, target population, treatment arm, endpoint name, endpoint type, better response direction).
- An **Input Set** selects a task (`Design`) and a statistical test (e.g. `Simon's Two Stage`).
- A **Design** screen takes statistical inputs (design type, upper limit for sample size, power, test type, type-1 error, response proportions under null/alternative).
- **Compute/Simulate** is an **asynchronous long-running job** (seconds to ~15 minutes). It must be polled, never slept on.
- The **Results grid** shows numeric design outputs (e.g. for Simon's Two Stage: `n1`, `r1`, `n`, `r`, `PET(p0)`, `EN(p0)`, attained alpha, attained power).

**The core purpose of the framework is regression detection on those numeric outputs.** First run captures a baseline CSV; every later run re-runs the same design and compares against the baseline with **per-column tolerances**. Everything else exists to serve that.

---

## 2. NON-NEGOTIABLE DESIGN PRINCIPLES

Violating any of these means the deliverable is rejected.

1. **Adding a new feature must require ZERO code changes.** A new feature = a new folder of CSV files. The engine in `core/` is generic and stable. This is the acceptance test for the whole architecture — design for it from line one.
2. **Test data, actions, and locators live in CSV. Logic lives in `core/`.** Generated spec/POM files are *thin* — they delegate to the engine. A bug fix must be one edit in the engine, never N regenerated files.
3. **Never write this run's results into the baseline folder.** Overwriting the baseline silently destroys the only thing being tested against; the suite then passes forever and detects nothing. Actuals go to `07_actual_results/`, diffs to `08_diffs/`.
4. **Floating-point outputs are compared with tolerances, integers exactly.** Never use `===` on a float from a numerical optimiser. A numeric column with no tolerance configured must FAIL validation, not silently fall back to exact equality.
5. **A first run that only creates a baseline reports `BASELINE_CREATED`, never `PASS`.** It verified nothing.
6. **Fail at validation time, not mid-run.** A CLI `validate` command must catch every schema error, unknown action, missing locator, duplicate ID, and missing tolerance *before* a browser opens.
7. **Nobody ever hand-edits generated files.** Provide a `custom/` escape hatch instead.
8. **Every entity the test creates in the app gets a run-unique suffix** (`_${runId}`), or parallel workers and repeat runs will collide on the app's duplicate-name validation.

---

## 3. TECH STACK

- TypeScript (strict), Node 20+
- Playwright Test (`@playwright/test`)
- `papaparse` (CSV), `zod` (schema validation), `dotenv`, `luxon` (dates), `@faker-js/faker`
- Do **not** read `.xlsx` in the engine. CSV only. (Provide an optional `scripts/xlsx-to-csv.ts` one-off converter for authors who write test data in Excel; its output CSVs are what gets committed and consumed.)

---

## 4. REPOSITORY STRUCTURE — create exactly this

```
repo-root/
├── master.csv                       # test registry & run control
├── .env                             # git-ignored
├── .env.example                     # committed
├── playwright.config.ts
├── package.json
├── tsconfig.json
│
├── config/
│   ├── framework.config.ts          # timeouts, retries, workers, path constants
│   └── environments.ts              # resolves .env.<env>
│
├── core/                            # THE ENGINE — generic, stable, feature-agnostic
│   ├── csv/                         # read, write, normalize CSV
│   ├── schema/                      # zod schemas for every CSV format + validator CLI
│   ├── keywords/                    # the action library (see §7) — one file per group
│   │   └── registry.ts              # Map<ActionName, KeywordHandler>
│   ├── locators/                    # selectors.csv -> Playwright Locator, w/ fallback
│   ├── generators/
│   │   ├── pom.generator.ts         # selectors.csv -> <Page>.page.ts
│   │   └── spec.generator.ts        # metadata.csv  -> <feature>.spec.ts
│   ├── runner/
│   │   ├── orchestrator.ts          # reads master.csv, filters, sequences
│   │   ├── context.ts               # runtime variable store
│   │   └── resolver.ts              # ${...} expression resolution
│   ├── extractors/                  # results grid -> normalized CSV
│   ├── comparator/                  # baseline vs actual diff engine
│   ├── reporters/                   # feature HTML, combined HTML, JSON, JUnit
│   ├── hooks/                       # auth setup (storageState), global teardown
│   └── utils/                       # logger (masking), retry, dates, unique-id
│
├── flows/                           # reusable step sequences shared across features
│   └── login.csv
│
├── custom/                          # hand-written escape hatches — NEVER generated
│   └── <Feature>/customSteps.ts
│
├── Product_Design/                  # = Module
│   └── feature_Simon2Stage/         # = feature folder for master.csv Feature
│       ├── 00_config/
│       │   └── feature.config.json
│       ├── 01_testdata/
│       │   ├── project.csv
│       │   ├── inputset.csv
│       │   └── design.csv
│       ├── 03_metadata/
│       │   └── metadata.csv
│       ├── 02_selectors_repo/
│       │   └── selectors.csv
│       ├── 04_generated_pom/        # AUTO-GENERATED — do not edit
│       ├── 05_generated_scripts/    # AUTO-GENERATED — do not edit
│       ├── 06_baseline/
│       │   ├── compare.config.csv
│       │   └── <env>/baseline_<TC_ID>_<IterationID>.csv (+ .meta.json sidecar)
│       ├── 07_actual_results/       # this run's extracted CSVs
│       ├── 08_diffs/                # cell-level diff CSVs + JSON
│       └── 09_html_report/          # per-feature HTML report
│
├── reports/<runId>/                 # combined_report.html, results.json, junit.xml
└── artifacts/<runId>/               # traces, videos, screenshots, structured logs
```

Every artifact type gets its own **folder**, never a bare file at the feature root.

---

## 5. FILE SCHEMAS — implement zod validators for each

### 5.1 `master.csv`

```csv
TC_ID,Module,Feature,TestName,Tags,Execute,Priority,StudyObjective,ProjectID,Browser,Environment,BaselineMode,TestDataDir,MetadataFile,DependsOn,Owner,Description
TC_01,Product_Design,feature_Simon2Stage,Simon Two Stage - Optimal - E2E,smoke|regression|product_design,TRUE,P1,Two Arm Confirmatory,,chromium,qa,compare,01_testdata,03_metadata/metadata.csv,,QA_Team,Create project + input set + Simon design and compare with baseline
TC_02,Product_Design,feature_Simon2Stage,Simon Two Stage - Minimax - Existing Project,regression,FALSE,P2,Two Arm Confirmatory,19080,chromium,qa,compare,01_testdata,03_metadata/metadata.csv,,QA_Team,Reuse existing project 19080
```

Rules:
- `TC_ID` unique; joins to every test-data file.
- `Feature` maps to `feature_<Feature>` on disk. Validator enforces the feature name itself.
- `Execute` is `TRUE`/`FALSE`, **required, never blank**.
- `Tags` pipe-separated.
- `StudyObjective` is a **label only** — for filtering/reporting. It is NOT typed into the UI (that value comes from `project.csv`). Two sources of truth for one value will drift.
- `ProjectID` semantics — **implement exactly**:
  - **empty** → create a new project, capture its ID into `${runtime.projectId}`, delete it in teardown.
  - **filled** → reuse that existing project: skip the `CreateProject` step group, navigate straight to it, and **never delete it** in cleanup.
- `Environment` selects both `.env.<env>` **and** the baseline scope (`06_baseline/<env>/`).
- `BaselineMode`: `compare` (default) | `create` | `update`.

### 5.2 `01_testdata/*.csv` — one CSV per wizard stage, joined on `TC_ID` + `IterationID`

```csv
# project.csv
TC_ID,IterationID,Run,ProjectName,TimeUnit,StartDate,StudyObjective,Phase,TargetPopulation,TreatmentArm,Priority,EndpointName,EndpointType,BetterResponse
TC_01,ITER_01,TRUE,AutoProj_Simon,Week,Now,Two Arm Confirmatory,2,Adult,EXP,Primary,EP1,Binary,Larger Value
```
```csv
# inputset.csv
TC_ID,IterationID,InputSetName,SelectTask,Test
TC_01,ITER_01,Set1,Design,Simon's Two Stage
```
```csv
# design.csv
TC_ID,IterationID,DesignType,UpperLimitForSampleSize,Power,TestType,Type1Error,ProportionResponseUnderNull,ProportionResponseUnderAlternative
TC_01,ITER_01,Optimal,150,0.88,1-Sided,0.025,0.15,0.45
```

- Each `Run=TRUE` row = one independent test execution with its own baseline file.
- Referenced from metadata as `${data.<filename>.<Column>}` — e.g. `${data.design.Power}`.
- `StartDate` value `Now` must resolve via the date-token system (§8).

### 5.3 `03_metadata/metadata.csv` — the steps

Columns (exact):
`StepID, StepGroup, Page, Action, ObjectName, InputValue, StoreAs, AssertType, ExpectedValue, WaitCondition, Timeout, Optional, Retry, Screenshot, SkipIf, Description`

- `StepID` — numbered in gaps of 10 so a step can be inserted without renumbering.
- `StepGroup` — `Login | CreateProject | OpenProject | CreateInputSet | ConfigureDesign | Simulate | ExtractResults | CompareBaseline | Cleanup`
- `Page` — determines which POM class the step compiles into.
- `ObjectName` — logical name resolved in `selectors.csv`. For `storeAttribute`, use `object|attributeName`.
- `SkipIf` — conditional step, e.g. `${master.ProjectID}!=EMPTY`. Support `==`, `!=`, and the literal `EMPTY`.
- `Optional=TRUE` → failure logs a warning, does not fail the test.

Representative rows to implement against (this is the real E2E flow):

```csv
StepID,StepGroup,Page,Action,ObjectName,InputValue,StoreAs,AssertType,ExpectedValue,WaitCondition,Timeout,Optional,Retry,Screenshot,SkipIf,Description
10,Login,-,callReusable,,flows/login.csv,,,,,60000,FALSE,0,never,,Reusable login flow
100,CreateProject,ProjectsPage,click,btn_NewProject,,,,,visible,15000,FALSE,1,never,${master.ProjectID}!=EMPTY,Open new-project dialog
110,CreateProject,ProjectPage,fill,txt_ProjectName,${data.project.ProjectName}_${runId},,,,,10000,FALSE,0,never,${master.ProjectID}!=EMPTY,Unique project name
120,CreateProject,ProjectPage,select,ddl_TimeUnit,${data.project.TimeUnit},,,,,10000,FALSE,0,never,${master.ProjectID}!=EMPTY,Time unit
130,CreateProject,ProjectPage,fill,txt_StartDate,${today},,,,,10000,FALSE,0,never,${master.ProjectID}!=EMPTY,StartDate token Now resolves to today
190,CreateProject,ProjectPage,select,ddl_EndpointType,${data.project.EndpointType},,,,,10000,FALSE,0,never,${master.ProjectID}!=EMPTY,Endpoint type drives downstream fields
210,CreateProject,ProjectPage,click,btn_SaveProject,,,,,,20000,FALSE,0,onFailure,${master.ProjectID}!=EMPTY,Save project
220,CreateProject,ProjectPage,storeAttribute,lbl_ProjectId|data-id,,projectId,,,visible,20000,FALSE,0,never,${master.ProjectID}!=EMPTY,Capture generated project id
240,OpenProject,ProjectsPage,navigate,,${env.BASE_URL}/projects/${master.ProjectID},,,,networkidle,30000,FALSE,0,never,${master.ProjectID}==EMPTY,Reuse existing project instead of creating one
310,CreateInputSet,InputSetPage,fill,txt_InputSetName,${data.inputset.InputSetName}_${runId},,,,,10000,FALSE,0,never,,Unique input set name
330,CreateInputSet,InputSetPage,select,ddl_Test,${data.inputset.Test},,,,,10000,FALSE,0,never,,Test = Simons Two Stage
400,ConfigureDesign,DesignPage,select,ddl_DesignType,${data.design.DesignType},,,,,10000,FALSE,0,never,,Optimal / Minimax
420,ConfigureDesign,DesignPage,fill,txt_Power,${data.design.Power},,,,,10000,FALSE,0,never,,Target power
470,ConfigureDesign,DesignPage,assertEnabled,btn_Compute,,,enabled,,visible,10000,FALSE,0,onFailure,,Guard - inputs valid before compute
500,Simulate,DesignPage,click,btn_Compute,,,,,,20000,FALSE,0,never,,Trigger simulation
510,Simulate,DesignPage,waitForSimulation,lbl_RunStatus,,,,Completed,custom,900000,FALSE,0,onFailure,,Poll status per feature.config.json
600,ExtractResults,ResultsPage,extractTable,tbl_Results,,,,,visible,60000,FALSE,0,always,,Grid to 07_actual_results
610,CompareBaseline,-,compareWithBaseline,,,,,,,60000,FALSE,0,never,,Compare actual vs baseline
700,Cleanup,-,apiRequest,,DELETE /api/projects/${runtime.projectId},,,,,30000,TRUE,0,never,${master.ProjectID}!=EMPTY,Delete only projects this run created
```

### 5.4 `02_selectors_repo/selectors.csv`

`ObjectName, Page, SelectorType, SelectorValue, RoleName, FallbackSelector, Dynamic, Description`

```csv
ObjectName,Page,SelectorType,SelectorValue,RoleName,FallbackSelector,Dynamic,Description
txt_Username,LoginPage,testid,login-username,,#username,FALSE,Username field
btn_Login,LoginPage,role,button,Sign in,,FALSE,Sign in button
txt_ProjectName,ProjectPage,label,Project Name,,,FALSE,Project name input
ddl_EndpointType,ProjectPage,label,Endpoint Type,,,FALSE,Endpoint type
lbl_RunStatus,DesignPage,testid,run-status,,,FALSE,Status polled during simulation
tbl_Results,ResultsPage,testid,results-grid,,,FALSE,Results grid to extract
```

- `SelectorType` ∈ `testid | role | label | placeholder | text | css | xpath`.
- **Resolution priority:** `testid → role → label → text → css → xpath`. The validator must warn on every `xpath` that has no justification in `Description`.
- `FallbackSelector` is tried if the primary matches 0 elements; log a warning when the fallback is used (this is your early-warning system for UI drift).
- `Dynamic=TRUE` → `SelectorValue` contains `{0}`, `{1}` placeholders interpolated at runtime from `InputValue`.

### 5.5 `06_baseline/compare.config.csv` — **the most important file in the framework**

```csv
ColumnName,IsKey,Compare,DataType,AbsTolerance,RelTolerance,RoundTo,Normalize,Notes
DesignType,TRUE,TRUE,string,,,,trim,Optimal or Minimax - row key
Stage1_SampleSize_n1,FALSE,TRUE,numeric,0,,0,,Integer - exact match
Stage1_Responses_r1,FALSE,TRUE,numeric,0,,0,,Integer - exact match
Total_SampleSize_n,FALSE,TRUE,numeric,0,,0,,Integer - exact match
Total_Responses_r,FALSE,TRUE,numeric,0,,0,,Integer - exact match
PET_p0,FALSE,TRUE,numeric,0.0005,0.001,4,,Probability of early termination
EN_p0,FALSE,TRUE,numeric,0.01,0.001,3,,Expected sample size under null
Attained_Alpha,FALSE,TRUE,numeric,0.0005,0.01,5,,Attained type 1 error
Attained_Power,FALSE,TRUE,numeric,0.0005,0.01,5,,Attained power
RunID,FALSE,FALSE,string,,,,,Volatile - never compare
Timestamp,FALSE,FALSE,date,,,,,Volatile - never compare
ProjectID,FALSE,FALSE,string,,,,,Volatile - never compare
```

- `IsKey=TRUE` columns join baseline rows to actual rows. **Matching is key-based, never positional** — result grids reorder between runs and positional matching produces false failures.
- A `numeric` column with **no** `AbsTolerance` and **no** `RelTolerance` → **validation error**, not a silent exact comparison.
- A cell passes if `|actual - expected| <= AbsTolerance` **OR** `|actual - expected| / |expected| <= RelTolerance` (guard division by zero).

### 5.6 `00_config/feature.config.json`

```json
{
  "feature": "feature_Simon2Stage",
  "module": "Product_Design",
  "serial": false,
  "reuseAuthState": true,
  "testdata": {
    "format": "csv",
    "files": { "project": "project.csv", "inputset": "inputset.csv", "design": "design.csv" },
    "joinKey": ["TC_ID", "IterationID"]
  },
  "simulation": {
    "pollObject": "lbl_RunStatus",
    "successText": "Completed",
    "failureText": "Failed",
    "pollIntervalMs": 5000,
    "maxWaitMs": 900000
  },
  "resultsExtraction": {
    "mode": "domTable",
    "domTableObject": "tbl_Results",
    "downloadTrigger": "btn_ExportResults",
    "outputFileName": "results_${TC_ID}_${IterationID}.csv",
    "columnMap": {
      "Design": "DesignType", "n1": "Stage1_SampleSize_n1", "r1": "Stage1_Responses_r1",
      "n": "Total_SampleSize_n", "r": "Total_Responses_r",
      "PET(p0)": "PET_p0", "EN(p0)": "EN_p0",
      "Alpha": "Attained_Alpha", "Power": "Attained_Power"
    },
    "sortBy": ["DesignType"]
  },
  "cleanup": { "deleteCreatedProjects": true }
}
```

`columnMap` decouples baselines from the UI's grid headers: when a developer renames the column `n` to `Total N`, you edit one line of JSON instead of regenerating every baseline you own.

### 5.7 `.env.example`

```
ENV=qa
BASE_URL=https://your-app.example.com
API_BASE_URL=https://your-app.example.com/api
APP_USERNAME=qa_user
APP_PASSWORD=change_me
HEADLESS=true
WORKERS=4
DEFAULT_TIMEOUT_MS=30000
```

`.env` is git-ignored. `APP_PASSWORD` must be **masked in every log line, trace, report, and screenshot annotation**.

---

## 6. EXECUTION FLOW

```
Load master.csv → validate → filter (tags / Execute / --testcase / DependsOn)
  → for each selected TC_ID:
      load feature.config.json, testdata CSVs, metadata.csv, selectors.csv
      → generate POM + spec (skip if source hash unchanged)
      → for each testdata row where Run=TRUE:
           auth (reuse storageState)
           execute steps in StepID order, honouring SkipIf
           waitForSimulation (poll, hard ceiling)
           extractTable → apply columnMap → sort → 07_actual_results/results_<TC>_<ITER>.csv
           baseline exists for this <env>?
             NO  → write baseline + .meta.json → status BASELINE_CREATED
             YES → compare per compare.config.csv → 08_diffs/ → status PASS / FAIL
           cleanup (delete project only if this run created it)
      → write 09_html_report/
  → write reports/<runId>/combined_report.html + results.json + junit.xml
```

---

## 7. ACTION KEYWORD LIBRARY — implement all of these

Each keyword is `(page, ctx, step) => Promise<void | string>`, registered in `core/keywords/registry.ts`, and **declares its required columns** so the validator can reject a `fill` with no `InputValue`.

- **Navigation:** `navigate`, `goBack`, `reload`, `switchTab`, `switchFrame`
- **Input:** `click`, `doubleClick`, `rightClick`, `fill`, `type`, `clear`, `select`, `check`, `uncheck`, `upload`, `hover`, `press`, `dragAndDrop`
- **Wait:** `waitForSelector`, `waitForText`, `waitForNetworkIdle`, `waitForDownload`, `waitForSimulation`, `sleep` *(last resort; validator warns on every use)*
- **Capture:** `storeText`, `storeAttribute`, `storeValue`, `storeUrl`, `extractTable`, `downloadFile`
- **Assert:** `assertVisible`, `assertHidden`, `assertText`, `assertContains`, `assertValue`, `assertCount`, `assertEnabled`, `assertUrl` (+ `soft*` variants that record and continue)
- **Flow:** `callReusable` (loads another metadata CSV, e.g. `flows/login.csv`), `callCustom` (invokes `custom/<Feature>/customSteps.ts`), `ifExists`, `loopOverData`
- **API:** `apiRequest` — `METHOD /path` in `InputValue`; used for setup/teardown because creating and deleting projects via API is far faster and far less flaky than clicking the wizard
- **Comparison:** `compareWithBaseline`

`waitForSimulation` specifically: poll `pollObject`'s text every `pollIntervalMs` until it equals `successText`; abort immediately on `failureText`; abort at `maxWaitMs` with a **distinct `SIMULATION_TIMEOUT` status** (you need to tell "the app is slow" apart from "the app is broken").

---

## 8. VARIABLE RESOLUTION — `core/runner/resolver.ts`

Resolve `${...}` inside any metadata cell, in this order:

| Expression | Source |
|---|---|
| `${env.BASE_URL}` | `.env` for the active environment |
| `${data.design.Power}` | `<file>.csv`, row matching current `TC_ID` + `IterationID` |
| `${master.ProjectID}` | current `master.csv` row |
| `${runtime.projectId}` | captured earlier via `StoreAs` |
| `${runId}`, `${timestamp}` | run-unique suffixes |
| `${today}`, `${today+30d}`, `${today-7d}` | date tokens (`StartDate=Now` maps to `${today}`) |
| `${faker.uuid}`, `${faker.company}` | generated data |
| `${config.simulation.maxWaitMs}` | feature config |

Unresolvable expression → **throw immediately** with the file, row, and column. Never substitute an empty string; a silently blank form field is a bug that takes a day to find.

---

## 9. COMPARATOR — `core/comparator/`

Report these four failure classes **separately** (a single "mismatch" bucket is useless for triage):

1. `SCHEMA_MISMATCH` — columns added, removed, or renamed vs. baseline
2. `ROW_COUNT_MISMATCH`
3. `MISSING_ROW` / `EXTRA_ROW` — by key columns
4. `VALUE_MISMATCH` — emit `column, rowKey, expected, actual, delta, toleranceApplied, toleranceBreached`

Write `08_diffs/diff_<TC>_<ITER>.csv` and `.json`. Baseline updates only via `--update-baseline` or `BaselineMode=update`, and always rewrite the `.meta.json` sidecar (`runId`, `appVersion`, `env`, `timestamp`, `approver`, `sourceDataHash`).

---

## 10. REPORTS

- **Per-feature** → `09_html_report/index.html`: step timeline (status, duration, resolved input values with secrets masked, screenshots), baseline-vs-actual table with mismatched cells highlighted showing **delta and the tolerance that was breached**, links to the Playwright trace.
- **Combined** → `reports/<runId>/combined_report.html`: run metadata (env, branch, trigger, duration), counts by status (`PASS / FAIL / SKIPPED / BASELINE_CREATED / SIMULATION_TIMEOUT`), a feature × TC matrix, top failure reasons, trend across the last N runs, drill-down links into each feature report.
- Also emit `results.json` and `junit.xml` — an HTML file cannot gate a CI pipeline.

Self-contained HTML (inline CSS/JS, no CDN). Assume it will be opened from a CI artifact zip with no network.

---

## 11. CLI

```bash
npm run validate                                  # schema-check every CSV, open no browser
npm run generate -- --tags smoke                  # generate POM + specs only
npm run test                                      # all rows with Execute=TRUE
npm run test -- --tags "smoke+P1"                 # tag expression: OR ',' AND '+' NOT '~'
npm run test -- --feature feature_Simon2Stage
npm run test -- --testcase TC_01                  # ignores Execute
npm run test -- --testcase TC_01 --update-baseline
npm run test -- --all --env staging
npm run cleanup:orphans                           # sweep projects left by crashed runs
```

---

## 12. BUILD ORDER — deliver in this sequence, each phase compiling and runnable

**Phase 0 — Foundations.** Repo, tsconfig, playwright.config, `.env` loader, CSV utils, **zod validators for all six file types**, masking logger. *Exit: `npm run validate` gives precise line-numbered errors on a deliberately broken CSV.*

**Phase 1 — Locators & POM generator.** Priority resolution, fallback + warning, one POM class per `Page`, idempotent regeneration with source hash. *Exit: editing `selectors.csv` regenerates compiling POMs with no manual work.*

**Phase 2 — Keyword engine (the heart).** Full keyword library, runtime context, resolver, `SkipIf`, step executor (waits, retries, optional, screenshots), `callReusable`. *Exit: a hand-written `metadata.csv` drives Login → CreateProject → CreateInputSet with **no generated code at all**. Prove the interpreter before building a generator on top of it.*

**Phase 3 — Spec generator & orchestrator.** `metadata.csv` → spec; `master.csv` selection precedence (`--testcase` > `--tags`+`Execute` > `Execute` > `--all`); auth `storageState`; `DependsOn`; CLI. *Exit: `npm run test -- --tags smoke` selects the right rows and runs them.*

**Phase 4 — Simulate & extract.** `waitForSimulation`; `extractTable` + `downloadFile`; `columnMap` normalizer; deterministic sort; write `07_actual_results/`. *Exit: **the same design run twice produces identical results CSVs** (ignoring volatile columns). If it doesn't, stop and fix it before Phase 5 — a non-deterministic extractor makes every diff downstream of it a lie.*

**Phase 5 — Baseline & comparator (highest value).** `compare.config.csv`; `BASELINE_CREATED` on first run; four failure classes; diff artifacts; `--update-baseline` + sidecar. *Exit: nudging `Power` 0.88 → 0.89 yields a diff naming column, row key, expected, actual, delta, tolerance breached.*

**Phase 6 — Reporting.** Feature HTML, combined HTML, JSON, JUnit. *Exit: someone who has never seen the framework can open the combined report and say which number moved.*

**Phase 7 — Hardening & CI.** Parallelism, unique-data strategy, API setup/teardown, orphan sweeper, retry/flaky policy, GitHub Actions (PR → smoke; nightly → full regression; upload artifacts; publish JUnit). *Exit: green, unattended, twice in a row.*

**Phase 8 — Scale-out proof.** Onboard a second feature (`feature_Difference_of_Means`, continuous endpoint) **by adding CSVs only**. *Exit: zero files under `core/` changed. If any engine file had to change, the abstraction is wrong — fix it now, not after ten features exist.*

---

## 13. DELIVERABLES

1. All source under `core/`, `config/`, `flows/`, plus `playwright.config.ts`, `package.json`, `tsconfig.json`.
2. A fully populated `Product_Design/feature_Simon2Stage/` using the exact CSVs in §5.
3. `.env.example`, `.gitignore` (`.env`, `artifacts/`, `reports/`, `node_modules/`; **`06_baseline/` is committed, not ignored**).
4. `scripts/xlsx-to-csv.ts` (one-off authoring convenience).
5. `README.md`: how to add a new feature **without touching any code**, how to review and approve a baseline change, how to read a diff.
6. Unit tests for the resolver, the comparator (tolerance edge cases: zero expected value, integer-vs-float, missing key, reordered rows), and the schema validators.

---

## 14. CODING STANDARDS

- Strict TypeScript, no `any`. Every CSV row becomes a typed, zod-parsed object.
- Every generated file starts with `// AUTO-GENERATED — DO NOT EDIT. Source: <path> (hash: <sha>)`.
- Errors carry the file, row number, and column that caused them.
- No hardcoded selectors, URLs, credentials, or timeouts anywhere in `core/`.
- Structured JSON logs to `artifacts/<runId>/`, with the resolved variable context per step (masked).

---

## 15. THINGS TO GET RIGHT THAT ARE EASY TO GET WRONG

1. Comparing floats with `===`. The suite fails on the first clean re-run and everyone stops trusting it.
2. Writing actuals into `06_baseline/`. The suite goes green forever and detects nothing.
3. Positional row matching. Grids reorder; you get false failures and people start ignoring red.
4. Reporting a first-run baseline creation as `PASS`. A green tick that means "I made this number up" is worse than a red one.
5. Sleeping instead of polling a simulation. Flaky, and slow in exactly the case where it isn't flaky.
6. Non-unique project names. The second run of the day dies on duplicate-name validation.
7. Business logic leaking into generated specs. Then a bug fix means regenerating N files instead of editing one.
8. Reading `.xlsx` in the engine. Binary files can't be code-reviewed, and reviewing why a number changed is the entire point of this framework.
