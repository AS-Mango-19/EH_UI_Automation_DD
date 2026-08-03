// AUTO-GENERATED — DO NOT EDIT. Source: 02_selectors_repo/selectors.csv (hash: 841b560c82a62cc809c97a228964803e082a2e308f5ec59692ff9006ba93281f)
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
