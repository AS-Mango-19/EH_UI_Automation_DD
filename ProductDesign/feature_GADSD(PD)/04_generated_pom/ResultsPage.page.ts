// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 8498261c9b29b6d6c1545bbc7cc2b14f93857e80e9d2e7e653e82e555e5a59dc)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** dropdown (opener+option collapsed into one select step) */
  ddl_react_select_input_container(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_react_select_input_container', { dynamicArgs });
  }

  /** button from codegen */
  btn_Continue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Continue', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Hypothesis', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Computed_Parameters(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Computed_Parameters', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Number_of_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Number_of_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Type', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_testtype(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_testtype', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Upper_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Upper_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Lower_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Lower_Type_1_Error', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Trmt_Alt_SPSS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_median_Survival_Time_Trmt_Alt_SPSS', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_hazard_Ratio_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_hazard_Ratio_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Ratio_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Ratio_Alternative', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Medians_Alt_SP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Medians_Alt_SP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Trmt_Alt_SPSS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_hazard_Rate_Trmt_Alt_SPSS', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Period', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_1_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_1_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_log_Hazard_Ratio_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_log_Hazard_Ratio_Null_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_log_Hazard_Ratio_Alt_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_log_Hazard_Ratio_Alt_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_hazard_Ratio_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_hazard_Ratio_Null_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_hazard_Ratio_Alt_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_hazard_Ratio_Alt_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Perc_Surv_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Perc_Surv_Null_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Perc_Surv_Alt_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Perc_Surv_Alt_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_hazard_Ratio_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_hazard_Ratio_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_hazard_Ratio_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_hazard_Ratio_Alt_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Perc_Surv_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Perc_Surv_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Perc_Surv_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Perc_Surv_Alt_NI', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Medians_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Medians_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Medians_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Medians_Alt_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Trmt_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_hazard_Rate_Trmt_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Trmt_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_hazard_Rate_Trmt_Alt_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_3_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_3_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_3_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_3_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_1_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_1_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Variance_of_Log_Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Variance_of_Log_Hazard_Ratio', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_follow_Up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_follow_Up_Time', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_piecewise_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_piecewise_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_dropout_Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_Hazard_Rate_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_dropout_Hazard_Rate_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_dropout_Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_dropout_Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_Hazard_Rate_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_dropout_Hazard_Rate_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_dropout_By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_prob_Ofdropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_prob_Ofdropout_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_0_prob_Ofdropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_prob_Ofdropout_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_dropout_By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_prob_Ofdropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_prob_Ofdropout_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_1_prob_Ofdropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_prob_Ofdropout_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_2_dropout_By_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_prob_Ofdropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_2_prob_Ofdropout_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dropout_Table_2_prob_Ofdropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_2_prob_Ofdropout_Treatment', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_include_Assurance(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_include_Assurance', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_prior_Distribution_For(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_prior_Distribution_For', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_distribution_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_HR', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_assurance_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_assurance_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_HR1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_HR1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_HR1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_HR1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_HR1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_HR1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_HR2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_HR2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_HR2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_HR2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_HR2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_HR2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_e_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_e_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_sd_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_sd_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_Delta', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Delta1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Delta1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Delta2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Delta2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Delta2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Delta2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_e_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_e_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sd_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sd_Delta', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_SC1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_SC1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SC1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SC1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SC1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SC1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_SC2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_SC2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SC2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SC2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SC2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SC2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sc_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sc_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sc_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sc_b', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_SCHR1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_SCHR1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SCHR1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SCHR1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SCHR1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SCHR1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_SCHR2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_SCHR2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SCHR2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SCHR2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_SCHR2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_SCHR2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_STHR1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_STHR1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_STHR1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_STHR1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_STHR1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_STHR1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_STHR2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_STHR2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_STHR2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_STHR2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_STHR2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_STHR2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_ST1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_ST1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_ST1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_ST1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_ST1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_ST1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_ST2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_ST2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_ST2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_ST2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_ST2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_ST2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_st_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_st_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_st_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_st_b', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_Lambda_C(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_Lambda_C', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Lambda_C(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_Lambda_C', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lambda_c_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_c_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lambda_c_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_c_b', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_C1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_C1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_C1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_C1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_C1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_C1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_C2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_C2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_C2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_C2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_C2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_C2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_CHR1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_CHR1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_CHR1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_CHR1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_CHR1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_CHR1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_CHR2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_CHR2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_CHR2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_CHR2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_CHR2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_CHR2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_min_Lambda_T(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_Lambda_T', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Lambda_T(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_Lambda_T', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lambda_t_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_t_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lambda_t_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_t_b', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_T1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_T1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_T1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_T1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_T1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_T1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_T2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_T2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_T2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_T2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_T2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_T2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_THR1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_THR1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_THR1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_THR1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_THR1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_THR1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_Lambda_THR2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_Lambda_THR2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_THR2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_THR2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_Lambda_THR2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_Lambda_THR2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_e_MC(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_e_MC', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_sd_MC(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_sd_MC', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MC1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MC1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MC1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MC1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MC1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MC1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MC2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MC2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MC2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MC2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MC2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MC2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MCHR1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MCHR1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MCHR1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MCHR1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MCHR1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MCHR1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MCHR2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MCHR2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MCHR2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MCHR2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MCHR2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MCHR2nd_Percentile_Prob', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_e_MT(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_e_MT', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_sd_MT(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_sd_MT', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MT1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MT1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MT1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MT1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MT1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MT1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MT2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MT2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MT2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MT2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MT2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MT2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MTHR1st_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MTHR1st_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MTHR1st_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MTHR1st_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MTHR1st_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MTHR1st_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_perc_MTHR2nd_Operator(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_perc_MTHR2nd_Operator', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MTHR2nd_Percentile_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MTHR2nd_Percentile_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_perc_MTHR2nd_Percentile_Prob(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_perc_MTHR2nd_Percentile_Prob', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_eff_Boundary_Fam', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_eff_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_eff_Spend_Func', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_eff_Param_Rho', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_eff_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_eff_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_eff_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Boundary_Fam', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Spend_Func', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Rho', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Boundary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Boundary', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fix(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fix', { dynamicArgs });
  }

  /** efficacy Delta shape param: #shapeParamDeltaOne when both boundaries are Delta-family, else #shapeParamDelta */
  txt_shape_Param_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta_Two(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_Two', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_compute_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_compute_CP', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_boundary_Scale(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_boundary_Scale', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_HR', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_col_md_12_card_table_tbody_tr_nth_child_2_td_nth_child_5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_col_md_12_card_table_tbody_tr_nth_child_2_td_nth_child_5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_HR', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_0_efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_0_efficacy_Check', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_1_futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_1_futility_Check', { dynamicArgs });
  }

  /** button from codegen */
  btn_Calculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Calculate', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_accrual_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_accrual_Duration', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_study_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_study_Duration', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_0_cum_Perc_Accrued(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_0_cum_Perc_Accrued', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_1_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_cum_Perc_Accrued(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_1_cum_Perc_Accrued', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save_Compute', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** result link from codegen */
  lnk_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lnk_ResultName', { dynamicArgs });
  }

  /** Run status cell. VERIFY col-id against your app and adjust */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_RunStatus', { dynamicArgs });
  }

  /** period-2 fill (recording captured only 0-1; testdata needs 3) */
  txt_input_Method_Table_2_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_by_Time', { dynamicArgs });
  }

  /** period-2 fill */
  txt_input_Method_Table_2_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_0_futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_0_futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_CP', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_1_efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_1_efficacy_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_HR', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_2_efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_2_efficacy_Check', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_2_futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_2_futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_futility_HR', { dynamicArgs });
  }

  /** native <select> (asymmetric efficacy boundary family) */
  ddl_asym_Eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_asym_Eff_Boundary_Fam', { dynamicArgs });
  }

  /** native <select> (upper efficacy spending function) */
  ddl_upper_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Spend_Func', { dynamicArgs });
  }

  /** native <select> (lower efficacy spending function) */
  ddl_lower_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Spend_Func', { dynamicArgs });
  }

  /** upper efficacy Gamma parameter */
  txt_upper_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Gamma', { dynamicArgs });
  }

  /** upper efficacy Rho parameter */
  txt_upper_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Rho', { dynamicArgs });
  }

  /** lower efficacy Gamma parameter */
  txt_lower_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Gamma', { dynamicArgs });
  }

  /** lower efficacy Rho parameter */
  txt_lower_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Rho', { dynamicArgs });
  }

  /** PARAMETRIC boundary analysisSpacingInfo; {0}=period index (loopPeriods) */
  txt_boundary_analysisSpacingInfo(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_analysisSpacingInfo', { dynamicArgs });
  }
}
