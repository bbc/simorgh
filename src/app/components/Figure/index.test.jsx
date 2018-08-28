import React from 'react';
import Figure from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

const image = {
  alt:
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  src:
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
};

const caption = 'This is a caption!';

describe('Figure', () => {
  describe('with a caption', () => {
    shouldMatchSnapshot(
      'should render correctly',
      shallowRender(
        <Figure {...image} copyrightHolder="BBC" caption={caption} />,
      ),
    );
  });

  describe('without a caption', () => {
    shouldMatchSnapshot(
      'should render correctly',
      shallowRender(<Figure {...image} copyrightHolder="BBC" />),
    );
  });

  describe('with non BBC copyright', () => {
    shouldMatchSnapshot(
      'should render correctly',
      shallowRender(<Figure {...image} copyrightHolder="Getty images" />),
    );
  });
});
