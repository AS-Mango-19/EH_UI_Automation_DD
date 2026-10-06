// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: cd90fd2ee84119f9a1a5ef40969b78cbc779984cb38ff08b97b7c9fd97c173bc)
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
