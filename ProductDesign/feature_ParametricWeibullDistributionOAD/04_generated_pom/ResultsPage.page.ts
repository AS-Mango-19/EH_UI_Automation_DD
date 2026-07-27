// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 83ccbd0cc5f04b0a59d4a797846a97c88f9d16db142a6ddddd0cc08cbd53433e)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** radio button from codegen */
  radio_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Power', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Type_1_Error', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Hazard_Ratio_HR(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Hazard_Ratio_HR', { dynamicArgs });
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

  /** native <select> from codegen */
  ddl_input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_By_Time_t_Day(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_By_Time_t_Day', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Cumulative_Survival_under_Null_s0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Cumulative_Survival_under_Null_s0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Cumulative_Survival_under_Alternative_s1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Cumulative_Survival_under_Alternative_s1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Weibull_Shape_Parameter_k(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Weibull_Shape_Parameter_k', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_median_Survival_Time_Null(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_median_Survival_Time_Null', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Median_Survival_Time_under_Alternative_m1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Median_Survival_Time_under_Alternative_m1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Rate_under_Null_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Rate_under_Null_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Rate_under_Alternative(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Hazard_Rate_under_Alternative', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Accrual_Duration_Day(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Accrual_Duration_Day', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Study_Duration_Day(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Study_Duration_Day', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_by_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_by_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Accrual_Duration_Year(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Accrual_Duration_Year', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Study_Duration_Year(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Study_Duration_Year', { dynamicArgs });
  }
}
