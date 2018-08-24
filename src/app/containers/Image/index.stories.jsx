import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ImageContainer from './index';
import { blockContainingText, blockArrayModel } from '../../models/blocks';

const rawImageBlock = {
  type: 'rawImage',
  model: {
    locator:
      '/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
    copyrightHolder: 'BBC',
  },
};

const rawImageBlockWithNonBbcCopyright = {
  type: 'rawImage',
  model: {
    locator:
      '/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
    copyrightHolder: 'Getty images',
  },
};

const data = blockArrayModel([
  rawImageBlock,
  blockContainingText(
    'altText',
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  ),
]);

const dataWithNonBbcCopyright = blockArrayModel([
  rawImageBlockWithNonBbcCopyright,
  blockContainingText(
    'altText',
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  ),
]);

const dataWithCaption = blockArrayModel([
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

storiesOf('ImageContainer', module).add('image with alt text', () => (
  <ImageContainer {...data} />
));
storiesOf('ImageContainer', module).add(
  'image with alt text and non BBC copyright',
  () => <ImageContainer {...dataWithNonBbcCopyright} />,
);
storiesOf('ImageContainer', module).add(
  'image with alt text and caption',
  () => <ImageContainer {...dataWithCaption} />,
);
