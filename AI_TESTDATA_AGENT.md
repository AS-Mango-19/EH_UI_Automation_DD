# AI Testdata Agent — Playbook

Turn a **raw API testdata export** (`ProductDesign/feature_<Name>/_api_source/*.csv`, an East Horizon
"Testdata-*.csv" dump) into the feature's **ready-to-use UI-automation testdata** —
`01_testdata/design.csv`, `project.csv`, `inputset.csv` (and `simulation.csv` when the feature has a
sim) — following the exact conventions the framework's metadata expects.

This agent is **testdata-only**. It prepares data; it does **not** wire, run, or import a feature.
When it is unsure, it **asks the user** rather than guessing.

---

## The 4 golden rules

1. **CODE-FREE — data files only.** You may create/edit **only** files under
   `ProductDesign/feature_<Name>/01_testdata/` (`design.csv`, `project.csv`, `inputset.csv`,
   `simulation.csv`). You must **never** touch `core/`, `scripts/`, `custom/`, `*.ts`,
   `03_metadata/*.csv`, `02_selectors_repo/*.csv`, `04_/05_` generated files, or `master.csv`.
   Registering the feature and wiring metadata/selectors is the **import** agent's job
   ([AI_IMPORT_AGENT.md](AI_IMPORT_AGENT.md)), not this one.
2. **Follow the API export; preserve its meaning.** The export already encodes the per-iteration
   design. Your job is to **re-shape** it into the framework's file layout and column conventions —
   not to invent statistics. Copy values verbatim; only *placement* and *N/A discipline* change.
3. **Every cell is one decision (see "What goes in a cell").** `N/A` = not applicable to this
   iteration (the field is hidden / the period doesn't exist / the hypothesis isn't active) →
   the run skips it. `Computed` = the app derives it (greyed) → the run must not set it. A real
   value = the field is editable and set. When the export already says `N/A`/`Computed`, keep it.
4. **Ask on any doubt — never guess a value that changes the test.** TC id, project defaults,
   which iterations run, an API column that maps to no target column, or an effect cell that could
   be a real value vs `N/A` — surface it. Guessing a statistic silently changes coverage.

## Inputs the tester provides

- **Module + feature folder** — e.g. `ProductDesign feature_GADSD(PD)`.
- **The API export** — `_api_source/Testdata-<Name>.csv` (already in the folder).
- **TC id** — the `TC_XX` this feature will occupy in `master.csv`. If not given, **ask** (it must
  be unique; the next free id is a suggestion, not a decision you make silently). All three testdata
  files key on the **same** `TC_ID` + `IterationID`.
- **Reference feature** — which existing feature this is "in the same line of" (its file layout is
  your template). For survival / group-sequential designs that is **GADAR(PD)**.

## Which file each column goes in

`00_config/feature.config.json` → `testdata.files` names the files and `joinKey` (`TC_ID`,
`IterationID`). Every row in every file is keyed by those two. Split the export like this:

