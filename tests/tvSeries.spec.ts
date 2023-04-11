import { test, expect } from '@playwright/test'
import { openPathAndCloseCookiesPopup } from '../lib'

const KUMMELI_PAGE_ID = '1-3339547'

test.beforeEach(openPathAndCloseCookiesPopup(`/${KUMMELI_PAGE_ID}`))

test.describe('Kummeli', () => {
  test('should have valid episode for Kummeli S3E5', async ({ page }) => {
    await page.getByRole('button', { name: 'Kausi 3' }).click()
    const locator = page
      .locator('li')
      .filter({ hasText: '5. Kummeli' })
      .filter({ hasText: 'ti 8.3.2016' })

    await expect(locator).toHaveCount(1)
  })
})
