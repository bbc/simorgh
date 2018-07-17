import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import HeadlineContainer from './index';
import { textBlock } from '../../models/blocks';

storiesOf('HeadlineContainer', module).add('default', () => (
  <HeadlineContainer {...textBlock('This is a headline!')} />
));
