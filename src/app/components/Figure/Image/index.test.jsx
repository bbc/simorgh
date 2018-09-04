import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Image from './index';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';

describe('Image', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Image alt={imageAlt} src={imageSrc} />,
  );
});
