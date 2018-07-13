import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import SubHeadingContainer from './index';
import { textBlock } from '../../models/blocks';

storiesOf('SubHeadingContainer', module).add('default', () => (
  <SubHeadingContainer {...textBlock('This is a SubHeading')} />
));
