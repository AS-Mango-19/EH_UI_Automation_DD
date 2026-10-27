import type { KeywordHandler } from '../../core/keywords/types.js';

function isMissing(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return normalized === '' || normalized === 'n/a' || normalized === 'na';
}

export const configurePerScenarioPkMeans: KeywordHandler = async (page, ctx, step) => {
  for (let doseIndex = 0; doseIndex < 10; doseIndex += 1) {
    const token = `\${data.scenarios.deChartTable.2.dose${doseIndex + 1}}`;
    let value = '';
    try {
      value = ctx.resolve(token, { stepId: step.stepId, column: 'InputValue' }).trim();
    } catch {
      continue;
    }
    if (isMissing(value)) continue;

    const doseHeader = page.getByText(new RegExp(`^Dose ${doseIndex + 1} \\(`)).first();
    await doseHeader.click({ timeout: step.timeout });

    const input = page.locator(`[id="deChartTable.2.dose${doseIndex + 1}"]`).first();
    await input.waitFor({ state: 'visible', timeout: step.timeout });
    await input.fill(value, { timeout: step.timeout });
    await input.press('Tab').catch(() => undefined);
    const actual = (await input.inputValue().catch(() => '')).trim();
    if (actual !== value) {
      throw new Error(`configurePerScenarioPkMeans: dose ${doseIndex + 1} read back "${actual}" instead of "${value}".`);
    }
  }
};