// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 0a0a8357ad3f413e8040cba659fe331ce4d561f12e086fc72c77d7250ceab670)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** button from codegen */
  btn_Design_Compute_or_simulate_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Design_Compute_or_simulate_a', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Number_of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Number_of_Events', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Starting_At_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Starting_At_Time_Week', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Test_Type', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Input_Method', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Log_Hazard_Ratio_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Log_Hazard_Ratio_Null', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Hazard_Ratio_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Hazard_Ratio_Null', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Hazard_Ratio_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Hazard_Ratio_Alternative', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Cumulative_Survival_Treatment_Null_st0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Cumulative_Survival_Treatment_Null_st0', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Ratio_of_Medians_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Ratio_of_Medians_Null', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Median_Survival_Time_Treatment_Alternative_mt_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Median_Survival_Time_Treatment_Alternative_mt_Week', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Ratio_of_Medians_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Ratio_of_Medians_Alternative', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Ratio_of_Survivals_at_Period_1_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Ratio_of_Survivals_at_Period_1_Null', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Ratio_of_Survivals_at_Period_1_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Ratio_of_Survivals_at_Period_1_Alternative', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Simulate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Simulate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** Enrollment table render wait selector */
  txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollment_Table_0_avg_Subjects_Enrolled_DesignPage', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_time_Lag_For_Cohort(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_time_Lag_For_Cohort', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Subpopulation_Prevalence(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Subpopulation_Prevalence', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_left_Panel_designs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_left_Panel_designs', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Rejection_Region(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Rejection_Region', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_initial_Sample_Size_Table_0_sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_initial_Sample_Size_Table_0_sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_initial_Sample_Size_Table_0_total_Number_Of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_initial_Sample_Size_Table_0_total_Number_Of_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_initial_Sample_Size_Table_0_number_Of_Events_At_IA(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_initial_Sample_Size_Table_0_number_Of_Events_At_IA', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_initial_Sample_Size_Table_1_sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_initial_Sample_Size_Table_1_sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_initial_Sample_Size_Table_1_total_Number_Of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_initial_Sample_Size_Table_1_total_Number_Of_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Total(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Total', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Cohort(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Cohort', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Events_Total(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_max_Events_Total', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Events_Cohort2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_max_Events_Cohort2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Lower_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Lower_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Upper_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Upper_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_CP_for_Re_Estimating_Number_of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_CP_for_Re_Estimating_Number_of_Events', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Enrollment_Rate_After_Adaptation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Enrollment_Rate_After_Adaptation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Enrollment_Rate_after(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Fixed_Enrollment_Rate_after', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_SSTotal_Enrich(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_max_SSTotal_Enrich', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_SSCohort2Enrich(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_max_SSCohort2Enrich', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Events_Total_Enrich(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_max_Events_Total_Enrich', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrich_If_CPFAnd_CPS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrich_If_CPFAnd_CPS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_terminate_For_Futility(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_terminate_For_Futility', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Charts_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Charts_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_CP_for_Re_Estimating_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_CP_for_Re_Estimating_Events', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Enrollment_Rate_After_Enrichment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Enrollment_Rate_After_Enrichment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Enrollment_Rate_after_Enrichment_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Fixed_Enrollment_Rate_after_Enrichment_Week', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Response', { dynamicArgs });
  }

  /** Response table period-row control */
  btn_Add_Piece(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Piece', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_0_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_0_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_1_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_1_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_1_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_1_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_1_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_1_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_2_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_2_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_2_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_2_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_1_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_1_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_2_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_2_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_0_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_0_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Population_Table_0_median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_0_median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_0_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_0_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_0_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_0_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_1_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_1_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_1_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_1_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_1_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_1_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_complement_Table_0_median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_0_median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox period 1 */
  txt_complement_Table_1_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_1_by_Time', { dynamicArgs });
  }

  /** textbox period 1 */
  txt_complement_Table_1_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_1_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox period 2 */
  txt_complement_Table_2_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_2_starting_At_Time', { dynamicArgs });
  }

  /** textbox period 2 */
  txt_complement_Table_2_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_2_by_Time', { dynamicArgs });
  }

  /** textbox period 2 */
  txt_complement_Table_2_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_2_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox period 2 */
  txt_complement_Table_2_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_2_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox period 2 */
  txt_complement_Table_2_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_2_hazard_Ratio', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_complement_Table_3_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_3_starting_At_Time', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_complement_Table_3_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_3_by_Time', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_complement_Table_3_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_3_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_complement_Table_3_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_3_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_complement_Table_3_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_3_hazard_Ratio', { dynamicArgs });
  }

  /** textbox period 4 */
  txt_complement_Table_4_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_4_by_Time', { dynamicArgs });
  }

  /** textbox period 4 */
  txt_complement_Table_4_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_4_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox period 4 */
  txt_complement_Table_4_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_complement_Table_4_hazard_Ratio', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_sub_Population_Table_3_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_3_by_Time', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_sub_Population_Table_3_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_3_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox period 3 */
  txt_sub_Population_Table_3_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_3_hazard_Ratio', { dynamicArgs });
  }

  /** textbox period 4 */
  txt_sub_Population_Table_4_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_4_by_Time', { dynamicArgs });
  }

  /** textbox period 4 */
  txt_sub_Population_Table_4_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_4_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox period 4 */
  txt_sub_Population_Table_4_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_4_hazard_Ratio', { dynamicArgs });
  }

  /** textbox period 1 */
  txt_sub_Population_Table_1_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_1_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox period 2 */
  txt_sub_Population_Table_2_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_2_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox period 2 */
  txt_sub_Population_Table_2_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Population_Table_2_starting_At_Time', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_dropout_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_dropout_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prob_Ofdropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prob_Ofdropout_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prob_Ofdropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prob_Ofdropout_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Hazard_Rate_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dropout_Hazard_Rate_Treatment', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Period', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_num_Of_Sim_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_input_name_num_Of_Sim_Run', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Random_Number_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Random_Number_Seed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Fixed_Seed', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Summary_Stats(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_save_Summary_Stats', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Subject_Level_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_save_Subject_Level_Data', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Level_Data_Sim_Runs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_sub_Level_Data_Sim_Runs', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }
}
