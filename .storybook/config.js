import { configure } from '@storybook/react';

function loadStories() {
  require('../src/app/components/Article.stories.jsx');
}

configure(loadStories, module);