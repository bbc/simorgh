# Timestamp formatting utilities

Import named utilities from `#app/lib/utilities/timestamp`. Rendering lives in
`#app/components/Timestamp` and `#app/components/TimestampContainer`.

## Date formatting

`formatUnixTimestamp({ timestamp, format, locale, timezone, isRelative })`
accepts milliseconds or an ISO date string, a Moment locale and timezone. It
defaults to the format `LL, LT z`; relative output uses Moment's `fromNow()`.
The existing falsy-input contract is retained: missing timestamps and numeric
zero return `undefined`. Service configuration registers the relevant Moment
locales and timezone data.

Importing the utility configures Moment's shared relative-time rounding to
`Math.floor`, and thresholds to seconds `0`, minutes `60`, hours `24`, days `30`
and months `12`. This preserves the minimum "a minute ago" and exact
minute/hour boundaries.

`localisedMoment({ timestamp, locale })` returns a locale-specific Moment
instance, without changing its timezone. Alternative-calendar consumers rely on
this existing contract. `isValidDateTime(dateTime)` retains the existing
coercion-based date validation.

## Localised ISO durations

```ts
import { formatDuration } from '#app/lib/utilities/timestamp';

formatDuration({ duration: 'PT30M', locale: 'my' });
formatDuration({ duration: 'PT1H30M', format: 'h,mm,ss', locale: 'fa' });
```

This formatter uses `Temporal.Duration` and `Intl.NumberFormat`, not Moment
durations. It is distinct from the default-exported
`#app/lib/utilities/formatDuration`, which accepts a Moment duration object.

Invalid, negative or calendar-unit durations (years, months or weeks), and
runtimes without Temporal, retain their zero-second fallback. Days and time
units are supported. Formats recognise `h`, `mm`, `m` and `ss`, separated by
`:` or `,`, including repeated tokens. Defaults are `mm:ss` or `h:mm:ss`
when there are hours.

Locales are normalised with `Intl.Locale`, accepting underscore-separated
forms. Missing or invalid locales fall back to `en-GB`. Arabic-script locales
`ar`, `fa`, `ps` and `ur` replace comma separators with Arabic commas.

Digits preserve the service's existing numbering system. Arabic, Gujarati,
Hindi, Marathi, Punjabi (`pa-IN`) and Tamil force Latin digits. Bengali,
Burmese, Nepali and Pashto force their existing native numbering systems, with
numeral-translator fallbacks when the runtime ignores the override. Persian
and Dari rely on the locale's Eastern Arabic-Indic default. The unchanged
mapping lives in `temporalHelpers/index.ts`.
