# Adding effect-size, prior & early-stopping fields — the GADAR pattern

A concrete, reusable guide for wiring three of the hardest field families in the East Horizon framework — **effect size**, **priors (assurance)**, and **early stopping (group-sequential boundaries)** — using the real GADAR(PD) implementation as the reference pattern. Every column name, selector key, css value, and StepID below is taken verbatim from the live GADAR feature so you can copy them directly.

> **Adding a variable-length list of repeated records** (candidate models / scenarios / arms entered through a repeated "Add …" modal, 1…N per iteration)? That is a *different* shape — use the **[Multi-Scenario (Repeated-Modal) Pattern](MULTI_SCENARIO_GUIDE.md)** (child `scenarios.csv` + a reusable sub-flow + one `loopOverData` step), not the per-column conventions below. Reference implementation: `feature_BOIN`.

> **Status:** column names, selector keys, StepIDs, and SkipIf expressions in this doc were verified against the live GADAR(PD) CSVs on 2026-08-04.
>
> **Run-state caveat:** `project.csv` currently has **only ITER_30 `Run=TRUE`** — this is a *transient isolation state* left over from single-iteration debugging. The committed stable set is ITER_01/02/23/24/25. Wherever this doc says "the only live row is ITER_30," that is a fact about the current working tree, not a permanent design. Restore the stable set before drawing conclusions about coverage.

> **Golden rule of this framework:** there is **no per-family enable/disable flag**. Gating is almost entirely **value-driven** — a cell that is blank, `N/A`, or `Computed` causes its step to skip. A cell with a real value causes its step to *fire*, whether or not the field is visible. So "leave it `N/A`" is not cosmetic; it is the mechanism. When a step *must not* run, its cell **must** be `N/A`.

---

## 1. Core concept — the hypothesis-suffix rule

East Horizon renders effect-size and treatment input-method-table fields with a **DOM id suffix that encodes the hypothesis**:

| Suffix | Hypothesis rendered | Example live id |
|--------|--------------------|-----------------|
| `_SP`  | Superiority | `#hazardRatio_Alt_SP` |
| `_SS`  | Super-Superiority | `#hazardRatio_Null_SS` |
| `_NI`  | Non-inferiority | `#hazardRateTrmt_Alt_NI` |
| `_SPSS` | combined Superiority **and** Super-Superiority (input-method-table treatment cells only) | `#hazardRateTrmt_Alt_SPSS` |

**Which side gets which suffix (confirmed from the raw API columns `hazardRatio_Null_SS` + `hazardRatio_Alt_SP`):** by default the **Null** side renders `_SS` and the **Alt** side renders `_SP` — *for a Superiority design*. But the suffix is ultimately driven by the row's `Hypothesis` value (design.csv col 5), which in GADAR is **not** uniform:

- `Superiority` — ITER_01–22, 27–35 → live ids end `_SP`
- `Noninferiority` — ITER_23, ITER_24 → live ids end `_NI`
- `Super Superiority` — ITER_25, ITER_26 → live ids end `_SS`

### Why prefix selectors beat pinned selectors

A **pinned** selector hard-codes one suffix:

```
key: txt_Hazard_Ratio_Null   css: #hazardRatio_Null_SS      <- resolves ONLY under Super-Superiority
```

A **prefix** selector matches every suffix:

```
key: txt_Ratio_of_Survivals_at_Period_1_Null   css: [id^="ratioOfPercSurv_Null_"]   <- resolves under _SP, _SS AND _NI
```

> **The rule, memorize it:** **pin => one hypothesis only; prefix => all three.**

This is exactly why `ratioOfPercSurv` (prefix) is the *only* effect-size family in GADAR that works across all hypotheses, while `hazardRatio`, `logHazardRatio`, and `ratioOfMedians` (all pinned `_SS`) silently fail to resolve on any Superiority (`_SP`) or Non-inferiority (`_NI`) row. They happen to *look* safe today only because the one and only `Run=TRUE` row (ITER_30) has HR = `N/A`. That is luck, not correctness — e.g. `hazardRatio_Alt_SS=0.5` is populated in ~13 Superiority rows (ITER_03, 05, 06, 07, 08, 09, 10, 11, 15, 17, 20, 22) and would drive StepID 500 (a fill with no SkipIf) against `#hazardRatio_Alt_SS`, which does not exist under Superiority.

**Convention for new features:** *always author effect-size selectors as `[id^="<field>_<side>_"]` prefixes.* Only pin a suffix when the field genuinely exists for one hypothesis alone.

---

## 2. Separate Null vs Alt columns

Every effect-size concept has **two independent DOM inputs** — a Null field and an Alt field. Your testdata must therefore carry **two independent columns**. GADAR gets this right for `hazardRatio` and `ratioOfPercSurv`, but **collapses Null and Alt into a single column** for `logHazardRatio` and `ratioOfMedians`, making distinct Null vs Alt values impossible to express.

### Naming convention (ADOPTED) — one column per DOM id, hypothesis suffix included

