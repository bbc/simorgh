import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import TextContainer from './TextContainer';
import { blockContainingText } from '../../models/blocks';

const p = blockContainingText('headline', 'The Headline');
const pl = blockContainingText('subheading', 'The SubHeading');

storiesOf('Text Container', module).add('passing in a headline', () => (
  <TextContainer {...p} />
));
storiesOf('Text Container', module).add('passing in a subheading', () => (
  <TextContainer {...pl} />
));
