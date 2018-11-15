import { configure, storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import '../src/app/lib/globalStyles';

function loadStories() {
  console.log('Loading components with index.stories.jsx');
  const req = require.context('../src/app', true, /\.stories\.jsx$/);
  req.keys().forEach(filename => req(filename));

  console.log('Loading components with index.examples.jsx');
  const componentsWithExamples = require.context(
    '../src/app',
    true,
    /\.examples\.jsx$/,
  );
  componentsWithExamples.keys().forEach(pathToComponent => {
    const componentName = pathToComponent.match(
      /components\/(.+)\/index\.examples\.jsx$/,
    )[1];
    const componentExamples = componentsWithExamples(pathToComponent).default;
    componentExamples.forEach(example => {
      storiesOf(componentName, module).add(example.name, () => example.render);
    });
  });
}

configure(loadStories, module);