Name each testdata column exactly like the app's DOM id, **suffix and all**:

```
<field>_Null_SS   <field>_Alt_SS     (Super-Superiority)
                  <field>_Alt_SP     (Superiority — Null is implicit HR=1, no column)
<field>_Null_NI   <field>_Alt_NI     (Non-inferiority)
```

A given iteration is exactly ONE hypothesis, so only the columns matching that row's `Hypothesis` hold a value; every other suffix is `N/A`. This is self-documenting and matches the raw API's own names (`hazardRatio_Null_SS`, `hazardRatio_Alt_SP`).

**Wiring rule:** the **selector stays a single prefix** (`[id^="<field>_Alt_"]`) — it resolves whichever suffix the app renders for that row — and you add **one fill step per hypothesis column**, all pointing at that one prefix selector. Because only the matching-hypothesis column is populated, exactly one fill fires — value-driven, no Hypothesis `SkipIf` needed.

> Trade-off: a single *suffix-free* column + one fill per side is simpler but can't express distinct SP vs SS vs NI values in the same file. GADAR adopted the explicit per-suffix set above.

### Before / after — logHazardRatio

**Before (broken — one column feeds both fills):**

| ... | Log Hazard Ratio | ... |
|-----|------------------|-----|
| ITER_29 | N/A | |

Both StepID 550 (`fill txt_Log_Hazard_Ratio_Null <- ${data.design.Log Hazard Ratio}`) and StepID 560 (`fill txt_Log_Hazard_Ratio_Alternative <- ${data.design.Log Hazard Ratio}`) read the **same** cell — you can never give Null and Alt different numbers.

**After (as implemented in GADAR — per-suffix columns):**

Retire `Log Hazard Ratio`; add the per-hypothesis columns and repoint/add fill steps:

```csv
IterationID,Hypothesis,logHazardRatio_Null_SS,logHazardRatio_Alt_SS,logHazardRatio_Alt_SP
ITER_29,Superiority,N/A,N/A,-0.400
```

- StepID 550 `fill txt_Log_Hazard_Ratio_Null        <- ${data.design.logHazardRatio_Null_SS}`
- StepID 560 `fill txt_Log_Hazard_Ratio_Alternative <- ${data.design.logHazardRatio_Alt_SS}`
- StepID 565 (new) `fill txt_Log_Hazard_Ratio_Alternative <- ${data.design.logHazardRatio_Alt_SP}`

A Superiority row fills only `_Alt_SP` (the `_SS` columns are `N/A`, so their steps skip). All three steps share one prefix selector; only one fires.

### Migrating a column that already holds values

