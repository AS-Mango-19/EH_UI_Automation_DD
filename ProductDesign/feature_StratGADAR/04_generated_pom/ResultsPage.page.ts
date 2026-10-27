// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 2fddf7e71cc4e32e1639a86d3fabf7df78b91b450c1851279dbda9e2e627e8ec)
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

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_testtype(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_testtype', { dynamicArgs });
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
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_input_Method', { dynamicArgs });
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

  /** button from codegen */
  btn_Add_Period(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Period', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_2_starting_At_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_starting_At_Time', { dynamicArgs });
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
  txt_input_Method_Table_2_hazard_Rate_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_2_hazard_Rate_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Ratio_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Ratio_Null', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Ratio_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Ratio_Alternative', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Log_Hazard_Ratio_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Log_Hazard_Ratio_Alternative', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Log_Hazard_Ratio_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Log_Hazard_Ratio_Null', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_log_Hazard_Ratio_Alt_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_log_Hazard_Ratio_Alt_SS', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_input_Method_Table_0_cum_Perc_Survival_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Control', { dynamicArgs });
  }

  /** inferred from the sibling Trmt field id pattern (hazardRateTrmt/medianSurvivalTimeTrmt both have _Null_SS; cumPercSurvivalTrmt was missing it) - NOT yet confirmed live, screenshot-verify on first run */
  txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_input_Method_Table_0_cum_Perc_Survival_Trmt_Null_SS', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Ratio_of_Survivals_at_Period_1_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Survivals_at_Period_1_Null', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Ratio_of_Survivals_at_Period_1_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Survivals_at_Period_1_Alternative', { dynamicArgs });
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

  /** native <select> from codegen */
  ddl_Ratio_of_Medians_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Ratio_of_Medians_Alternative', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Ratio_of_Medians_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Medians_Null', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Medians_Alt_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Medians_Alt_SS', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_hypothesis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_hazard_Ratio_Alt_SP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_hazard_Ratio_Alt_SP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_log_Hazard_Ratio_Alt_SP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_log_Hazard_Ratio_Alt_SP', { dynamicArgs });
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

  /** textbox from codegen */
  txt_ratio_Of_Perc_Surv_Alt_SP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Perc_Surv_Alt_SP', { dynamicArgs });
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
  txt_ratio_Of_Medians_Alt_SP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Medians_Alt_SP', { dynamicArgs });
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
  txt_hazard_Ratio_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_hazard_Ratio_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_hazard_Ratio_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_hazard_Ratio_Alt_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_log_Hazard_Ratio_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_log_Hazard_Ratio_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_log_Hazard_Ratio_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_log_Hazard_Ratio_Alt_NI', { dynamicArgs });
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
  txt_ratio_Of_Medians_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Medians_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Medians_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Medians_Alt_NI', { dynamicArgs });
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
  txt_ratio_Of_Perc_Surv_Null_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Perc_Surv_Null_NI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ratio_Of_Perc_Surv_Alt_NI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ratio_Of_Perc_Surv_Alt_NI', { dynamicArgs });
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
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** textbox from codegen - CONFIRMED via live dumpTextMatches this "Hazard Rate (Control)" columnheader only actually renders for piecewiseInputMethod=Hazard Rates; misleadingly named after "Starting At Time" which never appears on the live page under this text at all */
  txt_Starting_At_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Starting_At_Time_Week', { dynamicArgs });
  }

  /** dropout table columnheader landmark for piecewiseInputMethod=Probability of Dropout - CONFIRMED via live dumpTextMatches (visible=true); found via ITER_05's timeout on the Hazard-Rates-only landmark above */
  txt_dropout_Prob_Of_Dropout_Control_Header(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropout_Prob_Of_Dropout_Control_Header', { dynamicArgs });
  }

  /** click the Starting At Time (Week) text label to reveal/activate the dropout table's Hazard Rate (Control) column - recording shows this click always precedes the columnheader click (getByText then getByRole columnheader); some iterations (e.g. ITER_02) never render the columnheader without it first */
  lbl_Starting_At_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_Starting_At_Time_Week', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_include_Assurance(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_include_Assurance', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Prior_Distribution_for(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Prior_Distribution_for', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Distribution(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Distribution', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Min_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Min_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Max_HR', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_distribution_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_distribution_Method', { dynamicArgs });
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
  txt_E_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_E_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SD_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SD_HR', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_prior_Distribution_For(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_prior_Distribution_For', { dynamicArgs });
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

  /** textbox from codegen */
  txt_min_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_HR', { dynamicArgs });
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
  txt_min_Lambda_C(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_Lambda_C', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Lambda_C(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_Lambda_C', { dynamicArgs });
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

  /** textbox from codegen */
  txt_lambda_c_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_c_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lambda_c_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_c_b', { dynamicArgs });
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

  /** textbox from codegen */
  txt_lambda_t_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_t_a', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lambda_t_b(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lambda_t_b', { dynamicArgs });
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
  txt_min_Lambda_T(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_min_Lambda_T', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_max_Lambda_T(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_max_Lambda_T', { dynamicArgs });
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

  /** native <select> from codegen */
  ddl_eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_eff_Boundary_Fam', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric Efficacy Boundary Family select, enabled when Test Type=2-Sided (Asymmetric) and disables the symmetric effBoundaryFam; DOM id guessed by this app's consistent id===testdata-column-name convention, screenshot-verify */
  ddl_asym_Eff_Boundary_Fam(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_asym_Eff_Boundary_Fam', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric upper-boundary Spend Function select, mirrors the symmetric #effSpendFunc; id===testdata-column-name convention, screenshot-verify */
  ddl_upper_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Spend_Func', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric upper-boundary Param select, mirrors the symmetric #effParam; id===testdata-column-name convention, screenshot-verify */
  ddl_upper_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Param', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric upper-boundary Param Gamma textbox, mirrors the symmetric #effParamGamma; id===testdata-column-name convention, screenshot-verify */
  txt_upper_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Gamma', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric upper-boundary Param Rho textbox, mirrors the symmetric #effParamRho; id===testdata-column-name convention, screenshot-verify */
  txt_upper_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_upper_Param_Rho', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric upper-boundary Fix select, mirrors the shared #fix; id===testdata-column-name convention, screenshot-verify */
  ddl_upper_Fix(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_upper_Fix', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric lower-boundary Spend Function select, mirrors the symmetric #effSpendFunc; id===testdata-column-name convention, screenshot-verify */
  ddl_lower_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Spend_Func', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric lower-boundary Param select, mirrors the symmetric #effParam; id===testdata-column-name convention, screenshot-verify */
  ddl_lower_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_lower_Param', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric lower-boundary Param Gamma textbox, mirrors the symmetric #effParamGamma; id===testdata-column-name convention, screenshot-verify */
  txt_lower_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Gamma', { dynamicArgs });
  }

  /** UNVERIFIED - asymmetric lower-boundary Param Rho textbox, mirrors the symmetric #effParamRho; id===testdata-column-name convention, screenshot-verify */
  txt_lower_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lower_Param_Rho', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_eff_Spend_Func(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_eff_Spend_Func', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_eff_Param_Gamma', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_eff_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_eff_Param_Rho', { dynamicArgs });
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
  txt_fut_Param_Gamma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Gamma', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_fut_Param_Rho(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_fut_Param_Rho', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Boundary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Boundary', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fut_Param(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fut_Param', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_fix(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_fix', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_efficacy_PValue', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_2_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_3_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_efficacy_PValue', { dynamicArgs });
  }

  /** button from codegen */
  btn_Calculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Calculate', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_PValue', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired, matching the efficacyPValue pattern; found live for ITER_04 (Futility p-value required error blocked Enrollment navigation) */
  txt_boundary_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_PValue', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired, matching the efficacyPValue pattern */
  txt_boundary_2_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_PValue', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired, matching the efficacyPValue pattern; UNVERIFIED (no iteration currently needs period 3), id-convention guess */
  txt_boundary_3_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_futility_PValue', { dynamicArgs });
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
  txt_boundary_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_CP', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired, matching the efficacyPValue pattern */
  txt_boundary_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_CP', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired, matching the efficacyPValue pattern */
  txt_boundary_2_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_CP', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired; UNVERIFIED (no iteration currently needs period 3), id-convention guess */
  txt_boundary_3_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_0_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_0_futility_HR', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired, matching the efficacyPValue pattern */
  txt_boundary_1_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_futility_HR', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired, matching the efficacyPValue pattern */
  txt_boundary_2_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_futility_HR', { dynamicArgs });
  }

  /** table-completeness gap fix - only period 0 was wired; UNVERIFIED (no iteration currently needs period 3), id-convention guess */
  txt_boundary_3_futility_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_futility_HR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta_One(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_One', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_shape_Param_Delta_Two(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta_Two', { dynamicArgs });
  }

  /** UNVERIFIED - only used by ITER_09; id===testdata-column-name convention, screenshot-verify */
  txt_shape_Param_Delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_shape_Param_Delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_col_md_12_card_table_tbody_tr_nth_child_2_td_nth_child_4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_col_md_12_card_table_tbody_tr_nth_child_2_td_nth_child_4', { dynamicArgs });
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
  txt_boundary_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_1_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_1_cum_Beta_Spent', { dynamicArgs });
  }

  /** table-completeness gap fix - only periods 0-1 were wired, matching the efficacyPValue pattern */
  txt_boundary_2_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Alpha_Spent', { dynamicArgs });
  }

  /** table-completeness gap fix - only periods 0-1 were wired, matching the efficacyPValue pattern */
  txt_boundary_2_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_2_cum_Beta_Spent', { dynamicArgs });
  }

  /** table-completeness gap fix - only periods 0-1 were wired; UNVERIFIED (no iteration currently needs period 3), id-convention guess */
  txt_boundary_3_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_cum_Alpha_Spent', { dynamicArgs });
  }

  /** table-completeness gap fix - only periods 0-1 were wired; UNVERIFIED (no iteration currently needs period 3), id-convention guess */
  txt_boundary_3_cum_Beta_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_3_cum_Beta_Spent', { dynamicArgs });
  }

  /** button from codegen */
  btn_Hypothesis_Select_Superiority_Super_Superiority_Noninferiority_Power_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Hypothesis_Select_Superiority_Super_Superiority_Noninferiority_Power_Test', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_input_Parameter', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_committed_Duration(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_committed_Duration', { dynamicArgs });
  }

  /** button from codegen */
  btn_Accrual_Info_Period_Starting_At(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Accrual_Info_Period_Starting_At', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_committed_Subjects(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_committed_Subjects', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_px_4_pb_4_overflow_auto(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_px_4_pb_4_overflow_auto', { dynamicArgs });
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

  /** PARAMETRIC boundary analysisSpacingInfo; {0}=period index (loopPeriods) */
  txt_boundary_analysisSpacingInfo(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_analysisSpacingInfo', { dynamicArgs });
  }

  /** PARAMETRIC boundary efficacyCheck; {0}=period index (loopPeriods) */
  chk_boundary_efficacyCheck(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_efficacyCheck', { dynamicArgs });
  }

  /** PARAMETRIC boundary futilityCheck; {0}=period index (loopPeriods) */
  chk_boundary_futilityCheck(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_boundary_futilityCheck', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable startingAtTime; {0}=period index (loopPeriods) */
  txt_enrollmentTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollmentTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC enrollmentTable avgSubjectsEnrolled; {0}=period index (loopPeriods) */
  txt_enrollmentTable_avgSubjectsEnrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollmentTable_avgSubjectsEnrolled', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutStartingAtTime; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutStartingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropoutTable_dropoutStartingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutHazardRateControl; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutHazardRateControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropoutTable_dropoutHazardRateControl', { dynamicArgs });
  }

  /** PARAMETRIC dropoutTable dropoutHazardRateTreatment; {0}=period index (loopPeriods) */
  txt_dropoutTable_dropoutHazardRateTreatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_dropoutTable_dropoutHazardRateTreatment', { dynamicArgs });
  }

  /** dropout Piecewise Input Method select (Hazard Rates / Probability of Dropout / None) - must be selected before the dropout table's per-mode columns render */
  ddl_piecewiseInputMethod(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_piecewiseInputMethod', { dynamicArgs });
  }

  /** design-flow variant (Page=ResultsPage) of the same missing literal period-0 selector, needed for the waitForSelector at StepID 2955 */
  txt_enrollment_Table_0_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_enrollment_Table_0_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** PARAMETRIC inputMethodTable startingAtTime; {0}=period index (loopPeriods) */
  txt_inputMethodTable_startingAtTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_inputMethodTable_startingAtTime', { dynamicArgs });
  }

  /** PARAMETRIC inputMethodTable hazardRateControl; {0}=period index (loopPeriods) */
  txt_inputMethodTable_hazardRateControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_inputMethodTable_hazardRateControl', { dynamicArgs });
  }

  /** PARAMETRIC inputMethodTable hazardRateTrmt_Null_SS; {0}=period index (loopPeriods) */
  txt_inputMethodTable_hazardRateTrmt_Null_SS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_inputMethodTable_hazardRateTrmt_Null_SS', { dynamicArgs });
  }

  /** PARAMETRIC inputMethodTable hazardRateTrmt_Alt_SPSS; {0}=period index (loopPeriods) */
  txt_inputMethodTable_hazardRateTrmt_Alt_SPSS(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_inputMethodTable_hazardRateTrmt_Alt_SPSS', { dynamicArgs });
  }

  /** PARAMETRIC inputMethodTable byTime; {0}=period index (loopPeriods) - uses name= like period 0's sibling selector (txt_input_Method_Table_0_by_Time) */
  txt_inputMethodTable_byTime(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_inputMethodTable_byTime', { dynamicArgs });
  }

  /** PARAMETRIC inputMethodTable cumPercSurvivalControl; {0}=period index (loopPeriods) */
  txt_inputMethodTable_cumPercSurvivalControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_inputMethodTable_cumPercSurvivalControl', { dynamicArgs });
  }

  /** PARAMETRIC inputMethodTable medianSurvivalTimeControl; {0}=period index (loopPeriods) */
  txt_inputMethodTable_medianSurvivalTimeControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_inputMethodTable_medianSurvivalTimeControl', { dynamicArgs });
  }

  /** PARAMETRIC boundary efficacyPValue; {0}=period index. Replaces the individually-numbered txt_boundary_N_efficacy_PValue rows (0-3 only) with a count-agnostic form - ITER_06 confirmed PeriodIndex goes up to 6 across iterations, and every new max period was silently missing a fill */
  txt_boundary_efficacyPValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_efficacyPValue', { dynamicArgs });
  }

  /** PARAMETRIC boundary upperPValue; {0}=period index. Asymmetric-2-Sided-boundary counterpart to efficacyPValue (mutually exclusive per iteration - Test Type=2-Sided (Asymmetric) with asymEffBoundaryFam populates this instead of efficacyPValue). Matches feature_DOP(PD)/feature_OROP(PD)/feature_SingleMean's [id="boundary.0.upperPValue"] convention, made count-agnostic (needed for ITER_11). */
  txt_boundary_upperPValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_upperPValue', { dynamicArgs });
  }

  /** PARAMETRIC boundary lowerPValue; {0}=period index. Asymmetric-2-Sided-boundary counterpart to futilityPValue, same convention as txt_boundary_upperPValue. */
  txt_boundary_lowerPValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_lowerPValue', { dynamicArgs });
  }

  /** PARAMETRIC boundary futilityPValue; {0}=period index (loopPeriods) */
  txt_boundary_futilityPValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_futilityPValue', { dynamicArgs });
  }

  /** PARAMETRIC boundary futilityCP; {0}=period index (loopPeriods) */
  txt_boundary_futilityCP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_futilityCP', { dynamicArgs });
  }

  /** PARAMETRIC boundary futilityHR; {0}=period index (loopPeriods) */
  txt_boundary_futilityHR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_futilityHR', { dynamicArgs });
  }

  /** PARAMETRIC boundary cumAlphaSpent; {0}=period index (loopPeriods) */
  txt_boundary_cumAlphaSpent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_cumAlphaSpent', { dynamicArgs });
  }

  /** PARAMETRIC boundary cumBetaSpent; {0}=period index (loopPeriods) */
  txt_boundary_cumBetaSpent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_boundary_cumBetaSpent', { dynamicArgs });
  }
}
