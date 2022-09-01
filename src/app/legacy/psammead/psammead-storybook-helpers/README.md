# psammead-storybook-helpers - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fpsammead-storybook-helpers%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fpsammead-storybook-helpers%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-storybook-helpers)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-storybook-helpers&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-storybook-helpers.svg)](https://www.npmjs.com/package/@bbc/psammead-storybook-helpers) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a collection of common values that are used in storybook by the Psammead components.

## Exports

`TEXT_VARIANTS` - A list of text samples in different languages, with the script and direction that should be used for that language.

`themes` - An object containing the Storybook themes we use.

`withServicesKnob` - Is a function that returns a storybook decorator function that adds a `Select a service` dropdown to the knobs panel. When a service is selected from the dropdown it does 2 things:

1. Provides the decorated stories with the following properties that can be passed into components:

- `text`: A short string of text in the language of the chosen service.
- `longText`: A long string of text in the language of the chosen service (we can use this to stress test components).
- `dir`: The reading directionality of the chosen service e.g. `ltr` or `rtl`.
- `script`: The chosen service's script typography settings e.g. the font-size and line-heights.
- `service`: The name of the chosen service e.g. `arabic`.
- `variant`: The variant value of a chosen service, e.g `serbianLat` will have variant `lat`. Non variant service will default to `default`.
- `articlePath`: A path to an article in the relevant service.
- `selectedService`: The name of the selected service as it appears in the dropdown of available services.

2. Toggles the layout directionality of the chosen service.

The `withServicesKnob` function accepts an options argument with 2 properties:

- `defaultService`(String): The default selected service of the services dropdown e.g. `arabic`. The default is `news`.
- `services`(Array): A list of services that the dropdown will display. The default is all services.

`buildRTLSubstories` - a function to create right-to-left variants of stories as substories. Internally it uses the `withServicesKnob` to set the default service as `arabic`.

The `buildRTLSubstories` function accepts 2 arguments.

- `storyKind`(String) - This is the story kind that you want you want to create RTL substories from. This will normally be the first argument you pass into `storiesOf` e.g. `storiesOf('Components/Paragraph', module)`. This parameter is required.
- `options`(Object) - Available options:
  - `include`(Array) - A list of specific story names to create RTL substories of. If this is not provided then all stories will have RTL substories.

## Installation

```sh
npm install @bbc/psammead-storybook-helpers --save-dev
```

## Usage

### TEXT_VARIANTS

<!-- prettier-ignore -->
```jsx
import { select } from '@storybook/addon-knobs';
import { TEXT_VARIANTS } from '@bbc/psammead-storybook-helpers';

const label = 'Languages';
const defaultValue = 'This is a caption';
const groupIdentifier = 'CAPTION VARIANTS';

<Caption>
  {select(label, TEXT_VARIANTS, TEXT_VARIANTS.news, groupIdentifier).text}
</Caption>;
```

### withServicesKnob

```js
storiesOf('Components/Paragraph', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob()) // default selected service is `news`
  .add('A paragraph with English text', ({ text, script, service }) => (
    <Paragraph script={script} service={service}>
      {text}
    </Paragraph>
  ));
```

To set a default service:

```js
storiesOf('Components/Paragraph', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withServicesKnob({
      defaultService: 'arabic',
      services: ['news', 'arabic', 'amharic'],
    }),
  ) // default selected service is `arabic` and the available services in the dropdown are `news`, `arabic`, `amharic`
  .add('A paragraph with Arabic text', ({ text, script, service }) => (
    <Paragraph script={script} service={service}>
      {text}
    </Paragraph>
  ));
```

If you want to add this decorator to a single story rather than a series of stories as documented above, perhaps because you need each story to have a different default service, then you need to decorate each story directly instead of using the `addDecorator` method. An example of how you could write this is shown below:

```js
const arabicServiceDecorator = withServicesKnob({
  defaultService: 'arabic',
});

const pashtoServiceDecorator = withServicesKnob({
  defaultService: 'pashto',
});

storiesOf('Components/Paragraph', module)
  .addDecorator(withKnobs)
  .add('A paragraph with Arabic text', () =>
    arabicServiceDecorator(({ text, script, service }) => (
      <Paragraph script={script} service={service}>
        {text}
      </Paragraph>
    )),
  )
  .add('A paragraph with Pashto text', () =>
    pashtoServiceDecorator(({ text, script, service }) => (
      <Paragraph script={script} service={service}>
        {text}
      </Paragraph>
    )),
  );
```

You can include links to articles in the relevant services and variants

```js
const BASE_URL = 'https://www.bbc.com';

storiesOf('Components/Paragraph/Link', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob()) // default selected service is `news`
  .add(
    'A paragraph with an inline link to an article',
    ({ text, script, service, articlePath }) => (
      <Paragraph script={script} service={service}>
        <InlineLink href={`${BASE_URL}${articlePath}`}>{text}</InlineLink>
      </Paragraph>
    ),
  );
```

The above example dismisses the use of the `addDecorator` method and decorates the story directly.

### buildRTLSubstories

```jsx
import { buildRTLSubstories } from '@bbc/psammead-storybook-helpers';

// create RTL variants of all stories of a kind
buildRTLSubstories('Components/Paragraph');
```

```jsx
import { buildRTLSubstories } from '@bbc/psammead-storybook-helpers';

// create RTL variants of specific stories of a kind
buildRTLSubstories('Components/Paragraph', {
  include: ['containing an inline link'],
});
```

## Contributing

When **adding** a new export to this utility package the [export tests](https://github.com/bbc/psammead/blob/dab14a2732cfa620e083b7da66a148b4189474a7/packages/utilities/psammead-storybook-helpers/index.test.jsx#L13-L15) also need to be updated. When **removing** an exisiting export from this utility package the [export tests](https://github.com/bbc/psammead/blob/dab14a2732cfa620e083b7da66a148b4189474a7/packages/utilities/psammead-storybook-helpers/index.test.jsx#L13-L15) need to be updated and the package version requires a major change (EG: 1.2.1 -> 2.0.0) as this would be considered a breaking change due to functionality being removed.

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
