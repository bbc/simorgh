# psammead-test-helpers - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fpsammead-test-helpers%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fpsammead-test-helpers%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-test-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-test-helpers) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-test-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-test-helpers&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-test-helpers.svg)](https://www.npmjs.com/package/@bbc/psammead-test-helpers) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a collection of helper methods for implementing Jest snapshot tests, required by many Psammead components.

## Exported Functions

<!-- prettier-ignore -->
| Name | Arguments | Description |
| :---------- | :-------------- | :--------------- |
| shouldMatchSnapshot | title, component | Renders the component using @testing-library/react, converts it to JSON and asserts that it matches the given snapshot, which will be saved in the `__snapshots__` directory. The first argument `title` is the title for the test. |
| matchSnapshotAsync | component | Renders the component using @testing-library/react, converts it to JSON and asserts that it matches the given snapshot, which will be saved in the `__snapshots__` directory. Unlike `shouldMatchSnapshot`, it does not create a test, so can be used within any `it(...)` test. |
| isNull | title, component | Renders the component using @testing-library/react, converts it to JSON and asserts that it is null. The first argument `title` is the title for the test. |
| testUtilityPackages | actualExports, expectedExports, utilityName | Validates an imported utility package's exported values against an object of key-value pairs in the form `{ name_of_export: 'type of export' }`, e.g. `{ shouldMatchSnapshot: 'function' }`. |
| setWindowValue | key, value | Allows you to set variables on the window (eg. location) that are normally not writable |
| resetWindowValue | key, value | Allows you to reset the WindowValues that are previously overwritten by the setWindowValue function |
| suppressPropWarnings | warnings | Suppresses predicted prop warnings during tests. |

## Installation

```jsx
npm install react react-dom @bbc/psammead-test-helpers --save-dev
```

## Usage

```jsx
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

shouldMatchSnapshot('should render correctly', <h1>Hello World</h1>);
```

## Roadmap

## Contributing

When **adding** a new export to this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-test-helpers/index.test.jsx#L8-L14) also need to be updated and the export should be adding to the [README](https://github.com/bbc/psammead/tree/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-test-helpers#exported-functions). When **removing** an exisiting export from this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-test-helpers/index.test.jsx#L8-L14) need to be updated, the export should be removed from the [README](https://github.com/bbc/psammead/tree/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-test-helpers#exported-functions) and the package version requires a major change (EG: 1.2.1 -> 2.0.0) as this would be considered a breaking change due to functionality being removed.

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
