// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: f2d504acae343395b7749a0277fca401ded4c6aa82d4ac0675c866feb39c8dd7)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Allocation ratio input */
  txt_Allocation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Allocation', { dynamicArgs });
  }

  /** Target power input */
  txt_Power(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Power', { dynamicArgs });
  }

  /** 1-Sided / 2-Sided dropdown */
  ddl_TestType(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_TestType', { dynamicArgs });
  }

  /** Type-1 error input */
  txt_Type1Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_Type1Error', { dynamicArgs });
  }

  /** Mean under control arm */
  txt_MeanControl(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_MeanControl', { dynamicArgs });
  }

  /** Mean under treatment arm */
  txt_MeanTreatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_MeanTreatment', { dynamicArgs });
  }

  /** Common standard deviation */
  txt_StdDev(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_StdDev', { dynamicArgs });
  }

  /** Compute / simulate button */
  btn_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Compute', { dynamicArgs });
  }

  /** Status polled during simulation */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'lbl_RunStatus', { dynamicArgs });
  }
}
