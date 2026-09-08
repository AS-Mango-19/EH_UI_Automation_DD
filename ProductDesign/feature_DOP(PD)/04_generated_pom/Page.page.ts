// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 275dc57bd9038b4ca5d2b502bdc37c2a78ee438b6eea51a0542f5f7051d45114)
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
  txt_Super_Superiority_Margin_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Super_Superiority_Margin_0', { dynamicArgs });
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

  /** textbox from codegen */
  txt_boundary_Sim_2_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent', { dynamicArgs });
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
  txt_boundary_Sim_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_PValue', { dynamicArgs });
  }

  /** button from codegen */
  btn_Recalculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Recalculate', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Adaptation_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Adaptation_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Adapt_At(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Adapt_At', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_adapt_At_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_adapt_At_Input', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Interim_Analysis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Interim_Analysis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Upper_Limit_on_Study_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Upper_Limit_on_Study_Duration', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Enrollment_Rate_After(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Enrollment_Rate_After', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Multiplier_for_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Multiplier_for_Enrollment', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_enroll_Rate_After_Adapt(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_enroll_Rate_After_Adapt', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Enrollment_Rate_After(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Fixed_Enrollment_Rate_After', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Reference_c_for_CP_Chart(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Reference_c_for_CP_Chart', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Reference_t_for_CP_Chart(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Reference_t_for_CP_Chart', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Scale(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Scale', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Min_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Min_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Max_Test_Statistic', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_scale(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_scale', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_Cp(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_min_Cp', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Cp(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_max_Cp', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_min_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_max_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_CP_for_Re_Estimating(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Target_CP_for_Re_Estimating', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_CP_Computation_Based_On(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_CP_Computation_Based_On', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Multiplier(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Multiplier', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Difference_in_Proportions(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Difference_in_Proportions', { dynamicArgs });
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

  /** textbox from codegen */
  txt_enrollment_Table_0_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_0_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_1_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_2_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_2_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_1_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_2_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_2_avg_Subjects_Enrolled', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Use_Wald_Stat_if_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Use_Wald_Stat_if_CP', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }

  /** textbox (period 0) - table-completeness fill */
  txt_boundary_Sim_0_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_Z', { dynamicArgs });
  }

  /** textbox (period 1) - table-completeness fill */
  txt_boundary_Sim_1_efficacy_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_ZUpper', { dynamicArgs });
  }

  /** textbox (period 1) - table-completeness fill */
  txt_boundary_Sim_1_futility_ZUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_ZUpper', { dynamicArgs });
  }

  /** textbox (period 1) - table-completeness fill */
  txt_boundary_Sim_1_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox (period 1) - table-completeness fill */
  txt_boundary_Sim_1_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_Z', { dynamicArgs });
  }

  /** enrollment Include switch (reveals accrual table) */
  chk_include_Switch(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_include_Switch', { dynamicArgs });
  }
}
