---
name: prepare-testdata
description: Prepare ready-to-use UI-automation testdata for ONE feature from its raw API export (_api_source/Testdata-*.csv) — re-shape it into 01_testdata/design.csv, project.csv, inputset.csv (and simulation.csv if it has a sim), applying the framework's N/A / Computed / value-driven-period / hypothesis-suffix conventions. TESTDATA ONLY — never changes code, metadata, selectors, or master.csv; asks the user on any doubt. Use when the user asks to build/prepare/convert testdata for a feature from an API dump.
---

Follow the playbook in [AI_TESTDATA_AGENT.md](../../../AI_TESTDATA_AGENT.md) **exactly**, for the
feature the user names (Module, feature folder, and — if known — TC id, e.g. "ProductDesign
feature_GADSD(PD) TC_15"). The playbook is the single source of truth; this skill is just the entry
point.

Non-negotiables (full detail is in the playbook):

- **CODE-FREE — data files only.** Create/edit **only** `ProductDesign/feature_<Name>/01_testdata/*.csv`
  (`design.csv`, `project.csv`, `inputset.csv`, `simulation.csv`). **Never** touch `core/`, `scripts/`,
  `custom/`, any `*.ts`, `03_metadata/`, `02_selectors_repo/`, generated `04_/05_`, or `master.csv`.
  Registering + wiring the feature is the **import** agent's job ([AI_IMPORT_AGENT.md](../../../AI_IMPORT_AGENT.md)).
- **Re-shape, don't invent.** The API export (`_api_source/Testdata-*.csv`) already encodes the
  per-iteration design. Move values into the framework's file layout **verbatim**; only *placement*
  and *N/A discipline* change. For the survival / group-sequential family (GADAR, GADSD, ROM, ROPR,
  Logrank*, RONBR, Fishers, ParametricWeibull) the export shares GADAR's exact `design.csv` columns,
  so `design.csv` is a straight **retarget** (verify with a header `diff`).
- **Every cell is one decision.** `N/A` = not applicable (hidden / wrong hypothesis / absent period)
  → skipped. `Computed` = app-derived → never set. A value = editable field. Preserve whatever the
  export already says; never turn an `N/A`/`Computed` cell into a guessed number.
- **Period rules.** A period (`…Table.<n>` / `boundary.<n>`) is present iff its columns hold values;
  an unused period is **all `N/A`**; never leave a period half-filled; keep indices contiguous.
- **Effect-size suffix rule.** Per the row's Hypothesis/Test Type, exactly one suffixed column
  (`_Alt_SP` / `_…_NI` / …) per effect is valued and the rest are `N/A` — as the export has it.
- **Ask on any doubt** — TC id, project defaults, which iterations `Run`, an unmapped API column, an
  ambiguous value, multi-scenario vs not, sim needed or not. Do **not** guess a value that changes
  the test.
- **Self-check is read-only.** You may run `npx tsx core/cli/index.ts validate --feature "<Name>"` to
  surface coverage warnings, but fix nothing in code — just report. Finish by reporting the
  assumptions you made and the next step (register in `master.csv` + import via AI_IMPORT_AGENT.md).
