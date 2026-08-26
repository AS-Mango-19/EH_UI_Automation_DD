---
name: Import Feature
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
- **The importer wires to your existing columns; it never invents them.** It binds each recorded
  field to a testdata column by **DOM id or label**, adds **no** columns, and prints any it
  couldn't match as `UNWIRED` (with the field's id, label, and recorded value). Fix each by
  adding that column (named by its id or label) or renaming an existing one — **never** by
  re-running with `--seed` (that reintroduces junk columns). `--seed` is only for bootstrapping a
  feature whose `01_testdata` is still empty; `--strict` fails the import on any `UNWIRED`.
- **Never add or rename a testdata column without asking first.** Check whether an existing
  column already covers the field before proposing a new one; then state the exact column name,
  which file it lands in, and the value per iteration, and wait for approval — before writing
  anything. This applies while resolving `UNWIRED` too, not just during a live run
  (`AI_IMPORT_AGENT.md` §3/§5a).
- **Start from the closest existing feature** in the same family (means→`feature_DOM(PD)`,
  survival→`feature_GADAR(PD)`/`feature_GADSD(PD)`, proportions→`feature_RONBR(PD)`/`feature_FishersExact(PD)`/`feature_ROP(PD)`,
  one-arm→`feature_SinglePoissonRate`, multi-scenario→`feature_BOIN`): reuse its testdata column
  names so the id/label wiring matches on the first pass.
- **Read `IMPORT_LESSONS.md` before resolving any `UNWIRED`/judgment call.** It is the shared,
  cross-tool (Claude + Copilot) lessons ledger — apply the first matching *Signal → Decision* rule
  instead of re-deriving it from scratch, and **append** a new rule after any non-obvious call or
  correction so the next import (by you or by Claude Code) starts smarter.

Steps (detail in the playbook): pick the reference feature → **author `01_testdata` first** → run
`npm run import-codegen -- <Module> feature_<Name> --tc TC_XX` (standalone-capable) → **resolve
every `UNWIRED` line** (add the real column by id/label, gate it, or drop noise) and consolidate
the superset metadata (one data-driven step per control, controls before dependent fields) → add
computed & label-only field steps → `npm run validate` → `npm run test -- --testcase TC_XX` →
screenshot-verify each iteration → fix.

**Simulation flow** (optional second flow on the same feature): import with
`npm run import-codegen -- <Module> feature_<Name> --tc TC_XX --sim` — reads `sim_recording.txt`
→ `sim_metadata.csv`, tokens bound to `simulation.csv`, no login/navigate (starts at the
Simulate click), selectors + compare.config shared. Set `Simulation=YES` in master.csv; it then
chains after a green design run in the same browser and writes `sim_results_`/`sim_baseline_`.
Consolidate and screenshot-verify `sim_metadata.csv` exactly like the design flow.

**Toggling which iteration runs.** `Run` is a GLOBAL veto across *every* testdata CSV that carries
the column (`project.csv`, `simulation.csv`, …), not a per-file switch — set it in lockstep, or a
`Run=FALSE` sim row will silently drop the whole iteration, design included. See `IMPORT_LESSONS.md`
rule S13.
