# How Feature Toggles Work

Feature toggles in Simorgh are fetched on the server side (or client side).

The `getInitialData` fetch returns the toggle configurations from the BBC toggles API (refer to Simorgh runbook section 2.5.2) via the `toggleContextProvider` which passes the state of the toggles to the `useToggle` hook in Simorgh. The toggle configurations from the BBC toggles API are set as remote toggles in iSite.

Local toggle configs are global and configured for the application environment, whereas remote toggles in iSite are configured to be service specific.

Simorgh has 3 toggle config files for `test`, `local` and `live` environments. Remote toggles on iSite also take precendence over local toggles when the toggle response is fetched:

https://github.com/bbc/simorgh/blob/9fecaba6ef30b3fff627ef9a75f0286d63f0a343/src/app/lib/utilities/getToggles/index.js#L48-L54

If a toggle is not configured in iSite or in the local toggle configs deployed with Simorgh, then the toggle value will default to false.

Feature toggles can be found in `src/app/lib/config/toggles`

# Simorgh Application Toggles

| Toggle Name             | Description                                                                         | Toggle Value                                                             | Example                                               |
| ----------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| `ads`                   | Display Advertisements on Front Pages                                               |                                                                          |                                                       |
| `chartbeatAnalytics`    | Capture Chartbeat Analytics                                                         |                                                                          |                                                       |
| `comscoreAnalytics`     | Capture Comscore Analytics                                                          |                                                                          |                                                       |
| `enableFetchingToggles` | Enable fetching toggle values from remote Toggles Config API for specified services |                                                                          |                                                       |
| `eventTracking`         | Enable event tracking across the app                                                |                                                                          |                                                       |
| `homePageRadioSchedule` | Display Radio Schedule on Home Pages                                                | The section of the front page to display the schedule component          | `Features`, `Verticals`, `Section 1`, `Interactivity` |
| `include`               | Display Include on Story (STY) Pages                                                |                                                                          |                                                       |
| `liveRadioSchedule`     | Display Radio Schedule on Live Radio Pages                                          |                                                                          |                                                       |
| `mostRead`              | Display Most Read                                                                   |                                                                          |                                                       |
| `mostPopularMedia`      | Display Most Popular Media (Most Watched) component on Media Asset (MAP) Pages      | Number of most popular media items to display (integer between 1 and 20) | 10                                                    |
| `nielsenAnalytics`      | Capture Nielsen Analytics in Australia on AMP pages                                 |
| `preloadLeadImage`      | Display preload image tag on Story (STY) Pages                                      |                                                                          |                                                       |
| `preroll`               | Display Preroll Advertisements on Media Asset (MAP) Pages                           |                                                                          |                                                       |
| `scriptLink`            | Display Script Switching link for services with variants                            |                                                                          |                                                       |
| `variantCookie`         | Set variant cookie for services with variants                                       |                                                                          |                                                       |

## Default Toggle (Fallback) Values

[Local Environment](localConfig.js)

[Test Environment](testConfig.js)

[Live Environment](liveConfig.js)
