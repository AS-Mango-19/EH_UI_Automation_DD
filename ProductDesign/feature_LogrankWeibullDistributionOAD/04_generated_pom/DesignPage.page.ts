// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: d4f32c3a37d08e3eb67c3ebd2a4c7c193716aefc2c3ac27b98b93a76bbafc1ef)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Computed_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'opt_Computed_Parameter', { dynamicArgs });
  }

  /** button from codegen */
  btn_Hypothesis_Select_Superiority_Computed_Parameter_Sample_Size_n_Power_Type_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Hypothesis_Select_Superiority_Computed_Parameter_Sample_Size_n_Power_Type_1', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Compute', { dynamicArgs });
  }
}
