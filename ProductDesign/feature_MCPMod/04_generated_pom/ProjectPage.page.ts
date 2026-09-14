// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 6cc13b7c044c2e149b347b8fd2bbc182d49d9d6d72d4b9ae2134ad28bef60703)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Project name input */
  txt_ProjectName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_ProjectName', { dynamicArgs });
  }

  /** Time unit dropdown */
  ddl_TimeUnit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_TimeUnit', { dynamicArgs });
  }

  /** Start date input */
  txt_StartDate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_StartDate', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Phase(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Phase', { dynamicArgs });
  }

  /** Endpoint name input */
  txt_EndpointName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_EndpointName', { dynamicArgs });
  }

  /** Endpoint type dropdown */
  ddl_EndpointType(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_EndpointType', { dynamicArgs });
  }

  /** Better response direction dropdown */
  ddl_BetterResponse(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_BetterResponse', { dynamicArgs });
  }

  /** Save project button */
  btn_SaveProject(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_SaveProject', { dynamicArgs });
  }

  /** Element carrying the generated project id in data-id */
  lbl_ProjectId(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'lbl_ProjectId', { dynamicArgs });
  }

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

  /** textbox from codegen */
  txt_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Better_Response', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Larger_Value(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Larger_Value', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Follow_up_Time_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Follow_up_Time_Week', { dynamicArgs });
  }

  /** button from codegen */
  btn_Create_Project(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Create_Project', { dynamicArgs });
  }

  /** button from codegen */
  btn_Inputs(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Inputs', { dynamicArgs });
  }

  /** Endpoint type dropdown by label (robust vs the value-trigger ddl_Endpoint_Type) */
  ddl_Endpoint_Type_Label(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Endpoint_Type_Label', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Unit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Unit', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Unit_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Unit_Name', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Better_Response', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Name_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Name_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_2(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_2', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Name_3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Name_4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_4', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_4(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_4', { dynamicArgs });
  }

  /** button from codegen */
  btn_Add_Arm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Add_Arm', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Name_5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_5(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_5', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_arm_Name_6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_6', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_dose_Level_6(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_6', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern (never recorded past arm 6 but the id sequence is proven stable) */
  txt_arm_Name_7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_7', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_dose_Level_7(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_7', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_arm_Name_8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_8', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_dose_Level_8(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_8', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_arm_Name_9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_9', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_dose_Level_9(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_9', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_arm_Name_10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_10', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_dose_Level_10(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_10', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_arm_Name_11(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_arm_Name_11', { dynamicArgs });
  }

  /** textbox mirrored from arm 1-6 pattern */
  txt_dose_Level_11(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_dose_Level_11', { dynamicArgs });
  }
}
