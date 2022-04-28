# Psammead Packages Directory...

NB all Development Dependencies are in the top level package.json, none are in the packages.

## Documentation index

Please familiarise yourself with our:

- [Code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)
- [Code Standards and Ways of Working](https://github.com/bbc/psammead/blob/latest/Code-Standards-and-Ways-of-Working.md)
- [Contributing guidelines](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)
- [Guide to Code Reviews](https://github.com/bbc/simorgh/blob/latest/docs/Code-Reviews.md)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)
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
    src: url('https://gel.files.bbci.co.uk/r2.511/BBCReithSans_W_Rg.woff2')
        format('woff2'), url('https://gel.files.bbci.co.uk/r2.511/BBCReithSans_W_Rg.woff')
        format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: 'ReithSerif';
    font-style: normal;
    font-weight: 600;
    src: url('https://gel.files.bbci.co.uk/r2.511/BBCReithSerif_W_Md.woff2')
        format('woff2'), url('https://gel.files.bbci.co.uk/r2.511/BBCReithSerif_W_Md.woff')
        format('woff');
  }
</style>
```

Or if you're using [styled-components](https://styled-components.com), you can use [styled-normalize](https://www.npmjs.com/package/styled-normalize) (`npm install styled-normalize`) and `createGlobalStyle` to [manage global styles as has been done in Simorgh](https://github.com/bbc/simorgh/blob/latest/src/app/lib/utilities/darkMode/index.jsx#L4).

[See documentation on the Styled Components site](https://www.styled-components.com/docs/tooling#babel-plugin)

**NOTE**: if you run into issues with CSS not being applied to your components, it is likely that there is a duplicate `styled-components` dependency somewhere in your packages. You can try running [`npm dedupe`](https://www.styled-components.com/docs/faqs#duplicated-module-in-node_modules) in most cases, or [`lerna bootstrap --hoist`](https://www.styled-components.com/docs/faqs#usage-with-lerna) in monorepo setups such as Psammead's. Failing that, make sure your application's `styled-components` dependency is the same version as that in Psammead.

## List of all packages

### [Components](./components)

<!-- prettier-ignore -->
| Package | Version | Dependencies | Peer Dependencies
|--------|--------|------------|------------|
| [`@bbc/psammead-brand`](./components/psammead-brand) | [![npm version](https://img.shields.io/npm/v/@bbc/psammead-brand.svg)](https://www.npmjs.com/package/@bbc/psammead-brand) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-brand)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-brand) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-brand)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-brand&type=peer) |
| [`@bbc/psammead-caption`](./components/psammead-caption) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-caption.svg)](https://www.npmjs.com/package/@bbc/psammead-caption) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-caption)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-caption) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-caption)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-caption&type=peer) |
| [`@bbc/psammead-consent-banner`](./components/psammead-consent-banner) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-consent-banner.svg)](https://www.npmjs.com/package/@bbc/psammead-consent-banner) | [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-consent-banner)](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-consent-banner) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-consent-banner)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-consent-banner&type=peer) |
| [`@bbc/psammead-copyright`](./components/psammead-copyright) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-copyright.svg)](https://www.npmjs.com/package/@bbc/psammead-copyright) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-copyright)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-copyright) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-copyright)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-copyright&type=peer) |
| [`@bbc/psammead-figure`](./components/psammead-figure) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-figure.svg)](https://www.npmjs.com/package/@bbc/psammead-figure) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-figure)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-figure) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-figure)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-figure&type=peer) |
| [`@bbc/psammead-grid`](./components/psammead-grid) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-grid.svg)](https://www.npmjs.com/package/@bbc/psammead-grid) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-grid)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-grid) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-grid)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-grid&type=peer) |
| [`@bbc/psammead-headings`](./components/psammead-headings) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-headings.svg)](https://www.npmjs.com/package/@bbc/psammead-headings) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-headings)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-headings) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-headings)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-headings&type=peer) |
| [`@bbc/psammead-image`](./components/psammead-image) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-image.svg)](https://www.npmjs.com/package/@bbc/psammead-image) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-image)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-image)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image&type=peer) |
| [`@bbc/psammead-image-placeholder`](./components/psammead-image-placeholder) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-image-placeholder.svg)](https://www.npmjs.com/package/@bbc/psammead-image-placeholder) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-image-placeholder)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image-placeholder) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-image-placeholder)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image-placeholder&type=peer) |
| [`@bbc/psammead-inline-link`](./components/psammead-inline-link) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-inline-link.svg)](https://www.npmjs.com/package/@bbc/psammead-inline-link) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-inline-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-inline-link) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-inline-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-inline-link&type=peer) |
| [`@bbc/psammead-media-indicator`](./components/psammead-media-indicator) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-media-indicator.svg)](https://www.npmjs.com/package/@bbc/psammead-media-indicator) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-media-indicator)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-indicator) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-media-indicator)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-indicator&type=peer) |
| [`@bbc/psammead-media-player`](./components/psammead-media-player) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-media-player.svg)](https://www.npmjs.com/package/@bbc/psammead-media-player) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-media-player)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-player) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-media-player)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-player&type=peer) |
| [`@bbc/psammead-navigation`](./components/psammead-navigation) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-navigation.svg)](https://www.npmjs.com/package/@bbc/psammead-navigation) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-navigation)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-navigation) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-navigation)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-navigation&type=peer) |
| [`@bbc/psammead-paragraph`](./components/psammead-paragraph) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-paragraph.svg)](https://www.npmjs.com/package/@bbc/psammead-paragraph) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-paragraph)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-paragraph) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-paragraph)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-paragraph&type=peer) |
| [`@bbc/psammead-section-label`](./components/psammead-section-label) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-section-label.svg)](https://www.npmjs.com/package/@bbc/psammead-section-label) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-section-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-section-label) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-section-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-section-label&type=peer) |
| [`@bbc/psammead-story-promo`](./components/psammead-story-promo) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-story-promo.svg)](https://www.npmjs.com/package/@bbc/psammead-story-promo) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-story-promo)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-story-promo)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo&type=peer) |
| [`@bbc/psammead-story-promo-list`](./components/psammead-story-promo-list) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-story-promo-list.svg)](https://www.npmjs.com/package/@bbc/psammead-story-promo-list) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-story-promo-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo-list) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-story-promo-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo-list&type=peer) |
| [`@bbc/psammead-timestamp`](./components/psammead-timestamp) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-timestamp.svg)](https://www.npmjs.com/package/@bbc/psammead-timestamp) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-timestamp)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-timestamp) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-timestamp)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-timestamp&type=peer) |
| [`@bbc/psammead-visually-hidden-text`](./components/psammead-visually-hidden-text) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-visually-hidden-text.svg)](https://www.npmjs.com/package/@bbc/psammead-visually-hidden-text) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-visually-hidden-text)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-visually-hidden-text) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-visually-hidden-text)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-visually-hidden-text&type=peer) |

### [Containers](./containers)

<!-- prettier-ignore -->
| Package | Version | Dependencies | Peer Dependencies
|--------|--------|------------|------------|
| [`@bbc/psammead-timestamp-container`](./containers/psammead-timestamp-container) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-timestamp-container.svg)](https://www.npmjs.com/package/@bbc/psammead-timestamp-container) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/containers/psammead-timestamp-container)](https://david-dm.org/bbc/psammead?path=packages/containers/psammead-timestamp-container) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/containers/psammead-timestamp-container)](https://david-dm.org/bbc/psammead?path=packages/containers/psammead-timestamp-container&type=peer) |

### [Utilities](./utilities)

In order to be added to Psammead, utility packages should:

- be common requirements of many of the repo's components, or many of the repo's users.
- contain realistic usage examples.

<!-- prettier-ignore -->
| Package | Version | Dependencies | Peer Dependencies
|--------|--------|------------|------------|
| [`@bbc/gel-foundations`](./utilities/gel-foundations) |[![npm version](https://img.shields.io/npm/v/@bbc/gel-foundations.svg)](https://www.npmjs.com/package/@bbc/gel-foundations) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/gel-foundations)](https://david-dm.org/bbc/psammead?path=packages/utilities/gel-foundations) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/gel-foundations)](https://david-dm.org/bbc/psammead?path=packages/utilities/gel-foundations&type=peer) |
| [`@bbc/moment-timezone-include`](./utilities/moment-timezone-include) |[![npm version](https://img.shields.io/npm/v/@bbc/moment-timezone-include.svg)](https://www.npmjs.com/package/@bbc/moment-timezone-include) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/moment-timezone-include)](https://david-dm.org/bbc/psammead?path=packages/utilities/moment-timezone-include) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/moment-timezone-include)](https://david-dm.org/bbc/psammead?path=packages/utilities/moment-timezone-include&type=peer) |
| [`@bbc/psammead-assets`](./utilities/psammead-assets) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-assets.svg)](https://www.npmjs.com/package/@bbc/psammead-assets) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-assets)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-assets) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-assets)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-assets&type=peer) |
| [`@bbc/psammead-locales`](./utilities/psammead-locales) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-locales.svg)](https://www.npmjs.com/package/@bbc/psammead-locales) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-locales)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-locales) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-locales)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-locales&type=peer) |
| [`@bbc/psammead-storybook-helpers`](./utilities/psammead-storybook-helpers) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-storybook-helpers.svg)](https://www.npmjs.com/package/@bbc/psammead-storybook-helpers) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers&type=peer) |
| [`@bbc/psammead-styles`](./utilities/psammead-styles) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-styles.svg)](https://www.npmjs.com/package/@bbc/psammead-styles) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-styles)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-styles) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-styles)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-styles&type=peer) |
| [`@bbc/psammead-test-helpers`](./utilities/psammead-test-helpers) |[![npm version](https://img.shields.io/npm/v/@bbc/psammead-test-helpers.svg)](https://www.npmjs.com/package/@bbc/psammead-test-helpers) |[![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-test-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-test-helpers) | [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-test-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-test-helpers&type=peer) |
