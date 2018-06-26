import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Image from './index';
import { blockContainingText } from '../../../__test__/blockHelpers';

const imageData = arrayOfBlocks => ({
  type: 'image',
  model: {
    blocks: arrayOfBlocks,
  },
});

const rawImageBlock = {
  type: 'rawImage',
  model: {
    locator:
      '/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
  },
};

const dataWithAltText = imageData([
  rawImageBlock,
  blockContainingText(
    'altText',
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  ),
]);

const dataWithCaption = imageData([
  rawImageBlock,
  blockContainingText(
    'altText',
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  ),
  blockContainingText(
    'caption',
    'Study by the Home Office about the Syrian Vulnerable Persons Resettlement Scheme',
  ),
]);

storiesOf('Image', module).add('image with alt text', () => (
  <Image {...dataWithAltText} />
));
storiesOf('Image', module).add('image with alt text and caption', () => (
  <Image {...dataWithCaption} />
));
