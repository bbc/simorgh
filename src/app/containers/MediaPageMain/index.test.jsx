import React from 'react';
import MediaPageMain from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';
import amharicConfig from '../../lib/config/services/amharic';

const liveRadioScaffoldProps = {
  service: 'amharic',
  pageData: {
    metadata: {
      id: 'bbc_amharic_radio',
      tags: {},
    },
    promo: {
      subType: 'IDX',
      name: 'BBC Amharic Radio',
      uri: '/amharic/bbc_amharic_radio/liveradio',
      id: 'some-id',
      type: 'simple',
    },
  },
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
