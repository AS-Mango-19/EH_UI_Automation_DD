// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 1bb64d2b390dd81de2ce2beaab8c57316cec5caa869a08e01205ffad4123a2ea)
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
  txt_Cohort_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Cohort_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Probability_of(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Target_Probability_of', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Minimal_Acceptable_Efficacy(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Minimal_Acceptable_Efficacy', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Maximum_Number_of_Patients_Treated_in_Stage_1_S1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Maximum_Number_of_Patients_Treated_in_Stage_1_S1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Maximum_Number_of_Patients_Treated_in_Stage_2_S2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Maximum_Number_of_Patients_Treated_in_Stage_2_S2', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Method_to_Select_Next_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Method_to_Select_Next_Dose', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_stopping_Rules(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_stopping_Rules', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Maximum_Number_of_Patients_at(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Maximum_Number_of_Patients_at', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_If_a_patient_has_no_response_and_does_not_experience_DLT_the_clinical_benefit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_If_a_patient_has_no_response_and_does_not_experience_DLT_the_clinical_benefit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_If_a_patient_has_response_and_experiences_DLT_the_clinical_benefit_3_is(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_If_a_patient_has_response_and_experiences_DLT_the_clinical_benefit_3_is', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_Threshold_for_Safety_Rule_Pcut(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability_Threshold_for_Safety_Rule_Pcut', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_Threshold_for_Efficacy_Rule_qcut(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability_Threshold_for_Efficacy_Rule_qcut', { dynamicArgs });
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

  /** button from codegen */
  btn_Add_Scenario(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Scenario', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_12_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_12_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_12_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_12_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_12_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_12_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_13_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_13_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_13_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_13_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_13_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_13_dose3', { dynamicArgs });
  }

  /** scenario grid row 0 dose 1 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose1', { dynamicArgs });
  }

  /** scenario grid row 0 dose 2 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose2', { dynamicArgs });
  }

  /** scenario grid row 0 dose 3 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose3', { dynamicArgs });
  }

  /** scenario grid row 0 dose 4 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose4', { dynamicArgs });
  }

  /** scenario grid row 0 dose 5 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose5', { dynamicArgs });
  }

  /** scenario grid row 0 dose 6 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose6', { dynamicArgs });
  }

  /** scenario grid row 0 dose 7 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose7', { dynamicArgs });
  }

  /** scenario grid row 0 dose 8 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose8', { dynamicArgs });
  }

  /** scenario grid row 0 dose 9 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose9', { dynamicArgs });
  }

  /** scenario grid row 0 dose 10 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_0_dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose10', { dynamicArgs });
  }

  /** scenario grid row 1 dose 1 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose1', { dynamicArgs });
  }

  /** scenario grid row 1 dose 2 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose2', { dynamicArgs });
  }

  /** scenario grid row 1 dose 3 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose3', { dynamicArgs });
  }

  /** scenario grid row 1 dose 4 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose4', { dynamicArgs });
  }

  /** scenario grid row 1 dose 5 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose5', { dynamicArgs });
  }

  /** scenario grid row 1 dose 6 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose6', { dynamicArgs });
  }

  /** scenario grid row 1 dose 7 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose7', { dynamicArgs });
  }

  /** scenario grid row 1 dose 8 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose8', { dynamicArgs });
  }

  /** scenario grid row 1 dose 9 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose9', { dynamicArgs });
  }

  /** scenario grid row 1 dose 10 (added scenario after defaults are deleted) */
  txt_de_Chart_Table_1_dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose10', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_btn_delete0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_btn_delete0', { dynamicArgs });
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

  /** Number of Simulations Run input (id confirmed from ROM(PD) feature) */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** Run status cell. VERIFY col-id against your app and adjust */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_RunStatus', { dynamicArgs });
  }
}
