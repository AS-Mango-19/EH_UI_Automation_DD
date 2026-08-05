// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 0f0e50429ef5a151bd86c879fbfb7e074fbc16c45f12cdc0fd06dd2cf64776e2)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class LoginPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Username field (login flow) */
  txt_Username(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'LoginPage', 'txt_Username', { dynamicArgs });
  }

  /** Next button (login flow) */
  btn_Next(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'LoginPage', 'btn_Next', { dynamicArgs });
  }

  /** Password field (login flow) */
  txt_Password(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'LoginPage', 'txt_Password', { dynamicArgs });
  }

  /** Sign in button (login flow) */
  btn_Login(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'LoginPage', 'btn_Login', { dynamicArgs });
  }
}
