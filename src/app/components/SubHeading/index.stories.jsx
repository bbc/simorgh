import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import SubHeading from './index';

storiesOf('SubHeading', module).add('default', () => (
  <SubHeading>This is a SubHeading</SubHeading>
));
