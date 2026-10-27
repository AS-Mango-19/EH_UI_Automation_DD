// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: cd90fd2ee84119f9a1a5ef40969b78cbc779984cb38ff08b97b7c9fd97c173bc)
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

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Randomization_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Randomization_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_ntc_nct(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Allocation_Ratio_ntc_nct', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Critical_Point(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Critical_Point', { dynamicArgs });
  }

  /** button from codegen */
  btn_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'btn_Response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Mean_Control_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean_Treatment_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_Mean_Treatment_t', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Type_of_Standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_Type_of_Standard_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_standard_Deviation_Diff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_standard_Deviation_Diff', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_standard_Deviation_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'ddl_standard_Deviation_Type', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sqrt_MSE(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'Page', 'txt_sqrt_MSE', { dynamicArgs });
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
