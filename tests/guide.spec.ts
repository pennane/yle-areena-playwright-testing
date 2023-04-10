import { test, expect } from '@playwright/test'
import { openPathAndCloseCookiesPopup } from '../lib'

test.beforeEach(({ page }) => openPathAndCloseCookiesPopup(page, `/tv/opas`))
