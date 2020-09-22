# Test Strategy for adding integration/cypress tests
This document gives a brief overview on what basis integration and e2e tests are added.

![TestingPyramid](https://user-images.githubusercontent.com/9802855/83626408-42541580-a58d-11ea-9891-30dcd2e5b936.png)

## Factors to be considered before deciding on integration or cypress tests

- Test runtime
- How flaky the test would be (how often the test will fail due to external conditions such as timing out)
- Realistic environment (does it mock the browser behaviour)
- Client/Server side rendered (as with JSDom in integration testing, it doesn’t entirely emulate a web browser so client side rendered components have to be tested using cypress)

## Integration tests:

- Integration tests should cover all the test scenarios (happy and unhappy scenarios) at the component level (but in our case its more likely to be page types).
- Evaluate whether cases can be covered by integration tests before considering adding cypress tests due to the the time taken by cypress.
- Mock endpoints if it’s a third party component. Ideally, we should try not to mock our own components.

## E2E Tests:

- Cypress tests to be used for simulating real user journeys.
- Cypress tests to be used for actions that change the state of the page (e.g script switching, clicking play on media, changing viewport)
-  Most of our current cypress test have been replaced by integration tests which saves time in CI, however integration tests are not run against real browser environments so core functionality tests for page types which affect users should remain in cypress tests.
- It could be good to have either one or multiple user journeys that navigates through all page types (e.g front page → MAP → another MAP → front page → article etc.). This simulate a real user experience and could also serve as a sanity check as mentioned above. This is currently limited by some page types still being on PAL, but there are still some user journeys currently possible without needing to touch PAL pages. Another issue is that some page types require an override on the URL to be used in the test environment as they do not have many/any assets on test (e.g On Demand Radio brands and episodes)
- Layout changes at different viewport to be considered adding to cypress tests.
- Cypress tests to be run on a subset of services (services having script switcher, RTL, different layout) and not for all services.
