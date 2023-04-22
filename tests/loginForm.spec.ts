import { test, expect, Page } from '@playwright/test'
import { markStatusToBrowserStack, openPathAndCloseCookiesPopup } from '../lib'

test.beforeEach(openPathAndCloseCookiesPopup('/tv'))
test.afterEach(markStatusToBrowserStack)

test.describe('account registration', () => {
  test.describe('email validation', async () => {
    const VALID_EMAILS = [
      'email@example.com',
      'email@example.co.jp',
      'firstname-lastname@example.com'
    ]
    const INVALID_EMAILS = [
      'plainaddress',
      'Joe Smith <email@example.com>',
      'Abc..123@example.com'
    ]

    const testRegistrationEmail = async ({
      page,
      email,
      shouldError
    }: {
      page: Page
      email: string
      shouldError: boolean
    }) => {
      await page.locator('.yle-header-tunnus-login').click()

      const iframe = page.frameLocator('.tunnus-sdk__iframe')

      await iframe
        .locator('button', {
          hasText: 'Luo Yle Tunnus'
        })
        .click()

      await iframe.locator('#email').fill(email)

      await iframe.locator('button', { hasText: 'Luo Tunnus' }).click()

      const errorText = iframe.locator('form fieldset > p[class*="Error"]', {
        hasText: /Tarkista sähköpostiosoitteen muoto./
      })

      await expect(errorText).toHaveCount(shouldError ? 1 : 0)
    }

    for (const email of VALID_EMAILS) {
      test(`should allow email "${email}"`, ({ page }) =>
        testRegistrationEmail({ email, page, shouldError: false }))
    }

    for (const email of INVALID_EMAILS) {
      test(`should display error with invalid email "${email}"`, ({ page }) =>
        testRegistrationEmail({
          email,
          page,
          shouldError: true
        }))
    }
  })
})
