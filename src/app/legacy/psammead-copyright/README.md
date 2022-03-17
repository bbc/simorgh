# psammead-copyright - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-copyright%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-copyright%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-copyright)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-copyright) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-copyright)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-copyright&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/copyright--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/BBC/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-copyright.svg)](https://www.npmjs.com/package/@bbc/psammead-copyright) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/BBC/psammead/blob/latest/CONTRIBUTING.md)

## Description

Displays a source attribution in block capitals in the bottom-right of the parent element. This implementation is primarily intended for use alongside images.

## Installation

`npm install @bbc/psammead-copyright`

## Props

| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| No props. |      |          |         |         |

## Usage

Commonly used alongside [`psammead-figure`](https://github.com/BBC-News/psammead/tree/latest/packages/components/psammead-figure), [`psammead-image`](https://github.com/BBC-News/psammead/tree/latest/packages/components/psammead-image) and [`psammead-image-placeholder`](https://github.com/BBC-News/psammead/tree/latest/packages/components/psammead-image-placeholder). Can also pass in [`psammead-visually-hidden-text`](https://github.com/BBC-News/psammead/tree/latest/packages/components/psammead-visually-hidden-text) in order to announce the component.

```jsx
const WrapperComponent = ({ alt, ratio, src, width }) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <Image alt={alt} src={src} width={width} />
      <Copyright>
        <VisuallyHiddenText>Image source, </VisuallyHiddenText>
        Getty Images
      </Copyright>
    </ImagePlaceholder>
  </Figure>
);
```

### When to use this component

This component is intended to be used alongside images or diagrams contained within a [Figure component](https://github.com/BBC-News/psammead/tree/latest/packages/components/psammead-figure).

### When not to use this component

This component should not be used arbitrarily to represent source attribution across the page. As above, it is not intended to be used outside the [Figure component](https://github.com/BBC-News/psammead/tree/latest/packages/components/psammead-figure). The accessibility text would be incorrect and potentially confusing.

Do not use this component if you know the source attribution is already covered by another copyright disclosure on the page.

### Accessibility notes

The default styling of this component is intended to comply with WCAG colour contrast standards.

The `VisuallyHiddenText` component can be used as a child of `Copyright` to add additional context to screen reader users. An example of this can be found in [our storybook](https://bbc.github.io/psammead/?selectedKind=Copyright&selectedStory=with%20visually%20hidden%20text)

This component uses aria role text, to stop '[text splitting](https://axesslab.com/text-splitting/)' that is observed when using VoiceOver on iPhone and therefore improve the screen reader UX. Without this, the image source element is 2 swipes on VoiceOver (left to right), one for 'Image source' and one for the actual source such as 'Getty images'.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/BBC-News/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/BBC-News/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/BBC-News/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/BBC-News/psammead/blob/latest/LICENSE).
