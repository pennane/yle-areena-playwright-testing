import { test, expect } from '@playwright/test'
import { openPathAndCloseCookiesPopup } from '../lib'

const KUMMELI_PAGE_ID = '1-3339547'

test.beforeEach(openPathAndCloseCookiesPopup(`/${KUMMELI_PAGE_ID}`))

test.describe('Kummeli', () => {
  // test('...', async ({page}) => {
  //
  // })
})
