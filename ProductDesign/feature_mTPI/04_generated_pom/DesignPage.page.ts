// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 3ef4a150b4575e5f9fa4db2755cd0c167e62482ae677dcfc5ced023230523beb)
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
  obj_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_1', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Curve_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Curve_Family', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Status(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Status', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_Sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Max_Sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Cohort_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Cohort_Size', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Start_with_Variant(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Start_with_Variant', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Switch_to_m_TPI(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Switch_to_m_TPI', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Probability_of_Toxicity_PT(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Probability_of_Toxicity_PT', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dosing_Table_0_upper_Limit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dosing_Table_0_upper_Limit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dosing_Table_1_upper_Limit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dosing_Table_1_upper_Limit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Toxicity_A(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Toxicity_A', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Toxicity_B(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Toxicity_B', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_0_probability_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDNot_Determined_0_probability_If_Not_MTD', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_0_min_SSOn_Dose_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDNot_Determined_0_min_SSOn_Dose_If_Not_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_MTD_Above_Highest_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_MTD_Above_Highest_Dose', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_1_probability_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDNot_Determined_1_probability_If_Not_MTD', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_1_min_SSOn_Dose_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDNot_Determined_1_min_SSOn_Dose_If_Not_MTD', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Next_Recommended_Dose_NRD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Next_Recommended_Dose_NRD', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Current_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Current_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Minimum_Sample_Size_Observed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_Minimum_Sample_Size_Observed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_0_threshold_Target(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_0_threshold_Target', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Target_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_Target_Rule', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_1_threshold_Target_Rule2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_1_threshold_Target_Rule2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_1_min_SSOn_Dose_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_1_min_SSOn_Dose_If_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_CI_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_CI_Rule', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_2_credible_Interval(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_2_credible_Interval', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_2_CILower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_2_CILower', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_2_CIUpper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_2_CIUpper', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_2_min_SSOn_Dose_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_2_min_SSOn_Dose_If_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Allocation_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_Allocation_Rule', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_3_min_SSOn_Dose_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDDetermined_3_min_SSOn_Dose_If_MTD', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_SETIf_MTDDetermined_0_rule_Operator_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_id_SETIf_MTDDetermined_0_rule_Operator_If_MTD', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_SETIf_MTDDetermined_1_rule_Operator_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_id_SETIf_MTDDetermined_1_rule_Operator_If_MTD', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_SETIf_MTDDetermined_2_rule_Operator_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_id_SETIf_MTDDetermined_2_rule_Operator_If_MTD', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Starting_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Starting_Dose', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Scenario(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Scenario', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Curve_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Curve_Family', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_curve_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_curve_Family', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_E0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_E0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_emax(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_emax', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ED50(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ED50', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hill(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Hill', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_1_5_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_1_5_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_2_10_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_2_10_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_3_15_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_3_15_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_4_20_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_4_20_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_5_25_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_5_25_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_6_30_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_6_30_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_7_40_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_7_40_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose7', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from modalDose1-7 (recording never reached dose 8) - VERIFY selector live */
  txt_modal_Dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose8', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from modalDose1-7 (recording never reached dose 9) - VERIFY selector live */
  txt_modal_Dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose9', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from modalDose1-7 (recording never reached dose 10) - VERIFY selector live */
  txt_modal_Dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose10', { dynamicArgs });
  }

  /** textbox from codegen (named - codegen emitted this with an empty ObjectName from the non-ASCII 'β' label) */
  txt_beta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_beta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_theta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_theta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_tau(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_tau', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Intercept_E0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Intercept_E0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Linear_Coefficient_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Linear_Coefficient_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Quadratic_Coefficient_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Quadratic_Coefficient_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lin_Intercept(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_lin_Intercept', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Slope(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Slope', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_add_Sce_But(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_add_Sce_But', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_btn_delete0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_btn_delete0', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Number_of_Simulations_Run', { dynamicArgs });
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

  /** radio button from codegen */
  radio_Compute_Average_Allocations_Given_The_Dose_Was_Tried(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Compute_Average_Allocations_Given_The_Dose_Was_Tried', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Compute_Average_Allocations_Across_All_Simulations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Compute_Average_Allocations_Across_All_Simulations', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Compute_Isotonic_Estimates_Using_Posterior_Means_And_Variances(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Compute_Isotonic_Estimates_Using_Posterior_Means_And_Variances', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Compute_Isotonic_Estimates_Using_Observed_Proportions_And_Allocations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Compute_Isotonic_Estimates_Using_Observed_Proportions_And_Allocations', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Simulate', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_credit_alert_primary', { dynamicArgs });
  }
}
