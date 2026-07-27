// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 83ccbd0cc5f04b0a59d4a797846a97c88f9d16db142a6ddddd0cc08cbd53433e)
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
  btn_Save_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Compute', { dynamicArgs });
  }
}
