# How Feature Toggles Work

Feature toggles in Simorgh are fetched on the server side (or client side).

The `getInitialData` fetch returns the toggle configurations from the BBC toggles API (refer to Simorgh runbook section 2.5.2) via the `toggleContextProvider` which passes the state of the toggles to the `useToggle` hook in Simorgh. The toggle configurations from the BBC toggles API are set as remote toggles in iSite.

Local toggle configs are global and configured for the application environment, whereas remote toggles in iSite are configured to be service specific.

Simorgh has 3 toggle config files for `test`, `local` and `live` environments. Remote toggles on iSite also take precendence over local toggles when the toggle response is fetched:

https://github.com/bbc/simorgh/blob/9fecaba6ef30b3fff627ef9a75f0286d63f0a343/src/app/lib/utilities/getToggles/index.js#L48-L54

If a toggle is not configured in iSite or in the local toggle configs deployed with Simorgh, then the toggle value will default to false.

> [!WARNING]  
> There are some cases where a toggle **is** configured in iSite (an entry is present in iSite) but may not have values configured. The fetched response overwrites the local config file via destructuring (see [`getToggles()`](https://github.com/bbc/simorgh/blob/latest/src/app/lib/utilities/getToggles/index.js#L83-L85) ). However if no value is configured, the local config file values will be used.
> E.g. The `adsNonce` toggle is a valid toggle on iSite with valid entries as of 28/11/2025. This toggle affects services listed as entries on iSite, but for services **not** present as entries there, the local config files will be used. This caused issues before as all config files set this value as `true`. See https://github.com/bbc/simorgh/pull/13338 for more details.

Feature toggles can be found in `src/app/lib/config/toggles`

## Viewing the toggles response
The toggles response can be viewed here (for test, live). The `Origin` header must also be set as `https://www.bbc.com/`.


## Fetching toggles locally
By default, fetching toggles from iSite is not enabled on the local environment - it will just use the default values from the [localConfig file](https://github.com/bbc/simorgh/blob/latest/src/app/lib/config/toggles/localConfig.js). Note that this file is **not** service aware - it will set the same value for all services.

In cases where the toggles response needs to be tested/validated, the following commands can be run.

For **Test iSite**:

```
FETCH_TOGGLES=true yarn dev
```

For **Live iSite toggles**:
```
yarn build:live:debug && yarn start
```
> [!NOTE]  
> Hot reloading will not work using this command - if you make a code change you need to rebuild & restart the application server.
> If hot reloading is necessary:
> - set `SIMORGH_APP_ENV=live` in local.env (ensure these changes are not committed)
> - run `FETCH_TOGGLES=true yarn dev` to start the application server.
>
> This will also use data from the live BFF FABL module.

# Simorgh Application Toggles

| Toggle Name             | Description                                                                         | Toggle Value                                                             | Example                                               |
| ----------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| `ads`                   | Display Advertisements on Front Pages                                               |                                                                          |                                                       |
| `articleLiteSiteLink`   | Display the link to the lite site on Article pages                                  |                                                                          |                                                       |
| `comscoreAnalytics`     | Capture Comscore Analytics                                                          |                                                                          |                                                       |
| `enableFetchingToggles` | Enable fetching toggle values from remote Toggles Config API for specified services |                                                                          |                                                       |
| `eventTracking`         | Enable event tracking across the app                                                |                                                                          |                                                       |
| `homePageRadioSchedule` | Display Radio Schedule on Home Pages                                                | The section of the front page to display the schedule component          | `Features`, `Verticals`, `Section 1`, `Interactivity` |
| `include`               | Display Include on Story (STY) Pages                                                |                                                                          |                                                       |
| `liveRadioSchedule`     | Display Radio Schedule on Live Radio Pages                                          |                                                                          |                                                       |
| `mostRead`              | Display Most Read                                                                   |                                                                          |                                                       |
| `mostPopularMedia`      | Display Most Popular Media (Most Watched) component on Media Asset (MAP) Pages      | Number of most popular media items to display (integer between 1 and 20) | 10                                                    |
| `nielsenAnalytics`      | Capture Nielsen Analytics in Australia on AMP pages                                 |                                                                          |                                                       |
| `preloadLeadImage`      | Display preload image tag on Story (STY) Pages                                      |                                                                          |                                                       |
| `preroll`               | Display Preroll Advertisements on Media Asset (MAP) Pages                           |                                                                          |                                                       |
| `scriptLink`            | Display Script Switching link for services with variants                            |                                                                          |                                                       |
| `variantCookie`         | Set variant cookie for services with variants                                       |                                                                          |                                                       |
| `adsNonce`              | Uses "enabled" to check service as a boolean and "value" as countries list          | value is a coma separated countries                                      | enabled: true, value: 'es,mx'                         |

## Default Toggle (Fallback) Values

[Local Environment](localConfig.js)

[Test Environment](testConfig.js)

[Live Environment](liveConfig.js)
