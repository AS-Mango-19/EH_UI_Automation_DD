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
  to that iteration's option combination, `N/A` for the ones that don't. **What to put in a
  cell is decided by the table below — get this right and a new combination just works.**
- **master.csv row** — `TC_XX,<Module>,regression,,<Name>,,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD`.

---

## What to put in a testdata cell — decide by looking at the field on screen

Adding a new design combination is **only** this decision, per field, per iteration. Open the
page with that combination selected and ask two questions: *is the field there?* and *can I
type in it?*

| On screen, for THIS combination | Put in the cell | What happens | Why |
|---|---|---|---|
| **Not on the page** (hidden by a controlling option — e.g. Noninferiority Margin on a Superiority design) | `N/A` | step **skipped** | The field doesn't exist; there is nothing to enter or check. |
| **Editable** — you are choosing the input | the real value | entered, then **read back to verify it landed** | The normal case. |
| **Greyed, showing the literal word "Computed"** — this is the parameter being solved for | `Computed` | step **skipped** | The app owns it. Trying to set it fails; it is an *output* of this iteration. |
| **Greyed, showing a derived NUMBER** (e.g. Mean Treatment μt0 = Mean Control × NI Margin) | the number you expect | **asserted** via `assertValue` | Best case: your arithmetic becomes a live check on the app's. |
| Greyed derived number, but you don't want to check it | `N/A` | step **skipped** | Fine — you just verify nothing there. |
| Editable, but you want the app's default | leave **blank** | step **skipped** | Blank is treated as `N/A`. |

**`N/A` and `Computed` are not interchangeable.** Both skip the step today, so a mix-up
won't fail the run — it will quietly mis-document *why* a field was left alone, and the next
person (or the next agent) will draw the wrong conclusion about the design. `N/A` = the field
isn't there. `Computed` = the field is there and the app fills it.

**Never put a calculated value in a cell that is `fill`ed into a greyed field.** The step
will hard-fail on a disabled field. If you know the expected number, wire it as `assertValue`
(step's `ExpectedValue`, not `InputValue`) and the derived field is *verified* rather than
skipped — `N/A` still skips it on the iterations where the field isn't rendered, so one
metadata keeps serving every combination.

> Worked example — ROM(PD) `#nonInf_nhMeanTreatment`: greyed, showing `0.99328`, which is
> `Mean Control 2.56 × NI Margin 0.388`. Filling it would fail on a disabled field; `Computed`
> would discard a known-good number. It is asserted, so ITER_02 now proves the app's maths
> and the other four iterations skip it as `N/A`.

### Two fields that share a visible label

Name the column after the **DOM id**, not the label. Both Mean Treatment boxes read
*"Mean Treatment"*, so `nonInf_nhMeanTreatment` / `nonInf_ahMeanTreatment` are the only
unambiguous headings — and the importer's column reuse deliberately refuses to guess between
ambiguous names rather than bind your step to the wrong field. The heading never has to match
the id or the label; it only has to match the metadata token exactly.

**Editable fills are now split for you.** When two *editable* fields share a label but have
distinct DOM ids — `Hazard Ratio (Null)` `#hazardRatio_Null_SS` vs `Hazard Ratio (Alternative)`
`#hazardRatio_Alt_SS` — the importer emits **one column per id automatically**
(`${data.design.hazardRatio_Null_SS}` / `…_Alt_SS`), so the alternative input never mirrors the
null one. The hand-naming rule above is only for the **greyed** `assertValue` fields the importer
can't record. (Split fires only for distinct id-bearing *fills*; a fill sharing its column with a
result *link*, and a dropdown recorded two ways, are left alone.)

---

## Workflow

### 1 — Run the deterministic importer (standalone-capable)
```bash
npm run import-codegen -- <Module> feature_<Name> --tc TC_XX
```
It auto-discovers the recording, captures selectors, generates steps + `${data.*}` tokens,
reuses matching testdata columns, and seeds skeletons. **The tester can run this alone** — the
agent's job is steps 2-6.

