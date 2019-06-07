import React from 'react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import frontPageDataIgbo from '../../../../data/prod/igbo/frontpage';
import frontPageDataPidgin from '../../../../data/prod/pidgin/frontpage';
import frontPageDataYoruba from '../../../../data/prod/yoruba/frontpage';

const igboConfig = {
  brandName: 'BBC News Ìgbò',
  translations: {
    home: 'Akụkọ',
  },
};

const pidginConfig = {
  brandName: 'BBC News Pidgin',
  translations: {
    home: 'Home',
  },
};

const yorubaConfig = {
  brandName: 'BBC News Yorùbá',
  translations: {
    home: 'Ìròyìn',
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
  describe('Igbo snapshots', () => {
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

  describe('Pidgin snapshot', () => {
    beforeEach(() => {
      useContext.mockReturnValue(pidginConfig);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    shouldShallowMatchSnapshot(
      'should render a pidgin frontpage correctly',
      <FrontPageMain frontPageData={frontPageDataPidgin} />,
    );
  });

  describe('Yoruba snapshot', () => {
    beforeEach(() => {
      useContext.mockReturnValue(yorubaConfig);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    shouldShallowMatchSnapshot(
      'should render a yoruba frontpage correctly',
      <FrontPageMain frontPageData={frontPageDataYoruba} />,
    );
  });
});
