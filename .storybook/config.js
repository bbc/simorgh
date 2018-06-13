import { configure } from '@storybook/react';
/* eslint-disable */
function loadStories() {
  require('../src/app/components/Article.stories.jsx');
}
/* eslint-enable */
configure(loadStories, module);
