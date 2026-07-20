// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: f00709c3230c404c5a62d56a7b9c2b8da1a87e1f1328ad9b67bf6cac973dfa55)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Optimal / Minimax dropdown */
  ddl_DesignType(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'ddl_DesignType', { dynamicArgs });
  }

  /** Upper limit for sample size */
  txt_UpperLimit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_UpperLimit', { dynamicArgs });
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

  /** p0 input */
  txt_PropNull(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_PropNull', { dynamicArgs });
  }

  /** p1 input */
  txt_PropAlt(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'txt_PropAlt', { dynamicArgs });
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
