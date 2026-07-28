// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: ae965825ad17271437baf18f262b9edb844394766551176eb96af127009b1437)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Select_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Select_Test', { dynamicArgs });
  }

  /** button from codegen */
  btn_Continue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Continue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Computed_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'opt_Computed_Parameter', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Type', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Ratio_of_Means_t_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Means_t_c', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Coefficient_of_Variation_of(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Coefficient_of_Variation_of', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Probability_of_Dropout(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Probability_of_Dropout', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Mean_Control_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Treatment_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Mean_Treatment_t', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Hypothesis', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Noninferiority_Margin_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Noninferiority_Margin_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Ratio_of_Means_1_t1_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Means_1_t1_c', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Ratio_of_Means(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Ratio_of_Means', { dynamicArgs });
  }

  /** opens the Enrollment section - name was mis-derived by the importer */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Include(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_Include', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Enrollment_Rate_per_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Enrollment_Rate_per_Week', { dynamicArgs });
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

  /** NI Mean Control (id confirmed present in recording.txt) */
  txt_nonInf_Mean_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_nonInf_Mean_Control', { dynamicArgs });
  }

  /** Mean Treatment (μt0) under Null Hypothesis - COMPUTED by the app from Mean Control x NI Margin */
  txt_nonInf_NH_Mean_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_nonInf_NH_Mean_Treatment', { dynamicArgs });
  }

  /** Mean Treatment (μt1) under Alternative Hypothesis - COMPUTED by the app from Mean Control x Ratio of Means */
  txt_nonInf_AH_Mean_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_nonInf_AH_Mean_Treatment', { dynamicArgs });
  }

  /** native <select> Hypothesis (sim Design tab; shared id with design) */
  ddl_sim_Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_sim_Hypothesis', { dynamicArgs });
  }

  /** native <select> Randomization Method (sim Design tab; id inferred - confirm in DevTools) */
  ddl_sim_Randomization_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_sim_Randomization_Method', { dynamicArgs });
  }

  /** native <select> Test Type (sim Design tab; shared id with design) */
  ddl_sim_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_sim_Test_Type', { dynamicArgs });
  }

  /** GREYED/derived Critical Point Lower (id inferred from #upperCriticalPoint - confirm in DevTools) */
  txt_sim_Critical_Point_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sim_Critical_Point_Lower', { dynamicArgs });
  }

  /** Common Coefficient of Variation checkbox (uncheck to enable separate Control/Treatment CoV) */
  chk_sim_Common_CoV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_sim_Common_CoV', { dynamicArgs });
  }

  /** Enrollment Include toggle (recording had it already on; a fresh run starts Not Included) */
  sw_sim_Include(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'sw_sim_Include', { dynamicArgs });
  }

  /** Save Summary Statistics checkbox (Simulation Setup) */
  chk_sim_Save_Summary_Stats(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_sim_Save_Summary_Stats', { dynamicArgs });
  }

  /** Save Subject-Level Data checkbox - reveals subLevelDataSimRuns */
  chk_sim_Save_Subject_Level_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_sim_Save_Subject_Level_Data', { dynamicArgs });
  }

  /** Simulate confirm in the shown name-your-result modal (#credit-alert-primary; scoped to .modal.show) */
  btn_sim_Confirm_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_sim_Confirm_Simulate', { dynamicArgs });
  }

  /** Status cell of the SIMULATION result row (scoped so it never matches the design row already Completed) */
  lbl_sim_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_sim_RunStatus', { dynamicArgs });
  }

  /** Result-name field in the shown Simulate modal */
  txt_sim_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sim_ResultName', { dynamicArgs });
  }

  /** First link in the Simulation result row = the result name (opens the sim result) */
  lnk_sim_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lnk_sim_ResultName', { dynamicArgs });
  }
}
