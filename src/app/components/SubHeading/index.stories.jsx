import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import SubHeading from './index';
import { containerText } from '../../models/blocks';

storiesOf('SubHeading', module).add('default', () => (
  <SubHeading {...containerText('This is a SubHeading')} />
));
