// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: b6e6503372de09eeebfbab5afd0728d96ece9b78b338671cc34220b45570cce1)
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

  /** button from codegen */
  btn_Add_Endpoint(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Add_Endpoint', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_priority_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_priority_0', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Priority(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Priority', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_endpoint_Name_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_endpoint_Name_0', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_type_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_type_0', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_better_Response_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_better_Response_0', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Variable(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'chk_Variable', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_follow_Up_Time_0_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_follow_Up_Time_0_0', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_priority_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_priority_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_endpoint_Name_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_endpoint_Name_1', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_type_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_type_1', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_better_Response_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_better_Response_1', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_follow_Up_Time_1_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_follow_Up_Time_1_0', { dynamicArgs });
  }

  /** EP1's row Variable checkbox - confirmed live via a strict-mode-violation error log (the id matches the testdata column name exactly, same universal pattern as every other field in this feature). Supersedes an earlier XPath guess that was too broad (also matched #endpointName-0). */
  ep1Variable_Row(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ep1Variable_Row', { dynamicArgs });
  }

  /** EP2's row Variable checkbox - same fix as ep1Variable_Row, id=variable-1_0 by the same pattern (not yet independently confirmed live, but the pattern held for every field checked so far). */
  ep2Variable_Row(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ep2Variable_Row', { dynamicArgs });
  }
}
