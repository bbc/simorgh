import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Figure from './index';
import Image from './Image';
import VisuallyHiddenText from '../VisuallyHiddenText';
import Caption from './Caption';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const captionValue = 'This is a caption';
const copyrightText = 'Copyright Getty images';

storiesOf('Figure', module)
  .add('with a caption', () => (
    <Figure>
      <Image alt={imageAlt} src={imageSrc} />
      <Caption>{captionValue}</Caption>
    </Figure>
  ))
  .add('without a caption', () => (
    <Figure>
      <Image alt={imageAlt} src={imageSrc} />
    </Figure>
  ))
  .add('with non-BBC copyright', () => (
    <Figure>
      <Image alt={imageAlt} src={imageSrc} />
      <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
    </Figure>
  ))
  .add('with a caption and non-BBC copyright', () => (
    <Figure>
      <Image alt={imageAlt} src={imageSrc} />
      <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
      <Caption>{captionValue}</Caption>
    </Figure>
  ));
