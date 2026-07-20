// AUTO-GENERATED — DO NOT EDIT. Source: 03_selectors_repo/selectors.csv (hash: f00709c3230c404c5a62d56a7b9c2b8da1a87e1f1328ad9b67bf6cac973dfa55)
import type { Page, Locator } from 'playwright';
import type { SelectorRow } from '../../../core/schema/selectors.schema.js';
import { resolveLocator } from '../../../core/locators/resolver.js';

export class ProjectPage {
  constructor(
    private readonly page: Page,
    private readonly selectors: Map<string, SelectorRow>,
  ) {}

  /** Project name input */
  txt_ProjectName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_ProjectName', { dynamicArgs });
  }

  /** Time unit dropdown */
  ddl_TimeUnit(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_TimeUnit', { dynamicArgs });
  }

  /** Start date input */
  txt_StartDate(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_StartDate', { dynamicArgs });
  }

  /** Study phase dropdown */
  ddl_Phase(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_Phase', { dynamicArgs });
  }

  /** Target population dropdown */
  ddl_TargetPopulation(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_TargetPopulation', { dynamicArgs });
  }

  /** Treatment arm input */
  txt_TreatmentArm(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_TreatmentArm', { dynamicArgs });
  }

  /** Endpoint name input */
  txt_EndpointName(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'txt_EndpointName', { dynamicArgs });
  }

  /** Endpoint type dropdown */
  ddl_EndpointType(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_EndpointType', { dynamicArgs });
  }

  /** Better response direction dropdown */
  ddl_BetterResponse(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'ddl_BetterResponse', { dynamicArgs });
  }

  /** Save project button */
  btn_SaveProject(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'btn_SaveProject', { dynamicArgs });
  }

  /** Element carrying the generated project id in data-id */
  lbl_ProjectId(...dynamicArgs: string[]): Promise<Locator> {
    return resolveLocator(this.page, this.selectors, 'ProjectPage', 'lbl_ProjectId', { dynamicArgs });
  }
}