- **`design.csv`** — the *design/analysis* parameters: Hypothesis, power, Test Type, Type-1 error,
  effect sizes, input-method tables, boundaries, priors/assurance, dropout, enrollment, Result Name.
  **For the GADAR family (survival / group-sequential — GADAR, GADSD, ROM, ROPR, Logrank*, RONBR,
  Fishers, Parametric-Weibull), the API export's columns are byte-for-byte the same 241-column
  layout as GADAR's `design.csv`.** So `design.csv` = the export rows with the `TC_ID` column
  retargeted and a `Run` column — nothing else moves. (Verify with a header `diff` against the
  reference feature's `design.csv`; if identical, it is a straight retarget.)
- **`project.csv`** — the *project shell* the API export does **not** carry: `Project Name`,
  `Time Unit`, `Start Date`, `Study Objective`, `Phase`, `TargetPopulation`, `Treatment Arm`,
  `Control Arm`, `Priority`, `Endpoint Name`, `Endpoint Type`, `Better Response`, `Variable`,
  `followUpTime`. Copy the **reference feature's** columns and fill sensible per-feature defaults
  (`Project Name` = `<FEATURE>_AD`); **confirm these with the user** — they are choices, not facts.
- **`inputset.csv`** — the input-set selection: `TC_ID`, `IterationID`, `collectionName`
  (`Set 1`, `Set 2`, …), `SelectTask`, `SelectTest` (usually blank).
- **`simulation.csv`** — only if the feature runs a chained simulation. See "Simulation" below.

If the API export mixes in project/inputset-looking columns, route each to the file whose feature
owns it; if a column maps to **no** target file, **ask**.

## What goes in a cell — decide by intent, preserve the export

| The field is… | Cell |
|---|---|
| not applicable to this iteration (hidden; wrong hypothesis; a period that doesn't exist) | `N/A` |
| app-derived / greyed showing "Computed" | `Computed` |
| editable and set to a value | the value, verbatim from the export |
| a derived **number** the app shows greyed | leave as the export has it (usually `Computed`/`N/A`); never invent |

The export already applies this. **Do not "fill in" `N/A`/`Computed` cells with numbers** — that is
the single most common way to break an iteration.

## The period rules (value-driven tables)

Repeated tables use a `…Table.<n>.<field>` / `boundary.<n>.<field>` index per **period / analysis**:
`inputMethodTable.0/1/2/3`, `dropoutTable.0/1`, `boundary.0/1/2/3`, `enrollmentTable.0/1`.

- **A period exists for an iteration iff its columns hold values.** Period 0 is always present;
  periods 1+ are present only when that iteration adds them. For a period an iteration does **not**
  use, **every** column of that period index is `N/A`.
- The metadata gates the "Add Period / Add Interim" click on the *next* period's data column
  (`SkipIf …==N/A`) — so your only job in the testdata is the **N/A discipline**: a used period gets
  values in all the columns it needs; an unused period is all `N/A`. Never leave a period
  half-filled (some columns valued, some blank) — that reads as "add this period" but under-fills it.
- Keep period indices **contiguous per iteration** (use 0, then 1, then 2 — don't set period 2 while
  period 1 is `N/A`).

## The effect-size hypothesis-suffix rule

Effect columns carry a hypothesis suffix — `_Null_SS`, `_Alt_SS`, `_Alt_SP`, `_Null_NI`, `_Alt_NI`
(and treatment-cell variants `_SPSS`, `_SS`, `_NI`). Per the design's `Hypothesis`/`Test Type`,
**exactly one** suffix column per effect holds a value and **all the others are `N/A`** (a
Superiority row → `_Alt_SP`; a Non-Inferiority row → `_…_NI`; etc.). The export already does this —
preserve it. Full legend + the `HazardRatioInputSet` sub-method mapping:
[FIELD_WIRING_PATTERNS.md](FIELD_WIRING_PATTERNS.md).

## Repeated-modal / multi-scenario data

If the feature adds **N same-kind records through one re-opened "Add …" modal** (candidate models,
dose-response scenarios, arms), the data does **not** go in wide indexed columns — it goes in a child
`01_testdata/scenarios.csv` (one row per record, keyed `TC_ID`+`IterationID`+`ScenarioIndex`). Full
recipe: [MULTI_SCENARIO_GUIDE.md](MULTI_SCENARIO_GUIDE.md) (reference `feature_BOIN`). Ask the user if
you're unsure whether a feature is multi-scenario.

## Simulation (`simulation.csv`)

Only when the feature has a chained sim (master `Simulation=YES`). One row per iteration keyed
`TC_ID`+`IterationID`; a **missing row means that iteration's sim is cleanly skipped**. Hard-won
conventions (from the GADAR sim):
- **Inherit the design header** — leave `sampleSize`, `numberOfEvents`, `allocationRatio`,
  `fixAtEachAnalysis`, `testStatistic` = `N/A` so the sim simulates the computed design. Overriding
  the interdependent header makes the app revert it and the prior go "too extreme".
- Give the sim its **own distinct result name** (a `Sim Result Name` column, e.g.
  `Result - Sim - Set1`) so opening the result doesn't collide with the design's link.
- The mutually-exclusive branch cells (enrollment multiplier-vs-fixed, input-method hazard-vs-cum%,
  the boundary Analysis-Spacing override) are still open questions — leave inherited / `N/A` unless
  the user has a proven value. See memory `gadar-simulation-flow`.

## Workflow

1. **Locate & read** the API export and the reference feature's `01_testdata/*.csv` + its
   `00_config/feature.config.json` (`files`, `joinKey`).
2. **Diff headers**: `design.csv` header vs the export header. If identical → straight retarget. If
   not → build a column map (export column → target column by DOM-id name); **list any unmapped
   columns and ask**.
3. **Confirm the doubts** (one round, up front): TC id; `Project Name` + project defaults; which
   `IterationID`s should `Run=TRUE`; any unmapped/ambiguous column; whether a `simulation.csv` is
   needed.
4. **Write `design.csv`** — export rows, `TC_ID` retargeted to the confirmed TC, a `Run` column
   (default: whatever the export's `Run` says, else `TRUE`). Keep all `N/A`/`Computed`/effect-suffix
   cells exactly as the export has them.
5. **Write `project.csv`** and **`inputset.csv`** — reference-feature columns, one row per iteration,
   confirmed defaults, `collectionName` = `Set <n>`.
6. **(Optional) Write `simulation.csv`** per the Simulation section.
7. **Self-check (read-only, allowed):** all three files have the same `TC_ID` and the same
   `IterationID` set; no half-filled periods; effect suffixes have exactly one active column per
   effect per row. You *may* run `npx tsx core/cli/index.ts validate --feature "<Name>"` to surface
   coverage warnings — but do **not** fix them by touching metadata/selectors (that's the import
   agent); just report them.
8. **Report** what you wrote, the assumptions you made (TC id, defaults), and the exact next step
   for the human (register in `master.csv` + import/wire via `AI_IMPORT_AGENT.md`).

## When to ask the user (doubts — don't guess)

- The **TC id** (unique; must match the future `master.csv` row).
- **Project defaults** (`Project Name`, Time Unit, Phase, Study Objective, arms, endpoint) — copy the
  reference feature and confirm.
- **Which iterations run** (`Run=TRUE/FALSE`) if the export is silent or you're trimming to a stable
  set.
- An **API column that maps to no target column**, or two columns that could be the same field.
- An **effect / boundary cell** that could be a real value vs `N/A` (i.e., the export is blank, not
  explicitly `N/A`).
- Whether the feature is **multi-scenario** or needs a **`simulation.csv`**.

## Guardrails checklist (run before you finish)

- [ ] I edited **only** `01_testdata/*.csv` — no code, no metadata, no selectors, no `master.csv`.
- [ ] `design.csv`, `project.csv`, `inputset.csv` share one `TC_ID` and the identical `IterationID`
      set.
- [ ] Every `N/A`/`Computed`/effect-suffix cell is preserved from the export (none turned into a
      guessed number).
- [ ] No half-filled period; period indices contiguous per iteration.
- [ ] I asked the user for every doubt above rather than guessing.
- [ ] I reported assumptions + the next step (register + import), and changed no code.
