// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: f2d504acae343395b7749a0277fca401ded4c6aa82d4ac0675c866feb39c8dd7)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class InputSetPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Input set name input */
  txt_InputSetName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'txt_InputSetName', { dynamicArgs });
  }

  /** Task dropdown (Design) */
  ddl_SelectTask(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'ddl_SelectTask', { dynamicArgs });
  }

  /** Statistical test dropdown */
  ddl_Test(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'ddl_Test', { dynamicArgs });
  }

  /** Create input set button */
  btn_CreateInputSet(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'InputSetPage', 'btn_CreateInputSet', { dynamicArgs });
  }
}
