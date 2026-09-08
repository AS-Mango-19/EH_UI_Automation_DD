// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 80fe7642728721e0dd70036273db058a0c65c240f5af056f4c9c85e2c32f25b3)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** native <select> from codegen */
  ddl_Input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Input_Method', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_input_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_input_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Target_Value_TV_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Target_Value_TV_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Lower_Ref_Value_LRV_Week(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Lower_Ref_Value_LRV_Week', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_User_Interest_Value_UIV(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_User_Interest_Value_UIV', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_target_Value(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_target_Value', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_lower_Ref_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_lower_Ref_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_user_Interest_Val(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_user_Interest_Val', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Events(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Events', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Maturity(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Maturity', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Desired_Confidence_DC(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Desired_Confidence_DC', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_desired_Confidence_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_desired_Confidence_Input', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_acceptable_Risk_Input(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_acceptable_Risk_Input', { dynamicArgs });
  }

  /** native <select> from codegen */
  ddl_Method(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_Method', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Event_Rate_ER(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Event_Rate_ER', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Events_e(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Events_e', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save', { dynamicArgs });
  }

  /** button from codegen */
  btn_Save_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Save_Compute', { dynamicArgs });
  }
}
