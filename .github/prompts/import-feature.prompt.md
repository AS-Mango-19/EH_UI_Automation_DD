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
- **The importer wires to your existing columns; it never invents them.** It binds each recorded
  field to a testdata column by **DOM id or label**, adds **no** columns, and prints any it
  couldn't match as `UNWIRED` (with the field's id, label, and recorded value). Fix each by
  adding that column (named by its id or label) or renaming an existing one — **never** by
  re-running with `--seed` (that reintroduces junk columns). `--seed` is only for bootstrapping a
  feature whose `01_testdata` is still empty; `--strict` fails the import on any `UNWIRED`.
- **Never add or rename a testdata column without asking first.** Check for an existing column
  it should map to, then tell the user the proposed column name, file, and per-iteration value,
  and wait for approval before writing anything — during `UNWIRED` resolution too, not only
  during a live run (`AI_IMPORT_AGENT.md` §3/§5a).
- **Start from the closest existing feature** in the same family (means→`feature_DOM(PD)`,
  survival→`feature_GADAR(PD)`/`feature_GADSD(PD)`, proportions→`feature_RONBR(PD)`/`feature_FishersExact(PD)`,
  one-arm→`feature_SinglePoissonRate`, multi-scenario→`feature_BOIN`, `ProductDecide` "Go/No-Go"
  features→`ProductDecide/feature_DOM` (TC_29) or `feature_DOP` (TC_31, has an interim table) — see
  `AI_IMPORT_AGENT.md`'s dedicated Decide-family checklist, **dual-endpoint (two-endpoint boundary
  table)→`feature_Dual_LogrankLogrank` (TC_37) or `feature_Dual_LogrankDOP` (TC_38) — see
  `AI_IMPORT_AGENT.md` §9.2, non-negotiable below**): reuse its testdata column
  names so the id/label wiring matches on the first pass.
- **Dual-endpoint boundary tables need §9.2, not ad-hoc wiring.** If the feature has TWO endpoints
  (EP1/EP2) each with its own interim-analysis boundary, it almost certainly renders as ONE table
  sharing a row-index namespace (`boundary.<n>.ep1*`/`ep2*`), not two independent tables. Read
  `AI_IMPORT_AGENT.md` §9.2 in full before wiring the boundary section — it has the proven rules for:
  which endpoint is primary (a "Synchronize Interims" select that can be **blank** in testdata and
  silently default live — screenshot-verify per iteration, don't infer it from other columns); the
  secondary-side Add-Interim button's label flipping with the primary endpoint (`Add Interim to EP2`
  vs `Add Interim to EP1`, with NO such button for whichever side is currently primary); two
  differently-`id`'d `keepAnalysisInfoFor<X>SameAs<Y>` checkboxes that don't render at all for a
  "Both endpoints" Winning Condition; and — the fix most likely to be needed even on a feature that
  looks like TC_37/TC_38 — that the SAME shared reconcile metadata can need DIFFERENT `countField`s
  for different iterations (one Winning Condition can suppress a checkbox to all-`N/A` for exactly
  one iteration while every other iteration needs that checkbox). Never just swap the countField to
  fix one iteration — run TWO `reconcilePeriodTable` calls back-to-back on the same gate, one per
  candidate field; it no-ops once its target is met, so this needs no per-iteration branching.
- **Verify the mirroring held — right before you finish, not just when you start.** An auto-bound
  field (no `UNWIRED`) is NOT proof its selector is correct. `grep` the reference feature's
  `selectors.csv`/`metadata.csv` for `confirmed live|VERIFY selector|renamed from|collided|Never
  recorded|mislabeled` and confirm your feature resolved each matching field the same way, not just
  structurally-similarly. `feature_MCPMod_Con` shipped with two bugs `feature_MCPMod` had already
  fixed this way — neither tripped `UNWIRED` or `validate` (`AI_IMPORT_AGENT.md` §0, `IMPORT_LESSONS.md`
  rule 17).
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

**Two full-suite diagnostic traps (`IMPORT_LESSONS.md` rule 19):**
- **A cascading failure.** If an iteration fails at a step that has nothing to do with anything you
  changed, and a DIFFERENT iteration failed immediately before it in the same serial run, fix the
  earlier one first and re-run the two together in isolation before debugging the later iteration's
  own steps — a crashed iteration can leave the shared browser session in a state that breaks the
  next iteration's fresh start.
- **A stale baseline.** A `compareWithBaseline` `VALUE_MISMATCH` FAIL against an iteration's EXISTING
  baseline, right after you fixed a real bug, does not necessarily mean your fix is wrong —
  screenshot-verify the live design against testdata first. If it now correctly matches testdata, the
  OLD baseline was captured from a broken prior state; delete `06_baseline/<env>/baseline_<TC>_<ITER>.csv`
  + its `.meta.json` and re-run to regenerate it. Confirm with the user before deleting a baseline —
  it discards the previous regression reference.
