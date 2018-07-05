import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Headline from './index';
import { containerText } from '../../models/blocks';

storiesOf('Headline', module).add('default', () => (
  <Headline {...containerText('This is a headline!')} />
));
