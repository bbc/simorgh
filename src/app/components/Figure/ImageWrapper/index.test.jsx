import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import ImageWrapper from '.';
import Image from '../Image';
import Copyright from '../Copyright';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';

describe('ImageWrapper with Copright', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ImageWrapper>
      <Image alt={imageAlt} src={imageSrc} />
      <Copyright>Getty Images</Copyright>
    </ImageWrapper>,
  );
});

describe('ImageWrapper without Copyright', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ImageWrapper>
      <Image alt={imageAlt} src={imageSrc} />
    </ImageWrapper>,
  );
});
