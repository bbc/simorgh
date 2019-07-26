import React from 'react';
import MediaPageMain from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';
import amharicConfig from '../../lib/config/services/amharic';

const liveRadioScaffoldProps = {
  service: 'amharic',
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
