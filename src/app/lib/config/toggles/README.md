# Simorgh Application Toggles

| Toggle Name              | Description                                                                         | Toggle Value                                                             | Example                                               |
| ------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| `ads`                    | Display Advertisements on Front Pages                                               |                                                                          |                                                       |
| `chartbeatAnalytics`     | Capture Chartbeat Analytics                                                         |                                                                          |                                                       |
| `comscoreAnalytics`      | Capture Comscore Analytics                                                          |                                                                          |                                                       |
| `cpsRecommendations`     | Display Recommendations                                                             |                                                                          |                                                       |
| `enableFetchingToggles`  | Enable fetching toggle values from remote Toggles Config API for specified services |                                                                          |                                                       |
| `eventTracking`          | Enable event tracking across the app                                                |                                                                          |                                                       |
| `frontPageRadioSchedule` | Display Radio Schedule on Front Pages                                               | The section of the front page to display the schedule component          | `Features`, `Verticals`, `Section 1`, `Interactivity` |
| `include`                | Display Include on Story (STY) Pages                                                |                                                                          |                                                       |
| `liveRadioSchedule`      | Display Radio Schedule on Live Radio Pages                                          |                                                                          |                                                       |
| `mostRead`               | Display Most Read                                                                   |                                                                          |                                                       |
| `mostPopularMedia`       | Display Most Popular Media (Most Watched) component on Media Asset (MAP) Pages      | Number of most popular media items to display (integer between 1 and 20) | 10                                                    |
| `navOnArticles`          | Display Navigation on Article Pages                                                 |                                                                          |                                                       |
| `nielsenAnalytics`       | Capture Nielsen Analytics in Australia on AMP pages                                   |
| `preloadLeadImage`       | Display preload image tag on Story (STY) Pages                                      |                                                                          |                                                       |
| `preroll`                | Display Preroll Advertisements on Media Asset (MAP) Pages                           |                                                                          |                                                       |
| `scriptLink`             | Display Script Switching link for services with variants                            |                                                                          |                                                       |
| `variantCookie`          | Set variant cookie for services with variants                                       |                                                                          |                                                       |

## Default (Fallback) Values

[Local Environment](localConfig.js)

[Test Environment](testConfig.js)

[Live Environment](liveConfig.js)
