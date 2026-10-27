// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 77e704eb23b947be63a5fc93f54602f06430faa2a4b5ef1a541973a63a002172)
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
