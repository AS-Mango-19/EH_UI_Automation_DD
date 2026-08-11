// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: d5f884e8e480779695429297a665318d2a23b4d8e3d560f5b6ef3ddc3be2cc31)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Select_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Select_Test', { dynamicArgs });
  }

  /** button from codegen */
  btn_Continue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Continue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Max_Sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Max_Sample_Size', { dynamicArgs });
  }

  /** button from codegen */
  chk_Start_With_Accelerated(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_Start_With_Accelerated', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Response', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Starting_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Starting_Dose', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_btn_delete0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_btn_delete0', { dynamicArgs });
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
  txt_add_Sce_But(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_add_Sce_But', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_', { dynamicArgs });
  }

  /** Four Parameter Logistic: beta (clean alias of the codegen txt_ id) */
  txt_beta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_beta', { dynamicArgs });
  }

  /** Four Parameter Logistic: delta (in recording; added for the scenario loop) */
  txt_delta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_delta', { dynamicArgs });
  }

  /** Four Parameter Logistic: theta (in recording; added for the scenario loop) */
  txt_theta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_theta', { dynamicArgs });
  }

  /** Four Parameter Logistic: tau (in recording; added for the scenario loop) */
  txt_tau(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_tau', { dynamicArgs });
  }

  /** Linear: Intercept (distinct id from Quadratic #intercept; added for the scenario loop) */
  txt_lin_Intercept(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_lin_Intercept', { dynamicArgs });
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
  txt_Slope(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Slope', { dynamicArgs });
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

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** Number of Simulations Run input (id confirmed from ROM(PD) feature) */
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

  /** button from codegen */
  btn_Compute_Average_Allocations_Given_The_Dose_Was_Tried(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Compute_Average_Allocations_Given_The_Dose_Was_Tried', { dynamicArgs });
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

  /** Save button (exact id) */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save', { dynamicArgs });
  }

  /** status label (placeholder) */
  txt_Status(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Status', { dynamicArgs });
  }

  /** completed label (placeholder) */
  txt_Completed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Completed', { dynamicArgs });
  }

  /** close tab 0 placeholder */
  txt_close_tab_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_close_tab_0', { dynamicArgs });
  }

  /** ag grid tree closed icon placeholder */
  txt_ag_icon_ag_icon_tree_closed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ag_icon_ag_icon_tree_closed', { dynamicArgs });
  }
}
