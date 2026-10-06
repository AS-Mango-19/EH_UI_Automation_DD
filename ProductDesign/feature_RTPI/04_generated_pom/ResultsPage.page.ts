// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 6ddbc9fd8849c6415844d37ff4383c6f2aefaadb8c815e2e9fbf4c9ab8737e41)
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

  /** textbox from codegen */
  txt_Max_Pending_Patients(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Max_Pending_Patients', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Probability_of(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Target_Probability_of', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Month(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Follow_up_Time_Month', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_2', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save', { dynamicArgs });
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
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Inter_patient_Arrival(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Mean_Inter_patient_Arrival', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Inevaluable_Rate_IR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Inevaluable_Rate_IR', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Last_Fraction_of_Assessment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Last_Fraction_of_Assessment', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Simulation_Setup', { dynamicArgs });
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
  btn_Save_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save_Simulate', { dynamicArgs });
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

  /** Four Parameter Logistic: beta (clean alias of the codegen txt_ id) */
  txt_beta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_beta', { dynamicArgs });
  }

  /** Number of Simulations Run input (id confirmed from ROM(PD) feature) */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** Distribution of Time to DLT native select (id proven on feature_Rolling6) */
  ddl_Distribution_of_Time_to_DLT(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Distribution_of_Time_to_DLT', { dynamicArgs });
  }

  /** Run status cell. VERIFY col-id against your app and adjust */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_RunStatus', { dynamicArgs });
  }
}
