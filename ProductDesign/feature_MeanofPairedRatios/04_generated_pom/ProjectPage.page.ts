// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: aa613734c48dd61ceb33b4b538f825875f3f1e1f911be49c7d2a97ff88b36b1e)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_project_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_project_Name', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Time_Unit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Time_Unit', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_MM_dd_yyyy(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_MM_dd_yyyy', { dynamicArgs });
  }

  /** button from codegen */
  btn_Study_Objective(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Study_Objective', { dynamicArgs });
  }

  /** choice from codegen */
  opt_Study_Objective(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Study_Objective', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Phase(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Phase', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_population_Name_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_population_Name_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_treatment_Arm_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_treatment_Arm_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_endpoint_Name_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_endpoint_Name_0', { dynamicArgs });
  }

  /** button from codegen */
  btn_Endpoint_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Endpoint_Type', { dynamicArgs });
  }

  /** choice from codegen */
  opt_Endpoint_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Endpoint_Type', { dynamicArgs });
  }

  /** button from codegen */
  btn_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Better_Response', { dynamicArgs });
  }

  /** choice from codegen */
  opt_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Better_Response', { dynamicArgs });
  }

  /** button from codegen */
  btn_Create_Project(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Create_Project', { dynamicArgs });
  }

  /** button from codegen */
  btn_Inputs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Inputs', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Study_Objective(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Study_Objective', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Endpoint_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Endpoint_Type', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Better_Response', { dynamicArgs });
  }
}
