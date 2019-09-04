import React from 'react';
import MediaPageMain from '.';
import { shouldShallowMatchSnapshot } from '#testHelpers';
import amharicConfig from '#lib/config/services/amharic';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';

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
    shouldShallowMatchSnapshot(
      'should match scaffold snapshot',
      <MediaPageMain {...liveRadioScaffoldProps} />,
    );
  });
});
