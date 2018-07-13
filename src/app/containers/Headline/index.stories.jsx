import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Headline from './index';
import { textBlock } from '../../models/blocks';

storiesOf('Headline', module).add('default', () => (
  <Headline {...textBlock('This is a headline!')} />
));
