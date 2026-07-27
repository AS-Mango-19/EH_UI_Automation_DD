// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 969e8ecc94fc75b3cbddc0167e1545b7699f12ae5c6c0705949692288cb245fd)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class InputSetPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** button from codegen */
  btn_New_Input_Set(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'btn_New_Input_Set', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_collection_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'txt_collection_Name', { dynamicArgs });
  }
}
