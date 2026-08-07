// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: e2f0d3bfbab2cf83f0382b8e3bf7b59d57ffad4b4d4c5c4cb3caa885c0e9de4b)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: Page,
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

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Type', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Median_Survival_Time_Treatment_Null_mt0_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Median_Survival_Time_Treatment_Null_mt0_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Median_Survival_Time_Treatment_Alternative_mt_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Median_Survival_Time_Treatment_Alternative_mt_Week', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** prefix-match: id suffix is hypothesis-specific (_SP/_SS/_NI); covers all (was #hazardRatio_Null_SS) */
  txt_Hazard_Ratio_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Ratio_Null', { dynamicArgs });
  }

  /** prefix-match: id suffix is hypothesis-specific (_SP/_SS/_NI); covers all (was #hazardRatio_Alt_SS) */
  txt_Hazard_Ratio_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Ratio_Alternative', { dynamicArgs });
  }

  /** prefix-match: id suffix is hypothesis-specific (_SP/_SS/_NI); covers all (was #ratioOfMedians_Null_SS) */
  txt_Ratio_of_Medians_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Medians_Null', { dynamicArgs });
  }

  /** prefix-match: id suffix is hypothesis-specific (_SP/_SS/_NI); covers all (was #ratioOfMedians_Alt_SS) */
  txt_Ratio_of_Medians_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Medians_Alternative', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Rate_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Rate_Control_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_input_Method_Table_0_hazard_Rate_Trmt_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_input_Method_Table_0_hazard_Rate_Trmt_Null_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_input_Method_Table_0_hazard_Rate_Trmt_Alt_SPSS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_input_Method_Table_0_hazard_Rate_Trmt_Alt_SPSS', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Period', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_input_Method_Table_1_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_input_Method_Table_1_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_input_Method_Table_1_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_input_Method_Table_1_hazard_Rate_Control', { dynamicArgs });
  }

  /** prefix-match: id suffix is hypothesis-specific (_SP/_SS/_NI); covers all (was #logHazardRatio_Null_SS) */
  txt_Log_Hazard_Ratio_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Log_Hazard_Ratio_Null', { dynamicArgs });
  }

  /** prefix-match: id suffix is hypothesis-specific (_SP/_SS/_NI); covers all (was #logHazardRatio_Alt_SS) */
  txt_Log_Hazard_Ratio_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Log_Hazard_Ratio_Alternative', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_input_Method_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_input_Method_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_input_Method_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_input_Method_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Rate_Treatment_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Rate_Treatment_Null', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Rate_Treatment_Alternative_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Rate_Treatment_Alternative_t', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Variance_of_Log_Hazard_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Variance_of_Log_Hazard_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_dropout_Table_0_dropout_Hazard_Rate_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_dropout_Table_0_dropout_Hazard_Rate_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_dropout_Table_1_dropout_Starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_dropout_Table_1_dropout_Starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_dropout_Table_1_dropout_Hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_dropout_Table_1_dropout_Hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_dropout_Table_1_dropout_Hazard_Rate_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_dropout_Table_1_dropout_Hazard_Rate_Treatment', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Prior_Distribution_for(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Prior_Distribution_for', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_prior_Distribution_For(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_prior_Distribution_For', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Distribution', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_distribution_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_e_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_e_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_sd_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_sd_HR', { dynamicArgs });
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
  txt_min_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_HR', { dynamicArgs });
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
  txt_min_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_Delta', { dynamicArgs });
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
  txt_sc_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sc_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sc_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sc_b', { dynamicArgs });
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

  /** textbox from codegen */
  txt_st_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_st_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_st_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_st_b', { dynamicArgs });
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

  /** Efficacy Boundary Family — 1-Sided / symmetric */
  ddl_eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_eff_Boundary_Fam', { dynamicArgs });
  }

  /** Efficacy Boundary Family — 2-Sided (Asymmetric) designs */
  ddl_asym_eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_asym_eff_Boundary_Fam', { dynamicArgs });
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

  /** Upper Efficacy Boundary spending function (2-sided asymmetric) */
  ddl_upper_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Spend_Func', { dynamicArgs });
  }

  /** Upper Efficacy Boundary Gamma parameter */
  txt_upper_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Gamma', { dynamicArgs });
  }

  /** Upper Efficacy Boundary Rho parameter */
  txt_upper_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Rho', { dynamicArgs });
  }

  /** Upper Efficacy Boundary Lan-DeMets OF/Pocock parameter */
  ddl_upper_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Param', { dynamicArgs });
  }

  /** Lower Efficacy Boundary spending function (2-sided asymmetric) */
  ddl_lower_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Spend_Func', { dynamicArgs });
  }

  /** Lower Efficacy Boundary Gamma parameter */
  txt_lower_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Gamma', { dynamicArgs });
  }

  /** Lower Efficacy Boundary Rho parameter */
  txt_lower_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Rho', { dynamicArgs });
  }

  /** Lower Efficacy Boundary Lan-DeMets OF/Pocock parameter */
  ddl_lower_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Param', { dynamicArgs });
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
  txt_fut_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Gamma', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Boundary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Boundary', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Rho', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Param', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_boundary_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_boundary_0_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_boundary_0_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_boundary_0_cum_Beta_Spent', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_boundary_Scale(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_boundary_Scale', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_0_efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_0_efficacy_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_1_futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_1_futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_boundary_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_boundary_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_boundary_1_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_boundary_1_cum_Beta_Spent', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fix(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fix', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_0_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_1_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_2_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_2_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_0_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_1_futility_PValue', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_compute_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_compute_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_0_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_1_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_0_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_0_futility_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_boundary_1_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_boundary_1_futility_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta_Two(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_Two', { dynamicArgs });
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
  txt_Enrollment_Rate_per_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Enrollment_Rate_per_Week', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Parameters(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Input_Parameters', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_committed_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_committed_Duration', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_input_Parameter', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_committed_Subjects(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_committed_Subjects', { dynamicArgs });
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

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_median_Survival_Time_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Trmt_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_median_Survival_Time_Trmt_Null_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Trmt_Alt_SPSS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_median_Survival_Time_Trmt_Alt_SPSS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Trmt_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_hazard_Rate_Trmt_Null_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_hazard_Rate_Trmt_Alt_SPSS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_hazard_Rate_Trmt_Alt_SPSS', { dynamicArgs });
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
  txt_input_Method_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_variable', { dynamicArgs });
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

  /** checkbox from codegen */
  chk_include_Assurance(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_include_Assurance', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_0_efficacy_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_0_efficacy_Check', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_boundary_1_futility_Check(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_1_futility_Check', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** Interpolated spend-func: IA3 cumulative alpha (added for multi-interim boundaries) */
  txt_boundary_2_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Beta_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_0_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_0_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_upper_Type1Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Type1Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lower_Type1Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Type1Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_hazard_Rate_Control', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Log_Hazard_Ratio_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Log_Hazard_Ratio_Alternative', { dynamicArgs });
  }

  /** button from codegen */
  btn_Cumulative_Survival_Treatment_Alternative_st(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Cumulative_Survival_Treatment_Alternative_st', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_3_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_3_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_3_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_3_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** id suffix is hypothesis-specific (_SP Superiority / _NI Noninferiority); prefix-match covers both */
  txt_Ratio_of_Survivals_at_Period_1_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Survivals_at_Period_1_Null', { dynamicArgs });
  }

  /** id suffix is hypothesis-specific (_SP Superiority / _NI Noninferiority); prefix-match covers both */
  txt_Ratio_of_Survivals_at_Period_1_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Survivals_at_Period_1_Alternative', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Ratio_of_Medians_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Ratio_of_Medians_Alternative', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_hypothesis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_allocation_Ratio(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_allocation_Ratio', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Alt_SPSS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Alt_SPSS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_1_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_1_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_1_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_hazard_Ratio_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_hazard_Ratio_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Ratio_of_Survivals_at_Period_1_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Ratio_of_Survivals_at_Period_1_Alternative', { dynamicArgs });
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
  txt_input_Method_Table_0_median_Survival_Time_Trmt_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_median_Survival_Time_Trmt_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_median_Survival_Time_Trmt_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_median_Survival_Time_Trmt_Alt_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Alt_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Starting_At_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Starting_At_Time_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Min_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Min_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Max_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_E_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_E_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SD_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SD_HR', { dynamicArgs });
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

  /** textbox from codegen */
  txt_input_name_e_MC(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_e_MC', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_sd_MC(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_sd_MC', { dynamicArgs });
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

  /** textbox from codegen */
  txt_input_name_e_MT(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_e_MT', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_name_sd_MT(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_name_sd_MT', { dynamicArgs });
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

  /** textbox from codegen */
  txt_boundary_2_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta_One(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_One', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_col_md_12_card_table_tbody_tr_nth_child_2_td_nth_child_4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_col_md_12_card_table_tbody_tr_nth_child_2_td_nth_child_4', { dynamicArgs });
  }

  /** button from codegen */
  btn_Hypothesis_Select_Superiority_Super_Superiority_Noninferiority_Power_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Hypothesis_Select_Superiority_Super_Superiority_Noninferiority_Power_Test', { dynamicArgs });
  }

  /** button from codegen */
  btn_Accrual_Info_Period_Starting_At(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Accrual_Info_Period_Starting_At', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_px_4_pb_4_overflow_auto(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_px_4_pb_4_overflow_auto', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_1_starting_At_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_enrollment_Table_1_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_1_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** added: per-analysis futility HR */
  txt_boundary_2_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_HR', { dynamicArgs });
  }

  /** dismiss the info banner covering Calculate */
  btn_Close_Banner(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Close_Banner', { dynamicArgs });
  }

  /** confirm Compute in the Name-your-result dialog (starts the simulation) */
  btn_Compute_Dialog(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Compute_Dialog', { dynamicArgs });
  }

  /** Piecewise Dropout Information input-method dropdown */
  ddl_dropout_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_dropout_Input_Method', { dynamicArgs });
  }

  /** Add Period in the Piecewise Dropout table (2nd Add Period on the page) */
  btn_Dropout_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Dropout_Add_Period', { dynamicArgs });
  }

  /** Probability-of-Dropout period-0 By Time */
  txt_dropout_Table_0_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_dropout_By_Time', { dynamicArgs });
  }

  /** Probability of Dropout (Control) — piecewiseInputMethod=3 */
  txt_dropout_Table_0_prob_Of_Dropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_prob_Of_Dropout_Control', { dynamicArgs });
  }

  /** Probability of Dropout (Treatment) — piecewiseInputMethod=3 */
  txt_dropout_Table_0_prob_Of_Dropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_0_prob_Of_Dropout_Treatment', { dynamicArgs });
  }

  /** Prob-of-Dropout period-2 By Time */
  txt_dropout_Table_1_dropout_By_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_dropout_By_Time', { dynamicArgs });
  }

  /** Prob-of-Dropout period-2 (Control) */
  txt_dropout_Table_1_prob_Of_Dropout_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_prob_Of_Dropout_Control', { dynamicArgs });
  }

  /** Prob-of-Dropout period-2 (Treatment) */
  txt_dropout_Table_1_prob_Of_Dropout_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Table_1_prob_Of_Dropout_Treatment', { dynamicArgs });
  }
}
