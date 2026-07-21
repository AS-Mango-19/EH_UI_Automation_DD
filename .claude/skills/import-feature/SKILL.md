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
- **Screenshot-verify every iteration.** Green ≠ correct.
- The deterministic importer (`npm run import-codegen -- <Module> feature_<Name> --tc TC_XX`)
  is runnable **standalone**; this skill only adds the judgment layer on top of it.
