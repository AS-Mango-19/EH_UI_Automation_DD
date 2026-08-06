// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: aa8439edfa58c91780488a210049764c81db36f002e4663570fe4118ec86b0c9)
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

  /** button from codegen */
  btn_Password(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_Password', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Project_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_Project_Name', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Time_Unit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'ddl_Time_Unit', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Study_Objective(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'ddl_Study_Objective', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Agent_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'ddl_Agent_Type', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Phase(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'ddl_Phase', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Population(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_Target_Population', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Unit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'ddl_Unit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Endpoint_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_Endpoint_Name', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Endpoint_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'obj_Endpoint_Type', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Outcome(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'obj_Outcome', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Dose_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_Dose_Name', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Dose_Level_mg(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_Dose_Level_mg', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Name_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Name_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_2', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Dose(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_Add_Dose', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Name_3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Name_4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Name_5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_5', { dynamicArgs });
  }

  /** dose 6 (data-driven dose count) */
  txt_dose_Name_6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_6', { dynamicArgs });
  }

  /** dose 6 (data-driven dose count) */
  txt_dose_Level_6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_6', { dynamicArgs });
  }

  /** dose 7 (data-driven dose count) */
  txt_dose_Name_7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_7', { dynamicArgs });
  }

  /** dose 7 (data-driven dose count) */
  txt_dose_Level_7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_7', { dynamicArgs });
  }

  /** dose 8 (data-driven dose count) */
  txt_dose_Name_8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_8', { dynamicArgs });
  }

  /** dose 8 (data-driven dose count) */
  txt_dose_Level_8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_8', { dynamicArgs });
  }

  /** dose 9 (data-driven dose count) */
  txt_dose_Name_9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Name_9', { dynamicArgs });
  }

  /** dose 9 (data-driven dose count) */
  txt_dose_Level_9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'txt_dose_Level_9', { dynamicArgs });
  }

  /** button from codegen */
  btn_Create_Project(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_Create_Project', { dynamicArgs });
  }

  /** button from codegen */
  btn_Inputs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectsPage', 'btn_Inputs', { dynamicArgs });
  }
}
