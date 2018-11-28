import React from 'react';
import FigureContainer from './index';
import {
  shouldShallowMatchSnapshot,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';
import { ServiceContext } from '../../components/ServiceContext';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const caption = 'This is a caption';
const copyrightText = 'Getty Images';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
};

const figureCaptionWithContext = contextStub => (
  <ServiceContext.Provider value={contextStub}>
    <FigureContainer src={imageSrc} alt={imageAlt} caption={caption} />
  </ServiceContext.Provider>
);

describe('Figure', () => {
  shouldShallowMatchSnapshot(
    'should render an image with alt text',
    <FigureContainer src={imageSrc} alt={imageAlt} />,
  );

  shouldShallowMatchSnapshot(
    'should render copyright text',
    <FigureContainer src={imageSrc} alt={imageAlt} copyright={copyrightText} />,
  );

  shouldMatchSnapshot(
    'should render caption text with provided offscreen text',
    figureCaptionWithContext(newsServiceContextStub),
  );

  shouldMatchSnapshot(
    'should render caption text with provided offscreen text',
    figureCaptionWithContext(persianServiceContextStub),
  );
});
