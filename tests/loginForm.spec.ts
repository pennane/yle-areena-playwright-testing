import { test, expect } from '@playwright/test'
import { openPathAndCloseCookiesPopup } from '../lib'

test.beforeEach(async ({ page }) => {
  openPathAndCloseCookiesPopup(page, '/tv')

  await page.locator('.yle-header-tunnus-login').click()
  await page.waitForTimeout(2000)
})

const VALID_EMAIL = 'email@example.com'
const INVALID_EMAIL = 'Joe Smith <email@example.com>'
const FORM_ERROR_SELECTOR = 'form fieldset > p[class*="Error"'

test.describe.only('Account registration', async () => {
  test.describe('email validation', async () => {
    test('Should allow valid email', async ({ page }) => {
      await page.locator('.register-button').click()

      const emailField = page.locator('#email')
      await emailField.fill(VALID_EMAIL)
      await emailField.blur()

      const errorElement = page.locator(FORM_ERROR_SELECTOR)

      expect(errorElement).not.toBeDefined()
    })
    test(`Should display error with invalid email`, async ({ page }) => {
      await page.locator('.register-button').click()

      const emailField = page.locator('#email')
      await emailField.fill(INVALID_EMAIL)
      await emailField.blur()

      const errorElement = page.locator(FORM_ERROR_SELECTOR)

      expect(errorElement).toBeDefined()
      expect(errorElement).toContainText('Tarkista sähköpostiosoitteen muoto.')
    })
  })
})
