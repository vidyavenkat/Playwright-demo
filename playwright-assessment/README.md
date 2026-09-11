# Playwright SauceDemo Assessment

End-to-end UI automation for [SauceDemo](https://www.saucedemo.com/) using Playwright and the Page Object Model (POM).

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Running tests

| Command | Description |
|---------|-------------|
| `npm test` | Headless (default) |
| `npm run test:headed` | Visible browser |
| `npm run test:headless` | Explicit headless |
| `npm run test:parallel` | Parallel with 4 workers |
| `npm run test:debug` | Playwright Inspector |
| `npm run test:ui` | Interactive UI mode |
| `npm run report` | Open HTML report |
| `npm run trace` | Open a trace zip (`npx playwright show-trace path/to/trace.zip`) |

Traces, screenshots, and video are retained on failure (`retain-on-failure` / `only-on-failure`).

## Project structure

```
pages/          Page Object Model classes
tests/          Spec files (auth, purchase)
utils/          Shared credentials, messages, and test data
playwright.config.ts
```

## Design choices

### Scalability of the Page Object Model

POM keeps locators and actions in page classes so specs stay readable and changes to SauceDemo UI update in one place. Shared flows (login, checkout) compose page methods instead of duplicating steps. As coverage grows, add pages/components and keep assertions in specs or thin page helpers—avoid stuffing business rules into every locator method.

### Reducing flakiness

- Prefer Playwright auto-waiting (`click`, `fill`, `expect`) over hard waits (`waitForTimeout`).
- Use stable `data-test` attributes via `testIdAttribute`.
- Assert URL/state transitions before acting on the next page.
- Capture trace/screenshot/video on failure for root-cause analysis.

### Growing to 1000 tests

1. **Organize by feature** — folders under `tests/` mirroring domains (auth, cart, checkout).
2. **Add API Layer** — use Playwright `APIRequestContext` for test data setup, cleanup, and state preparation instead of UI flows.
3. **Tagging Strategy** — tag tests so a 1000-case suite can run subsets instead of the full set:

   | Tag | Purpose |
   |-----|---------|
   | `@smoke` | Fast PR gate: login plus one purchase path |
   | `@regression` | Broader functional coverage on main/nightly |
   | `@checkout` | Checkout-domain scenarios for focused local or CI runs |
   | `@critical` | Must-not-break paths (auth and order complete) |

   Annotate tests with `{ tag: ['@smoke', '@critical'] }` and run selectively:

   ```bash
   npx playwright test --grep @smoke
   npx playwright test --grep @checkout
   npx playwright test --grep "@smoke|@critical"
   ```

4. **Contract Testing** — add API contract validation to reduce expensive E2E coverage.
5. **Fixtures & shared setup** — authenticated `page` fixtures to skip repeated login where safe.
6. **Parallelism** — keep tests independent; use `fullyParallel` and shard in CI.
7. **Observability** — track flaky tests, failure rate, execution duration, and coverage trends through dashboards.
8. **Data factories** — generate users/products instead of hardcoding every case.
9. **CI strategy** — smoke suite on PR, full suite on main/nightly; retries only in CI.
10. **Components** — extract shared UI pieces (header, cart badge) to avoid page-class bloat.
