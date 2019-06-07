import React from 'react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import frontPageDataIgbo from '../../../../data/prod/igbo/frontpage';

const igboConfig = {
  brandName: 'BBC News Ìgbò',
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
