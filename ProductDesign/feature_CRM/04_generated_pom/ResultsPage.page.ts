// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: f239e03162c5498023006da8f7b1dc5f5f10b3050de78c5503cf98e5bf594364)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** checkbox from codegen */
  chk_Sample_From_Posterior(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_Sample_From_Posterior', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ps_Starting_Value(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ps_Starting_Value', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Random_Walk(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Random_Walk', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Steady_State_Simulations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Steady_State_Simulations', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Burn_in(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Burn_in', { dynamicArgs });
  }

  /** button from codegen */
  btn_primary_Button(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_primary_Button', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_MTD_Below_Lowest_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_MTD_Below_Lowest_Dose', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_0_probability_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDNot_Determined_0_probability_If_Not_MTD', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_0_min_SSOn_Dose_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDNot_Determined_0_min_SSOn_Dose_If_Not_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_MTD_Above_Highest_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_MTD_Above_Highest_Dose', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_1_probability_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDNot_Determined_1_probability_If_Not_MTD', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDNot_Determined_1_min_SSOn_Dose_If_Not_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDNot_Determined_1_min_SSOn_Dose_If_Not_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Minimum_Sample_Size_Observed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_Minimum_Sample_Size_Observed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_0_probability_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDDetermined_0_probability_If_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_MTD_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_MTD_Rule', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_1_probability_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDDetermined_1_probability_If_MTD', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_1_min_SSOn_Dose_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDDetermined_1_min_SSOn_Dose_If_MTD', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Allocation_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_Allocation_Rule', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_SETIf_MTDDetermined_2_min_SSOn_Dose_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_SETIf_MTDDetermined_2_min_SSOn_Dose_If_MTD', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_SETIf_MTDDetermined_0_rule_Operator_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_id_SETIf_MTDDetermined_0_rule_Operator_If_MTD', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_id_SETIf_MTDDetermined_2_rule_Operator_If_MTD(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_id_SETIf_MTDDetermined_2_rule_Operator_If_MTD', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Do_Not_Skip_Untried_Doses(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Do_Not_Skip_Untried_Doses', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Allow_Skipping_Any_Doses_No(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Allow_Skipping_Any_Doses_No', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_allow_DE(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_allow_DE', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Starting_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Starting_Dose', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Scenario(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Scenario', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Curve_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Curve_Family', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_curve_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_curve_Family', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_E0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_E0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_emax(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_emax', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ED50(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ED50', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hill(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hill', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_1_5_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_1_5_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_2_10_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_2_10_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_3_15_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_3_15_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_4_20_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_4_20_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_5_25_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_5_25_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_6_30_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_6_30_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Add_Scenario_Curve_get_By_Text_Dose_7_40_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Add_Scenario_Curve_get_By_Text_Dose_7_40_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_modal_Dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose7', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from modalDose1-7 (recording never reached dose 8) - VERIFY selector live */
  txt_modal_Dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose8', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from modalDose1-7 (recording never reached dose 9) - VERIFY selector live */
  txt_modal_Dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose9', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from modalDose1-7 (recording never reached dose 10) - VERIFY selector live */
  txt_modal_Dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_modal_Dose10', { dynamicArgs });
  }

  /** textbox from codegen (named - codegen emitted this with an empty ObjectName from the non-ASCII 'β' label) */
  txt_beta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_beta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_delta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_theta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_theta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_tau(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_tau', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Intercept_E0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Intercept_E0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Linear_Coefficient_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Linear_Coefficient_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Quadratic_Coefficient_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Quadratic_Coefficient_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lin_Intercept(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lin_Intercept', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Slope(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Slope', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_add_Sce_But(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_add_Sce_But', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_btn_delete0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_btn_delete0', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Random_Number_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Random_Number_Seed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Fixed_Seed', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Summary_Stats(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_save_Summary_Stats', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Subject_Level_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_save_Subject_Level_Data', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Level_Data_Sim_Runs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sub_Level_Data_Sim_Runs', { dynamicArgs });
  }

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Average_Allocations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'opt_Average_Allocations', { dynamicArgs });
  }

  /** alias of the DesignPage row above under the Page this feature's steps actually use */
  radio_Compute_Average_Allocations_Across_All_Simulations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Compute_Average_Allocations_Across_All_Simulations', { dynamicArgs });
  }

  /** hand-added, mirrors the sibling radio captured above (recording had this control but the importer's parametric {0} placeholder for it wasn't directly usable) */
  radio_Compute_Average_Allocations_Given_The_Dose_Was_Tried(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Compute_Average_Allocations_Given_The_Dose_Was_Tried', { dynamicArgs });
  }

  /** hand-added, NOT in the recording - testdata added this field after the fact. id inferred from the saveSummaryStats/saveSubjectLevelData getByTestId naming convention - VERIFY live */
  chk_save_Final_Posterior_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_save_Final_Posterior_Data', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save', { dynamicArgs });
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
}
