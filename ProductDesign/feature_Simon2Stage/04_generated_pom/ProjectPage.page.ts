// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 709fdc7aac0ec062bab85ff9bf5eda67190cfb82f4c2ef40dcd4a6cb9ff82aa9)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectPage {
  constructor(
    private readonly page: Page,
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

  /** Target population dropdown */
  ddl_TargetPopulation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_TargetPopulation', { dynamicArgs });
  }

  /** Treatment arm input */
  txt_TreatmentArm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_TreatmentArm', { dynamicArgs });
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
  txt_project_Name(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_project_Name', { dynamicArgs });
  }

  /** dropdown (opener+option collapsed into one select step) */
  ddl_Start_Date(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Start_Date', { dynamicArgs });
  }

  /** button from codegen */
  btn_Study_Objective(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Study_Objective', { dynamicArgs });
  }

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Study_Objective(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Study_Objective', { dynamicArgs });
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

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Endpoint_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Endpoint_Type', { dynamicArgs });
  }

  /** button from codegen */
  btn_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Better_Response', { dynamicArgs });
  }

  /** choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option) */
  opt_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Better_Response', { dynamicArgs });
  }
}
