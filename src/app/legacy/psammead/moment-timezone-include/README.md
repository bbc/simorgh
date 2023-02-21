# #legacy/moment-timezone-include - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fmoment-timezone-include%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fmoment-timezone-include%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/moment-timezone-include)](https://david-dm.org/bbc/psammead?path=packages/utilities/moment-timezone-include) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/moment-timezone-include)](https://david-dm.org/bbc/psammead?path=packages/utilities/moment-timezone-include&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/moment-timezone-include.svg)](https://www.npmjs.com/package/#legacy/moment-timezone-include) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package allows you to exclude all moment timezones from being included, while including specific ones in the chunks you desire.

## Installation

```jsx
npm install #legacy/moment-timezone-include --save
```

## Usage - Exclude default timezones

```jsx
plugins: [new MomentTimezoneInclude({ startYear: 1990, endYear: 2025 })],
```

This does two things. Firstly it removes all timezones from the moment-timezone package so that they can be included individually. It also specifies the date range of the specifically included timezone data. If `startYear` isn't provided it defaults to the earliest available data and likewise if `endYear` isn't included it includes all known future data.

## Usage - Include specific timezones

```jsx
import '#psammead/moment-timezone-include/tz/America/New_York';
```

This makes the specified timezone available to moment. It supports all moment timezones by replacing `America/New_York` in the example above with any moment timezone. The full list of timezones can be found [here](https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json).

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
