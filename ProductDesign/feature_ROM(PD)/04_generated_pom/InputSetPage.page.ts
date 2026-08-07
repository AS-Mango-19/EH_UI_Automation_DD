// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 863e7d5c8a40ebc4cd9bd7d56e0b0d86581c8356505ebf636b35a4df4f91819f)
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

  /** Task dropdown (Design) */
  ddl_SelectTask(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'ddl_SelectTask', { dynamicArgs });
  }

  /** Statistical test dropdown */
  ddl_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'ddl_Test', { dynamicArgs });
  }

  /** button from codegen */
  btn_Continue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'btn_Continue', { dynamicArgs });
  }
}
