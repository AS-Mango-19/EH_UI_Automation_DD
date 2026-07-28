// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: ae965825ad17271437baf18f262b9edb844394766551176eb96af127009b1437)
import type { Page } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { LoginPage } from './LoginPage.page.js';
import { ProjectsPage } from './ProjectsPage.page.js';
import { ProjectPage } from './ProjectPage.page.js';
import { ResultsPage } from './ResultsPage.page.js';
import { InputSetPage } from './InputSetPage.page.js';
import { DesignPage } from './DesignPage.page.js';
import { Page } from './Page.page.js';

export { LoginPage } from './LoginPage.page.js';
export { ProjectsPage } from './ProjectsPage.page.js';
export { ProjectPage } from './ProjectPage.page.js';
export { ResultsPage } from './ResultsPage.page.js';
export { InputSetPage } from './InputSetPage.page.js';
export { DesignPage } from './DesignPage.page.js';
export { Page } from './Page.page.js';

export function createPages(page: Page, selectors: Map<string, SelectorRow>) {
  return {
    LoginPage: new LoginPage(page, selectors),
    ProjectsPage: new ProjectsPage(page, selectors),
    ProjectPage: new ProjectPage(page, selectors),
    ResultsPage: new ResultsPage(page, selectors),
    InputSetPage: new InputSetPage(page, selectors),
    DesignPage: new DesignPage(page, selectors),
    Page: new Page(page, selectors),
  };
}
export type Pages = ReturnType<typeof createPages>;
