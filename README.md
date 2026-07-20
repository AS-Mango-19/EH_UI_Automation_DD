# EH UI Automation — CSV-driven regression framework

A **metadata-driven, CSV-driven** UI regression framework (TypeScript + Playwright) for a
clinical-trial design platform. Its one job: **detect regressions in the numeric design outputs**.
The first run of a design captures a baseline; every later run re-runs the same design and
compares against that baseline with **per-column tolerances**. Everything else serves that.

> **The architecture's promise:** *adding a new feature requires **zero code changes** — a new
> feature is a new folder of CSV files.* The engine in [`core/`](core/) is generic and stable.

> ### 📘 New here? Read [**FRAMEWORK_KT.md**](FRAMEWORK_KT.md).
> The full knowledge-transfer guide: how a run executes, every CSV column, every
> keyword, how to add a feature from a codegen recording, all commands, and the
> traps that cost real debugging time. This README is the summary; that is the manual.

---

## Quick start

```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env          # then edit BASE_URL / credentials

npm run validate              # schema-check every CSV — opens no browser
npm run generate              # regenerate POM + spec files from CSV
npm run test -- --tags smoke  # run selected test cases
npm run unit                  # engine unit tests (resolver, comparator, validators, reporters)
npm run itest                 # end-to-end engine proof against a mock app (needs chromium)
```

### CLI

| Command | Purpose |
|---|---|
| `npm run validate` | Schema-check every CSV: unknown actions, missing locators, duplicate IDs, missing tolerances, dangling `${data...}` refs. **Fails before a browser opens.** |
| `npm run generate -- --tags smoke` | Generate POM + specs only. |
| `npm run test` | Run all rows with `Execute=TRUE`. |
| `npm run test -- --tags "smoke+P1"` | Tag expression — OR `,` · AND `+` · NOT `~`. |
| `npm run test -- --feature Simon2Stage` | Restrict to one feature. |
| `npm run test -- --testcase TC_01` | Run one test case (ignores `Execute`). |
| `npm run test -- --testcase TC_01 --update-baseline` | Approve current actuals as the new baseline. |
| `npm run test -- --all --env staging` | Run everything against another environment. |
| `npm run cleanup:orphans` | Delete projects left behind by crashed runs. |

Selection precedence (highest wins): `--testcase` › `--tags`(+`Execute`) › `Execute` › `--all`.

---

## Repository layout

```
core/            THE ENGINE — generic, stable, feature-agnostic (never edit to add a feature)
  csv/           BOM-tolerant reader (keeps line numbers) + deterministic writer
  schema/        zod validators for every CSV + the validate engine
  keywords/      the action library (catalog.ts is the single source of truth) + registry
  locators/      selectors.csv -> Playwright Locator, priority + fallback
  generators/    selectors.csv -> POM, metadata.csv -> spec (hash-idempotent)
  runner/        resolver, context, step executor, orchestrator, browser lifecycle
  extractors/    results grid -> normalized actual CSV (deterministic)
  comparator/    baseline vs actual diff engine (4 failure classes, tolerances)
  reporters/     feature HTML, combined HTML, results.json, junit.xml
  hooks/         auth setup (storageState)
config/          framework constants + .env resolution
flows/           reusable step sequences shared across features (login.csv)
custom/          hand-written escape hatches — NEVER generated
<Module>/feature_<Feature>/   one folder per feature (see below)
tests/           unit (no browser) + integration (mock-app e2e)
```

Each **feature** folder:

```
<Module>/feature_<Feature>/
  00_config/feature.config.json      # simulation polling, columnMap, cleanup
  01_testdata/*.csv                  # project / inputset / design data, joined on TC_ID + IterationID
  03_metadata/metadata.csv           # the ordered steps
  02_selectors_repo/selectors.csv    # logical object names -> selectors
  04_generated_pom/                  # AUTO-GENERATED — do not edit
  05_generated_scripts/              # AUTO-GENERATED — do not edit
  06_baseline/compare.config.csv     # per-column tolerances (the most important file)
  06_baseline/<env>/baseline_*.csv   # COMMITTED baselines (+ .meta.json sidecar)
  07_actual_results/                 # this run's extracted CSVs (git-ignored)
  08_diffs/                          # cell-level diffs (git-ignored)
  09_html_report/                    # per-feature HTML report (git-ignored)
```

> `Feature` in `master.csv` maps to `feature_<Feature>` on disk — the validator enforces the feature name itself.

---

## How to add a new feature — **without touching any code**

One command creates the standard folder tree and starter files:

```bash
npm run scaffold-feature -- ProductDesign "Simon2Stage"
```

If the feature name contains spaces, parentheses, or other shell-sensitive characters, keep it quoted:

```bash
npm run scaffold-feature -- ProductDesign "ROM(PD)"
```

Example with a template feature:

```bash
npm run scaffold-feature -- ProductDesign "Difference_of_Means" --template "feature_Simon2Stage"
```

If you already recorded the flow in Playwright codegen, import it into the framework:

```bash
npm run import-codegen -- ProductDesign "ROM(PD)" "new 2.txt"
```

That command writes `selectors.csv`, `metadata.csv`, and the feature config skeleton in the feature folder.

If you want codegen to start on the app URL from `.env`, use the repo wrapper instead of calling Playwright directly:

```bash
npm run codegen -- --env test
```

