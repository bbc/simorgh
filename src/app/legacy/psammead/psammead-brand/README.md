# psammead-brand - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-brand%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-brand%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-brand)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-brand) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-brand)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-brand&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/brand--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-brand/src.svg)](https://www.npmjs.com/package/#legacy/psammead-brand/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `Brand` component provides the BBC service logo (as SVG), nested inside a styled link and div. The link is currently hardcoded to "https://www.bbc.co.uk/news".

`Brand` takes a `product`, `svgHeight`, `minWidth`, `maxWidth`, `url`, `serviceLocalisedName`, `backgroundColour`, `logoColour` and `svg` as props.

The `product` is passed to a [VisuallyHiddenText](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-visually-hidden-text) component, nested inside Brand.

The `serviceLocalisedName` is an optional prop referring to the local name of a service eg `Yoruba`. It is also passed to [VisuallyHiddenText](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-visually-hidden-text) inside the Brand component.

The `svg` prop must contain a `group`, `viewbox` values and a `ratio`, which is used within an `svg` element. Examples of the `svg` object can be found in [#legacy/psammead-assets/src](https://github.com/bbc/psammead/blob/latest/packages/utilities/psammead-assets/README.md#service-svgs).

The `minWidth` and `maxWidth` values are required to allow the ability for the `svg` element to dynamically scale as the viewport becomes a very small size EG: feature phones.

The `svgHeight` value acts as a placeholder for the `svg` element meaning the overall banner height does not change with the dynamic scaling, also the `height` allows the contents of the `svg` element to remain vertically centred within the banner at all times.

The `backgroundColour` is the background colour and `logoColour` is the colour of the SVG and the underline when hovering/focusing on the brand.

The `url` value is the link that points to the frontpage of the service associated with the `svg`.

The `scriptLink` can be used to render [ScriptLink](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-script-link) component which is a link to the service variant.

## Exports

`/skip-link` - Use the skip link component to help keyboard-only users skip to the main content on the page.

## Installation

`npm install #legacy/psammead-brand/src`

## Props

<!-- prettier-ignore -->
| Argument  | Type   | Required | Default | Example      |
| --------- | ------ | -------- | ------- | ------------ |
| product | String | yes | N/A | `'BBC News'` |
| svgHeight | Number | yes | N/A | `24` |
| minWidth | Number | yes | N/A | `240` |
| maxWidth | Number | yes | N/A | `380` |
| svg | Object | yes | N/A | { group: `(<g fillrule="evenodd"><path d="M84.32" /></g>)`, viewbox: { height: 24, width: 167.95 }, ratio: 6.9979 } |
| backgroundColour | String | yes | N/A | `${POSTBOX}` or relevant string hex code |
| logoColour | String | yes | N/A | `${WHITE}` or relevant string hex code |
| url | String | no | N/A | `https://www.bbc.co.uk/news` |
| serviceLocalisedName | String | no | N/A | `'Yoruba'` |
| borderTop | Boolean | no | `false` | `true` |
| borderBottom | Boolean | no | `false` | `true` |
| scriptLink | Node | no | `null` | `<ScriptLink service='news' script={latin} href='https://www.bbc.com/serbian/lat'> Lat </ScriptLink>` |
| skipLink | Node | no | `null` | `<SkipLink service='news' script={latin} href='#content'> Skip to content </SkipLink>` |
| linkId | String | no | `null` | `'brandLink'` |

## Usage

The typical use-case of this component is at the top of pages in a [`header` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header). When this is done it is recommend that the component is wrapped in a [`banner` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Banner_role). However, a `header` with a `banner` role should only appear once on a page.

When using `Brand` in the header, you should ensure that `borderBottom` prop is set to true. Similarly, when using brand on the footer you should set `borderTop` to true. This ensures when in High Contrast Mode on PC and when the user changes colour preferences in FireFox that the top/bottom of the `Brand` component is visible.

`ScriptLink` component should be passed to `scriptLink` only when linking to a service variant.

```jsx
import Brand from '#psammead/psammead-brand/src';
import SkipLink from '#psammead/psammead-brand/src/skip-link';
import { igbo } from '#psammead/psammead-assets/src/svgs';
import ScriptLink from '../../../components/Header/ScriptLink';
import { POSTBOX, WHITE } from '../../../../components/ThemeProvider/palette';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const scriptLink = (
  <ScriptLink
    service="news"
    script={latin}
    href="https://www.bbc.com/serbian/lat"
  >
    Lat
  </ScriptLink>
);

const skipLink = (
  <SkipLink service="news" script={latin} href="#content">
    Skip to content
  </SkipLink>
);

const Header = (product, serviceName) => (
  <header role="banner">
    <Brand
      product={product}
      serviceLocalisedName={serviceName}
      svgHeight={24}
      maxWidth={280}
      minWidth={180}
      svg={igbo}
      url="https://www.bbc.co.uk/news"
      backgroundColour={backgroundColour}
      logoColour={logoColour}
      borderBottom
      scriptLink={scriptLink}
      skipLink={skipLink}
    />
  </header>
);
```

### When to use this component

The `Brand` component is designed to be used where a BBC logo is required as SVG. `Brand` is used in the [BrandContainer](https://github.com/bbc/simorgh/tree/latest/src/app/containers/Brand), which consumes a service context it passes to the `Brand`.

<!-- ### When not to use this component -->

### Accessibility notes

- Visually hidden text is provided (e.g. for screen reader users)
- `Brand` is keyboard-accessible and provides hover and focus styles
- The brand SVG has support for users with css disabled or high contrast mode enabled.

<!-- ## Roadmap -->

### Additional notes

- `width: 100%` is needed on both `<a>` and the `<svg>` to allow the brand to dynamically scale on the Firefox browser

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
