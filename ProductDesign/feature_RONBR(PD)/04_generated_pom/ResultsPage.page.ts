// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 976275d0cadee598f8c5bd9da834535164a80b96b2e34616375b0262b610f135)
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
  txt_Allocation_Ratio_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Allocation_Ratio_nt_nc', { dynamicArgs });
  }

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Computed_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'opt_Computed_Parameter', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Power', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'radio_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Power', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'ddl_Test_Type', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Type_1_Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Type_1_Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Rate_for_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Rate_for_Control_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Ratio_of_Rates_1_t_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Ratio_of_Rates_1_t_c', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Rate_for_Treatment_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'obj_Rate_for_Treatment_t', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_Up_Time_D_Month(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Follow_Up_Time_D_Month', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Shape_Control_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Shape_Control_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Shape_Treatment_t(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Shape_Treatment_t', { dynamicArgs });
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

  /** Details tab load-check */
  btn_Details(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Details', { dynamicArgs });
  }

  /** Details tab loading spinner */
  div_Details_Spinner(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'div_Details_Spinner', { dynamicArgs });
  }

  /** Details tab graph container */
  div_Details_Chart(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'div_Details_Chart', { dynamicArgs });
  }
}
