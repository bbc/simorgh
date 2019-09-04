import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import MediaPageMain from '.';
import amharicConfig from '../../lib/config/services/amharic';
import amharicPageData from '../../../../data/amharic/bbc_amharic_radio/liveradio';

const liveRadioScaffoldProps = {
  service: 'amharic',
  pageData: amharicPageData,
  match: {
    params: {
      serviceId: 'bbc_amharic_radio',
      mediaId: 'liveradio',
    },
  },
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const { useContext } = jest.requireMock('react');
useContext.mockReturnValue(amharicConfig);

describe('Media Page Main', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <MediaPageMain {...liveRadioScaffoldProps} />,
    );
  });
});
