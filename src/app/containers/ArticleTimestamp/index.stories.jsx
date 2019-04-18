import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ArticleTimestamp from '.';

storiesOf('ArticleTimestamp', module).add('default', () => (
  <ArticleTimestamp
    firstPublished={1530947227000}
    lastPublished={1552666749637}
  />
));
