import React from 'react';
import ArticleMain from '.';
import { storiesOf } from '@storybook/react';
import { articleDataNews } from '../Article/fixtureData';

storiesOf('Article Main', module)
  .add('default', () => (
    <ArticleMain
      articleData={articleDataNews}
    />
  ))