You can still pass an explicit URL if needed:

```bash
npm run codegen -- --url https://platform-test.cytel.com
```

1. **Create the folder** `<Module>/feature_<NewFeature>/` with the sub-folders above.
2. **Write the CSVs:**
   - `01_testdata/*.csv` — your project/inputset/design values (keyed on `TC_ID` + `IterationID`; a
     keyless single-row file like `inputset.csv` is fine — it applies to every iteration).
   - `02_selectors_repo/selectors.csv` — one row per UI object (`testid` › `role` › `label` › `text`
     › `css` › `xpath`; justify any `xpath` in its Description or the validator warns).
   - `03_metadata/metadata.csv` — the ordered steps. Reference data with `${data.<file>.<Column>}`,
     env with `${env.BASE_URL}`, captured values with `${runtime.<name>}`, and add `_${runId}` to
     every entity name so parallel/repeat runs never collide.
   - `00_config/feature.config.json` — set `simulation` (poll object + success/failure text) and
     `resultsExtraction.columnMap` (maps the UI grid headers to your baseline column names).
   - `06_baseline/compare.config.csv` — one row per output column with its tolerance. **A numeric
     column with no `AbsTolerance` and no `RelTolerance` fails validation** (use `0` for exact integers).
3. **Add one row to `master.csv`** (`TC_ID`, `Module`, `Feature`, `Execute=TRUE`, …).
4. `npm run validate` → fix any line-numbered errors.
5. `npm run test -- --feature <NewFeature>` → the **first run writes the baseline and reports
   `BASELINE_CREATED`** (never `PASS` — it verified nothing yet). Review it, commit it.

No file under `core/` changes. If you ever find you *must* edit the engine to onboard a feature,
the abstraction is wrong — fix the engine, not the feature. (`Difference_of_Means` in this repo was
added exactly this way — CSVs only.)

**Need something the keywords can't express?** Don't hand-edit a generated file. Add a function to
`custom/<Feature>/customSteps.ts` and call it from metadata with `Action=callCustom,
InputValue=<exportName>`.

---

## How to review & approve a baseline change

Baselines are **committed** (git tracks `06_baseline/`). A design's numbers changing is exactly the
event this framework exists to surface, so approving a new baseline is a deliberate, reviewed act:

1. A run reports `FAIL` with a diff. Open `08_diffs/diff_<TC>_<ITER>.csv` / `.json` and the per-feature
   HTML report to see **which column moved, the row key, expected vs actual, the delta, and the
   tolerance that was breached**.
2. Decide: is this an intended change (a model update) or a regression (a bug)?
   - **Regression** → file a bug. Do **not** update the baseline.
   - **Intended** → re-run with approval:
     ```bash
     npm run test -- --testcase TC_01 --update-baseline
     ```
     This overwrites `06_baseline/<env>/baseline_<TC>_<ITER>.csv` **and** rewrites its `.meta.json`
     sidecar (`runId`, `appVersion`, `env`, `timestamp`, `approver`, `sourceDataHash`).
3. **Commit the baseline + sidecar change in its own reviewed PR.** The diff in that PR *is* the
   record of what numbers changed and who signed off. Never let a run write actuals into
   `06_baseline/` implicitly — that would make the suite green forever and detect nothing.

---

## How to read a diff

The comparator reports **four failure classes separately** (a single "mismatch" bucket is useless):

| Class | Meaning | Typical cause |
|---|---|---|
| `SCHEMA_MISMATCH` | A compared column was added / removed / renamed vs. baseline | UI grid header renamed → fix `columnMap`, not the baseline |
| `ROW_COUNT_MISMATCH` | Baseline and actual have different row counts | The design produced more/fewer scenarios |
| `MISSING_ROW` / `EXTRA_ROW` | A **key** row is absent / unexpected (matched by key, never by position) | A scenario disappeared or appeared |
| `VALUE_MISMATCH` | A cell is outside tolerance | The number moved — the regression signal |

A `VALUE_MISMATCH` row (`08_diffs/diff_*.csv`) reads:
`column, rowKey, expected, actual, delta, toleranceApplied, toleranceBreached`.
A cell **passes** when `|actual − expected| ≤ AbsTolerance` **OR** `|actual − expected| / |expected| ≤
RelTolerance` (the relative term is skipped when `expected == 0`). Integers use `AbsTolerance=0` and
compare exactly.

---

## Statuses

`PASS` · `FAIL` · `SKIPPED` · `BASELINE_CREATED` (first run — nothing verified) ·
`SIMULATION_TIMEOUT` (the app was too slow — distinct from broken) · `ERROR`.

Reports: per-feature `09_html_report/index.html`, combined `reports/<runId>/combined_report.html`,
plus `results.json` and `junit.xml` for CI gating. All HTML is self-contained (no CDN) and opens
straight from a CI artifact zip.

---

## Authoring test data in Excel (optional)

The engine reads **CSV only** — never `.xlsx`. If you prefer Excel, convert once and commit the CSVs:

```bash
npm run xlsx-to-csv -- path/to/testdata.xlsx <Module>/feature_<Feature>/01_testdata
```

---

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml): every PR runs `validate` + `typecheck` +
`unit`, then a **smoke** subset; nightly (and manual dispatch) runs the **full regression**. JUnit is
published and reports/traces/diffs are uploaded as artifacts.
