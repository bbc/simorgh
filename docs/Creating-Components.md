# How to create a new component
There are a lot of moving parts to Simorgh. We use the [Presentational & Container pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) for our components, which we build in a few stages.

## Part 1: Create the presentational component
Run the storybook (`npm run storybook`) and visit http://localhost:9001.

Add your component in `src/app/components/[Component Name]/`. You will need:

* index.jsx - defines the component
* index.stories.jsx - defines variations of the component.

Work locally within these two files - the Storybook pattern library will be updated automatically with hot module reloading - to create the component front-end you need.

Once done, make a PR - this first step will need code review and UX QA.

Example implementations below:

### index.jsx
```js
import styled from 'styled-components';

const Blockquote = styled.blockquote`
  background: #f9f9f9;
`;

export default Blockquote;
```

### index.stories.jsx
```js
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Blockquote from './index';

storiesOf('Blockquote', module).add('default - quote only', () => <Blockquote>To be or not to be, that is the question</Blockquote>);
storiesOf('Blockquote', module).add('quote with cite', () => (
    <Blockquote cite="William Shakespeare">To be or not to be, that is the question</Blockquote>
));
```

## Part 2: Create the container component
Once your component front-end is merged, you'll need to integrate it into the renderer. Let's work from the lowest level to the highest level:

### Add a test
In your component subdirectory, add a `index.test.jsx` to take a "snapshot" so that we can protect against regressions to the component. If the structure of the component changes, the unit test suite will fail.

```js
import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Blockquote from './index';

describe('Blockquote', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Blockquote>To be or not to be, that is the question</Blockquote>,
  );
});
```

### Update the schema
data/schema.yaml describes the Article API definition for web. We need to make it aware of our new component.

Your component is more than likely a new 'block', so you'll need to add it to the array of what blocks are allowed to look like:

```yaml
    blocks:
      type: object
      items:
        oneOf:
          - $ref: '#/components/schemas/altText'
          ... etc ...
          - $ref: '#/components/schemas/[your component name]'
      minItems: 2
```

You'll also need to define the block subtype itself:

```yaml
    blockquote:
      type: object
      required:
        - model
        - type
      properties:
        model:
          properties:
            blocks:
              $ref: '#/components/schemas/blocks'
          type: object
        type:
          enum:
            - blockquote
          type: string
```

The schema check currently only happens on local data. Eventually, we hope to run the schema validator at runtime.

### Update some local fixture data
Pick a JSON file under `data/test/news/articles/[id].json`, and:

1) add an example of your block somewhere in the `content.model.blocks` array.
2) add your new component to the `blockTypes` array.

Run `npm run dev` and you should see your component at your article of choice, eg http://localhost:7080/news/articles/c0000000001o

### Add a container
We've added our _component_, which should be kept as simple as possible. Now we need to create our _container_, which contains the business logic for mapping Optimo block data to the React parameters our component needs.

Add a new folder under `src/app/containers/[Component Name]/`. You will need:

* index.jsx - describes the mapping of Optimo block data to React parameters
* index.stories.jsx - describes the behaviour of your component under different data conditions

This step is quite complicated, so copy and paste from a similar example and tweak the code to your requirements.

As part of this work, you'll need to...

### Define your component propTypes
Under `src/app/models/propTypes/[Component Name (lowercase)]`, create an `index.jsx` which describes the propTypes your component needs. Import this into your `src/app/containers/[Component Name]/index.jsx`.

## Part 3: Integrate the component into the Article
Before your component can be used in production, it must go through a full accessibility and UX review. These steps don't happen as much in the first two PRs as we don't want them to become a bottleneck for development.

As part of the final review process, you'll need to import your component's container and add it to the `componentsToRenderMain` object in `src/app/containers/Article/index.jsx`.

This feels like duplication of the schema - and it kind of is - but is currently our solution for preventing bundling _all components_ into the application JS.
