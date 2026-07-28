// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: ae965825ad17271437baf18f262b9edb844394766551176eb96af127009b1437)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectsPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** New Project button (login flow landing) */
  btn_New_Project(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_New_Project', { dynamicArgs });
  }

  /** loading overlay (login flow landing) */
  div_Spinner(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'div_Spinner', { dynamicArgs });
  }
}
