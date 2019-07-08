# How to create a new component
There are a lot of moving parts to Simorgh. We use the [Presentational & Container pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) for our components, which we build in a few stages.

## Part 1: Create the presentational component
Run the storybook (`npm run storybook`) and visit http://localhost.bbc.com:9001.

Add your component in `src/app/components/[Component Name]/`. You will need:

* index.jsx - defines the component
* index.stories.jsx - defines variations of the component.
* index.test.jsx - describe how to take "snapshots" to protect against regressions to the component.

Work locally within these first two files - the Storybook pattern library will be updated automatically with hot module reloading - to create the component front-end you need.

NB: we try to build "AMP-first", but this is difficult in practice because we are unable to inject the AMP dependency into Storybook. For now, check the AMP output manually in Part 2 of the process. Simorgh currently only supports one 'view' of components; components which require a different implementation for AMP must wait for the outcome of our [AMP/canonical component investigation](https://github.com/bbc/simorgh/issues/884).

Once you're happy with how your component looks (in all its variants), work on your index.test.jsx file to take snapshots of them. If the structure of the component changes in the future, the unit test suite will fail.

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
import { storiesOf } from '@storybook/react';
import Blockquote from './index';

storiesOf('Blockquote', module).add('default - quote only', () => <Blockquote>To be or not to be, that is the question</Blockquote>);
storiesOf('Blockquote', module).add('quote with cite', () => (
  <Blockquote cite="William Shakespeare">To be or not to be, that is the question</Blockquote>
));
```

### index.test.jsx
```js
import React from 'react';
import { shouldMatchSnapshot } from '../../testHelpers';
import Blockquote from './index';

describe('Blockquote', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Blockquote>To be or not to be, that is the question</Blockquote>,
  );
});
```

## Part 2: Create container component and fixture data
Once your component front-end is merged, you'll need to integrate it into the renderer.

### Update the schema
data/schema.yaml describes the Article API definition for web. We need to make it aware of our new component.

Your component is more than likely a new 'block' in the data feed, so you'll need to add it to the array of which blocks the application should validate:

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
Pick a JSON file under `data/news/articles/[id].json`, and:

1) add an example of your block somewhere in the `content.model.blocks` array.
2) add your new component to the `blockTypes` array.

Run `npm run dev` and you should see your component at your article of choice, eg http://localhost.bbc.com:7080/news/articles/c0000000001o

### Create the container
We've added our _component_, which should be kept as simple as possible. Now we need to create our _container_, which contains the business logic for mapping Optimo block data to the React parameters our component needs.

Add a new folder under `src/app/containers/[Component Name]/`. You will need:

* index.jsx - describes the mapping of Optimo block data to React parameters
* index.test.jsx - creates "snapshots" of the component with the various different rendered outputs for the business logic in the container

This step is quite complicated, so copy and paste from a similar example and tweak the code to your requirements.

As part of this work, you'll need to...

### Define your component propTypes
Under `src/app/models/propTypes/[Component Name (lowercase)]`, create an `index.jsx` which describes the propTypes your component needs. Import this into your `src/app/containers/[Component Name]/index.jsx`.

## Part 3: Integrate the component into the Article
Before your component can be used in production, it must go through a full accessibility and UX review. These steps don't happen as much in the first two PRs as we don't want them to become a bottleneck for development.

### Build dependency into article renderer
As part of the final review process, you'll need to import your component's container and add it to the `componentsToRenderMain` object in `src/app/containers/Article/index.jsx`.

This feels like duplication of the schema - and it kind of is - but is currently our solution for preventing bundling _all components_ into the application JS.

### Testing
Before merge, if your new component requires integration testing it should be covered in the end-to-end (E2E) tests.

The test team is responsible for writing integration tests - [which live in Simorgh](https://github.com/bbc/simorgh/tree/latest/cypress) - covering your component's functionality.

### Publishing
By now, you should have all the automatic PR checks passing, 2 manual code reviews approved, and all the UX/accessibility/test QA completed.

NB, the automatic checks are:

* CodeClimate (diff coverage, total coverage, code quality)
* Travis (runs the tests, [updates the storybook](https://bbc.github.io/simorgh/))
* Jenkins CI* (`bbc-news-simorgh` job - runs the tests).

\* Currently we run tests on Jenkins with a view to moving away from Travis, so tests are currently run twice. We hope to simplify things soon.

Now you're ready to hit the Merge button! When you hit merge, an additional CI job is run (`simorgh-infrastructure`) which creates RPMs, publishes them to Cosmos, deploys to Test, runs E2Es on Test, promotes to Live, and runs E2Es on Live.

All being well, your code should be live within an hour of merge.
