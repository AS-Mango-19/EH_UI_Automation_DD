// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 43376e0563071c3d7990c60cffd23d8b685ef57b78f3fadf587a0efdfc3de11c)
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
