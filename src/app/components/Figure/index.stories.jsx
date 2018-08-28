import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Figure from './index';
import Caption from './Caption';
import VisuallyHiddenText from '../VisuallyHiddenText';

const image = {
  alt:
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  src:
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
};

const caption = 'This is a caption!';
const copyright = 'Copyright Getty images';

storiesOf('Figure', module)
  .add('with a caption', () => (
    <Figure {...image}>
      <Caption>{caption}</Caption>
    </Figure>
  ))
  .add('without a caption', () => <Figure {...image} />)
  .add('with non-BBC copyright', () => (
    <Figure {...image}>
      <VisuallyHiddenText>{copyright}</VisuallyHiddenText>
    </Figure>
  ))
  .add('with a caption and non-BBC copyright', () => (
    <Figure {...image}>
      <VisuallyHiddenText>{copyright}</VisuallyHiddenText>
      <Caption>{caption}</Caption>
    </Figure>
  ));
