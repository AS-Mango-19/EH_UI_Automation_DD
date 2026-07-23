// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 3e96e4c9637c0c58efe2bd2ba69ae0f8bee994534ce929888fb67727ad4f2b05)
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
