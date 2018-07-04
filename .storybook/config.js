import { configure } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

const req = require.context('../src/app/components', true, /\.stories\.jsx$/);

function loadStories() {
  const stories = req.keys();
  let i;
  for (i = 0; i < stories.length; i += 1) {
    req(stories[i]);
  }
}

configure(loadStories, module);