> **Two flows, one feature.** A feature can have a **design** flow and a chained **simulation**
> flow. They are imported and consolidated the SAME way; only the inputs and the command flag
> differ:
>
> | | Design flow | Simulation flow |
> |---|---|---|
> | recording | `02_selectors_repo/recording.txt` | `02_selectors_repo/sim_recording.txt` |
> | testdata | `inputset.csv` / `project.csv` / `design.csv` | `simulation.csv` |
> | metadata out | `03_metadata/metadata.csv` | `03_metadata/sim_metadata.csv` |
> | command | `npm run import-codegen -- <Module> feature_<Name> --tc TC_XX` | `npm run import-codegen -- <Module> feature_<Name> --tc TC_XX --sim` |
> | selectors / compare.config | `selectors.csv` / `compare.config.csv` | **shared** — merged into the same files |
> | login/navigate | synthesised | **none** — sim starts on the results page at the `Simulate` click |
>
> Turn it on with `Simulation=YES` in the master row. At run time, **after a GREEN design
> comparison**, the same browser stays open, clicks Simulate, runs the sim steps, and captures
> `sim_results_<TC>_<ITER>.csv` / `sim_baseline_<TC>_<ITER>.csv`. A red design skips sim.

### 2 — Consolidate a superset recording *(judgment)*
A superset recording toggles controls, so the raw metadata has **duplicated, self-cancelling**
steps. The importer already **collapses exact same-object repeats** of `select`/`check`/`fill`
(it logs `Collapsed N duplicate … step(s)`); your job is the judgment it can't make — ordering and
genuinely-distinct fields. Turn it into the clean data-driven form:
- **One data-driven step per control** — `select ddl_X ${data.design.X}`. The importer drops an
  exact repeat on the same object automatically; delete any that remain (e.g. the *same* dropdown
  recorded via two different selectors). The recorded value doesn't matter — the token reads the
  testdata.
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
  - a field the recording only **clicked as a stray label** (e.g. Test Type),
  - a field that is **always greyed** (see below).
  Infer the `#id` from the app's pattern and **confirm from the live DOM (DevTools) or a
  probe** before trusting it.

- **Two kinds of greyed field — only one needs you to do anything.** The importer can only
  emit what codegen recorded, and codegen cannot type into a disabled field.

  | | Greyed in SOME iterations (the computed *parameter* rotates) | Greyed in ALL iterations (permanently derived) |
  |---|---|---|
  | Example | Sample Size / Power / Type 1 Error | Mean Treatment `μt0`, `μt1` |
  | Recorded? | **Yes** — you typed into it in the iteration where it was an input | **No** — never typeable, so it is absent from the recording |
  | Importer emits | a normal `fill` step | **nothing at all** — no selector, no step |
  | You do | **nothing.** Keep the `fill`; put `Computed` in the greyed cells | add the selector + an `assertValue` step **by hand**, if you want it verified |

  So you are never *converting* a `fill` into an `assertValue`. In the second case the step
  never existed — you are *adding* one. It is also **optional**: skip it and you simply have
  no coverage of that field.

- **`validate` tells you when one is missing.** Add the column with its expected numbers and
  run `npm run validate`:
  `column "nonInf_nhMeanTreatment" in design.csv has a value but no step enters it — add a
  step to apply it or remove the column.`
  That warning is the prompt to add the `assertValue` step (or drop the column). It is how a
  derived field gets noticed without anyone remembering to look for it.
- **Mutually-exclusive variants** (`#ratioOfMeans_NI` vs `#ratioOfMeans_SP`) → separate
  columns + separate steps; each iteration `N/A`s the variant it doesn't use. The importer now
  produces the separate **id-named columns** for distinct editable fills automatically (see
  "Two fields that share a visible label" above); you still add the per-iteration `N/A` gating,
  and any `SkipIf` needed.
- **Indexed table cells + multi-period values.** Table inputs (interim spacing, piecewise
  hazard rates, dropout periods) use **dotted 0-based ids** — `inputMethodTable.0.hazardRateControl`,
  `boundary.1.analysisSpacingInfo`. Record the cell by its real `[id="…"]` / `[name="…"]` / `#id`
  and the importer takes that dotted id **verbatim** as the column (no more `id inputMethodTable 0 …`
  mangling). An export cell that packs every period comma-separated (`"0.9, 1.2, 1.5"`) is split one
  value per indexed column (`…0.…` / `…1.…` / `…2.…`); unused periods are left blank/`N/A`. Full rules:
  FRAMEWORK_KT.md §4.5 "Indexed table cells and multi-period values".
