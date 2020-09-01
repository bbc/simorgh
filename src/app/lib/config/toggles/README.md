# Simorgh Application Toggles 

| Toggle Name             | Description | Remote Toggle Enabled | 
| ----------------------- | ----------- | --------------------- |
| `ads`                   | Display Advertisements on Front Pages and Story (STY) Pages |  | 
| `chartbeatAnalytics`    | Capture Chartbeat Analytics | |
| `comscoreAnalytics`     | Capture Comscore Analytics | |
| `cpsRecommendations`    | Display Recommendations |  |
| `enableFetchingToggles` | Enable fetching toggle values from remote Toggles Config API for specified services |
| `include`               | Display Include on Story (STY) Pages |  |
| `liveRadioSchedule`     | Display Radio Schedule on Live Radio Pages | |
| `mostRead`              | Display Most Read | |
| `mostWatched`           | Display Most Watched | |
| `navOnArticles`         | Display Navigation on Article Pages | |
| `prerollAds`            | Display Preroll Advertisements on Media Asset Pages (MAP) | ✅ |
| `radioSchedule`         | Display Radio Schedule (if disabled, Radio Schedule will also not appear on Live Radio Pages (overrides the value of `liveRadioSchedule`) |  |
| `scriptLink`            | Display Script Switching link for services with variants | |
| `socialEmbed`           | Display Social Embeds on Story (STY) Pages |  |
| `variantCookie`         | Set variant cookie for services with variants | |

## Default (Fallback) Values
[Local Environment](localConfig.js)

[Test Environment](testConfig.js)

[Live Environment](liveConfig.js)
