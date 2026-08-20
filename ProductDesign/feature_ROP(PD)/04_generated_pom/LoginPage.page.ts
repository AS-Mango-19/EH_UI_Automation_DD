// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 7efb7ad16664c9d46b5c57e82677b737c3b3ae9b009334e4c6b84270cdb7837f)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class LoginPage {
  constructor(
    private readonly page: PlaywrightPage,
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
