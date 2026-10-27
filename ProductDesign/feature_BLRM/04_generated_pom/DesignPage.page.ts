// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: f18e45f0b4b624eee507235cc140df69a762fabea3873675d62f003da9951ee1)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_Max_Sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Max_Sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Cohort_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Cohort_Size', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Start_With_Variant(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Start_With_Variant', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Switch_to_BLRM(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Switch_to_BLRM', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Probability_of(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Probability_of', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Dose_Selection_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Dose_Selection_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_toxicity_Table_0_upper_Limit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_toxicity_Table_0_upper_Limit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_toxicity_Table_0_losses(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_toxicity_Table_0_losses', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_toxicity_Table_1_upper_Limit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_toxicity_Table_1_upper_Limit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_toxicity_Table_2_upper_Limit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_toxicity_Table_2_upper_Limit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_toxicity_Table_1_losses(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_toxicity_Table_1_losses', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_toxicity_Table_2_losses(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_toxicity_Table_2_losses', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_toxicity_Table_3_losses(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_toxicity_Table_3_losses', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_dose_Selection_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_dose_Selection_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_EWOC_Probability_Overdosing(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_EWOC_Probability_Overdosing', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Reference_Dose_d(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Reference_Dose_d', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_BLRM_0_mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_BLRM_0_mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_BLRM_0_std_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_BLRM_0_std_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_BLRM_0_correlation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_BLRM_0_correlation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_BLRM_1_mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_BLRM_1_mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_BLRM_1_std_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_BLRM_1_std_Deviation', { dynamicArgs });
  }

  /** button from codegen */
  btn_Posterior_Sampling(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Posterior_Sampling', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Direct(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_Direct', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Metropolis_Hastings(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_Metropolis_Hastings', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_posterior_Sampling_Table_MH_0_ps_Starting_Value(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_posterior_Sampling_Table_MH_0_ps_Starting_Value', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_posterior_Sampling_Table_MH_0_ps_Random_Walk(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_posterior_Sampling_Table_MH_0_ps_Random_Walk', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_posterior_Sampling_Table_MH_1_ps_Starting_Value(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_posterior_Sampling_Table_MH_1_ps_Starting_Value', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_posterior_Sampling_Table_Direct_0_ps_Points(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_posterior_Sampling_Table_Direct_0_ps_Points', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_posterior_Sampling_Table_Direct_1_ps_Points(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_posterior_Sampling_Table_Direct_1_ps_Points', { dynamicArgs });
  }

  /** renamed from txt_Steady_state_simulations - the live schema (DOM trace, TC_59 ITER_02) confirms the Posterior Sampling modal's "child" list has TWO separate Steady-state-simulations fields (psSSSimulationDirect/psSSSimulationMH), one per method, same as the posteriorSamplingTableMH/Direct split. This one only renders when Metropolis Hastings is selected */
  txt_Steady_state_simulations_MH(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Steady_state_simulations_MH', { dynamicArgs });
  }

  /** hand-added - the Direct-method twin of txt_Steady_state_simulations_MH. Fixed live (TC_59 ITER_02): the single unconditional #psSSSimulationMH selector hard-failed "not found" when Direct was selected since that id only renders under Metropolis Hastings */
  txt_Steady_state_simulations_Direct(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Steady_state_simulations_Direct', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Burn_in(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Burn_in', { dynamicArgs });
  }

  /** button from codegen */
  btn_primary_Button(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_primary_Button', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_MTD_Above_Highest_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_MTD_Above_Highest_Dose', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_0_probability_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDNot_Determined_0_probability_If_Not_MTD', { dynamicArgs });
  }

  /** Fixed live (TC_59 ITER_01): codegen recorded this one field with a name= selector while its sibling probabilityIfNotMTD (same row, same table) used id=; field was visible in the screenshot but "not found" by name - switched to the same [id="..."] convention every other SETIfMTDDetermined/NotDetermined field uses */
  txt_SETIf_MTDNot_Determined_0_min_SSOn_Dose_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_SETIf_MTDNot_Determined_0_min_SSOn_Dose_If_Not_MTD', { dynamicArgs });
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

  /** radio button from codegen */
  radio_Do_Not_Skip_Untried_Doses(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Do_Not_Skip_Untried_Doses', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Dose_Increment_Must_Not_Exceed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Dose_Increment_Must_Not_Exceed', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_dose_Increment_Not_Exceed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_dose_Increment_Not_Exceed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Skipping_Units(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dose_Skipping_Units', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Skipping_Dose_Level(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dose_Skipping_Dose_Level', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Skipping_Perc_Of_Cur_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_dose_Skipping_Perc_Of_Cur_Dose', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Allow_Skipping_Any_Doses_No(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Allow_Skipping_Any_Doses_No', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_allow_DE(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_allow_DE', { dynamicArgs });
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

  /** textbox from codegen (renamed from blank-slug "txt_" - the recorded field label was just the symbol "β") */
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

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Average_Allocations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'opt_Average_Allocations', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Compute_Average_Allocations_Across_All_Simulations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Compute_Average_Allocations_Across_All_Simulations', { dynamicArgs });
  }

  /** hand-added, mirrors the sibling radio captured above (recording had this control but the importer's parametric {0} placeholder for it wasn't directly usable) */
  radio_Compute_Average_Allocations_Given_The_Dose_Was_Tried(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Compute_Average_Allocations_Given_The_Dose_Was_Tried', { dynamicArgs });
  }

  /** hand-added, NOT in the recording - testdata has this field. id inferred from the saveSummaryStats/saveSubjectLevelData getByTestId naming convention - VERIFY live */
  chk_save_Final_Posterior_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_save_Final_Posterior_Data', { dynamicArgs });
  }

  /** hand-added (recording only went to dose 7; ITER_05 has 10 real doses): General: Dose 8 true probability, id pattern inferred from modalDose1-7 - SCREENSHOT-VERIFY on first live run */
  txt_modal_Dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose8', { dynamicArgs });
  }

  /** hand-added: General: Dose 9 true probability, id pattern inferred from modalDose1-7 - SCREENSHOT-VERIFY on first live run */
  txt_modal_Dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose9', { dynamicArgs });
  }

  /** hand-added: General: Dose 10 true probability, id pattern inferred from modalDose1-7 - SCREENSHOT-VERIFY on first live run */
  txt_modal_Dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_modal_Dose10', { dynamicArgs });
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
