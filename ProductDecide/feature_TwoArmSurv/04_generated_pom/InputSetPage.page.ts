// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: e69413635787fc39137a5963fab982190411a61c10d27806935d123f3438be41)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class InputSetPage {
  constructor(
    private readonly page: PlaywrightPage,
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

  /** button from codegen */
  btn_Select_Task(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'btn_Select_Task', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Select_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'ddl_Select_Test', { dynamicArgs });
  }

  /** button from codegen */
  btn_Continue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'btn_Continue', { dynamicArgs });
  }
}
