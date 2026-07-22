# AI Import Agent — Playbook

A **tool-agnostic** workflow for importing and wiring **one** feature into this CSV-driven
Playwright framework. Any AI assistant — **Claude Code, GitHub Copilot, Cursor, …** — or a
knowledgeable QA can follow it verbatim. It sits **on top of** the deterministic importer
(`npm run import-codegen`), which you can always run by itself; this playbook only supplies
the *judgment* the importer can't.

- **Entry points that load this file:** Claude Code → `/import-feature`; GitHub Copilot →
  `/import-feature` prompt (`.github/prompts/import-feature.prompt.md`). Both just say
  "follow this playbook" — the logic lives **here**, once.
- **Framework reference:** `FRAMEWORK_KT.md` explains keywords, selectors, tokens, baselines,
  and every trap. *This playbook is the **process**; the KT is the **reference**.* Read §6
  (keywords), §7 (selectors), §8 (tokens), §4.5 (`Computed`/`N/A`), and §15 (traps).

---

## The 4 golden rules

1. **Scope: touch only the target feature.** Edit only `<Module>/feature_<Name>/…` and that
   feature's row in `master.csv`. Do **not** touch `core/`, other features, or shared files.
   *If you must change `core/` or `scripts/import-codegen.ts` (a real framework bug), first
   test on a throwaway feature and re-run `npm run validate` to prove every committed feature
   still passes.* This is how the agent stays safe for other features.
2. **Follow the testdata.** A cell with a value → the step runs and the value must land
   (verified by read-back). Blank / `N/A` → the step is skipped (field not applicable to that
   iteration). A valued cell whose field **isn't found → the test FAILS** — that's correct;
   **fix the data or the selector, never delete the step to force a pass.**

   **Corollary — every `fill`/`select`/`check` must carry a `${data.*}` token.** A
   value-entering step with a **blank InputValue** is not driven by anything: it can only
   re-assert whatever the recording happened to click, so it fires on every iteration and
   **silently overrides a data-driven choice made earlier in the run**. It is recording
   noise — **delete it** (or bind it to a column). `npm run validate` now rejects a blank
   `check`/`uncheck`, and the importer refuses to emit one; if you see one in the metadata,
   something hand-edited it back in.

   > This is not hypothetical. ROM(PD) had `check radio_Type_1_Error` with a blank
   > InputValue. Step 240 correctly set Computed Parameter = `Power` from the testdata;
   > step 360 then blindly clicked the `Type 1 Error` radio, which greyed out the α the
   > run had just typed and turned Power into a stale `0.9`. The design submitted matched
   > no iteration and the simulation returned **"Failed"**.
3. **Verify with your eyes.** After each run, open the design/failing screenshots in
   `artifacts/<runId>/<TC>_<ITER>/` and confirm the fields hold the intended values and the
   right conditional fields are present. **Green ≠ correct** (a missing baseline is green and
   verifies nothing — KT §9.4).
4. **Never commit secrets.** `recording.txt`, `.env`, `.auth/` are gitignored and hold real
   credentials. Leave the feature's generated files for the tester to review/commit.

---

## Inputs the tester provides

- **Recording** — a Playwright codegen capture saved at
  `feature_<Name>/02_selectors_repo/recording.txt` (gitignored). For **conditional fields**,
  record the **superset**: select each controlling option (Hypothesis, Input Method, …) and
  touch **every** field it reveals, clicking each field's **label first** (KT §13, Step 1).
- **Testdata** — `01_testdata/*.csv`, one row per iteration: values for the fields that apply
  to that iteration's option combination, `N/A` for the ones that don't.
- **master.csv row** — `TC_XX,<Module>,regression,,<Name>,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD`.

---

## Workflow

### 1 — Run the deterministic importer (standalone-capable)
```bash
npm run import-codegen -- <Module> feature_<Name> --tc TC_XX
```
It auto-discovers the recording, captures selectors, generates steps + `${data.*}` tokens,
reuses matching testdata columns, and seeds skeletons. **The tester can run this alone** — the
agent's job is steps 2-6.

### 2 — Consolidate a superset recording *(judgment)*
A superset recording toggles controls, so the raw metadata has **duplicated, self-cancelling**
steps. Turn it into the clean data-driven form:
- **One data-driven step per control** — `select ddl_X ${data.design.X}`. Delete the repeated
  `select`/`check` on the same object; the recorded value doesn't matter (the token reads the
  testdata).
