import { configure } from '@storybook/react';

function loadStories() {
  require('../src/app/components/story.jsx');
}

configure(loadStories, module);