import React from 'react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import frontPageDataIgbo from '../../../../data/prod/pidgin/frontpage';

const igboConfig = {
  product: 'BBC News',
  serviceLocalizedName: 'Ìgbò',
  translations: {
    home: 'Akụkọ',
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

describe('FrontPageMain', () => {
  describe('snapshots', () => {
    beforeEach(() => {
      useContext.mockReturnValue(igboConfig);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    shouldShallowMatchSnapshot(
      'should render an igbo frontpage correctly',
      <FrontPageMain frontPageData={frontPageDataIgbo} />,
    );
  });
});
