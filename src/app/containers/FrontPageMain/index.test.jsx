import React from 'react';
import { render } from '@testing-library/react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import frontPageDataIgbo from '../../../../data/prod/pidgin/frontpage';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

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

  describe('assertions', () => {
    beforeEach(() => {
      useContext.mockReturnValue(igboConfig);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    it('should render with tab index and content attributes', () => {
      const { container } = render(
        <ServiceContextProvider service="news">
          <FrontPageMain frontPageData={frontPageDataIgbo} />,
        </ServiceContextProvider>,
      );

      const h1 = container.getElementByTagName('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe(-1);
    });
  });
});
