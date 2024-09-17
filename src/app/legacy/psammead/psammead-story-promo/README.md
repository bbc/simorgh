# psammead-story-promo - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-story-promo%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-story-promo%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-story-promo-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo-list) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-story-promo-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo-list&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/story-promo/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/story-promo--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-story-promo/src.svg)](https://www.npmjs.com/package/#legacy/psammead-story-promo/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `StoryPromo` component is designed to be used on 'index' pages, which are pages that link to other articles/stories. This info can be any collection of nodes, however typically these would be a headline, text summary and timestamp.

## Exports

`/index-alsos` - components for links to stories that are related to the top story.

## Installation

`npm install #legacy/psammead-story-promo/src`

## StoryPromo Props

<!-- prettier-ignore -->
| Argument | Type   | Required | Default | Example        |
| -------- | ------ | -------- | ------- | -------------- |
| image    | node   | no       | Null    | `<img>`          |
| info     | node   | yes      | N/A     | `<h2>Title</h2>` |
| mediaIndicator     | node   | no      | null     | `<MediaIndicator duration="2:15" datetime="PT2M15S" offscreenText="Video 2 minutes 15 seconds" />` |
| dir      | string | no | `ltr` | `rtl` |
| displayImage | boolean | no | true | false |
| promoType | string | no | `regular` | `top` |

## Headline Props

<!-- prettier-ignore -->
| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| Script    | object | yes | latin | `{ canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }` |
| service | string | yes | N/A | `'news'` |
| promoHasImage | bool | no | true | `false` |
| promoType | string | no | `regular` | `top` |

## Summary Props

<!-- prettier-ignore -->
| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| Script    | object | yes | latin | `{ canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }` |
| service | string | yes | N/A | `'news'` |
| promoHasImage | bool | no | true | `false` |
| promoType | string | no | `regular` | `top` |

## IndexAlsos

The Index Alsos are links to stories that are related to the top story.

Within the `IndexAlsos` component there is a Visually Hidden level 4 heading, which announces text passed as prop.

When there are more than one Index Alsos, they should be wrapped in a list item `IndexAlsosLi` within an unordered list `IndexAlsosUl` with the role `listitem` and `list` respectively.

On the other hand, when there is exactly one Index Also, it should use the `IndexAlso` component and it should not be contained within a list.

### Props

#### IndexAlsos Props

<!-- prettier-ignore -->
| Argument | Type | Required | Default | Example        |
| -------- | ---- | -------- | ------- | -------------- |
| children | node | yes      | N/A     | `<IndexAlsosUl><IndexAlsosLi script={latin} service="news" url="https://www.bbc.co.uk/news" mediaIndicator={<MediaIndicator service="news" type="video" indexAlsos/>}>Related content 1</IndexAlsosLi><IndexAlsosLi script={latin} service="news" url="https://www.bbc.co.uk/news">Related content 2</IndexAlsosLi></IndexAlsosUl>`|
| offScreenText | string | no | null | `Related content` |

Data attributes, such as `data-e2e` can be passed in for testing as well.

#### IndexAlsoUl Props

<!-- prettier-ignore -->
| Argument | Type | Required | Default | Example        |
| -------- | ---- | -------- | ------- | -------------- |
| children | node | yes      | N/A     | `<IndexAlsosLi script={latin} service="news" url="https://www.bbc.co.uk/news" mediaIndicator={<MediaIndicator service="news" type="video" indexAlsos/>}>Related content 1</IndexAlsosLi><IndexAlsosLi script={latin} service="news url="https://www.bbc.co.uk/news">Related content 2</IndexAlsosLi>`|

#### IndexAlsoLi Props

<!-- prettier-ignore -->
| Argument       | Type   | Required | Default | Example  |
| -------------- | ------ | -------- | ------- | -------- |
| children       | node   | yes      | N/A     | `This is a headline` |
| script         | object | yes      | latin | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }|
| service        | string | yes      | N/A     | `'news'`|
| url            | string | yes      | N/A     | `'https://www.bbc.co.uk/news'`|
| dir            | string | no       | `ltr`   | `rtl`   |
| mediaIndicator | node   | no       | null    | `<MediaIndicator service="news" type="video" indexAlsos/>` |
| mediaType      | string | no       | null    | `Video` |

#### IndexAlso Props

