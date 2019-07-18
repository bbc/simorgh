import React from 'react';
import { storiesOf } from '@storybook/react';
import ArticleMain from '.';
import { articleDataNews } from '../Article/fixtureData';

storiesOf('Article Main', module).add('default', () => (
  <ArticleMain articleData={articleDataNews} />
));
