# psammead-script-link - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-script-link%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-script-link%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-script-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-script-link) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-script-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-script-link&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/script-link--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-script-link/src.svg)](https://www.npmjs.com/package/#legacy/psammead-script-link/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `ScriptLink` component is designed to be used where a service has multiple variants and there is a need to switch between them.

## Installation

```jsx
npm install #legacy/psammead-script-link/src --save
```

## Props

<!-- prettier-ignore -->
| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| script | object | yes | N/A | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, } |
| service | string | yes | N/A | `'serbian'` |
| href | string | yes | N/A | `'https://www.bbc.com/serbian/lat'` |
| variant | string | no | `null` | `'lat'` |
| children | node | yes | N/A | `'Lat'` |
| onClick | func | no | `() => {}` | `() => console.log('set preferred service variant cookie')` |

## Usage

```jsx
import ScriptLink from '#psammead/psammead-script-link/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => (
  <div>
    <ScriptLink
      script={latin}
      service="serbian"
      href="https://www.bbc.com/serbian/lat"
      variant="lat"
      onClick={onClick}
    >
      Lat
    </ScriptLink>
  </div>
);
```

### When to use this component

The `ScriptLink` component is to be used on the `Brand` component.

### Accessibility notes

When navigating to the `ScriptLink` using a screen reader, it is identified as a link.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
