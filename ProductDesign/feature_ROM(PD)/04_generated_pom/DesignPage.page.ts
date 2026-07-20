// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: 699c4f50134cf016d55e7ab4e9d0e1a607586c11ca6d69e7f4515fb0f95709c7)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_Hypothesis(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Hypothesis', { dynamicArgs });
  }

  /** choice from codegen */
  opt_Computed_Parameter(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'opt_Computed_Parameter', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Compute', { dynamicArgs });
  }
}
