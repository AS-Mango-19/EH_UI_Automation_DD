// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: 699c4f50134cf016d55e7ab4e9d0e1a607586c11ca6d69e7f4515fb0f95709c7)
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

  /** Time Unit custom dropdown. Label-targeted: the walk finds the combobox input next to the label. Never target react-select__input-container itself - it is a ~2px grid cell behind the selected-value node and is not clickable */
  ddl_Time_Unit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Time_Unit', { dynamicArgs });
  }

  /** Phase custom dropdown. Label text really is "Phase (Optional)" */
  ddl_Phase(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Phase', { dynamicArgs });
  }

  /** Endpoint Type custom dropdown in the endpoints TABLE. Cannot be label-targeted: "Endpoint Type" is a TH in THEAD while the button is a TD in TBODY so no sibling/parent walk reaches it. #type-0 is the button; -0 is the endpoint row index */
  ddl_Endpoint_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Endpoint_Type', { dynamicArgs });
  }

  /** Better Response custom dropdown in the endpoints TABLE - same THEAD/TBODY split as Endpoint Type. Options depend on Endpoint Type so step 150 must run first */
  ddl_Better_Response(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Better_Response', { dynamicArgs });
  }

  /** option from codegen */
  opt_Month(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Month', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_MM_dd_yyyy(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_MM_dd_yyyy', { dynamicArgs });
  }

  /** option from codegen */
  opt_Choose_Wednesday_July_15th(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Choose_Wednesday_July_15th', { dynamicArgs });
  }

  /** button from codegen */
  btn_Select(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_Select', { dynamicArgs });
  }

  /** Study Objective menu option. Exact=TRUE because the menu also contains a Multiple Endpoints variant that a substring match ties with */
  opt_Two_Arm_Confirmatory(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_Two_Arm_Confirmatory', { dynamicArgs });
  }

  /** textbox from codegen */
  ddl_react_creatable_select_input_container(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_react_creatable_select_input_container', { dynamicArgs });
  }

  /** option from codegen */
  opt_3(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'opt_3', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_population_Name_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_population_Name_0', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_control_Arm_0(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_control_Arm_0', { dynamicArgs });
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

  /** textbox from codegen */
  txt_Follow_up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_Follow_up_Time', { dynamicArgs });
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