- **One `fill` per field.**
- **Order = controls before their dependent fields**, e.g.
  `Hypothesis → Test Type → Computed Parameter → Input Method → (the fills) → Test Statistic`.
  A controlling select must run **before** the fields it reveals, or the fill hits a
  not-yet-visible field.

### 3 — Reconcile columns & add missing steps *(judgment)*
- **Duplicate columns.** Where the importer added an id-named column (`sampleSize`) that
  duplicates your human column (`Sample Size (n)`), repoint the metadata token to your column
  and delete the duplicate. Reuse bridges case/spacing **and a truncated recorded label**
  (`Sample Size` → `Sample Size (n)`), but it deliberately gives up when the prefix is
  **ambiguous** (`Mean` matches both `Mean Control` and `Mean Treatment`) — those you
  reconcile by hand.

  > **Check the values, not just the column names.** A duplicate column is not a cosmetic
  > problem: the run reads the *duplicate*, which holds the value from the recording, so the
  > test silently exercises numbers nobody chose. ROM(PD) typed `123` and `0.56` while the
  > testdata said `120` and `0.58`. Open the design screenshot and compare it to the row.
- **Fields the recording couldn't capture** — add the step + selector by hand:
  - a **computed/greyed** field that is an *input* in another iteration (e.g. Power),
  - a field the recording only **clicked as a stray label** (e.g. Test Type).
  Infer the `#id` from the app's pattern and **confirm from the live DOM (DevTools) or a
  probe** before trusting it.
- **Mutually-exclusive variants** (`#ratioOfMeans_NI` vs `#ratioOfMeans_SP`) → separate
  columns + separate steps; each iteration `N/A`s the variant it doesn't use.

### 4 — Validate (no browser)
```bash
npm run validate
```
Fix **errors** (unknown column, missing selector, iteration-completeness — a keyed testdata
file missing a row another file has). **Warnings** are signal: "column X has a value but no
step enters it" means wire a step or confirm it's intentional.

### 5 — Run + screenshot-verify **every iteration** *(judgment)*
```bash
npm run test -- --testcase TC_XX
```
- In the step log, confirm blank/`N/A` cells show `SKIP … (field not applicable)` and valued
  cells fill/select.
- Open the **design-page screenshot per iteration** and confirm the values landed and the
  correct conditional fields are on the page.
- First green run = `BASELINE_CREATED` (verifies nothing) → **review the baseline numbers**.
  A **second** run turns it into a real `PASS`.
- The app allows **one session per user**, so iterations run **serially** and take a while;
  leave a gap between runs (the app can crash on rapid re-runs).

### 6 — Diagnose common issues *(judgment)*
| Symptom | What it means / fix |
|---|---|
| `SKIP … (field not applicable)` | blank/`N/A` cell — expected for that iteration |
| `field "X" did not accept the value` | grid cell reverted; `fill` auto-escalates to type+Tab. If the field strips characters, use an allowed value |
| `field "X" not found` on a **valued** cell | wrong selector, or the field isn't shown for this option combination → the testdata row is **inconsistent** (fix the data/selector; don't delete the step) |
| a field's value is ignored (app computes it) | set that cell to `Computed` |
| "Forced Log Out" / login bounce | parallel logins — ensure `serial: true` (importer default) |
| duplicate testdata columns | reconcile to the human-named column (step 3) |

---

## What is deterministic vs. judgment (why this split scales)

| Deterministic — the **importer** does it | Judgment — the **agent/QA** does it |
|---|---|
| capture selectors, generate steps + tokens | consolidate a toggling superset recording |
| reuse matching columns, seed skeletons | decide `N/A` per iteration; check scenario consistency |
| backfill identity, unique names, `serial` | add steps for computed/label-only fields; find their `#id` |
| validate structure | screenshot-verify; fix grid/timing/id issues |

Keep the importer deterministic and **guarded** (additive changes, no per-feature logic). Push
everything that needs *seeing the page* or *understanding intent* into this agent pass. That's
what lets it handle a new feature **without destabilising the ones already committed**.

---

## Guardrails checklist (run before you finish)
- [ ] Only the target feature's files + its `master.csv` row changed.
- [ ] `npm run validate` passes for **all** features (not just this one).
- [ ] Each iteration screenshot-verified; blank/`N/A` skipped, valued fields landed.
- [ ] No `recording.txt` / `.env` / `.auth` staged for commit.
- [ ] Baseline reviewed by a human before it's trusted.
