import React from 'react';
import { render } from '@testing-library/react';
import { latin } from '@bbc/gel-foundations/scripts';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import frontPageDataIgbo from '../../../../data/prod/pidgin/frontpage';

const igboConfig = {
  product: 'BBC News',
  serviceLocalizedName: 'Ìgbò',
  translations: {
    home: 'Akụkọ',
    media: {
      audio: 'Ọdịyo',
      video: 'Vidio',
    },
  },
  script: latin,
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
  beforeEach(() => {
    useContext.mockReturnValue(igboConfig);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  describe('snapshots', () => {
    shouldShallowMatchSnapshot(
      'should render an igbo frontpage correctly',
      <FrontPageMain frontPageData={frontPageDataIgbo} />,
    );
  });

  describe('assertions', () => {
    it('should render with tab index and content attributes', () => {
      const { container } = render(
        <FrontPageMain frontPageData={frontPageDataIgbo} />,
      );

      const h1 = container.getElementsByTagName('h1')[0];
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');
    });
  });
});
