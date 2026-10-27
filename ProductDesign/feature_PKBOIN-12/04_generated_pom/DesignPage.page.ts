// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: ede07f7560a7aa15d6a3cf21600c37120eeaed675fb306cdd80661c9fc85b155)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** button from codegen */
  btn_Design_Compute_or_simulate_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Design_Compute_or_simulate_a', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Scenarios(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Scenarios', { dynamicArgs });
  }
}
