// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: f2d504acae343395b7749a0277fca401ded4c6aa82d4ac0675c866feb39c8dd7)
import type { Page } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { LoginPage } from './LoginPage.page.js';
import { ProjectsPage } from './ProjectsPage.page.js';
import { ProjectPage } from './ProjectPage.page.js';
import { InputSetPage } from './InputSetPage.page.js';
import { DesignPage } from './DesignPage.page.js';
import { ResultsPage } from './ResultsPage.page.js';

export { LoginPage } from './LoginPage.page.js';
export { ProjectsPage } from './ProjectsPage.page.js';
export { ProjectPage } from './ProjectPage.page.js';
export { InputSetPage } from './InputSetPage.page.js';
export { DesignPage } from './DesignPage.page.js';
export { ResultsPage } from './ResultsPage.page.js';

export function createPages(page: Page, selectors: Map<string, SelectorRow>) {
  return {
    LoginPage: new LoginPage(page, selectors),
    ProjectsPage: new ProjectsPage(page, selectors),
    ProjectPage: new ProjectPage(page, selectors),
    InputSetPage: new InputSetPage(page, selectors),
    DesignPage: new DesignPage(page, selectors),
    ResultsPage: new ResultsPage(page, selectors),
  };
}
export type Pages = ReturnType<typeof createPages>;
