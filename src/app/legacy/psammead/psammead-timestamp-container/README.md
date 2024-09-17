# psammead-timestamp-container - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcontainers%2Fpsammead-timestamp-container%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcontainers%2Fpsammead-timestamp-container%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/containers/psammead-timestamp-container)](https://david-dm.org/bbc/psammead?path=packages/containers/psammead-timestamp-container) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/containers/psammead-timestamp-container)](https://david-dm.org/bbc/psammead?path=packages/containers/psammead-timestamp-container&type=peer) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-timestamp-container/src.svg)](https://www.npmjs.com/package/#legacy/psammead-timestamp-container/src) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/timestampcontainer--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

`psammead-timestamp-container` is a React container that offers relative and absolute times, with timezone support - using moment-timezone. Relative times are currently hard-coded to English (e.g. 3 minutes ago). `psammead-timestamp-container` returns a single time element.

## Exports

`/utilities` - exports functions for dealing with timestamps.

## When to use this component

`psammead-timestamp-container` is intended to be used when a single time DOM element that has the possibility of having varying time formats and timezones is required.

## Installation

`npm install #legacy/psammead-timestamp-container/src`

## Props

<!-- prettier-ignore -->
| Argument  | Type                | Required | Default | Example         |
|-----------|---------------------|----------|---------|-----------------|
| timestamp | number or string | Yes   | N/A | `1530947227000`, `'2012-03-08T12:17:24.000Z'` |
| dateTimeFormat | string | Yes | N/A | `YYYY-MM-DD` |
| isRelative | boolean | No | `false` | `true` |
| format | string | No | `null` | `D MMMM YYYY, HH:mm z` |
| timezone | string | No | `'Europe/London'` | `'Europe/London'` |
| padding | boolean | No | `true` | `false` |
| prefix | string | No | `null` | `Updated` |
| suffix | string | No | `null` | `This is a suffix` |
| script | object | Yes | N/A | `{ canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }` |
| locale | string | no | `null` | `en` |
| service | string | yes | `null` | `news` |
| altCalendar | object | no | `null` | See the `jalaali` calendar in [psammead-calendars](https://github.com/bbc/psammead/blob/566e8115e5bc4a92313bdf352d56b9d5efcf0278/packages/utilities/psammead-calendars/src/calendars/jalaali.js#L47) as an example |

`locale` should be a momentjs locale.

## Usage

```jsx
import latin from '#components/ThemeProvider/fontScripts/latin';

const WrappingContainer = () => (
  <Timestamp
    timestamp={1530947227000}
    dateTimeFormat="YYYY-MM-DD"
    isRelative={false}
    format="D MMMM YYYY"
    timezone="Europe/London"
    prefix="Updated"
    suffix="."
    script={latin}
    locale="en"
  />
);
```

### Utilities

**formatDuration**

```jsx
import { formatDuration } from '#psammead/psammead-timestamp-container/src/utilities';

const localisedDuration = formatDuration({ duration: 'PTM30', locale: 'my' });
const customFormatDuration = formatDuration({
  duration: 'PTM30',
  format: 'mm,ss',
});
```

<!-- prettier-ignore -->
| Argument  | Type        | Required | Default | Example         |
|-----------|-------------|----------|---------|-----------------|
| duration  | string | Yes | N/A      | `PTH1M29S30` Duration string as specified by ISO 8601 standard. |
| format    | string | No  | `mm:ss`, or `h:mm:ss` if in hours | `mm,ss` |
| locale    | string | No  | `en-gb`  | `fr` |

**localisedMoment**

```jsx
import { localisedMoment } from '#psammead/psammead-timestamp-container/src/utilities';

const localisedMoment = localisedMoment({ locale, timestamp });
```

<!-- prettier-ignore -->
| Argument  | Type        | Required | Default | Example         |
|-----------|-------------|----------|---------|-----------------|
| timestamp  | number or string | Yes | N/A      | `1539969006000` (Unix timestamp), `'2012-03-08T12:17:24.000Z'` (ISO8601 string) |
| locale    | string | Yes  | N/A  | `fr` |

**formatUnixTimestamp**

```jsx
import { localiseTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';

const formattedTime = formatUnixTimestamp({
  format,
  isRelative,
  locale,
  timestamp,
  timezone,
});
```

<!-- prettier-ignore -->
| Argument  | Type        | Required | Default | Example         |
|-----------|-------------|----------|---------|-----------------|
| format    | string      | No       | 'LL, LT z' | `'D MMMM YYYY z'` a moment format string |
| isRelative | boolean    | Yes      | N/A     | `true` When true, formats in relative time |
| locale    | string      | Yes      | N/A     | `fr` Moment locale |
| timestamp | number or string      | Yes      | N/A     | `1539969006000` (Unix timestamp), `'2012-03-08T12:17:24.000Z'` (ISO8601 string) |
| timezone  | string      | Yes      | N/A     | `'GMT'`, `'Asia/Seoul'` see (moment-timezone documentation)[https://momentjs.com/timezone/] |

## Accessibility notes

The usage of the semantic `time` element within psammead-timestamp component can result in strange behaviours when using assistive technology such as VoiceOver for iOS. Specifically, it results in a "text splitting" behaviour, where any text in the prefix is read out, but the value inside the semantic `time` element require an additional swipe before being read out.

However, as we heavily encourage the use of this semantic element, and want to ensure it's usage is in line with [the W3C examples](https://www.w3.org/TR/html51/textlevel-semantics.html#the-time-element), we feel this compromise is necessary.

## Roadmap

Currently, this package only supports relative time in English. The plan is to make this package more suitable for use on World Service sites by including logic to render relative time in multiple languages.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
