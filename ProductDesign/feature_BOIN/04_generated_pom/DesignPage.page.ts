// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: aa8439edfa58c91780488a210049764c81db36f002e4663570fe4118ec86b0c9)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class DesignPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** button from codegen */
  btn_Design_Compute_or_simulate_a(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'btn_Design_Compute_or_simulate_a', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_1(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_1', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Curve_Family(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Curve_Family', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Number_of_Simulations_Run(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Number_of_Simulations_Run', { dynamicArgs });
  }

  /** clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field) */
  obj_Status(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'DesignPage', 'obj_Status', { dynamicArgs });
  }
}
