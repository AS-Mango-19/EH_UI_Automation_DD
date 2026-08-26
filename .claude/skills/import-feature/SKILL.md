---
name: import-feature
description: Import and wire ONE recorded feature into the CSV-driven Playwright framework — run the deterministic importer, consolidate a superset recording's metadata, verify N/A per iteration, screenshot-verify a run, and fix that feature's issues, touching only that feature's files. Use when the user asks to import, wire, or set up a recorded feature.
---

Follow the playbook in [AI_IMPORT_AGENT.md](../../../AI_IMPORT_AGENT.md) **exactly**, for the
feature the user names (Module, feature folder, TC id — e.g. "ProductDesign
feature_MeanofPairedRatios TC_05"). The playbook is the single source of truth; this skill is
just the entry point.

Non-negotiables (full detail is in the playbook):

- **Scope** — edit ONLY that feature's folder + its `master.csv` row. Never touch `core/` or
  another feature. If a genuine framework bug forces a `core/` change, test it on a throwaway
  feature and re-run `npm run validate` to prove every committed feature still passes.
- **Follow the testdata** — a value must land (verified by read-back); blank/`N/A` skips; a
  valued field that isn't found **FAILS** the test. Fix the data or selector — never delete a
  step to force a pass.
- **Every `fill`/`select`/`check` must carry a `${data.*}` token** — a blank InputValue is not
  driven by anything, fires every iteration, and silently overrides an earlier data-driven
  choice. Delete it or bind it to a column.
- **The importer wires to existing columns; it never invents them.** It binds each recorded field
  to a testdata column **by DOM id or label** and adds no columns by default. Fields it can't
  match print as `UNWIRED` (with id, label, recorded value) — resolve each by adding the real
  column (named by its id or label) or renaming an existing one, **never** by re-running with
  `--seed`. `--seed` is only to bootstrap an empty feature; `--strict` fails on any `UNWIRED`.
  **Author `01_testdata` first**, then import — the importer conforms to your columns.
- **Never add or rename a testdata column without asking first** — check for an existing column
  it should map to, then tell the user the proposed column name, file, and per-iteration value,
  and wait for approval before writing it. Applies while resolving `UNWIRED` too, not only
  during a live run (`AI_IMPORT_AGENT.md` §3/§5a).
- **Start from the closest existing feature** in the same family and mirror its column
  names/selectors (means → `feature_DOM(PD)`; survival → `feature_GADAR(PD)`/`feature_GADSD(PD)`;
  proportions → `feature_RONBR(PD)`/`feature_FishersExact(PD)`; one-arm → `feature_SinglePoissonRate`;
  multi-scenario → `feature_BOIN`), so id/label wiring matches on the first pass.
- **A new data combination is one decision per field** — see "What to put in a testdata cell"
  in the playbook. Hidden → `N/A`; editable → the value; greyed showing "Computed" →
  `Computed`; greyed showing a derived number → assert it, never `fill` it.
- **Screenshot-verify every iteration.** Green ≠ correct.
- **Self-improving memory — [IMPORT_LESSONS.md](../../../IMPORT_LESSONS.md).** READ it before
  resolving `UNWIRED`/judgment calls (apply the first matching *Signal→Decision* rule instead of
  asking); APPEND a rule after any non-obvious decision or user correction, so the agent improves
  each iteration. Cross-platform (Claude + Copilot share this file).
- The deterministic importer (`npm run import-codegen -- <Module> feature_<Name> --tc TC_XX`)
  is runnable **standalone**; this skill only adds the judgment layer on top of it.
- **Simulation flow**: same feature, a second recorded flow that chains after a green design run
  in the same browser. Import it with the `--sim` flag
  (`npm run import-codegen -- <Module> feature_<Name> --tc TC_XX --sim`): it reads
  `sim_recording.txt` → `sim_metadata.csv`, binds tokens to `simulation.csv`, adds no
  login/navigate (starts at the Simulate click), and shares selectors + compare.config. Turn it
  on with `Simulation=YES` in master.csv. Consolidate `sim_metadata.csv` exactly like design.
