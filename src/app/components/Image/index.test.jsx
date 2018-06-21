import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import Image from './index';

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

    const textBlock = (type, text) => ({
      type,
      model: {
        blocks: [
          {
            type: 'text',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  model: {
                    text,
                  },
                },
              ],
            },
          },
        ],
      },
    });

    const dataWithAltText = imageData([
      rawImageBlock,
      textBlock(
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
      textBlock(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      ),
      textBlock(
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
