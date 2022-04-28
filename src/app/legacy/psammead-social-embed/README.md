# psammead-social-embed - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-social-embed%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-social-embed%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-social-embed)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-social-embed) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-social-embed)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-social-embed&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/social-embed--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-social-embed.svg)](https://www.npmjs.com/package/@bbc/psammead-social-embed) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `SocialEmbed` component renders a rich social media embed for a number of supported providers or a fallback containing a link to the source content.

### Supported providers

| Name      | Value       |
| --------- | ----------- |
| Instagram | `instagram` |
| Twitter   | `twitter`   |
| YouTube   | `youtube`   |

## Installation

```
npm install @bbc/psammead-social-embed --save
```

## Props

### Canonical

| Argument   | Type   | Required | Default | Example                                                                                                             |
| ---------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `provider` | String | Yes      | n/a     | See [supported providers](#supported-providers).                                                                    |
| `service`  | String | Yes      | n/a     | `'news'`                                                                                                            |
| `oEmbed`   | Object | Yes      | n/a     | See [@bbc/psammead-oembed](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-oembed#oembed). |
| `fallback` | Object | Yes      | n/a     | See [fallback](#fallback).                                                                                          |
| `skipLink` | Object | Yes      | n/a     | See [skipLink](#skipLink).                                                                                          |
| `caption`  | Object | No       | `null`  | See [caption](#caption).                                                                                            |
| `onRender` | Function | No      | `null`     | `() => console.log('rendered')` |
### AMP

| Argument   | Type   | Required | Default | Example                                          |
| ---------- | ------ | -------- | ------- | ------------------------------------------------ |
| `provider` | String | Yes      | n/a     | See [supported providers](#supported-providers). |
| `service`  | String | Yes      | n/a     | `'news'`                                         |
| `id`       | String | Yes      | n/a     | `'1237210910835392512'`                          |
| `fallback` | Object | Yes      | n/a     | See [fallback](#fallback).                       |
| `skipLink` | Object | Yes      | n/a     | See [skipLink](#skipLink).                       |
| `caption`  | Object | No       | `null`  | See [caption](#caption).                         |

### `fallback`

| Argument                       | Type   | Required | Default | Example                                                       |
| ------------------------------ | ------ | -------- | ------- | ------------------------------------------------------------- |
| `text`                         | String | Yes      | n/a     | `"Sorry but we're having trouble displaying this content"`    |
| `linkText`                     | String | Yes      | n/a     | `'View content on %provider_name%'`                           |
| `linkTextSuffixVisuallyHidden` | String | No       | `null`  | `', external'`                                                |
| `linkHref`                     | String | Yes      | n/a     | `'https://twitter.com/MileyCyrus/status/1237210910835392512'` |
| `warningText`                  | String | No       | `null`  | `Warning: BBC is not responsible for third party content`     |

### `skipLink`

| Argument                | Type   | Required | Default | Example                            |
| ----------------------- | ------ | -------- | ------- | ---------------------------------- |
| `text`                  | String | Yes      | n/a     | `'Skip %provider_name% content'`   |
| `endTextId`             | String | Yes      | n/a     | `'skip-%provider%-content'`        |
| `endTextVisuallyHidden` | String | Yes      | n/a     | `'End of %provider_name% content'` |

### `caption`

| Argument                   | Type   | Required | Default | Example                                              |
| -------------------------- | ------ | -------- | ------- | ---------------------------------------------------- |
| `textPrefixVisuallyHidden` | String | No       | `null`  | `'Video caption,'`                                   |
| `text`                     | String | Yes      | n/a     | `'Warning: Third party content may contain adverts'` |

See [accessibility notes](#accessibility-notes) for more information.

Note: For your convenience, instances of `%provider%` and `%provider_name%` in `fallback`, `skipLink` and `caption` strings will be replaced with the current provider and, where the provider is known, the name of the provider. E.G. `youtube` and `YouTube` respectively.

## Usage

### Canonical

Pass a [supported provider](#supported-providers) and valid oEmbed response. If neither of these cases can be met, a fallback will be rendered containing a link to the source content.

#### Example

```jsx
import { CanonicalSocialEmbed } from '@bbc/psammead-social-embed';

<CanonicalSocialEmbed
  provider="instagram"
  service="news"
  oEmbed={{ html: '...' }}
  skipLink={{
    text: 'Skip %provider_name% content',
    endTextId: 'skip-%provider%-content',
    endTextVisuallyHidden: 'End of %provider_name% content',
  }}
  fallback={{
    text: "Sorry but we're having trouble displaying this content",
    linkText: 'View content on %provider_name%',
    linkTextSuffixVisuallyHidden: ', external',
    linkHref: 'https://www.instagram.com/p/B8FPf4ZphHi/',
    warningText: 'Warning: BBC is not responsible for third party content',
  }}
/>;
```

The component supports integration with the [react-lazyload](https://www.npmjs.com/package/react-lazyload) package ensuring the social media posts are rendered when they come into view.

#### Example

```jsx
<LazyLoad height={200}>
  <CanonicalSocialEmbed provider="instagram" .../>
</LazyLoad>
```

### onRender
This component takes an `onRender` prop which is invoked when the embed is fully rendered (currently only for twitter embeds), this can be used to change styling on render to help reduce layout shift.

#### Example
```jsx
import React, { useState } from 'react';
import styled from '@emotion/styled';

const DEFAULT_MIN_HEIGHT = '18.75rem';

const Wrapper = styled.div`
  min-height: ${({ minHeight }) => minHeight};
`;

const SocialEmbedWithWrapper = ({
  provider,
  oEmbed,
  skipLink,
  fallback,
  service,
  }) => {

  const [wrapperMinHeight, setWrapperMinHeight] = useState(DEFAULT_MIN_HEIGHT);

  return (
    <Wrapper minHeight={wrapperMinHeight}>
      <CanonicalSocialEmbed
        provider={provider}
        oEmbed={oEmbed}
        skipLink={skipLink}
        fallback={fallback}
        service={service}
        onRender={() => {
          setMinHeight('0');
        }}
      />
    </Wrapper>
  );
};

export default SocialEmbedWithWrapper;
```

### AMP

Pass a [supported provider](#supported-providers). If this case cannot be met, a fallback will be rendered containing a link to the source content.

Pass a valid `id`. This refers to the unique segment of the URL, which identifies the source content. E.G. `1237210910835392512` in `https://twitter.com/MileyCyrus/status/1237210910835392512`.

```jsx
import { AmpSocialEmbed } from '@bbc/psammead-social-embed';

<AmpSocialEmbed
  provider="instagram"
  service="news"
  id="B8FPf4ZphHi"
  skipLink={{
    text: 'Skip %provider_name% content',
    endTextId: 'skip-%provider%-content',
    endTextVisuallyHidden: 'End of %provider_name% content',
  }}
  fallback={{
    text: "Sorry but we're having trouble displaying this content",
    linkText: 'View content on %provider_name%',
    linkTextSuffixVisuallyHidden: ', external',
    linkHref: 'https://www.instagram.com/p/B8FPf4ZphHi/',
    warningText: 'Warning: BBC is not responsible for third party content',
  }}
/>;
```

### When to use this component

This component is designed to embed rich social media content from a number of [supported providers](#supported-providers) in primary content, such as an article.

### When not to use this component

This component will not provide a rich social media embed for providers outside of the [supported providers](#supported-providers) – these will use fallback content instead.

### Accessibility notes

This component provides a [Skip Link](https://webaim.org/techniques/skipnav/), which allows users to identify and skip over social media content in your pages. `skipLink.endTextId` should be set to a value that uniquely identifies `skipLink.endTextVisuallyHidden`. This is especially important when there are more than one social media embeds from the same provider on a page.

`fallback.linkTextSuffixVisuallyHidden` is used to add a suffix to `fallback.text`. This will not be visible on the UI, but will be captured by assistive technology.

`caption.textPrefixVisuallyHidden` is used to add a prefix to `caption.text`. This will not be visible on the UI, but will be captured by assistive technology.

## Miscellaneous

Some components within `SocialEmbed` render the same result given the same props and are memoized using [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) to prevent unnecessary renders.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
