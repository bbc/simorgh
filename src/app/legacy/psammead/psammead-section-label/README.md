# psammead-section-label - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-section-label%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-section-label%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-section-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-section-label) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-section-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-section-label&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/section-label--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-section-label/src.svg)](https://www.npmjs.com/package/#legacy/psammead-section-label/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `#legacy/psammead-section-label/src` package exports one component - a Section Label.

For colours and font family it uses `#legacy/psammead-styles/src` and `#legacy/gel-foundations/src` for spacing and GEL Typography implemented in Styled Components.

The only provided child should be the title for the section, provided as a _string_, which will be wrapped in an `<h2>` element by the component – (see [the Accessibility notes](#accessibility-notes)).

## Installation

`npm install #legacy/psammead-section-label/src`

## Props

<!-- prettier-ignore -->
| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| bar | boolean | no | `true` | `false` |
| mobileDivider | boolean | no | `true` | `false` |
| visuallyHidden | boolean | no | `false` | `true` |
| children | string | yes | N/A | `'Most Read'` |
| dir | string | no | `'ltr'` | `'rtl'` |
| href | string | no | `null` | `'https://www.bbc/com/igbo/egwuregwu'` |
| id | string | no | N/A | `top-stories-id` |
| labelId | string | no | N/A | `top-stories-label` |
| linkText | string | no | `null` | `'See More'` |
| script | object | yes | N/A | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36' }, groupD: { fontSize: '44', lineHeight: '48' } }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24' }, groupB: { fontSize: '24', lineHeight: '28' }, groupD: { fontSize: '32', lineHeight: '36' } } } |
| service | string | yes | N/A | `'news'` |
| backgroundColor | string | no | `C_GHOST` | `C_LUNAR` |
| overrideHeadingAs | string | no | `null` | `strong` |

## Usage

```jsx
import SectionLabel from '#psammead/psammead-section-label/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => (
  <div aria-labelledby="example-section-label">
    <SectionLabel
      script={latin}
      dir="ltr"
      labelId="example-section-label"
      service="news"
    >
      Example section
    </SectionLabel>
  </div>
);
```

Or, without a horizontal bar:

```jsx
import SectionLabel from '#psammead/psammead-section-label/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => (
  <div aria-labelledby="example-section-label">
    <SectionLabel
      script={latin}
      dir="ltr"
      bar={false}
      labelId="example-section-label"
      service="news"
    >
      Example section
    </SectionLabel>
  </div>
);
```

On mobile, this component places a dividing line above the title. This can be disabled by setting the `mobileDivider` prop to `false`:

```jsx
import SectionLabel from '#psammead/psammead-section-label/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => (
  <div aria-labelledby="example-section-label">
    <SectionLabel
      script={latin}
      dir="ltr"
      mobileDivider={false}
      labelId="example-section-label"
      service="news"
    >
      Example section
    </SectionLabel>
  </div>
);
```

You can also visually hide the SectionLabel for all breakpoints by adding the `visuallyHidden` prop:

```jsx
import SectionLabel from '#psammead/psammead-section-label/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => (
  <div aria-labelledby="example-section-label">
    <SectionLabel
      script={latin}
      dir="ltr"
      visuallyHidden={true}
      labelId="example-section-label"
      service="news"
    >
      Example section
    </SectionLabel>
  </div>
);
```

You can even use this component as a link (typically to an index of content related to the section):
NB. when doing this **both** the `href` **and** the `linkText` must be supplied. If either is missing, the link will not be rendered.

```jsx
import SectionLabel from '#psammead/psammead-section-label/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => (
  <div aria-labelledby="example-section-label">
    <SectionLabel
      script={latin}
      dir="ltr"
      href="https://www.bbc.com/news/index"
      id="example-section-label"
      linkText="See More"
      service="news"
    >
      Example section
    </SectionLabel>
  </div>
);
```

You can override the header(`h2`) to any custom HTML element that fits your accesibility requirement depending on what use case or semantic meaning you want to portray in your pages with the `overrideHeadingAs` prop.

```jsx
import SectionLabel from '#psammead/psammead-section-label/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => (
  <div aria-labelledby="example-section-label">
    <SectionLabel
      script={latin}
      dir="ltr"
      labelId="example-section-label"
      service="news"
      overrideHeadingAs="strong"
    >
      Example section
    </SectionLabel>
  </div>
);
```

### When to use this component

This component should be used to signal the beginning of a grouping of story promos. It should **not** wrap the story promos or contain any content other than that section's title (aka 'strapline').

<!-- ### When not to use this component -->

### Accessibility notes

Although this component has the appearance of a horizontal rule, it does not use an `<hr>` tag, and therefore does not have the associated semantic meaning.

This component wraps the title string in an `<h2>` element. The `labelId` prop will be applied to the `<h2>` as an `id` attribute, allowing the content of the element to be referenced by an `aria-labelledby` attribute. See the [examples](#usage) above.

Setting the `visuallyHidden` prop to true visually hides this component for all breakpoints, however it will still be available to screen-readers and other assistive technology.

When supplied with an `href` and the `linkText`, the section label contains an `<a>` link, which is `aria-labelledby` the `labelId` described above. The `linkText` is only expected to be useful to visual users, so is marked as `aria-hidden="true"` to prevent announcement to screen readers. This `aria-hidden="true"` isn't strictly required - setting the `aria-labelledby` attribute should prevent screen readers from reading out the `linkText`. However, it adding it makes clear to screen readers and other developers that the `linkText` is designed to be ignored by screen readers.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
