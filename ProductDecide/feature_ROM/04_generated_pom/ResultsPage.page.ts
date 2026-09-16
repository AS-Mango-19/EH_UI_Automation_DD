// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 9411783ccf0bfb2f6e868fcb38d69338851b8151cc67e6f1571507c65a09731f)
import type { Page as PlaywrightPage, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: PlaywrightPage,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ResultName', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_credit_alert_primary(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_credit_alert_primary', { dynamicArgs });
  }

  /** result link from codegen */
  lnk_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lnk_ResultName', { dynamicArgs });
  }

  /** Run status cell. VERIFY col-id against your app and adjust */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_RunStatus', { dynamicArgs });
  }

  /** Results grid to extract (mirrored from DOM(PD)/ProductDecide.DOM - shared results-grid UI) */
  tbl_Results(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'tbl_Results', { dynamicArgs });
  }

  /** Export results download trigger (mirrored from DOM(PD)/ProductDecide.DOM) */
  btn_ExportResults(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_ExportResults', { dynamicArgs });
  }
}
