# Yle areena testing

For Metropolia Käyttäjäkeskeinen suunnittelu TX00CF82-3017

## Participants

- Arttu Pennanen
- Perttu Vaarala

## Usage

### Setup

1. Copy `.env.example` file and rename to `.env`
2. Set the `BROWSERSTACK_ACCESS_KEY` value into it

### Running the tests

```bash
npx playwright test
```

### Inspecting the test report

```bash
npx playwright show-report
```
