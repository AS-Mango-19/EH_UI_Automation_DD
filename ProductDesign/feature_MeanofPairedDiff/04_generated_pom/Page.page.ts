// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: eb4b2d0efeda77f4ae3b98af880dd44fd9d390f0f6a531c86969774a822f784f)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class Page {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_left_Panel_designs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_left_Panel_designs', { dynamicArgs });
  }

  /** hand-added for the Response-tab-early-mount fix (feature_SingleMean/feature_SingleProportion precedent) */
  txt_left_Panel_response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_left_Panel_response', { dynamicArgs });
  }

  /** hand-added - was missing from the recording entirely (recording's own iteration never needed it); confirmed via user live observation that Recalculate must actually be pressed */
  btn_Recalculate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Recalculate', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Standard_Deviation_of_Paired(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Standard_Deviation_of_Paired', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_Noninferiority_Margin_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Noninferiority_Margin_0', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_critical_Point', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_upper_Critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_upper_Critical_Point', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_lower_Critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_lower_Critical_Point', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_3_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_efficacy_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_4_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_efficacy_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_5_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_5_efficacy_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_6_efficacy_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_6_efficacy_Z', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_CP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Z', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_futility_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_3_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_futility_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_4_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_futility_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_5_futility_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_5_futility_PValue', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_futility_Delta_By_Sigma(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Delta_By_Sigma', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_boundary_Sim_0_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_cum_Alpha_Spent(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_cum_Alpha_Spent', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_efficacy_Z_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_Z_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_efficacy_Z_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_Z_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_efficacy_Z_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_Z_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_efficacy_Z_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_Z_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_efficacy_Z_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_Z_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_efficacy_Z_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_Z_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_futility_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_3_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_futility_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_4_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_futility_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_5_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_5_futility_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_6_futility_Z(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_6_futility_Z', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_CP', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_futility_CP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_futility_CP', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_efficacy_PValue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_PValue', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_futility_Z_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Z_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_futility_Z_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_futility_Z_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_futility_Z_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_futility_Z_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_futility_Z_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_futility_Z_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_3_cum_Alpha_Spent_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_cum_Alpha_Spent_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_3_cum_Alpha_Spent_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_cum_Alpha_Spent_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_3_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_4_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_5_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_5_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_6_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_6_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_7_efficacy_PValue_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_7_efficacy_PValue_Upper', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_0_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_0_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_1_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_1_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_2_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_2_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_3_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_3_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_4_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_4_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_5_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_5_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_6_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_6_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** textbox from reference feature */
  txt_boundary_Sim_7_efficacy_PValue_Lower(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_boundary_Sim_7_efficacy_PValue_Lower', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Response', { dynamicArgs });
  }

  /** optional leave button for Unsaved Changes dialog */
  btn_Leave_Unsaved_Changes(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Leave_Unsaved_Changes', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Mean_Control_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Treatment_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Mean_Treatment_t', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_standard_Deviation', { dynamicArgs });
  }

  /** button from codegen */
  btn_Simulation_Setup(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Simulation_Setup', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Random_Number_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Random_Number_Seed', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Fixed_Seed(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Fixed_Seed', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Summary_Stats(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_save_Summary_Stats', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_save_Subject_Level_Data(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'chk_save_Subject_Level_Data', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sub_Level_Data_Sim_Runs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_sub_Level_Data_Sim_Runs', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Save', { dynamicArgs });
  }
}
