# ⛔️ This is an alpha component ⛔️

This component is currently tagged as alpha and is not suitable for production use.
# exposure-scanning - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fexposure-scanning%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fexposure-scanning%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/exposure-scanning)](https://david-dm.org/bbc/psammead?path=packages/utilities/exposure-scanning) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/exposure-scanning)](https://david-dm.org/bbc/psammead?path=packages/utilities/exposure-scanning&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/exposure-scanning.svg)](https://www.npmjs.com/package/@bbc/exposure-scanning) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a utility to scan and patch issues and pull requests for content that matches a given regular expression.


## Installation

```jsx
npm install @bbc/exposure-scanning --save
```

## Usage

The script can be imported and executed like so:

```jsx
// /scripts/scan-exposures/index.jsx
import scanExposures from '@bbc/exposure-scanning';

(async () => {
  await scanExposures();
})();
```

Then, this can be executed in the command line:

```sh
./scripts/scan-exposures psammead -pr 1234 "foo|bar"
```

The command line arguments are as follows:
 - repository (psammead in the example)
 - content type (-pr or -issue)
 - id (of the issue or pull request)
 - regex ("foo|bar" in the example)

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
