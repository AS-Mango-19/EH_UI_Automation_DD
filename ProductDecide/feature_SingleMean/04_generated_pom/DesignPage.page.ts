// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 3bea25c5d0236db7c514fc0cc6ba411a0eeee92c4493edae8ab223d0d8bc7830)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_treatment_Mean_TV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_treatment_Mean_TV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_treatment_Mean_LRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_treatment_Mean_LRV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_User_Interest_Value_UIV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_User_Interest_Value_UIV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Standard_Deviation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Desired_Confidence_DC(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Desired_Confidence_DC', { dynamicArgs });
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
  txt_Mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_SDTreatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_SDTreatment', { dynamicArgs });
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

  /** textbox (period 1 - table-completeness) */
  txt_decide_Interim_Table_1_stop_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_stop_Cutoff', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_interim_ARTV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_interim_ARTV', { dynamicArgs });
  }

  /** textbox (period 1 - table-completeness) */
  txt_decide_Interim_Table_1_interim_ARTV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_interim_ARTV', { dynamicArgs });
  }

  /** textbox (period 2 - table-completeness) */
  txt_decide_Interim_Table_2_interim_ARTV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_interim_ARTV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_max_Stop_PP', { dynamicArgs });
  }

  /** textbox (period 1 - table-completeness) */
  txt_decide_Interim_Table_1_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_max_Stop_PP', { dynamicArgs });
  }

  /** textbox (period 2 - table-completeness) */
  txt_decide_Interim_Table_2_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_max_Stop_PP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_go_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_go_Cutoff', { dynamicArgs });
  }

  /** textbox (period 1 - table-completeness) */
  txt_decide_Interim_Table_1_go_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_go_Cutoff', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_interim_DCLRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_interim_DCLRV', { dynamicArgs });
  }

  /** textbox (period 1 - table-completeness) */
  txt_decide_Interim_Table_1_interim_DCLRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_interim_DCLRV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_min_Go_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_min_Go_PP', { dynamicArgs });
  }

  /** textbox (period 1 - table-completeness) */
  txt_decide_Interim_Table_1_min_Go_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_1_min_Go_PP', { dynamicArgs });
  }

  /** textbox (period 2 - table-completeness) */
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