- **Checkbox toggles** (`getByTestId('variable')`, a role/id checkbox) import as a data-driven
  `check` **and** `uncheck` pair, each `SkipIf`-gated on the column value (`…!=check` / `…!=uncheck`),
  so one testdata cell drives the box on or off per iteration.

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
| `select … has no option matching "V"` | the error now **prints every real option** (`value=text`); map your testdata value to one — or the value belongs in a *different* field (a `select` recorded onto a text input; delete the bogus select) |
| `field "X" is disabled but testdata requires a value` | X's **controlling `select` isn't active** — either it never ran, or a later `fill` **reset** it. Order that select **after** the table X depends on and **immediately before** X. Execution is by **StepID**, not row order (§7 below) |
| a `check`/`uncheck` step **times out** | the checkbox isn't rendered for this combination (e.g. the efficacy/futility checkboxes exist only when a **futility boundary** does) → set the cell to **`N/A`** |
| a **blank period/interim row** appears and the design won't compute | an **ungated** Add-Period / Add-Interim click. Gate every one with `SkipIf ${data.design.<table>.<idx>.<col>}==N/A`. Watch for a **mis-named** button whose *selector* is really `role=button "Add Period"` (§7) |
| navigating shows an **"Unsaved Changes"** dialog | the design has unsaved edits — **Save it first; never add a "Leave" click** (Leave *discards* the design and masks a real validation error) |

### 7 — Scenario-conditional wiring, dialogs & recovering a real `#id` *(judgment — the GADAR cases)*

A second iteration with a **different option combination** touches fields the first never did. Each blocker is one of these patterns — none needs a code change, only correct ordering, gating, or an `N/A`.

- **Execution order is by `StepID`, not row/`Seq` order.** The loader sorts steps by `StepID` before running (`core/loaders/featureLoader.ts`). To move a step earlier, **change its StepID** — reordering rows or editing `Seq` does nothing. A controlling `select` must have a **lower StepID** than the fields it reveals.
- **A controlling select can be *reset* when you fill a dependent table.** The effect sub-method (`#hazardRatioInputMethod`) reverts to "None" — greying its effect field — *after* the input-method table is filled. Place that select **after** the table fills and **immediately before** the effect field (by StepID). Symptom: `… is disabled but testdata requires a value`.
- **A section's Input-Method dropdown must be set before its sub-fields exist.** Piecewise Dropout and Assurance each have their own `select` (e.g. `#piecewiseInputMethod` → `"Hazard Rate"`); until it is set the section renders nothing and the fills report `not found`. Add the `select`, gated on the section's data.
- **Fields that only render alongside a companion option are `N/A` when it's absent.** The per-analysis efficacy/futility checkboxes exist only when a **futility boundary** is configured; with `Futility = None` the interim table has no checkboxes, so `boundary.*.efficacyCheck` must be `N/A` (a `check` on an absent box just times out).
- **Gate every Add-Period / Add-Interim click.** An ungated one adds a blank, unfilled row and the design won't compute. Gate on the new period's key column: `SkipIf ${data.design.<table>.<idx>.<col>}==N/A`. The recording can also **mis-name** the button — it captured `role=button "Add Period"` but named it after a nearby label — so check the **selector**, not the ObjectName.
- **Duplicate ids → disambiguate positionally.** Every "Add Period" button shares `id="addButton"`; `.first()` grabs the wrong one. Use a Playwright CSS `:nth-match(button:has-text("Add Period"), 2)` for the 2nd (dropout-table) one.
- **Dialogs are steps too.** *Unsaved Changes* on navigation → **Save first**, never "Leave". *Compute* (a credit dialog) → fill the **Result Name** (`#inputId`), then confirm its primary button (`#credit-alert-primary`) to start the sim — the result link is `getByRole('link', {name:<Result Name>})`, so the `Result Name` column must hold a value. Dialog buttons are frequently **not** semantic `role=button` — target them by `text` or a stable `#id`.

**Recovering a field's real `#id` from the trace** (when a valued cell reports `not found` and DevTools isn't handy). Every run writes `artifacts/<runId>/<TC>_<ITER>/trace.zip`, whose DOM snapshots carry the true ids:
```bash
unzip -o trace.zip -d /tmp/tr
grep -rohE '\["SELECT",\{[^}]*"id":"[^"]+"' /tmp/tr | grep -oE '"id":"[^"]+"' | sort -u
```
Swap `SELECT` for `INPUT` / `BUTTON` for other controls. This is how `#piecewiseInputMethod`, `#shapeParamDelta`, and `ratioOfPercSurv_Alt_SP` were found with no live browser. The hardened `select` also **prints the option list** on a mismatch — read it before guessing.

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
