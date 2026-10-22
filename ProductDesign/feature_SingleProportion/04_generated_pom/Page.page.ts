// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: e0041db97c89753963236e29e611266b4eb1e6309ebf6838859a56eaa04a32ae)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class Page {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_left_Panel_designs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_left_Panel_designs', { dynamicArgs });
  }

  /** hand-added for the Response-tab-early-mount fix (feature_SingleMean/feature_GADAR(PD) precedent) */
  txt_left_Panel_response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_left_Panel_response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Proportion_Response_under(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Proportion_Response_under', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Critical_Point', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Z', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_ZUpper', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_ZLower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_ZLower', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_ZUpper', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_ZLower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_ZLower', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_futility_ZLower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_ZLower', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_Z', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_Pi(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Pi', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_CP', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_analysis_Spacing_Info', { dynamicArgs });
  }

  /** hand-added (period 3) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_3_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_analysis_Spacing_Info', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** hand-added (period 3) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_3_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** hand-added (period 4) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_4_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** hand-added (period 3) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_3_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** hand-added (period 4) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_4_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_PValue', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_PValue', { dynamicArgs });
  }

  /** hand-added (period 3) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_3_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_efficacy_PValue', { dynamicArgs });
  }

  /** hand-added (period 0) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_0_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 3) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_3_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 4) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_4_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 5) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_5_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_5_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 6) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_6_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_6_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 7) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_7_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_7_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** hand-added (period 0) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_0_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 3) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_3_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 4) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_4_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 5) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_5_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_5_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 6) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_6_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_6_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 7) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_7_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_7_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_efficacy_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_ZUpper', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_CP', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_futility_CP', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_PValue', { dynamicArgs });
  }

  /** hand-added (period 1) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_1_futility_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_ZUpper', { dynamicArgs });
  }

  /** hand-added (period 2) - testdata needs it, same id convention as period 0 sibling */
  txt_boundary_Sim_2_futility_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_futility_ZUpper', { dynamicArgs });
  }

  /** button from codegen */
  btn_Recalculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Recalculate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Proportion_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Proportion_Response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_of_Dropout(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Probability_of_Dropout', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Enrollment', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Include(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_Include', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Add_Period', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Random_Number_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Random_Number_Seed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Fixed_Seed', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Summary_Stats(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_save_Summary_Stats', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Subject_Level_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_save_Subject_Level_Data', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Level_Data_Sim_Runs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_sub_Level_Data_Sim_Runs', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Save', { dynamicArgs });
  }

  /** button from codegen */
  btn_Details(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Details', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }
}