When you split a column with live data (e.g. GADAR's `Ratio of % Survivals at Period # 1`), **route each row's value to its hypothesis column** — don't leave it in one place, or the wrong-suffix fill step won't fire and the value never reaches the field. GADAR routing: ITER_02/04/30 (Superiority) → `ratioOfPercSurv_Alt_SP`; ITER_23 (Non-inferiority) → `ratioOfPercSurv_Alt_NI`.

### Before / after — ratioOfMedians

Identical: retire `Ratio of Medians`; add `ratioOfMedians_Null_SS`, `ratioOfMedians_Alt_SS`, `ratioOfMedians_Alt_SP`; repoint StepID 790/800 to the `_SS` columns and add StepID 805 for `_Alt_SP`.

> **Note (done in GADAR):** the mislabeled "sub-method" select steps (StepID 520 `ddl_Log_Hazard_Ratio_Alternative`, 750 `ddl_Ratio_of_Medians_Alternative`) — which resolved to `#hazardRatioInputMethod`, the input-method dropdown, **not** a value field — were **deleted** (the input method is already set by StepID 485/645). Watch for these mislabeled duplicates when importing a fresh recording.

---

## 3. Effect-size families — as built in GADAR

### `HazardRatioInputSet` — the effect sub-method dropdown

design.csv col `hazardRatioInputMethod` → `#hazardRatioInputMethod` (selected by StepID 485/645). It picks which effect measure the row uses — i.e. which effect column carries a value:

| value | option label |
|-------|--------------|
| `1` | None |
| `2` | Hazard Ratio (λt/λc) |
| `3` | Log Hazard Ratio ln(λt/λc) |
| `4` | Ratio of Medians (mt/mc) |
| `5` | Ratio of % Survivals at Period # 1 (st/sc) |

Leave `N/A` for "compute the effect from the survival-rate/median/%-survival table" rows (the common case in GADAR today).

> **How the value is matched — you give the number, not the label.** The framework's `select`, on a native `<select>`, resolves the value **by `<option value>` first, then exact visible text, then substring**, and commits by value (`core/keywords/input.ts:387-403`). So `hazardRatioInputMethod=2` matches `<option value="2">Hazard Ratio (λt/λc)</option>` **directly** — the numeric codes above are the option values and are the robust choice (the labels carry `λ` and exact punctuation that are fragile to match). A label works too if spelled exactly, but stay numeric. On a mismatch the step **fails loudly and prints the real option list** (`value=text`). To force **None**, use `1` (not `N/A`, which skips the select and leaves the default).

### The per-suffix columns + fill steps (verified, TC_12 5/5)

One prefix selector per side; one fill step per hypothesis column. Only the row-hypothesis column is populated, so exactly one fill fires.

| Family | testdata columns (per-suffix) | Prefix selector (per side) | Fill steps (per hypothesis) |
|--------|-------------------------------|-----------------------------|------------------------------|
| **hazardRatio** | `_Null_SS`,`_Alt_SS`,`_Alt_SP`,`_Null_NI`,`_Alt_NI` | `[id^="hazardRatio_Null_"]` / `[id^="hazardRatio_Alt_"]` | Null: 490(SS), 495(NI) · Alt: 500(SS), 501(SP), 502(NI) |
| **logHazardRatio** | `_Null_SS`,`_Alt_SS`,`_Alt_SP`,`_Null_NI`,`_Alt_NI` | `[id^="logHazardRatio_Null_"]` / `_Alt_` | Null: 550(SS), 555(NI) · Alt: 560(SS), 565(SP), 566(NI) |
| **ratioOfMedians** | `_Null_SS`,`_Alt_SS`,`_Alt_SP` | `[id^="ratioOfMedians_Null_"]` / `_Alt_` | Null: 790(SS) · Alt: 800(SS), 805(SP) |
| **ratioOfPercSurv** | `_Null_SS`,`_Null_NI`,`_Alt_SP`,`_Alt_SS`,`_Alt_NI` | `[id^="ratioOfPercSurv_Null_"]` / `_Alt_` | Null: 650(SS), 655(NI) · Alt: 660(SS), 665(SP), 666(NI) |

> Per the feature owner's spec, **`ratioOfMedians` has no `_NI` column** (no NI iteration uses the Ratio-of-Medians sub-method). `logHazardRatio` got `_Null_NI`/`_Alt_NI` added for **ITER_24** (Noninferiority, Log-HR sub-method, code 3) so it can take direct Log-HR values. Add `ratioOfMedians` NI only if an NI iteration ever needs direct Ratio-of-Medians entry.

### The six selector generalizations (pinned `_SS` → prefix)

Change these six selector css values from a pinned `_SS` id to a hypothesis-agnostic prefix:

1. `#hazardRatio_Null_SS` → `[id^="hazardRatio_Null_"]`
2. `#hazardRatio_Alt_SS` → `[id^="hazardRatio_Alt_"]`
3. `#logHazardRatio_Null_SS` → `[id^="logHazardRatio_Null_"]`
4. `#logHazardRatio_Alt_SS` → `[id^="logHazardRatio_Alt_"]`
5. `#ratioOfMedians_Null_SS` → `[id^="ratioOfMedians_Null_"]`
6. `#ratioOfMedians_Alt_SS` → `[id^="ratioOfMedians_Alt_"]`

After these six, all four families behave like `ratioOfPercSurv` and resolve under Superiority, Super-Superiority, and Non-inferiority alike.

### Also wire (currently completely unmapped — do not forget)

These two effect-size controls decide *which side* your effect values belong to and have **no** subsystem coverage today:

- **Variance of Log Hazard Ratio** — design.csv col 51 `Variance of Log Hazard Ratio` (values `Null` / `Alternative`), StepID 1260 `select ddl_Variance_of_Log_Hazard_Ratio <- ${data.design.Variance of Log Hazard Ratio}` → `#varianceOfLogHR`.
- **variable** (variance checkbox) — design.csv col 52 `variable`, StepIDs 1270 (`check chk_variable`), 1280 (`uncheck chk_variable`), 1290 (duplicate uncheck), SkipIf `${data.design.variable}!=check` / `!=uncheck`, testid `variable`. **Note:** this is a *different* `variable` from project.csv's `Variable` (StepID 170/180, `chk_Variable`) — do not conflate them.

### The input-method-table treatment cells (the `_SS`/`_SPSS`/`_NI` fix table)

To fill separate Null **and** Alt across **all three** hypotheses you also need the input-method-table treatment cells and their steps, which already exist for the NI corner but must be authored for the SS Null / SP corners:

- Hazard-rate treatment: `inputMethodTable.0.hazardRateTrmt_Null_SS` + `_Alt_SPSS` (StepID 410); `_Null_NI` (1030) / `_Alt_NI` (1040)
- Median treatment: `medianSurvivalTimeTrmt_Null_SS` + `_Alt_SPSS` (700); `_Null_NI` (1100) / `_Alt_NI` (1110)
- Cum-%-survival treatment: `cumPercSurvivalTrmt_Alt_SPSS` (870); `_Null_NI` (1180) / `_Alt_NI` (1190)

> **Latent trap to clean up while you are here:** selectors.csv line 59 key `txt_Hazard_Rate_Treatment_Alternative_t` points its css at `#hazardRatio_Null_SS` — wrong metric (rate vs ratio) **and** wrong side (Alt key → Null id). It is currently orphaned (unreferenced by metadata) but will bite anyone who wires it. Sibling line 58 `txt_Hazard_Rate_Treatment_Null` has a hard-coded recorded cell value `0.024878`. Fix or delete both.

### The `power` field gap (input vs output)

The `power` column in design.csv was **added manually** and is **not wired into metadata** — there is no fill step referencing `${data.design.power}`. A `txt_Power → #power` selector (selectors.csv row 30) exists, and the recording captured `#power` as a real textbox, but the value is currently only ever read *back* in the results, never entered. So today the column is inert.

- **If `power` is an input** for your target iterations (design solves for events/sample size given power), add a fill step: `fill txt_Power <- ${data.design.power}`.
- **If any iteration solves _for_ power** (power is the output), that same fill must be gated so it does **not** run there — e.g. `SkipIf ${data.design.power}==Computed` (or `==N/A`). Set `power=Computed`/`N/A` on the solve-for-power rows.

Decide input-vs-output per iteration before wiring — an unconditional fill would clash with any solve-for-power row.

---

## 4. Priors (assurance) — the dependency decision flow

The priors panel renders **only when Include Assurance is checked**. No prior step (StepID band **1390–2560**) carries a SkipIf — gating is 100% value-driven. So you must co-set the gate trio and *exactly* the matching parameter family; everything else in that iteration must be `N/A`.

### The gate (StepID 1370 / 1380)

```
1370: check   chk_include_Assurance   SkipIf ${data.design.includeAssurance}!=check
1380: uncheck chk_include_Assurance   SkipIf ${data.design.includeAssurance}!=uncheck
```

- `includeAssurance` must literally be the token **`check`** (not the API's `on`/`off`) for the panel to render — used by ITER_27–35.
- **StepID 1380 is dead code today** — no GADAR row ever has `includeAssurance=uncheck` (col 59 is only `check` or `N/A`). Do not rely on it.
- The 14 Uniform iterations (ITER_03–21) set prior columns while `includeAssurance=N/A`; the panel never renders, so those prior fills would FAIL if the row were `Run=TRUE`. They survive only because none of them run.

### Decision flow (each edge is value-driven — the "SkipIf" is really the blank/N/A skip rule)

```
Step 1  includeAssurance = check                     (else whole panel absent -> everything below N/A)
          |
Step 2  priorDistributionFor  (StepID 1390 -> #priorDistributionFor)   picks the TARGET PARAMETER
          |         value selects EXACTLY ONE column family:
          |  1 / Log Hazard Ratio (δ) -> Delta family   (minDelta,maxDelta,eDelta,sdDelta,percDelta*)
          |  2 / Hazard Ratio (HR)    -> HR family       (minHR,maxHR,input name eHR,input name sdHR,percHR*)
          |  ParamC / λc              -> LamC family     (minLambdaC,maxLambdaC,lambda c a,lambda c b,percLambdaC*)
          |  ParamT / λt              -> LamT family     (minLambdaT,maxLambdaT,lambda t a,lambda t b,percLambdaT*)
          |  ParamCAndT / λc and λt   -> LamC + LamT
          |  9  / s_c/100             -> SC family       (sc a,sc b,percSC*)
          |  10 / s_t/100             -> ST family       (st a,st b,percST*)   <- ITER_30 (only Run=TRUE)
          |  11 / s_c/100 and s_t/100 -> SC + ST
          |  m_c / m_t / m_c and m_t  -> MC / MT families (input name eMC/sdMC, input name eMT/sdMT, percM*)
          |
Step 3  distributionMethod (StepID 1400 -> #distributionMethod)   Beta | Log Normal | Normal | Uniform
          |
Step 4  assuranceInputMethod (StepID 1440 -> #assuranceInputMethod)   picks the ENTRY MODE inside the family:
          |  Uniform                              -> min/max columns only        (assuranceInputMethod = N/A)
          |  Normal / Log Normal + E and SD of Param -> E/SD columns (eDelta/sdDelta, input name eHR/sdHR, a/b)
          |  Beta + Beta Parameters (a and b)     -> the a/b columns (sc a/b, st a/b, lambda c/t a/b)
          |  any + Percentiles of Param / of HR   -> the percXXX1st/2nd Operator/Val/Prob columns
```

**Fill vs N/A gating, by example (the observed valid combinations):**

| priorDistributionFor | distributionMethod | assuranceInputMethod | Fill these | Everything else | Live row |
|----------------------|--------------------|-----------------------|-------------|-----------------|----------|
| Log Hazard Ratio (δ) | Normal | Percentiles of Param | `percDelta1st*`, `percDelta2nd*` | N/A | ITER_27 |
| Log Hazard Ratio (δ) | Normal | E and SD of Param | `eDelta`, `sdDelta` | N/A | ITER_31 |
| Hazard Ratio | Log Normal | Percentiles of HR | `minHR`, `maxHR`, `percHR1st*/2nd*` | N/A | ITER_29 |
| Hazard Ratio | Log Normal | E and SD of Param | `minHR`, `maxHR`, `input name eHR/sdHR` | `E`/`SD` = N/A | ITER_32 |
| ParamC (λc) | Beta | Percentiles of HR | `minLambdaC`, `maxLambdaC`, `percLambdaC*` | N/A | ITER_28 |
| ParamC (λc) | Log Normal | E and SD of Param | `lambda c a`, `lambda c b` | N/A | ITER_34 |
| s_t/100 (**`10`**) | Beta | Beta Parameters (a and b) | `st a`, `st b` | N/A | **ITER_30 (Run=TRUE)** |

**The SkipIf-style edge, made concrete:** because there is no explicit SkipIf, the "edge" is enforced by leaving the off-path cell `N/A`. E.g. for the HR/E-and-SD row (ITER_32) you fill `input name eHR=1.649` but you *must* set `E=N/A` — otherwise StepID 1510 (`fill txt_E_HR <- ${data.design.E}`) fires **before** StepID 1950 (`fill txt_input_name_e_HR <- ${data.design.input name eHR}`) and both target `input[name="eHR"]`: last-write-wins, and a stray `E=0` would briefly write 0. Prefer to retire the duplicate `E`/`SD` columns+steps entirely.

### Encoding traps to normalize (these silently fail a native `<select>`)

- `priorDistributionFor` is matched by **visible option label first**. Only ITER_30's numeric `10` and exact-label matches resolve. Partial labels (`Log Hazard Ratio` — real option is `Log Hazard Ratio (δ)`) and internal tokens (`ParamC`/`ParamT`/`ParamCAndT` — real labels `λc`/`λt`/`λc and λt`) likely **fail**. **Normalize every row to the numeric option-value set** (1, 2, 9, 10, 11, plus the λ/median codes) as ITER_30 does.
- `distributionMethod` must be exactly `Log Normal` (with the space) — `LogNormal` fails.
- `#priorDistributionFor` and `#distributionMethod` are each selected **twice** (1390+1530, 1400+1430); `#minHR`/`#maxHR` filled twice (1410/1420 + 1930/1940). Redundant but harmless — do not add a third.

---

## 5. Early stopping — the EFF × FUT combination matrix

All boundary ids use dotted array names `boundary.{i}.*` (look index `i`, 0-based) and are **hypothesis-agnostic** (no `_SP`/`_SS`/`_NI`). Steps run sorted by StepID; band **2570–3050**.

> **Authoring note:** these `boundary.*` columns (and the `dropoutTable.*` / `enrollmentTable.*` period columns) may live inline in design.csv **or** in a normalized child CSV `design_<tableName>.csv` (one row per period, keyed `TC_ID,IterationID,PeriodIndex`) that the loader folds into the **same** `${data.design.<table>.<n>.<field>}` tokens — no token, selector, or step changes either way. See AI_IMPORT_AGENT.md §3 / FRAMEWORK_KT §4.5.

The **master gate** is `effBoundaryFam`. The three Calculate clicks are gated `SkipIf ${data.design.effBoundaryFam}==N/A`:

```
2820: click btn_Calculate                             SkipIf ${data.design.effBoundaryFam}==N/A
2970: click btn_Calculate                             SkipIf ${data.design.effBoundaryFam}==N/A
3050: click btn_Hypothesis_Select_...  (Calculate)    SkipIf ${data.design.effBoundaryFam}==N/A
```

| Case | effBoundaryFam | futBoundaryFam | MUST fill | MUST be N/A | Live example |
|------|----------------|-----------------|-----------|-------------|--------------|
| **Eff-only** | Spending Functions / Wang-Tsiatis / Haybittle Peto | `None` | `effBoundaryFam`(2570), `effSpendFunc`(2580) or param (`effParam`/`effParamGamma`/`effParamRho`/`shapeParamDelta`), `boundary.{0,1,2}.analysisSpacingInfo` + Add-Interim, per-look `efficacyPValue`(Haybittle)/`cumAlphaSpent`(SF), `boundary.0.efficacyCheck`, `boundaryScale` | `futSpendFunc`, `futParam*`, `futBoundaryType`, `boundary.i.futilityPValue/CP/HR`, `boundary.i.cumBetaSpent`, `boundary.1.futilityCheck`, `computeCP` | ITER_02 (Wang-Tsiatis Δ=−0.121), ITER_06/07 (Haybittle) |
| **Fut-only** | *(not representable in GADAR — efficacy family is always present; only `boundary.0.efficacyCheck=uncheck` can suppress look-0 efficacy)* | non-`None` | — | — | ITER_24 unchecks look-0 efficacy while running HR futility |
| **Both** | non-`None` | non-`None` | everything from Eff-only **plus** `futSpendFunc`(2630)/`futParam`(2670)/`futParamRho`(2650), `futBoundaryType`(2660), and one of {`cumBetaSpent`(3000/3040) \| `futilityHR`(2870/2872/2874) \| `futilityPValue`(2830) \| `computeCP`+`futilityCP`}, `boundary.1.futilityCheck` | the futility columns you did *not* choose | ITER_01 (SF eff + HR futility), ITER_03 (SF/SF), ITER_04 (Gamma/Rho, Binding), ITER_05 (Wang-Tsiatis/Pampallona), ITER_24/25/26 (eff + HR futility) |
| **Fixed** | `N/A` | `N/A` | *nothing boundary-related* | **all** `boundary.*`, `effSpendFunc`/`effParam*`, `futBoundaryFam`/`fut*`, `boundaryScale`, `computeCP`, `fix`, `shapeParamDelta*` | **ITER_30 — the ONLY `Run=TRUE` row.** The three Calculate gates fire (skip) here. This branch is *not* dead code. |

### Per-look and reroute SkipIfs (exact)

```
Add-Interim gated on the NEXT look's spacing being present:
  2730: click btn_Add_Interim   SkipIf ${data.design.boundary.1.analysisSpacingInfo}==N/A
  2740: click btn_Add_Interim   SkipIf ${data.design.boundary.2.analysisSpacingInfo}==N/A
  2900: click btn_Add_Interim   SkipIf ${data.design.boundary.3.analysisSpacingInfo}==N/A

Per-look futility HR (2870 has NO SkipIf; 2872/2874 do):
  2872: fill txt_boundary_1_futility_HR   SkipIf ${data.design.boundary.1.futilityHR}==N/A
  2874: fill txt_boundary_2_futility_HR   SkipIf ${data.design.boundary.2.futilityHR}==N/A

Check/uncheck pairs (exactly one fires; value must be literally check/uncheck):
  2950: check   chk_boundary_0_efficacy_Check  SkipIf ${data.design.boundary.0.efficacyCheck}!=check
  2960: uncheck chk_boundary_0_efficacy_Check  SkipIf ${data.design.boundary.0.efficacyCheck}!=uncheck
  2910: check   chk_boundary_1_futility_Check  SkipIf ${data.design.boundary.1.futilityCheck}!=check
  2920: uncheck chk_boundary_1_futility_Check  SkipIf ${data.design.boundary.1.futilityCheck}!=uncheck

Wang-Tsiatis reroute (the ONLY family with a reroute):
  2600: fill txt_eff_Param_Rho      SkipIf ${data.design.effBoundaryFam}==Wang-Tsiatis
  2605: fill txt_shape_Param_Delta  SkipIf ${data.design.effBoundaryFam}!=Wang-Tsiatis   (reads effParamRho column)
```

### Early-stopping traps to fix on any new feature

- **Untranslated numeric flag:** ITER_27,28,29,31,32,33,34,35 have `effBoundaryFam=1` / `futBoundaryFam=1` (raw Sim flags). A native `<select>` cannot match `1`. Translate to a real family label or `N/A` on import.
- **Gamma/Rho mis-mapping:** `-4` (Gamma, ITER_04) sits in `effParam`, which drives a `<select>` whose options are O'Brien-Fleming/Pocock — selecting `-4` fails; the dedicated `#effParamGamma` stays N/A. Only Wang-Tsiatis has a reroute. Route Gamma → `#effParamGamma`, Rho → `#effParamRho`.
- **`-999998` sentinel:** the GS "box unchecked" sentinel is passed through literally (e.g. ITER_04 `boundary.0.cumAlphaSpent=-999998`, ITER_26 `boundary.0.efficacyPValue=-999998`) and gets **typed into the field**. Convert to `N/A` on import so the step skips.
- **Fragile Calculate selectors:** `btn_Calculate` (row186), `btn_Hypothesis_Select_...` (row310), `btn_Accrual_Info_...` (row311) all resolve to `role=button name "Calculate"` — Playwright strict-mode throws if more than one is visible. Pin each to a stable id/scope.
- **Truncation:** `cumAlphaSpent` wired for looks 0–2 but `cumBetaSpent` only 0–1; StepID 2900 adds a 4th interim with no `boundary.3.analysisSpacingInfo` fill. 5–6-look designs lose data.

---

## 5b. Conditional-layout & flow-order patterns (learned on ITER_30, verified 6/6)

The layout of a section — and even which DOM ids exist — can change with the **Test Type** or an **Input Method** dropdown. A step wired for one layout silently fails on another. Three concrete patterns, all now live in GADAR ITER_30 (a 2-Sided Asymmetric group-sequential design):

### Test-type-conditional ids — `#asym*` for 2-Sided (Asymmetric)

The Efficacy Boundary Family dropdown is **`#effBoundaryFam` for 1-Sided / symmetric** but **`#asymEffBoundaryFam` for `Test Type = 2-Sided (Asymmetric)`** — a different element, so the symmetric selector resolves 0 and the step dies with "unable to resolve". Asymmetric designs also render **separate Upper / Lower efficacy boundaries** instead of the single `effSpendFunc`.

Wire both layouts with **two steps gated on `Test Type`**, each pointing at its own id, reading the *same* `effBoundaryFam` column:
```
2570  select ddl_eff_Boundary_Fam      <- effBoundaryFam   SkipIf ${data.design.Test Type}==2-Sided (Asymmetric)
2571  select ddl_asym_eff_Boundary_Fam <- effBoundaryFam   SkipIf ${data.design.Test Type}!=2-Sided (Asymmetric)
```
Upper/Lower spending functions are **value-driven** (only asymmetric rows populate them, so symmetric rows skip):
```
upperSpendFunc -> #upperSpendFunc ; upperParamGamma -> #upperParamGamma ; upperParamRho -> #upperParamRho ; upperParam -> #upperParam
lowerSpendFunc -> #lowerSpendFunc ; lowerParamGamma -> #lowerParamGamma ; lowerParamRho -> #lowerParamRho ; lowerParam -> #lowerParam
```
ITER_30: `upperSpendFunc=Gamma Family`→`upperParamGamma=-5.55`; `lowerSpendFunc=Rho Family`→`lowerParamRho=5.56` (the off-family param columns stay N/A). **Recover an unknown `#asym*`/`#upper*` id from the run's `trace.zip`** — `grep -rohE '"id":"[^"]*(Boundary|Spend|upper|lower)[^"]*"'` — you cannot see it until the section renders.

### Input-method-conditional tables — the Piecewise Dropout section

`Input Method` (`#piecewiseInputMethod`, values `1=None 2=Hazard Rates 3=Probability of Dropout`) decides which dropout table columns exist. Make it **data-driven** (`select ddl_dropout_Input_Method <- ${data.design.piecewiseInputMethod}`) and wire **both** table shapes value-driven, one row per period:
- Hazard Rates: `dropoutTable.i.dropoutHazardRateControl/Treatment` (+ its own Add-Period gated on the *next* period's control column).
- Probability of Dropout: `dropoutTable.i.dropoutByTime` / `probOfdropoutControl` / `probOfdropoutTreatment` (+ its own Add-Period gated on `dropoutTable.1.probOfdropoutControl==N/A`).

Only the method the row selects has non-N/A cells, so the other table's fills (and its Add-Period) skip. **Watch the `Add-Period` gate:** a hazard-only gate (`dropoutTable.1.dropoutHazardRateControl==N/A`) never fires for a prob-of-dropout row — each table needs its **own** Add-Period gated on its own period-1 column.

### Flow order — a committed/input field must precede its Calculate

The app **disables Calculate until its required input is filled**, and the required input flips with a dropdown:
- **Enrollment**: `Input Parameters` = `Duration` needs `committedDuration`; `= Subjects` needs `committedSubjects`. The recording filled `committedDuration` before Calculate but `committedSubjects` *after* → for a Subjects design Calculate stayed disabled ("Committed (Subjects) is required"). Fix: fill **both** committed columns (one is N/A and skips) **before** the Calculate. Likewise the **accrual periods** (Add-Period + start-time + rate for every period) must be filled **before** the `Input Parameters` dropdown. **Add-Period quirk — enrollment inserts at the TOP:** in the Enrollment table *only*, clicking *Add Period* prepends the new blank row and shifts the existing rows **down** (the final 100%-accrued row stays last) — unlike every other period table, which appends at the **bottom**. So `enrollmentTable` Add-Period gating and per-period fill ordering must target the **top** row, not a bottom-append. *(Runtime special-casing is pending a GADSD recording — author/gate around it for now.)*
- **Early stopping**: select **Boundary Scale before** the first boundary Calculate — the recording had Calculate first.

General rule: **whenever a dropdown chooses which field is required, fill the required field (all value-driven variants) before the Calculate/commit that consumes it.** Verify by screenshot — a red "X is required" under a greyed Calculate is this bug.

---

## 6. Sourceable vs must-author

Know before you start where each value comes from. The three API files are `testdata_GADAR_GS.csv`, `testdata_GADAR_Sim - Copy.csv`, and `design_optimized.csv` (all under `ProductDesign/feature_GADAR(PD)/_api_source/`).

**Sourceable (import, don't invent):**

- **SP + SS hazard-rate effect, both sides** — GS carries `hazardRateControl`, `hazardRateTrmt_Alt_SPSS`, `hazardRateTrmt_Null_SS`, plus scalar `hazardRatio_Alt_SP`/`_Null_SS` and `logHazardRatio_Alt_SP`/`_Null_SS`.
- **Group-sequential early stopping** — fully covered by GS: `effBoundaryFam`, `boundary_efficacy_function` (Lan-DeMets/Gamma/Rho/Interpolated), `boundary_efficacy_parameter`, `futBoundaryFam`, `boundary_futility_boundaryType`, `boundary_interimSpacing`, `boundary_efficacy_fix`.
- **Rich priors with NUMBERS** — **only** from `testdata_GADAR_Sim - Copy.csv`: populated `percLambdaC*`, `a`, `b`, `sdMT/eMT/sdMC/eMC` across Normal/Log Normal/Beta/Uniform and all four input methods. GS has the prior *methods* but every numeric prior column is blank.
- **Framework-shaped skeleton** — `design_optimized.csv` gives 14 ready-mapped iterations already using design.csv column names and framework prior labels (`Log Hazard Ratio (δ)`, `λc`, `E(δ) and SD(δ)`), including one Super Superiority (ITER_07) and one Non-inferiority (ITER_10).

**Must author / fabricate (no source exists):**

- **Every Non-inferiority effect-size value.** The `_NI` treatment cells the framework fills — `inputMethodTable.0.hazardRateTrmt_Null_NI`/`_Alt_NI` (StepID 1030/1040), `medianSurvivalTimeTrmt_Null_NI`/`_Alt_NI` (1100/1110), `cumPercSurvivalTrmt_Null_NI`/`_Alt_NI` (1180/1190) — **do not exist as headers in GS or Sim** (both expose only `_Alt_SPSS`/`_Null_SS`). NI ratio-of-%-survival is likewise unsourced.
- **The missing Null/Alt corners.** GS scalar HR exists only as `hazardRatio_Alt_SP` and `hazardRatio_Null_SS`. There is **no** `hazardRatio_Alt_SS`, **no** `hazardRatio_Null_SP`, and **no** NI-suffixed scalar HR/logHR/ratioOfMedians anywhere. A single GS row gives (Alt SP + Null SS) but never Alt_SS or Null_SP together.
- **`ratioOfMedians` at all** — no raw-API column exists in GS or Sim; hand-authored.
- **Prior numbers for GS-derived rows** — GS priors are method-only; pull numbers from Sim rows (different hypothesis context) or author them.
- **Any prior × specific hypothesis × Null/Alt × eff/fut cell** — no source pairs a prior with a hypothesis corner; this is a cross-join authoring task.
- **Label translation on import** — `OF`→`O'Brien-Fleming`, `HRBoundary`→`HR`, `ParamC`→`λc`, `Percentiles of Param`→`E(δ) and SD(δ)` etc. The `<select>` matches visible text, so on-screen option text must match exactly.

> **Out of scope — do NOT source into PD:** the entire `simInp_*` block in the Sim file (`simInp_testStatistic`, `simInp_numberOfEvents`, seeds, `simInp_accrual*`, `simInp_hazardRate*`) belongs to the East Horizon **simulation** module, not the GADAR(PD) group-sequential design.

---

## 7. Copy-paste checklist — adding ONE new field end-to-end

Work through these seven steps for each new field. Example uses a new hazard-ratio Alt field.

**1. Add the design.csv column.** Use the split, suffix-free naming convention.

```csv
# header
...,hazardRatio_Alt,...
# a Superiority data row
...,0.5,...
```

**2. Add the selector — prefix form (never pin unless the field is single-hypothesis).**

```csv
# selectors.csv
txt_Hazard_Ratio_Alternative,css,[id^="hazardRatio_Alt_"]
```

**3. Add the metadata step — with the right SkipIf (or none if it must always run when valued).**

```
StepID 500: fill txt_Hazard_Ratio_Alternative <- ${data.design.hazardRatio_Alt}
            (no SkipIf: value-driven — a real value fires, N/A skips)
```

For a look-indexed or reroute field, add the explicit SkipIf, e.g.
`SkipIf ${data.design.boundary.1.futilityHR}==N/A` or `SkipIf ${data.design.effBoundaryFam}==Wang-Tsiatis`.

**4. Set per-iteration `N/A` everywhere the field is inapplicable.** This is mandatory, not cosmetic — a blank/`N/A`/`Computed` cell is the *only* thing that stops the step firing against a non-rendered element. For each iteration, decide: does this field's hypothesis/prior-family/boundary-case apply? If not → `N/A`. Cross-check against the Section 4 fill-vs-N/A table (priors) and Section 5 matrix (early stopping). Convert any raw `-999998` sentinels and untranslated `1` flags to `N/A`.

**5. Read-back verify.** Re-run the iteration and confirm the value actually landed in the DOM (the framework's assertValue/read-back step), not just that the fill step didn't error. Watch specifically for last-write-wins collisions (dual columns like `E`/`SD` vs `input name eHR`/`sdHR`) and for prefix selectors resolving to the wrong suffix.

**6. Screenshot.** Capture the rendered field with its value for the run, per the standard verification flow (see the `import-feature` skill).

**7. Baseline.** Only after read-back + screenshot pass, commit the new/updated baseline for the affected iteration(s).

> **Iteration-selection reminder:** only rows with `Run=TRUE` (project.csv) actually execute — in GADAR today that is **ITER_30 alone**. A field can look "safe" purely because every row that would exercise it is `Run=FALSE`. When you add a field, add or flip a `Run=TRUE` iteration that genuinely exercises it, or you have tested nothing.