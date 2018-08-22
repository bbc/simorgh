import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import InlineLink from './index';

storiesOf('InlineLink', module).add('default', () => (
  <InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>
));
