// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: e69413635787fc39137a5963fab982190411a61c10d27806935d123f3438be41)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Control_Median_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Control_Median_Time_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Median_Time_TV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Median_Time_TV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Median_Time_LRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Median_Time_LRV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Median_Time_UIV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Median_Time_UIV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Control_Event_Rate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Control_Event_Rate', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Event_Rate_TV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Event_Rate_TV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Event_Rate_LRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Event_Rate_LRV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Event_Rate_UIV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Event_Rate_UIV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_target_Value(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_target_Value', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lower_Ref_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_lower_Ref_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_User_Interest_Value_UIV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_User_Interest_Value_UIV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Maturity(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Maturity', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_R_n_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Allocation_Ratio_R_n_n', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_desired_Confidence_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_desired_Confidence_Select', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_desired_Confidence_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_desired_Confidence_Input', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_acceptable_Risk_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_acceptable_Risk_Input', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Hazard_Ratio_hr(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Hazard_Ratio_hr', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Events_e(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Events_e', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Interim_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Interim_Type', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Stop_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Stop_Rule', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Go_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Go_Rule', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Interim(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Add_Interim', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_1_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_2_analysis_Spacing_Info(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_analysis_Spacing_Info', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_stop_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_stop_Cutoff', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_interim_ARTV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_interim_ARTV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_max_Stop_PP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_interim_DCLRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_interim_DCLRV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_go_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_go_Cutoff', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_min_Go_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_min_Go_PP', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_1_stop_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_stop_Cutoff', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_2_stop_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_stop_Cutoff', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_1_interim_ARTV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_interim_ARTV', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_2_interim_ARTV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_interim_ARTV', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_1_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_max_Stop_PP', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_2_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_max_Stop_PP', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_1_go_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_go_Cutoff', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_2_go_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_go_Cutoff', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_1_interim_DCLRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_interim_DCLRV', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_2_interim_DCLRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_interim_DCLRV', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_1_min_Go_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_min_Go_PP', { dynamicArgs });
  }

  /** textbox mirrored from period 0 (table-completeness) */
  txt_decide_Interim_Table_2_min_Go_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_min_Go_PP', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Compute', { dynamicArgs });
  }
}
