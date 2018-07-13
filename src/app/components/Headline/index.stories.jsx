import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Headline from './index';

storiesOf('Headline', module).add('default', () => (
  <Headline>This is my headline.</Headline>
));
