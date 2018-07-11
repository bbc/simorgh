import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import TextContainer from './TextContainer';
import { blockContainingText } from '../../models/blocks';

const headlineProps = blockContainingText('headline', 'The Headline');
const subHeadingProps = blockContainingText('subheading', 'The SubHeading');

storiesOf('Text Container', module).add('passing in a headline', () => (
  <TextContainer {...headlineProps} />
));
storiesOf('Text Container', module).add('passing in a subheading', () => (
  <TextContainer {...subHeadingProps} />
));
