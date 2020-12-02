import React from 'react';
import { render } from '@testing-library/react';

import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import ImageContainer from './index';
import { blockContainingText, blockArrayModel } from '../../models/blocks';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

describe('Image', () => {
  describe('with no data', () => {
    suppressPropWarnings(['blocks', 'array']);
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
        'mock-id-1',
      ),
    ]);

    const dataWithoutRawImageBlock = blockArrayModel([
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-2',
      ),
    ]);

    const dataWithoutAltText = blockArrayModel([rawImageBlock, null]);

    describe('with no rawImageBlock', () => {
      suppressPropWarnings(['Missing', 'rawImage']);
      isNull(
        'should return null',
        <ImageContainer {...dataWithoutRawImageBlock} />,
      );
    });

    describe('with no altTextBlock', () => {
      suppressPropWarnings(['type', 'null']);
      isNull('should return null', <ImageContainer {...dataWithoutAltText} />);
    });

    shouldMatchSnapshot(
      'should render an image with alt text',
      <ImageContainer {...data} />,
    );

    it('should render a lazyload container instead of an image if the image is after the 3rd block', () => {
      const noScriptContent = `<img srcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png 240w, https://ichef.bbci.co.uk/news/320/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png 320w, https://ichef.bbci.co.uk/news/480/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png 480w, https://ichef.bbci.co.uk/news/624/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png 624w, https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png 640w" alt="Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17." src="https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png" width="640" class="css-1a7chfn-StyledImg-fadeIn e1enwo3v0"/>;`;

      render(<ImageContainer position={[4]} {...data} />);
      const noScriptEl = document.querySelector('noscript');
      expect(noScriptEl).toBeDefined();
      expect(noScriptEl.textContent).toEqual(noScriptContent);
    });

    const dataWithNonBbcCopyright = blockArrayModel([
      rawImageBlockWithNonBbcCopyright,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-3',
      ),
    ]);

    shouldMatchSnapshot(
      'should render an image with alt text and offscreen copyright',
      <ServiceContextProvider service="news">
        <ImageContainer {...dataWithNonBbcCopyright} />
      </ServiceContextProvider>,
    );

    const dataWithCaption = blockArrayModel([
      rawImageBlock,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-4',
      ),
      blockContainingText(
        'caption',
        'Study by the Home Office about the Syrian Vulnerable Persons Resettlement Scheme',
        'mock-id-5',
      ),
    ]);

    shouldMatchSnapshot(
      'should render an image with alt text and caption',
      <ServiceContextProvider service="news">
        <ImageContainer {...dataWithCaption} />
      </ServiceContextProvider>,
    );

    const dataWithOtherOriginCode = blockArrayModel([
      rawImageBlockWithOtherOriginCode,
      blockContainingText(
        'altText',
        'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
        'mock-id-6',
      ),
    ]);

    shouldMatchSnapshot(
      'should render an image with other originCode - this would be a broken image',
      <ServiceContextProvider service="news">
        <ImageContainer {...dataWithOtherOriginCode} />
      </ServiceContextProvider>,
    );
  });
});
