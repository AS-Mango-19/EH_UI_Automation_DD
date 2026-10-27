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
  multi-scenario → `feature_BOIN`; `ProductDecide` "Go/No-Go" features → `ProductDecide/feature_DOM`
  (TC_29) or `feature_DOP` (TC_31, has an interim table) — see `AI_IMPORT_AGENT.md`'s dedicated
  Decide-family checklist; dual-endpoint (two-endpoint boundary table) → `feature_Dual_LogrankLogrank`
  (TC_37) or `feature_Dual_LogrankDOP` (TC_38) — see `AI_IMPORT_AGENT.md` §9.2, non-negotiable below),
  so id/label wiring matches on the first pass.
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
- **Full data-to-wiring audit before any live run, including every TABLE** — a clean
  `npm run validate` / `check-testdata-coverage.ts` proves the columns exist and parse, NOT that
  every cell is wired, picked up, and filled. Manually walk every `01_testdata/*.csv` **including
  every child/table CSV** (boundary, enrollment, dropout, interim/period, weights, strat tables,
  …) and trace each non-blank/non-`N/A` cell to a step that actually runs for its row and reads
  the value back. Do this even when another agent (e.g. Copilot) already reports the feature
  "validated" — both static tools have known blind spots (a `loopPeriods` `countField` undercount,
  an AG-Grid cell with no per-cell selector that silently no-ops, a stale duplicate StepID block
  overwriting a correctly-wired field) that a clean validate will not surface (`AI_IMPORT_AGENT.md`
  §4a).
- **Verify the mirroring held — right before you finish, not just when you start.** An auto-bound
  field (no `UNWIRED`) is NOT proof its selector is correct. `grep` the reference feature's
  `selectors.csv`/`metadata.csv` for `confirmed live|VERIFY selector|renamed from|collided|Never
  recorded|mislabeled` and confirm your feature resolved each matching field the same way, not just
  structurally-similarly. `feature_MCPMod_Con` shipped with two bugs `feature_MCPMod` had already
  fixed this way — neither tripped `UNWIRED` or `validate` (`AI_IMPORT_AGENT.md` §0, `IMPORT_LESSONS.md`
  rule 17).
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
- **Toggling which iteration runs.** `Run` is a GLOBAL veto across *every* testdata CSV that
  carries the column (`project.csv`, `simulation.csv`, …), not a per-file switch — set it in
  lockstep, or a `Run=FALSE` sim row will silently drop the whole iteration, design included
  (`IMPORT_LESSONS.md` rule S13).
- **Two full-suite diagnostic traps (`IMPORT_LESSONS.md` rule 19):** **(a)** A cascading failure —
  if an iteration fails at a step unrelated to anything you changed, and a DIFFERENT iteration
  failed immediately before it in the same serial run, fix the earlier one first and re-run the two
  together in isolation before debugging the later iteration's own steps. **(b)** A stale baseline —
  a `compareWithBaseline` `VALUE_MISMATCH` FAIL against an iteration's EXISTING baseline, right
  after fixing a real bug, doesn't necessarily mean the fix is wrong; screenshot-verify the live
  design against testdata first, and if it's now correct, delete the stale baseline
  (`06_baseline/<env>/baseline_<TC>_<ITER>.csv` + `.meta.json`) and re-run to regenerate it —
  confirm with the user before deleting, since it discards the previous regression reference.
