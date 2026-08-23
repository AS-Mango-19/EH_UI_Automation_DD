// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 880fd6e9550c4700f8a974606ee3d118e5bc171f5f7896b4fb049899836a812e)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectsPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Open new-project dialog */
  btn_NewProject(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_NewProject', { dynamicArgs });
  }

  /** New Project button (login flow landing) */
  btn_New_Project(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_New_Project', { dynamicArgs });
  }

  /** loading overlay (login flow landing) */
  div_Spinner(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'div_Spinner', { dynamicArgs });
  }
}
