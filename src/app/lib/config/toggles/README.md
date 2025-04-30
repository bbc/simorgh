# How Feature Toggles Work

Feature toggles in Simorgh are fetched on the server side (or client side).

The `getInitialData` fetch returns the toggle configurations from the BBC toggles API (refer to Simorgh runbook section 2.5.2) via the `toggleContextProvider` which passes the state of the toggles to the `useToggle` hook in Simorgh. The toggle configurations from the BBC toggles API are set as remote toggles in iSite.

Local toggle configs are global and configured for the application environment, whereas remote toggles in iSite are configured to be service specific.

Simorgh has a config file for `local` environment. Remote toggles on iSite also take precedence over local toggles when the toggle response is fetched:

https://github.com/bbc/simorgh/blob/9fecaba6ef30b3fff627ef9a75f0286d63f0a343/src/app/lib/utilities/getToggles/index.js#L48-L54

If a toggle is not configured in iSite or in the local toggle configs deployed with Simorgh, then the toggle value will default to false.

Feature toggles can be found in [src/app/lib/config/toggles](./index.js)

# Simorgh Application Toggles

| Toggle Name             | Description                                                                         | Toggle Value                                       | Example  |
| ----------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| ads                     | Display Advertisements                                                              |                                                    |          |
| articleLiteSiteLink     | Display the link to the lite site on Article pages                                  |                                                    |          |
| chartbeatAnalytics      | Capture Chartbeat Analytics                                                         |                                                    |          |
| comscoreAnalytics       | Capture Comscore Analytics                                                          |                                                    |          |
| disclaimer              | Display the disclaimer on Article pages                                             |                                                    |          |
| electionBanner          | Display the election banner                                                         |                                                    |          |
| enableFetchingToggles   | Enable fetching toggle values from remote Toggles Config API for specified services |                                                    |          |
| eventTracking           | Enable event tracking across the application                                        |                                                    |          |
| homePageRadioSchedule   | Display Radio Schedule on Home Pages                                                |                                                    |          |
| include                 | Display Includes on Story (STY) Pages                                               |                                                    |          |
| liveRadioSchedule       | Display Radio Schedule on Live Radio Pages                                          |                                                    |          |
| midArticleOnwardJourney | Display the mid article onward journeys on Article Pages                            |                                                    |          |
| mostRead                | Display Most Read                                                                   |                                                    |          |
| nielsenAnalytics        | Capture Nielsen Analytics in Australia on AMP pages                                 |                                                    |          |
| onDemandRadioSchedule   | Display Radio Schedule on On Demand Audio / Podcast Pages                           |                                                    |          |
| podcastPromo            | Display the podcast promo on Article Pages                                          |                                                    |          |
| preloadLeadImage        | Display preload image tag on Story (STY) Pages                                      |                                                    |          |
| preroll                 | Display Preroll Advertisements on Media Asset (MAP) Pages                           |                                                    |          |
| privacyPolicy           | Display the privacy policy link on the consent banner                               | Month and year the privacy policy was last updated | july2019 |
| scriptLink              | Display Script Switching link for services with variants                            |                                                    |          |
| socialEmbed             | Display social embeds on Article and Live Pages                                     |                                                    |          |
| recentAudioEpisodes     | Display recent episodes on On Demand Audio Pages                                    | Number of episodes to display                      | 4        |
| recentPodcastEpisodes   | Display recent episodes on Podcast Pages                                            | Number of episodes to display                      | 8        |
| recentVideoEpisodes     | Display recent episodes on On Demand TV Pages                                       | Number of episodes to display                      | 4        |
| webVitalsMonitoring     | Capture web vitals                                                                  |                                                    |          |

## Default (Fallback) Toggle Values

[Local Environment](./index.js)
