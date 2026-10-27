// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: f239e03162c5498023006da8f7b1dc5f5f10b3050de78c5503cf98e5bf594364)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_Max_Sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Max_Sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Cohort_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Cohort_Size', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Start_with_Variant(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Start_with_Variant', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Switch_to_CRM(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Switch_to_CRM', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Probability_of_Toxicity_PT(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Probability_of_Toxicity_PT', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Probability_Upper(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Probability_Upper', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Model_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Model_Type', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Shape(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Shape', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Rate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Rate', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_c(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_c', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Mean(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Mean', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Variance_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Variance_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_0_dose1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_0_dose2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_0_dose3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_0_dose4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_0_dose5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_0_dose6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_prior_Specification_Table_0_dose7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose7', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from dose1-7 (recording never reached dose 8) - VERIFY selector live */
  txt_prior_Specification_Table_0_dose8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose8', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from dose1-7 (recording never reached dose 9) - VERIFY selector live */
  txt_prior_Specification_Table_0_dose9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose9', { dynamicArgs });
  }

  /** hand-added, id pattern inferred from dose1-7 (recording never reached dose 10) - VERIFY selector live */
  txt_prior_Specification_Table_0_dose10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_prior_Specification_Table_0_dose10', { dynamicArgs });
  }

  /** button from codegen */
  btn_Posterior_Sampling(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Posterior_Sampling', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Compute_Posterior_Mean_Only(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'chk_Compute_Posterior_Mean_Only', { dynamicArgs });
  }

  /** radio button from codegen */
  radio_Compute_Average_Allocations_Across_All_Simulations(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'radio_Compute_Average_Allocations_Across_All_Simulations', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Simulate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Simulate', { dynamicArgs });
  }
}
