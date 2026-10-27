// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: c8fd84efeb2202f53bf0b7af03f71dd45d305cecf9fe05ae1eccdd3dc9d83525)
import type { Page as PlaywrightPage } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { LoginPage } from './LoginPage.page.js';
import { ProjectsPage } from './ProjectsPage.page.js';
import { Page } from './Page.page.js';
import { InputSetPage } from './InputSetPage.page.js';
import { DesignPage } from './DesignPage.page.js';
import { ResultsPage } from './ResultsPage.page.js';

export { LoginPage } from './LoginPage.page.js';
export { ProjectsPage } from './ProjectsPage.page.js';
export { Page } from './Page.page.js';
export { InputSetPage } from './InputSetPage.page.js';
export { DesignPage } from './DesignPage.page.js';
export { ResultsPage } from './ResultsPage.page.js';

export function createPages(page: PlaywrightPage, selectors: Map<string, SelectorRow>) {
  return {
    LoginPage: new LoginPage(page, selectors),
    ProjectsPage: new ProjectsPage(page, selectors),
    Page: new Page(page, selectors),
    InputSetPage: new InputSetPage(page, selectors),
    DesignPage: new DesignPage(page, selectors),
    ResultsPage: new ResultsPage(page, selectors),
  };
}
export type Pages = ReturnType<typeof createPages>;
