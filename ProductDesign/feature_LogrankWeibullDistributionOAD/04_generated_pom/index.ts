// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: d4f32c3a37d08e3eb67c3ebd2a4c7c193716aefc2c3ac27b98b93a76bbafc1ef)
import type { Page } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { LoginPage } from './LoginPage.page.js';
import { ProjectsPage } from './ProjectsPage.page.js';
import { InputSetPage } from './InputSetPage.page.js';
import { DesignPage } from './DesignPage.page.js';
import { ResultsPage } from './ResultsPage.page.js';

export { LoginPage } from './LoginPage.page.js';
export { ProjectsPage } from './ProjectsPage.page.js';
export { InputSetPage } from './InputSetPage.page.js';
export { DesignPage } from './DesignPage.page.js';
export { ResultsPage } from './ResultsPage.page.js';

export function createPages(page: Page, selectors: Map<string, SelectorRow>) {
  return {
    LoginPage: new LoginPage(page, selectors),
    ProjectsPage: new ProjectsPage(page, selectors),
    InputSetPage: new InputSetPage(page, selectors),
    DesignPage: new DesignPage(page, selectors),
    ResultsPage: new ResultsPage(page, selectors),
  };
}
export type Pages = ReturnType<typeof createPages>;
