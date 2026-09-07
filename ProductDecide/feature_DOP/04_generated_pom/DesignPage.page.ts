// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 4c3c8e562e7ad81fb2d06cdc73b235c5d4b4d2e1c0822fefe1c3058655b6b484)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_Control_Proportion(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Control_Proportion', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Proportion_TV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Proportion_TV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Proportion_LRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Proportion_LRV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Proportion_UIV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Proportion_UIV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Sample_Size_n(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Sample_Size_n', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Allocation_Ratio_R_nt_nc(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Allocation_Ratio_R_nt_nc', { dynamicArgs });
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
  txt_Alpha(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Alpha', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Beta(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Beta', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Alpha_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Alpha_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Beta_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Beta_Treatment', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Interim_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Interim_Type', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Stop_Rule(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Stop_Rule', { dynamicArgs });
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

  /** textbox mirrored from period 0 (table-completeness; kept symmetric with the table's period depth) */
  txt_decide_Interim_Table_2_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_2_max_Stop_PP', { dynamicArgs });
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