<!-- prettier-ignore -->
| Argument       | Type   | Required | Default | Example  |
| -------------- | ------ | -------- | ------- | -------- |
| children       | node   | yes      | N/A     | `This is a headline` |
| script         | object | yes      | latin | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }|
| service        | string | yes      | N/A     | `'news'`|
| url            | string | yes      | N/A     | `'https://www.bbc.co.uk/news'`|
| dir            | string | no       | `ltr`   | `rtl`   |
| mediaIndicator | node   | no       | null    | `<MediaIndicator service="news" type="video" indexAlsos/>` |
| mediaType      | string | no       | null    | `Video` |

## Usage

The typical use-case of this component is as displayed below. A Image sits on the left side of the promo with info elements on the right, except in Leading stories which are reversed. These info elements are typically a headline, text summary paragraph and timestamp. The `Headline` and `Summary` components are provided by this package and can be imported as seen below.

This component also has an option to display a media indicator, which consists of a play icon and duration of the media, if that data is provided.

The `promoType` prop of `top` can be passed to adopt a vertical card layout under 600px. At breakpoints above 600px a horizontal layout is maintained with the image and text summary each occupying 1/2 of the parent container.

On the other hand, a `promoType` prop of `leading` can be passed to place the Info on the left side and the Image or the right side of the component. The image occupies 2/3 of the parent container and the text summary occupies 1/3.

This prop must be passed to the StoryPromo, Headline and Summary components.

```jsx
import React, { Fragment } from 'react';
import StoryPromo, {
  Headline,
  Summary,
  Link,
  IndexAlsos,
  IndexAlso,
  IndexAlsosUl,
  IndexAlsosLi,
} from '#psammead/psammead-story-promo/src';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import latin from '#components/ThemeProvider/fontScripts/latin';
import LiveLabel from '#psammead/psammead-live-label/src';
import VisuallyHiddenText from '#components/VisuallyHiddenText';

const Image = <img src="https://foobar.com/image.jpg" />;

const IndexAlsosComponent = ({ alsoItems, script, service }) => (
  //This example doesn't show how the alsoItems are destructured to get the respective data
  <IndexAlsos offScreenText="Related content">
    {alsoItems.length > 1 ? (
      <IndexAlsosUl>
        <IndexAlsosLi
          script={script}
          service={service}
          url="https://www.bbc.co.uk/news"
          mediaIndicator={
            <MediaIndicator service={service} type="video" indexAlsos />
          }
        >
          Related text 1
        </IndexAlsosLi>
        <IndexAlsosLi
          script={script}
          service={service}
          url="https://www.bbc.co.uk/news"
        >
          Related text 2
        </IndexAlsosLi>
      </IndexAlsosUl>
    ) : (
      <IndexAlso>Related text</IndexAlso>
    )}
  </IndexAlsos>
);

const Info = ({ isLive, alsoItems }) => (
  <Fragment>
    <Headline script={latin} service="news" promoType="top">
      <Link href="https://www.bbc.co.uk/news">
        {isLive ? (
          <LiveLabel>
            The headline of the live promo
          </LiveLabel>
        ) : (
          'The headline of the promo'
        )}
      </Link>
    </Headline>
    <Summary script={latin} service="news" promoType="top">
      The summary of the promo
    </Summary>
    <time>12 March 2019</time>
    {topStory && alsoItems && (
      <IndexAlsosComponent
        alsoItems={alsoItems}
        script={latin}
        service="news"
      />
    )}
  </Fragment>
);

<StoryPromo image={Image} info={Info({ isLive: false })} promoType="top" />;
```

### When to use this component

The `StoryPromo` component is designed to be used within a link element to allow the user to navigate to the story on another page.

<!-- ### When not to use this component -->

### Accessibility notes

This component uses full semantic markup for the `Headline`, `Summary`, and `Link`, using `h3`, `p` and `a` respectively. Other accessibility factors such as image alt text and time elements are passed in as props and aren't explicitly set in this component.

The link is nested inside the `h3` for better support with VoiceOver Mac and Safari. We use the `faux block link` pattern which makes the entire block clickable, whilst also enabling links nested within in that block to also be clickable.

The `LiveLabel` example above shows this component being hidden to screen readers, and has visually hidden text rendered alongside it. This is to ensure the screen reader announces the word 'Live' correctly. This does not need to be accounted for in other languages.

## Roadmap

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
