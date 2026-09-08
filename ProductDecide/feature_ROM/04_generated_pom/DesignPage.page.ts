// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 82f319a57852b2862dd42f031dfccea51b73dc0a74777ce8512903ab787386fd)
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

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Compute', { dynamicArgs });
  }
}
