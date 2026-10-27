// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 068a396c6d5e3bd87c4dfa89b1b45b96a016f02ee6ecb2747d1e255a8aa10eb7)
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
  txt_Control_Arm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Control_Arm', { dynamicArgs });
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

  /** checkbox from codegen */
  chk_Variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'chk_Variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Stratification(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'chk_Stratification', { dynamicArgs });
  }

  /** Add Factor link - confirmed live for creating Factor 1 only. The recording used a DIFFERENT selector (#Factors-0) for Factor 2/3, and live evidence this session confirmed reusing this same role=link click for Factor 2 does not work (click succeeds but Level_1-1 never appears) */
  lnk_Add_Factor(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'lnk_Add_Factor', { dynamicArgs });
  }

  /** Add Factor trigger for the 2nd+ factor - confirmed in recording.txt (used for Factor 2 and Factor 3 additions, distinct from the role=link selector used for Factor 1) */
  btn_Add_Factor_2plus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Add_Factor_2plus', { dynamicArgs });
  }

  /** Add Level button, scoped to whichever factor panel is currently focused - confirmed live via new recording.txt */
  btn_Add_Level(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Add_Level', { dynamicArgs });
  }

  /** Factor 1 Level 1 name - confirmed live via new recording.txt */
  'txt_Level_1-0'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_1-0', { dynamicArgs });
  }

  /** Factor 1 Level 2 name - confirmed live via new recording.txt */
  'txt_Level_2-0'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_2-0', { dynamicArgs });
  }

  /** Factor 1 Level 3 name - confirmed live via new recording.txt */
  'txt_Level_3-0'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_3-0', { dynamicArgs });
  }

  /** Factor 1 Level 4 name - id pattern extrapolated, not itself confirmed live */
  'txt_Level_4-0'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_4-0', { dynamicArgs });
  }

  /** Factor 1 Level 5 name - id pattern extrapolated, not itself confirmed live */
  'txt_Level_5-0'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_5-0', { dynamicArgs });
  }

  /** Factor 2 Level 1 name - confirmed live via new recording.txt */
  'txt_Level_1-1'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_1-1', { dynamicArgs });
  }

  /** Factor 2 Level 2 name - confirmed live via new recording.txt */
  'txt_Level_2-1'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_2-1', { dynamicArgs });
  }

  /** Factor 2 Level 3 name - confirmed live via new recording.txt */
  'txt_Level_3-1'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_3-1', { dynamicArgs });
  }

  /** Factor 3 Level 1 name - confirmed live via new recording.txt */
  'txt_Level_1-2'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_1-2', { dynamicArgs });
  }

  /** Factor 3 Level 2 name - confirmed live via new recording.txt */
  'txt_Level_2-2'(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_2-2', { dynamicArgs });
  }

  /** button from codegen */
  btn_Create_Project(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Create_Project', { dynamicArgs });
  }

  /** button from codegen */
  btn_Inputs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Inputs', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Month(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Follow_up_Time_Month', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Factor(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Factor', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_1_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_1_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_2_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_2_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_btn_Levels(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_btn_Levels', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_3_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_3_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Factors_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Factors_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_1_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_1_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_2_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_2_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_3_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_3_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_1_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_1_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_2_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_2_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_3_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_3_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Level_4_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Level_4_2', { dynamicArgs });
  }
}
