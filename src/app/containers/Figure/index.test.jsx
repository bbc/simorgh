import React from 'react';
import FigureContainer from './index';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const caption = 'This is a caption';
const copyrightText = 'Getty Images';

describe('Figure', () => {
  shouldShallowMatchSnapshot(
    'should render an image with alt text',
    <FigureContainer src={imageSrc} alt={imageAlt} />,
  );

  shouldShallowMatchSnapshot(
    'should render copyright text',
    <FigureContainer src={imageSrc} alt={imageAlt} copyright={copyrightText} />,
  );

  shouldShallowMatchSnapshot(
    'should render caption text',
    <FigureContainer src={imageSrc} alt={imageAlt} caption={caption} />,
  );
});
