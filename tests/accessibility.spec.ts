import { test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const targets = ['/tv/opas', '/tv', '/1-3339547']

test.describe.only('accessibility analyzes', () => {
  for (const target of targets) {
    test(target, async ({ page }, testInfo) => {
      await page.goto(target)
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
      testInfo.attach(`${target} accessibility analysis`, {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      })
    })
  }
})
