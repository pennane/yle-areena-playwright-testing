import { Page } from 'playwright-core'

export const closeCookiesPopup = async (page: Page) => {
  const locator = page.locator('[name="accept-all-consents"]')
  const hasPopup = (await locator.count()) !== 0
  if (hasPopup) {
    return locator.click()
  }
}

export const openPathAndCloseCookiesPopup = async (
  page: Page,
  location: string
) => {
  await page.goto(location)
  await page.waitForLoadState('networkidle')
  await closeCookiesPopup(page)
}
