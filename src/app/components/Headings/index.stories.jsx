import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { Headline, SubHeading } from './index';

storiesOf('Headline', module).add('default', () => (
  <Headline>This is my headline.</Headline>
));

storiesOf('SubHeading', module).add('default', () => (
  <SubHeading text="This is a SubHeading">This is a SubHeading</SubHeading>
));
