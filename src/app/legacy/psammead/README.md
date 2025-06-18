# Psammead Packages Directory...

NB all Development Dependencies are in the top level package.json, none are in the packages.

## Documentation index

Please familiarise yourself with our:

- [Code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)
- [Code Standards and Ways of Working](https://github.com/bbc/psammead/blob/latest/Code-Standards-and-Ways-of-Working.md)
- [Contributing guidelines](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)
- [Guide to Code Reviews](https://github.com/bbc/simorgh/blob/latest/docs/Code-Reviews.mdx)
- [Primary README](https://github.com/bbc/psammead/blob/latest/README.md)
- [Versioning and changelogs](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md#versioning-and-changelogs)
- [Use/consumption of Psammead packages guidelines and package list](https://github.com/bbc/psammead/blob/latest/packages/README.md) (you are here)
- [Things to do when creating a new component](https://github.com/bbc/psammead/blob/latest/Creating-a-new-component.md)

NB there is further documentation colocated with relevant packages and code. The above list is an index of the top-level documentation of our repo (and our sibling repo [Simorgh](https://github.com/bbc/simorgh)).

## Using/consuming Psammead components

NB the main example of use is this repo's sibling repo [Simorgh](https://github.com/bbc/simorgh).

### Pre-requisite for use

These components have been tested in an environment which uses [normalize](https://github.com/necolas/normalize.css) and [`box-sizing: border-box`](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/) for consistent behaviour across browsers. Additionally, many components depend on the BBC Reith font having been defined.

You can do this in pure CSS:

```html
<link
  rel="stylesheet"
  href="https://necolas.github.io/normalize.css/8.0.0/normalize.css"
/>
<style>
  /* Box Sizing https://bit.ly/1A91I0J */
  html {
    box-sizing: border-box;
    font-size: 100%;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  @font-face {
    font-display: optional;
    font-family: 'ReithSans';
    font-style: normal;
    font-weight: 400;
    src: url('https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSans_W_Rg.woff2')
        format('woff2'), url('https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSans_W_Rg.woff')
        format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: 'ReithSerif';
    font-style: normal;
    font-weight: 600;
    src: url('https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSerif_W_Md.woff2')
        format('woff2'), url('https://static.files.bbci.co.uk/fonts/reith/r2.512/BBCReithSerif_W_Md.woff')
        format('woff');
  }
</style>
```

Or if you're using [styled-components](https://styled-components.com), you can use [styled-normalize](https://www.npmjs.com/package/styled-normalize) (`npm install styled-normalize`) and `createGlobalStyle` to manage global styles as has been done in Simorgh.

[See documentation on the Styled Components site](https://www.styled-components.com/docs/tooling#babel-plugin)

**NOTE**: if you run into issues with CSS not being applied to your components, it is likely that there is a duplicate `styled-components` dependency somewhere in your packages. You can try running [`npm dedupe`](https://www.styled-components.com/docs/faqs#duplicated-module-in-node_modules) in most cases, or [`lerna bootstrap --hoist`](https://www.styled-components.com/docs/faqs#usage-with-lerna) in monorepo setups such as Psammead's. Failing that, make sure your application's `styled-components` dependency is the same version as that in Psammead.

## List of all packages

### [Components](./components)

<!-- prettier-ignore -->
| Package | Version | Dependencies | Peer Dependencies
|--------|--------|------------|------------|
| [`#legacy/psammead-brand/src`](./components/psammead-brand) | [![npm version](https://img.shields.io/npm/v/#legacy/psammead-brand/src.svg)](https://www.npmjs.com/package/#legacy/psammead-brand/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-brand)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-brand) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-brand)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-brand&type=peer) |
| [`#legacy/psammead-caption/src`](./components/psammead-caption) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-caption/src.svg)](https://www.npmjs.com/package/#legacy/psammead-caption/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-caption)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-caption) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-caption)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-caption&type=peer) |
| [`#legacy/psammead-consent-banner/src`](./components/psammead-consent-banner) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-consent-banner/src.svg)](https://www.npmjs.com/package/#legacy/psammead-consent-banner/src) | [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-consent-banner)](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-consent-banner) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-consent-banner)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-consent-banner&type=peer) |
| [`#legacy/psammead-figure/src`](./components/psammead-figure) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-figure/src.svg)](https://www.npmjs.com/package/#legacy/psammead-figure/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-figure)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-figure) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-figure)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-figure&type=peer) |
| [`#legacy/psammead-grid/src`](./components/psammead-grid) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-grid/src.svg)](https://www.npmjs.com/package/#legacy/psammead-grid/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-grid)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-grid) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-grid)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-grid&type=peer) |
| [`#legacy/psammead-headings/src`](./components/psammead-headings) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-headings/src.svg)](https://www.npmjs.com/package/#legacy/psammead-headings/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-headings)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-headings) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-headings)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-headings&type=peer) |
| [`#legacy/psammead-image/src`](./components/psammead-image) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-image/src.svg)](https://www.npmjs.com/package/#legacy/psammead-image/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-image)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-image)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image&type=peer) |
| [`#legacy/psammead-image-placeholder/src`](./components/psammead-image-placeholder) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-image-placeholder/src.svg)](https://www.npmjs.com/package/#legacy/psammead-image-placeholder/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-image-placeholder)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image-placeholder) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-image-placeholder)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image-placeholder&type=peer) |
| [`#legacy/psammead-inline-link/src`](./components/psammead-inline-link) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-inline-link/src.svg)](https://www.npmjs.com/package/#legacy/psammead-inline-link/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-inline-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-inline-link) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-inline-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-inline-link&type=peer) |
| [`#legacy/psammead-media-indicator/src`](./components/psammead-media-indicator) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-media-indicator/src.svg)](https://www.npmjs.com/package/#legacy/psammead-media-indicator/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-media-indicator)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-indicator) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-media-indicator)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-indicator&type=peer) |
| [`@bbc/psammead-media-player`](./components/psammead-media-player) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-media-player.svg)](https://www.npmjs.com/package/@bbc/psammead-media-player) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-media-player)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-player) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-media-player)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-player&type=peer) |
| [`#legacy/psammead-navigation/src`](./components/psammead-navigation) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-navigation/src.svg)](https://www.npmjs.com/package/#legacy/psammead-navigation/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-navigation)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-navigation) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-navigation)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-navigation&type=peer) |
| [`#legacy/psammead-paragraph/src`](./components/psammead-paragraph) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-paragraph/src.svg)](https://www.npmjs.com/package/#legacy/psammead-paragraph/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-paragraph)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-paragraph) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-paragraph)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-paragraph&type=peer) |
| [`#legacy/psammead-section-label/src`](./components/psammead-section-label) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-section-label/src.svg)](https://www.npmjs.com/package/#legacy/psammead-section-label/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-section-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-section-label) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-section-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-section-label&type=peer) |
| [`#legacy/psammead-story-promo/src`](./components/psammead-story-promo) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-story-promo/src.svg)](https://www.npmjs.com/package/#legacy/psammead-story-promo/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-story-promo)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-story-promo)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo&type=peer) |
| [`#legacy/psammead-story-promo-list/src`](./components/psammead-story-promo-list) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-story-promo-list/src.svg)](https://www.npmjs.com/package/#legacy/psammead-story-promo-list/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-story-promo-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo-list) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-story-promo-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo-list&type=peer) |
| [`#legacy/psammead-timestamp/src`](./components/psammead-timestamp) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-timestamp/src.svg)](https://www.npmjs.com/package/#legacy/psammead-timestamp/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-timestamp)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-timestamp) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-timestamp)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-timestamp&type=peer) |
| [`#legacy/psammead-visually-hidden-text/src`](./components/psammead-visually-hidden-text) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-visually-hidden-text/src.svg)](https://www.npmjs.com/package/#legacy/psammead-visually-hidden-text/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-visually-hidden-text)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-visually-hidden-text) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-visually-hidden-text)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-visually-hidden-text&type=peer) |

### [Containers](./containers)

<!-- prettier-ignore -->
| Package | Version | Dependencies | Peer Dependencies
|--------|--------|------------|------------|
| [`#legacy/psammead-timestamp-container/src`](./containers/psammead-timestamp-container) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-timestamp-container/src.svg)](https://www.npmjs.com/package/#legacy/psammead-timestamp-container/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/containers/psammead-timestamp-container)](https://david-dm.org/bbc/psammead?path=packages/containers/psammead-timestamp-container) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/containers/psammead-timestamp-container)](https://david-dm.org/bbc/psammead?path=packages/containers/psammead-timestamp-container&type=peer) |

### [Utilities](./utilities)

In order to be added to Psammead, utility packages should:

- be common requirements of many of the repo's components, or many of the repo's users.
- contain realistic usage examples.

<!-- prettier-ignore -->
| Package | Version | Dependencies | Peer Dependencies
|--------|--------|------------|------------|
| [`#legacy/gel-foundations/src`](./utilities/gel-foundations) |[![npm version](https://img.shields.io/npm/v/#legacy/gel-foundations/src.svg)](https://www.npmjs.com/package/#legacy/gel-foundations/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/gel-foundations)](https://david-dm.org/bbc/psammead?path=packages/utilities/gel-foundations) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/gel-foundations)](https://david-dm.org/bbc/psammead?path=packages/utilities/gel-foundations&type=peer) |
| [`#legacy/moment-timezone-include`](./utilities/moment-timezone-include) |[![npm version](https://img.shields.io/npm/v/#legacy/moment-timezone-include.svg)](https://www.npmjs.com/package/#legacy/moment-timezone-include) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/moment-timezone-include)](https://david-dm.org/bbc/psammead?path=packages/utilities/moment-timezone-include) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/moment-timezone-include)](https://david-dm.org/bbc/psammead?path=packages/utilities/moment-timezone-include&type=peer) |
| [`#legacy/psammead-assets/src`](./utilities/psammead-assets) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-assets/src.svg)](https://www.npmjs.com/package/#legacy/psammead-assets/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-assets)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-assets) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-assets)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-assets&type=peer) |
| [`#legacy/psammead-locales`](./utilities/psammead-locales) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-locales.svg)](https://www.npmjs.com/package/#legacy/psammead-locales) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-locales)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-locales) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-locales)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-locales&type=peer) |
| [`@bbc/psammead-storybook-helpers`](./utilities/psammead-storybook-helpers) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-storybook-helpers.svg)](https://www.npmjs.com/package/@bbc/psammead-storybook-helpers) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers&type=peer) |
| [`#legacy/psammead-styles/src`](./utilities/psammead-styles) |[![npm version](https://img.shields.io/npm/v/#legacy/psammead-styles/src.svg)](https://www.npmjs.com/package/#legacy/psammead-styles/src) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-styles)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-styles) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-styles)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-styles&type=peer) |
| [`@bbc/psammead-test-helpers`](./utilities/psammead-test-helpers) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-test-helpers.svg)](https://www.npmjs.com/package/@bbc/psammead-test-helpers) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-test-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-test-helpers) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-test-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-test-helpers&type=peer) |
