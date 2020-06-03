# Test Strategy for adding integration/cypress tests
This document gives a brief overview on what basis integration and e2e tests are added.

![TestingPyramid](https://user-images.githubusercontent.com/9802855/83626408-42541580-a58d-11ea-9891-30dcd2e5b936.png)

## Factors to be considered before deciding on integration or cypress tests

- Test runtime
- How flaky the test would be (how often the test will fail due to external conditions such as timing out)
- Realistic environment(does it mock the browser behaviour)
- Client side rendered or server side rendered(As with JSDom in integration testing it doesn’t entirely emulates a web browser so client side rendered components have to tested using cypress)

## Integration tests:

- Integration tests should cover all the test scenarios(happy and unhappy scenarios) at component level(but in our case its more likely to be pagetypes).
- Evaluate whether a tests can be covered by integration test before thinking of adding cypress test considering the time taken by cypress.
- Mock endpoints if it’s a third party component.Try not to mock our own components.

## E2E Tests:

- Cypress tests to be used for stimulating real user journeys.
- Cypress tests to be used for actions that change the state of the page (e.g script switching, clicking play on media, changing viewport)
- The tests we have now in cypress most of them are moved towards integration testing which saves time in CI but also worth considering that integration tests are not run against real browser environment so core functionality test for pagetypes which affects user impacts to be added to cypress tests.
- It could be good to have either one or multiple user journeys that navigate through all page types (e.g front page → MAP → another MAP → front page → article etc.). This would test the kind of navigation a user would do, and could also serve as a sanity check as mentioned above. This is currently limited by some page types still being on PAL, but there are still some user journeys currently possible without needing to touch PAL pages. Another issue is some page types needing an override on the URL to be used in the test environment, as that page type does not have any or many assets on test (e.g On Demand Radio brands and episodes)
- Layout changes at different viewport to be considered adding to cypress tests.
- Cypress tests to be run on a subset of services(services having script switcher, RTL, different layout) and not for all services.
