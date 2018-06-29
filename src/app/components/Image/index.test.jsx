import React from 'react';
import Image from './index';
import snapshotTestHelper from '../../helpers/tests/snapshotTestHelper';
import { blockContainingText } from '../../helpers/tests/blockHelpers';

describe('Image', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <Image />,
    );
  });

  describe('with data', () => {
    const imageData = arrayOfBlocks => ({
      type: 'image',
      model: {
        blocks: arrayOfBlocks,
      },
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

    const dataWithAltText = imageData([
      rawImageBlock,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      ),
    ]);

    snapshotTestHelper.shouldMatchSnapshot(
      'should render an image with alt text',
      <Image {...dataWithAltText} />,
    );
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

    snapshotTestHelper.shouldMatchSnapshot(
      'should render an image with alt text and caption',
      <Image {...dataWithCaption} />,
    );
  });
});
