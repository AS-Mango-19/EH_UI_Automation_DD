// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 4a18d908c866cca0bb9604443fd73b047da8dddaf40bcce28cc6e6a63021567a)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class Page {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Sim Enrollment tab: Include toggle - ON reveals the accrual table */
  chk_Include(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_Include', { dynamicArgs });
  }

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

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Randomization_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Randomization_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_randomization_Method_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_randomization_Method_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Critical_Point', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Noninferiority_Margin_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Noninferiority_Margin_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_super_Superiority_Margin(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_super_Superiority_Margin', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_upper_Critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_upper_Critical_Point', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** table-completeness: mirrors period 0/1 id pattern for period 2 */
  txt_boundary_Sim_2_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_analysis_Spacing_Info', { dynamicArgs });
  }

  /** table-completeness: mirrors period 0 id pattern for period 1 */
  txt_boundary_Sim_1_efficacy_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_ZUpper', { dynamicArgs });
  }

  /** table-completeness: mirrors period 0 id pattern for period 1 */
  txt_boundary_Sim_1_futility_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_ZUpper', { dynamicArgs });
  }

  /** table-completeness: mirrors period 0 name pattern for period 1 */
  txt_boundary_Sim_1_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent_Upper', { dynamicArgs });
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

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_1_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_Z', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Z', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_Z', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_PValue', { dynamicArgs });
  }

  /** button from codegen */
  btn_Recalculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Recalculate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_distribution_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Proportion_Under_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Proportion_Under_Control_c', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Proportion_Under_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'obj_Proportion_Under_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Odds_Ratio_of_Proportions_t_1_c_c_1_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Odds_Ratio_of_Proportions_t_1_c_c_1_t', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Month(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Follow_up_Time_Month', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Dropout_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Dropout_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_dropout_Distribution_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_dropout_Distribution_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_of_Dropout(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Probability_of_Dropout', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Enrollment', { dynamicArgs });
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

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }
}
