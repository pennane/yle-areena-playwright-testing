import { test, expect } from '@playwright/test'
import { openPathAndCloseCookiesPopup } from '../lib'

test.beforeEach(openPathAndCloseCookiesPopup(`/tv/opas`))

test.describe('recurring 22.00 news program', () => {
  test('should have Kymmenen uutiset at 22.00', async ({ page }) => {
    const locator = page
      .locator('[itemtype="http://schema.org/TVEpisode"]')
      .filter({ hasText: '22.00' })
      .filter({ hasText: 'Kymmenen uutiset' })

    await expect(locator).toHaveCount(1)
  })
})

test.describe('channel logos', () => {
  const ARIA_LABELS = [
    'TV Finland',
    'National Geographic',
    'Frii',
    'Hero',
    'Ava',
    'STAR Channel',
    'TLC',
    'Kutonen',
    'JIM',
    'Liv',
    'TV5',
    'Sub',
    'Nelonen',
    'MTV3',
    'Yle Areena',
    'Yle Teema Fem',
    'Yle TV2',
    'Yle TV1'
  ]
  test('should have different channels visible', async ({ page }) => {
    for (const label of ARIA_LABELS) {
      const locator = page.getByLabel(label)
      await expect(locator).toHaveCount(1)
    }
  })
})
