# Comscore

Comscore Beacon source: https://sb.scorecardresearch.com/beacon.js

We are self-hosting the comscore script and it should be available via this path:

```
https://news.files.bbci.co.uk/include/articles/public/comscore/1.0.js on LIVE
https://news.test.files.bbci.co.uk/include/articles/public/comscore/1.0.js on TEST
http://localhost:7080/static/js/comscore/1.0.js on LOCAL
```

## When to update comscore script

TO:DO: Set up comms with the comscore team for when they've released a new version of the script.

## How to update comscore script

1. Get the latest version of the comscore script.
2. Copy and paste the new comscore script into `./main-{version}.js` file.
3. Rename the file so that the version is higher than the previous version.
4. Update the changelog with details of the update script.
5. The `comscoreScript` variable will also need updating here: `src/app/containers/ComscoreAnalytics/Canonical/index.jsx` to have the latest version number.
