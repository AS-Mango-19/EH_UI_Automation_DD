// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: d8dac98343ed4a22c24c3c1d64f2cfac04d4789827057154526391726631f668)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class Page {
  constructor(
    private readonly page: Page,
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
  txt_Sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Sample_Size', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Fix_at_Each_Analysis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Fix_at_Each_Analysis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_study_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_study_Duration', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fix_At_Each_Analysis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_fix_At_Each_Analysis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_number_Of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_number_Of_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Randomization_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Randomization_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_randomization_Method_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_randomization_Method_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_harrington_Flem_P(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_harrington_Flem_P', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_harrington_Flem_Q(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_harrington_Flem_Q', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_test_Statistic', { dynamicArgs });
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
  txt_boundary_Sim_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** sim boundary IA1 Futility HR */
  txt_boundary_Sim_0_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_HR', { dynamicArgs });
  }

  /** sim boundary IA2 Futility HR */
  txt_boundary_Sim_1_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_HR', { dynamicArgs });
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
  ddl_adapt_At_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_adapt_At_Select', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_adapt_At_Number_Of_Interims(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_adapt_At_Number_Of_Interims', { dynamicArgs });
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
  txt_multiplier_Enroll_Rate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_multiplier_Enroll_Rate', { dynamicArgs });
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
  txt_Reference_HR_for_CP_Chart(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Reference_HR_for_CP_Chart', { dynamicArgs });
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
  txt_Min_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Min_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Max_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Min_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Min_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Max_HR', { dynamicArgs });
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

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_0_median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_0_hazard_Ratio', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_0_hazard_Rate_Control', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Add_Period', { dynamicArgs });
  }

  /** Add Period in the Piecewise Dropout table (2nd Add Period on the page) */
  btn_Dropout_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Dropout_Add_Period', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_1_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_1_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_1_hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_1_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_1_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_2_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_2_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_input_Method_Table_2_hazard_Ratio', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_follow_Up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_follow_Up_Time', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Dropout_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Dropout_Distribution', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_0_dropout_By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_prob_Ofdropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_0_prob_Ofdropout_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_prob_Ofdropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_0_prob_Ofdropout_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_1_dropout_By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_prob_Ofdropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_1_prob_Ofdropout_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_prob_Ofdropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_1_prob_Ofdropout_Treatment', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_piecewise_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_piecewise_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_0_dropout_Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Hazard_Rate_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_0_dropout_Hazard_Rate_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_1_dropout_Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_1_dropout_Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Hazard_Rate_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_dropout_Table_1_dropout_Hazard_Rate_Treatment', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Enrollment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Accrual_Duration_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Accrual_Duration_Week', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_accrual_Info_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_accrual_Info_Input_Method', { dynamicArgs });
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
  txt_enrollment_Table_1_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_enrollment_Table_1_avg_Subjects_Enrolled', { dynamicArgs });
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

  /** loading overlay on design/simulation pages */
  div_Spinner(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'div_Spinner', { dynamicArgs });
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
}
