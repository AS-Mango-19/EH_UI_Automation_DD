// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 2f0bbc5eef4d9f517374d80321d946f8c73b544cccb5a4bb0cb0b893e195b28e)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_Control_Mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Control_Mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Mean_TV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Mean_TV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Mean_LRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Mean_LRV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Mean_UIV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Treatment_Mean_UIV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Standard_Deviation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Standard_Deviation', { dynamicArgs });
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
  txt_Mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_SDControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_SDControl', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Mean_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Mean_Treatment', { dynamicArgs });
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

  /** textbox from codegen */
  txt_decide_Interim_Table_0_interim_ARTV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_interim_ARTV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_max_Stop_PP(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_max_Stop_PP', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_go_Cutoff(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_go_Cutoff', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_decide_Interim_Table_0_interim_DCLRV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_decide_Interim_Table_0_interim_DCLRV', { dynamicArgs });
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
