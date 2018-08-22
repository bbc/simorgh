import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import VisuallyHiddenText from './index';

storiesOf('VisuallyHiddenText', module).add('default', () => (
  <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
));
