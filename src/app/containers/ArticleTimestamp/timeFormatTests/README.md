# Article Timestamp Format tests

These are unit tests to ensure that we observe and maintain regression for the article timestamp and timezone logic with associated timeformats accross services.

The tests in this directory runs for all services against expectations set in [expectedFormats.json](./expectedFormats.json) and a failure would either indicate a change or breakage in the timestamp or time format logic.

A change in timestamp logic would require updating the values in [expectedFormats.json](./expectedFormats.json) using the [generateTimeFormats.js](./generateTimeFormats.js) script (see below). However, proper investigation should be carried out to identify if there is a valid reason for why these tests fail before running the update script.

A couple of scenarios that we expect these tests would fail and need updating would be:

- Change in timestamp or timezone logic in `@bbc/moment-timezone-include`, `@bbc/psammead-locales` etc.

- Change in the timeformat logic [here](../timeFormats)

- Changes in DST times accross different timezones.

- ... please add more if you find any

## Updating expected time formats

From your local repository run this command from the root directory

```
npx -p @babel/core -p @babel/node babel-node ./src/app/containers/ArticleTimestamp/timeFormatTests/generateTimeFormats.js
```
