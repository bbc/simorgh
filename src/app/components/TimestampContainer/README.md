# TimestampContainer

Formats a millisecond timestamp or an ISO date string and renders
`#app/components/Timestamp`. Uses Moment's registered service locale, timezone
and relative-time configuration; service configuration owns locale registration.

`timestamp` is required for output. Invalid dates render nothing. `format` and
`dateTimeFormat` accept Moment format strings; the latter is always formatted in
`en-gb` for the HTML `dateTime` attribute. Defaults are `Europe/London`, `en-gb`,
absolute dates and enabled padding. Prefix, alternative-calendar date, main date
and suffix are separated by spaces. Alternative calendars are omitted for
relative dates. Their existing `formatDate(localisedMoment(...))` contract is
unchanged.

`className` is forwarded to the `time` element. Semantic markup, accessible text
and hydration-warning suppression are shared across canonical, AMP and Lite.

Formatting utilities, including the separately supported localised ISO-duration
formatter, live in `#app/lib/utilities/timestamp`.
