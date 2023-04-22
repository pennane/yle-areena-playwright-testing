# Yle areena testing

For Metropolia Käyttäjäkeskeinen suunnittelu TX00CF82-3017

## Participants

- Arttu Pennanen
- Perttu Vaarala

## Description

A UI test suite for Yle Areena built with Playwright and run in Browserstack. The tests are run in chromium, webkit and firefox environments. There is also an accessibility overview included in the Playwright report created by Axe-core

## Observations

- Yle areena validates emails insufficiently in the frontend
  - i.e. `hello hello asdf..f@gmail.com eeeeee` is a valid email
  - for this reason few tests fail, because we hope yle areena might fix it
- Login tests do not work on browserstack firefox. No motivation to debug

## Usage

Simple instructions for how to setup & run the tests

### Setup

1. Copy `.env.example` file and rename to `.env`
2. Set the `BROWSERSTACK_ACCESS_KEY` value into it
3. `.env` file should look like the following:

```sh
BROWSERSTACK_USERNAME=some_browser_stack_user_name
BROWSERSTACK_ACCESS_KEY=some_very_hidden_access_key
```

### Running the tests

```bash
npx playwright test
```

### Inspecting the test report

```bash
npx playwright show-report
```
