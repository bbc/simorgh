import React from 'react';
import ImageContainer from './index';
import {
  shouldShallowMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';
import { blockContainingText, blockArrayModel } from '../../models/blocks';

describe('Image', () => {
  describe('with no data', () => {
    isNull('should return null', <ImageContainer />);
  });

  describe('with data', () => {
    const rawImageBlock = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: 'cpsprodpb',
        copyrightHolder: 'BBC',
      },
    };

    const rawImageBlockWithNonBbcCopyright = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: 'cpsprodpb',
        copyrightHolder: 'Getty images',
      },
    };

    const rawImageBlockWithNullOriginCode = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: null,
        copyrightHolder: 'Getty images',
      },
    };

    const rawImageBlockWithEmptyStringOriginCode = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: '',
        copyrightHolder: 'Getty images',
      },
    };

    const rawImageBlockWithOtherOriginCode = {
      type: 'rawImage',
      model: {
        width: 640,
        height: 420,
        locator: '439A/production/_100960371_syrians_and_asylum_v2-nc.png',
        originCode: 'other',
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

    const dataWithoutRawImageBlock = blockArrayModel([
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      ),
    ]);

    const dataWithoutAltText = blockArrayModel([rawImageBlock, null]);

    describe('with no rawImageBlock', () => {
      isNull(
        'should return null',
        <ImageContainer {...dataWithoutRawImageBlock} />,
      );
    });

    describe('with no altTextBlock', () => {
      isNull('should return null', <ImageContainer {...dataWithoutAltText} />);
    });

    shouldShallowMatchSnapshot(
      'should render an image with alt text',
      <ImageContainer {...data} />,
    );

    const dataWithNonBbcCopyright = blockArrayModel([
      rawImageBlockWithNonBbcCopyright,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      ),
    ]);

    shouldShallowMatchSnapshot(
      'should render an image with alt text and offscreen copyright',
      <ImageContainer {...dataWithNonBbcCopyright} />,
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

    shouldShallowMatchSnapshot(
      'should render an image with alt text and caption',
      <ImageContainer {...dataWithCaption} />,
    );

    const dataWithNullOriginCode = blockArrayModel([
      rawImageBlockWithNullOriginCode,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      ),
    ]);

    shouldShallowMatchSnapshot(
      'should render an image with the default originCode `cpsdevpb` - null',
      <ImageContainer {...dataWithNullOriginCode} />,
    );

    const dataWithEmptyStringOriginCode = blockArrayModel([
      rawImageBlockWithEmptyStringOriginCode,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      ),
    ]);

    shouldShallowMatchSnapshot(
      'should render an image with the default originCode `cpsdevpb` - empty string',
      <ImageContainer {...dataWithEmptyStringOriginCode} />,
    );

    const dataWithOtherOriginCode = blockArrayModel([
      rawImageBlockWithOtherOriginCode,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
      ),
    ]);

    shouldShallowMatchSnapshot(
      'should render an image with other originCode - this would be a broken image',
      <ImageContainer {...dataWithOtherOriginCode} />,
    );
  });
});
