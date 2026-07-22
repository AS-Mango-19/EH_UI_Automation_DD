---
mode: agent
description: Import and wire one recorded feature into the CSV-driven Playwright framework (follows AI_IMPORT_AGENT.md).
---

Follow the playbook in [AI_IMPORT_AGENT.md](../../AI_IMPORT_AGENT.md) **exactly**, for the
feature I name (Module, feature folder, TC id). The playbook is the single source of truth.

Non-negotiables:

- **Scope** — edit ONLY that feature's folder (`<Module>/feature_<Name>/…`) and its
  `master.csv` row. Never touch `core/` or another feature. If a real framework bug forces a
  `core/` change, test on a throwaway feature first and re-run `npm run validate` to confirm
  every committed feature still passes.
- **Follow the testdata** — a value must land (verified by read-back); blank/`N/A` skips; a
  valued field that isn't found **FAILS** the test. Fix the data or the selector — never delete
  a step to force a pass.
- **Every `fill`/`select`/`check` must carry a `${data.*}` token.** A value-entering step with
  a blank InputValue is not driven by anything: it fires on every iteration and silently
  overrides a data-driven choice made earlier. Delete it, or bind it to a column.
- **Adding a new data combination is one decision per field** — see "What to put in a testdata
  cell" in the playbook. Hidden → `N/A`; editable → the value; greyed showing "Computed" →
  `Computed`; greyed showing a derived number → assert it, never `fill` it.
- **Screenshot-verify every iteration** (open `artifacts/<runId>/<TC>_<ITER>/…`). Green ≠ correct.

Steps (detail in the playbook): run `npm run import-codegen -- <Module> feature_<Name> --tc TC_XX`
(standalone-capable) → consolidate the superset metadata (one data-driven step per control,
controls before dependent fields) → reconcile columns / add computed & label-only field steps →
`npm run validate` → `npm run test -- --testcase TC_XX` → screenshot-verify each iteration → fix.
