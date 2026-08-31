/**
 * ROP(PD) simulation custom step — the "Recalculate prior too extreme" fix.
 *
 * Same mechanism proven on GADAR(PD) TC_12 and DOM(PD) TC_03 (see
 * custom/GADAR(PD)/customSteps.ts): the sim's Design-tab Recalculate builds its
 * /engine/boundary `testParams` (the EFFECT SIZE — here the proportion parameters
 * πc / πt / ratio) from the RESPONSE tab's model, and that model is only populated
 * once the Response tab has been MOUNTED. The recording Recalculates BEFORE ever
 * visiting Response, so the automated payload omits the effect size, the solver
 * returns "prior parameters too extreme" (returnValue -10001), the design turns
 * invalid, and the Response tab then renders NO controls — so the following
 * `select ddl_Distribution` (#distributionSelect) fails "unable to resolve".
 *
 * The fix (per the tester): GO TO the Response tab and COME BACK to Design before
 * Recalculate. Visiting Response binds its inputs into the model; returning to Design
 * makes the automated Recalculate payload carry the proportion params like a manual
 * solve. Wired as a callCustom step immediately BEFORE `click btn_Recalculate`.
 */
import type { Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import { logger } from '../../core/utils/logger.js';

export const loadResponseTabIntoModel: KeywordHandler = async (page: Page) => {
  // First ensure we are on the DESIGN tab (the tester's sequence: Design -> Response ->
  // back to Design, BEFORE any design field is filled), so the round-trip binds the
  // Response model into a clean, unedited design.
  await page.locator('[id="leftPanel.designs"]').first().click({ timeout: 8000 }).catch(() => undefined);
  await page.waitForTimeout(400);
  const response = page.getByRole('button', { name: 'Response' }).first();
  if (!(await response.count().catch(() => 0))) {
    logger.warn('loadResponseTabIntoModel: Response tab not found — cannot preload the proportion effect size.');
    return;
  }
  await response.click({ timeout: 8000 }).catch(() => undefined);
  // Wait for a Response-tab control to render so its values bind into the model.
  await page
    .locator('#distributionSelect, #propUnderControl, [id*="propUnder"]')
    .first()
    .waitFor({ state: 'visible', timeout: 12000 })
    .catch(() => undefined);
  await page.waitForTimeout(800);
  // Return to the Design tab and wait for Recalculate to be ready again.
  await page.locator('[id="leftPanel.designs"]').first().click({ timeout: 8000 }).catch(() => undefined);
  await page
    .getByRole('button', { name: 'Recalculate' })
    .first()
    .waitFor({ state: 'visible', timeout: 12000 })
    .catch(() => undefined);
  await page.waitForTimeout(500);
  logger.info('loadResponseTabIntoModel: mounted Response tab into the model, back on Design (proportion testParams loaded).');
};

export default { loadResponseTabIntoModel };
