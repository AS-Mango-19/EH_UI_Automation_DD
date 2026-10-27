// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 22cffecb1f0ca8f89a5c6a01c778674b2812972da856dcb717743adef55e746a)
import type { Page as PlaywrightPage } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { LoginPage } from './LoginPage.page.js';
import { ProjectsPage } from './ProjectsPage.page.js';
import { ProjectPage } from './ProjectPage.page.js';
import { InputSetPage } from './InputSetPage.page.js';
import { DesignPage } from './DesignPage.page.js';
import { ResultsPage } from './ResultsPage.page.js';
import { Page } from './Page.page.js';

export { LoginPage } from './LoginPage.page.js';
export { ProjectsPage } from './ProjectsPage.page.js';
export { ProjectPage } from './ProjectPage.page.js';
export { InputSetPage } from './InputSetPage.page.js';
export { DesignPage } from './DesignPage.page.js';
export { ResultsPage } from './ResultsPage.page.js';
export { Page } from './Page.page.js';

export function createPages(page: PlaywrightPage, selectors: Map<string, SelectorRow>) {
  return {
    LoginPage: new LoginPage(page, selectors),
    ProjectsPage: new ProjectsPage(page, selectors),
    ProjectPage: new ProjectPage(page, selectors),
    InputSetPage: new InputSetPage(page, selectors),
    DesignPage: new DesignPage(page, selectors),
    ResultsPage: new ResultsPage(page, selectors),
    Page: new Page(page, selectors),
  };
}
export type Pages = ReturnType<typeof createPages>;
