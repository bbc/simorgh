import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import VisuallyHiddenText from '../../VisuallyHiddenText';
import Caption from './index';

storiesOf('Caption', module).add('default', () => (
  <Caption>
    <VisuallyHiddenText>Image caption,</VisuallyHiddenText>
    This is some Caption text
  </Caption>
));
