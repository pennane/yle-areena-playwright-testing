import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()

type TParseWsEndpointPayload = {
  browser:
    | `chrome`
    | `edge`
    | `playwright-chromium`
    | `playwright-firefox`
    | `playwright-webkit`
}

const parseBrowserStackWsEndpoint = ({ browser }: TParseWsEndpointPayload) => {
  const username = process.env.BROWSERSTACK_USERNAME
  if (!username) throw new Error('BROWSERSTACK_USERNAME missing from .env')

  const key = process.env.BROWSERSTACK_ACCESS_KEY
  if (!key) throw new Error('BROWSERSTACK_ACCESS_KEY missing from .env')

  const caps = {
    browser: browser,
    project: 'Yle areena UI testing',
    'browserstack.username': username,
    'browserstack.accessKey': key
  }

  return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
    JSON.stringify(caps)
  )}`
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: 3,
  reporter: [['html', { open: 'never' }]],
  timeout: 45000,
  use: {
    headless: true,
    baseURL: 'https://areena.yle.fi',
    viewport: {
      height: 1080,
      width: 1920
    }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        connectOptions: {
          wsEndpoint: parseBrowserStackWsEndpoint({ browser: 'chrome' })
        }
      }
    }
    // {
    //   name: 'firefox',
    //   use: {
    //     connectOptions: {
    //       wsEndpoint: parseBrowserStackWsEndpoint({
    //         browser: 'playwright-firefox'
    //       })
    //     }
    //   }
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     connectOptions: {
    //       wsEndpoint: parseBrowserStackWsEndpoint({
    //         browser: 'playwright-webkit'
    //       })
    //     }
    //   }
    // }
  ]
})
