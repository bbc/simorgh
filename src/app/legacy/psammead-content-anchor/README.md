# ⛔️ This is an alpha component ⛔️

This component is currently tagged as alpha and is not suitable for production use. Following the passing of an accessibility review this component will be marked as ready for production and the alpha tag removed.

# psammead-content-anchor - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-content-anchor%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-content-anchor%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-content-anchor)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-content-anchor) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-content-anchor)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-content-anchor&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/components-ContentAnchor--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-content-anchor.svg)](https://www.npmjs.com/package/@bbc/psammead-content-anchor) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

`ContentAnchor` is a component to mitigate the jarring user experience of the page moving while the user is in the middle of consuming the content.

> Today, users of the web are often distracted by content moving around due to changes that occur outside the viewport. Examples include script inserting an iframe containing an ad, or non-sized images loading on a slow network. - [CSS Working Group](https://drafts.csswg.org/css-scroll-anchoring/#intro*)

Such content can be wrapped with `ContentAnchor` to prevent the page from jumping around.

⚠️ Side-effects: This component enables [scroll-anchoring](https://drafts.csswg.org/css-scroll-anchoring/) by adding `overflow-anchor: auto` style to the `body` tag. We recommend you don't override this style and that you also don't explicitly set `overflow-anchor: none` on any parent elements of `ContentAnchor`. If you do then the user may experience content shifting.

## How it works

`ContentAnchor` will never resize when in view even if the child content resizes. `ContentAnchor` content is allowed to resize when it is outside of the viewport. If the `ContentAnchor` component is above the scrollable region of the viewport and scroll height of the page changes then the Y scroll position is adjusted to prevent a vertical scroll jump that would disrupt the user's reading experience. This technique is called [scroll anchoring](https://drafts.csswg.org/css-scroll-anchoring/) and can be achieved by setting `overflow-anchor: auto` on a scrollable container such as the body element. It is enabled in Chrome 56 and Firefox 66 https://caniuse.com/#feat=css-overflow-anchor as an [opt-out for developers](https://www.chromestatus.com/feature/5700102471548928) and is implemented in `ContentAnchor` using javascript for browsers that do not have support for `overflow-anchor`.

## Installation

`npm install @bbc/psammead-content-anchor --save`

## Props

| Argument      | Type          | Required | Default | Example         |
| ------------- | ------------- | -------- | ------- | --------------- |
| children      | node          | true     |         | <Advertisement> |
| initialHeight | String/Number | false    | 'auto'  | 400             |
| initialWidth  | String/Number | false    | 'auto'  | 400             |

**Note** - `children` does not support passing in a React `Fragment` wrapping several children. Should be e.g. a div.

## Usage

```jsx
import ContentAnchor from  '@bbc/psammead-content-anchor';

<ContentAnchor
  initialHeight={400}
  initialWidth={400}
>
  <Advertisement>
</ContentAnchor>
```

### When to use this component

When you need to use e.g. 3rd party components and want to prevent unexpected visible content jumps. You can use this wrap content such as Visual Journalism content, IDT (data) components and adverts.

### When not to use this component

When you are absolutely sure that the child content will never resize.

### Accessibility notes

<!-- Information about accessibility for this component -->

### Roadmap

<!-- Known future changes of the component -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
