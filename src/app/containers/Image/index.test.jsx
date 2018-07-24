import React from 'react';
import ImageContainer from './index';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import { blockContainingText, blockArrayModel } from '../../models/blocks';

describe('Image', () => {
  describe('with no data', () => {
    isNull('should return null', <ImageContainer />);
  });

  describe('with data', () => {
    // const imageData = arrayOfBlocks => ({
    //   type: 'image',
    //   model: {
    //     blocks: arrayOfBlocks,
    //   },
  });

  const rawImageBlock = {
    type: 'rawImage',
    model: {
      width: 640,
      height: 420,
      locator:
        '/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
      originCode: null,
      copyrightHolder: 'BBC',
    },
  };

  const data = blockArrayModel([
    rawImageBlock,
    blockContainingText(
      'altText',
      'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
    ),
  ]);

  shouldMatchSnapshot(
    'should render an image with alt text',
    <ImageContainer {...data} />,
  );

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

  shouldMatchSnapshot(
    'should render an image with alt text and caption',
    <ImageContainer {...dataWithCaption} />,
  );
});
