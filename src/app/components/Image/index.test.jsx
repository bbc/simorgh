import React from 'react';
import Image from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe('Image', () => {
  const props = {
    alt:
      'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
    src:
      'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
  };

  shouldMatchSnapshot('should render correctly', <Image {...props} />);
});
