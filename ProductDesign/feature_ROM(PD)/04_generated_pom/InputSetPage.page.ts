// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: 699c4f50134cf016d55e7ab4e9d0e1a607586c11ca6d69e7f4515fb0f95709c7)
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

  /** textbox from codegen */
  txt_Name_Input_Set(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'txt_Name_Input_Set', { dynamicArgs });
  }

  /** button from codegen */
  btn_Select_Task(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'btn_Select_Task', { dynamicArgs });
  }

  /** Test picker custom dropdown on the input-set page. #test is the combobox input - the input-set page has no LABEL elements at all so label targeting is impossible here */
  ddl_Select_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'ddl_Select_Test', { dynamicArgs });
  }

  /** textbox from codegen */
  ddl_react_select_input_container(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'ddl_react_select_input_container', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_test_Id_14(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'txt_test_Id_14', { dynamicArgs });
  }

  /** button from codegen */
  btn_Continue(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'btn_Continue', { dynamicArgs });
  }
}
