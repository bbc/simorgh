# Article Timestamp Format tests

These are unit tests to ensure that we observe and maintain regression for the article timestamp and timezone logic with associated timeformats across services.

The tests in this directory runs for all services against expectations set in [expectedFormats.json](./expectedFormats.json) and a failure would either indicate a change or breakage in the timestamp or time format logic.

A change in timestamp logic would require updating the values in [expectedFormats.json](./expectedFormats.json) using the [generateTimeFormats.js](./generateTimeFormats.js) script. However, proper investigation should be carried out to identify if there is a valid reason for why these tests fail before running the update script.

A couple of scenarios that we expect these tests would fail and need updating would be:

- Change in timestamp or timezone logic in `#legacy/moment-timezone-include`, `#legacy/psammead-locales` etc.

- Change in the timeformat logic [here](../timeFormats)

- Changes in Daylight Saving Time (DST) times across different timezones.

- ... please add more if you find any

## Updating expected time formats

After regenerating the expected formats, review the changes to [expectedFormats.json](./expectedFormats.json) and rerun the tests in this directory.
