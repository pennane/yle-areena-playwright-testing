import { test, expect } from '@playwright/test'
import { openPathAndCloseCookiesPopup } from '../lib'

test.beforeEach(openPathAndCloseCookiesPopup(`/tv/opas`))

test.describe('recurring 22:00 news program', () => {
  // test('...', async ({ page }) => {
  //
  // })
})

test.describe('channel logos', () => {
  // test('...', async ({ page }) => {
  //
  // })
})
