// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 92a934b5b13feb93ca91da4c6d51bf58ee39f4f8089a59fe4666e8e931bfa2d8)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_Project_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Project_Name', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Time_Unit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Time_Unit', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Study_Objective(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Study_Objective', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Phase(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Phase', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Population(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Target_Population', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Treatment_Arm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Treatment_Arm', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Priority(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'obj_Priority', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Endpoint_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Endpoint_Name', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Endpoint_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Endpoint_Type', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Better_Response', { dynamicArgs });
  }

  /** button from codegen */
  btn_Create_Project(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Create_Project', { dynamicArgs });
  }

  /** button from codegen */
  btn_Inputs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Inputs', { dynamicArgs });
  }
}
