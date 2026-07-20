// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: f00709c3230c404c5a62d56a7b9c2b8da1a87e1f1328ad9b67bf6cac973dfa55)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectsPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Open new-project dialog */
  btn_NewProject(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_NewProject', { dynamicArgs });
  }
}
