import { configure } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

function loadStories() {
  require('../src/app/components/Article.stories.jsx'); // eslint-disable-line import/no-dynamic-require, global-require
}
configure(loadStories, module);
