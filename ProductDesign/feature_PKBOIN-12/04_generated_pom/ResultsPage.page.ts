// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: ede07f7560a7aa15d6a3cf21600c37120eeaed675fb306cdd80661c9fc85b155)
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
  txt_Cohort_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Cohort_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_N(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_N', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Dose_Exploration_Threshold(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Dose_Exploration_Threshold', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Probability_of(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Target_Probability_of', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_Threshold_for_Safety_Rule_Pcut(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability_Threshold_for_Safety_Rule_Pcut', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Minimal_Acceptable_Efficacy(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Minimal_Acceptable_Efficacy', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_Threshold_for_Efficacy_Rule_qcut(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability_Threshold_for_Efficacy_Rule_qcut', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_PK_Mean_rp(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Target_PK_Mean_rp', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_Threshold_for_PK(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability_Threshold_for_PK', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_participant_No_Resp_No_DLTInput(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_participant_No_Resp_No_DLTInput', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_participant_Resp_DLTInput(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_participant_Resp_DLTInput', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_PK_Coefficient_of_Variation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_PK_Coefficient_of_Variation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Ratio_of_PK_with_Toxicity_and(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_PK_with_Toxicity_and', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Starting_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Starting_Dose', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_PK_Values_for_Scenarios(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_PK_Values_for_Scenarios', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose4', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Scenario(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Add_Scenario', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_btn_delete0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_btn_delete0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_4_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_4_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_4_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_4_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_4_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_4_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_4_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_4_dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_5_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_5_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_5_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_5_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_5_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_5_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_5_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_5_dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_6_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_6_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_6_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_6_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_6_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_6_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_6_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_6_dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose7', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose7', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose8', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose8', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose9', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose9', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_0_dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_0_dose10', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_1_dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_1_dose10', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose7', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose8', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose9', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_de_Chart_Table_2_dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_de_Chart_Table_2_dose10', { dynamicArgs });
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

  /** Run status cell. VERIFY col-id against your app and adjust */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_RunStatus', { dynamicArgs });
  }
}
