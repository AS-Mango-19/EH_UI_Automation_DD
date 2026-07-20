// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: 699c4f50134cf016d55e7ab4e9d0e1a607586c11ca6d69e7f4515fb0f95709c7)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ResultsPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** textbox from codegen */
  txt_sample_Size(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_sample_Size', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_Test_Type(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_Test_Type', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_type1Error(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_type1Error', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mean_Control(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_mean_Control', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_mean_Treatment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_mean_Treatment', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_test_Statistic(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_test_Statistic', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_coefficient_Of_Variation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_coefficient_Of_Variation', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_follow_Up_Time(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_follow_Up_Time', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_probability_Of_Dropout(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_probability_Of_Dropout', { dynamicArgs });
  }

  /** button from codegen */
  btn_Enrollment(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Enrollment', { dynamicArgs });
  }

  /** checkbox from codegen */
  chk_Include(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'chk_Include', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_id_enrollment_Table_0_avg_Subjects_Enrolled(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_id_enrollment_Table_0_avg_Subjects_Enrolled', { dynamicArgs });
  }

  /** Save button. Exact=TRUE because "Save" is a substring of the adjacent "Save & Compute" button and a substring match ties with both */
  btn_Save(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Save', { dynamicArgs });
  }

  /** textbox from codegen */
  txt_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'txt_ResultName', { dynamicArgs });
  }

  /** Confirm button inside the credit-alert modal. MUST be css not role: the modal is shown but carries aria-hidden=true so ARIA queries cannot see inside it - getByRole(button Compute) skips this button and matches the Save & Compute button behind the modal instead which the modal then blocks */
  btn_Compute(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'btn_Compute', { dynamicArgs });
  }

  /** AG Grid root on the results list page. Used to confirm the app landed on the grid and as the extractTable target - readGrid falls back to the ARIA row/gridcell path for div grids */
  tbl_Results(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'tbl_Results', { dynamicArgs });
  }

  /** Run status DATA cell in the results AG Grid. role=gridcell is load-bearing: AG Grid puts col-id on the HEADER cell too (role=columnheader class=ag-header-cell) and waitForSimulation takes .first() so a bare col-id selector polls the header text Status forever instead of the badge. textContent picks up the nested span.badge */
  lbl_RunStatus(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lbl_RunStatus', { dynamicArgs });
  }

  /** result link from codegen */
  lnk_ResultName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ResultsPage', 'lnk_ResultName', { dynamicArgs });
  }
}
