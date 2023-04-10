import { Page } from 'playwright-core'

export const closeCookiesPopup = async ({ page }: { page: Page }) => {
  const locator = page.locator('[name="accept-all-consents"]')
  const hasPopup = (await locator.count()) !== 0
  if (hasPopup) {
    return locator.click()
  }
}

export const openPathAndCloseCookiesPopup =
  (location: string) =>
  async ({ page }: { page: Page }) => {
    await page.goto(location)
    await page.waitForLoadState('networkidle')
    await closeCookiesPopup({ page })
  }
