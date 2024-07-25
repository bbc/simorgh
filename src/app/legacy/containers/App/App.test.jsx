import React from 'react';
import reactRouterConfig from 'react-router-config';
import { render, act } from '@testing-library/react';
import getToggles from '#app/lib/utilities/getToggles';
import routes from '#app/routes';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { App } from './App';

jest.mock('react-router-config');
jest.mock('#app/lib/utilities/getToggles');

describe('App', () => {
  let container;
  let rerender;
  const timeOnServer = 1582534951721;
  const initialData = {
    path: 'pathnameOne',
    pageData: 'Some initial data',
    timeOnServer,
    showAdsBasedOnLocation: false,
    toggles: {
      mockToggle: { enabled: true },
    },
  };

  const match = {
    params: { service: 'ukchina', amp: false, variant: '/simp' },
  };

  const route = {
    getInitialData: jest.fn().mockResolvedValue({}),
    pageType: ARTICLE_PAGE,
  };

  reactRouterConfig.matchRoutes.mockReturnValue([{ route, match }]);

  reactRouterConfig.renderRoutes.mockReturnValue(
    <h1>{initialData.pageData}</h1>,
  );

  const updatedToggles = { mockToggle: { enabled: false } };
  getToggles.mockReturnValue(updatedToggles);

  window.scrollTo = jest.fn(() => {});

  beforeEach(() => {
    ({ rerender, container } = render(
      <App initialData={initialData} bbcOrigin="https://www.bbc.co.uk" />,
    ));
  });

  it('should return rendered routes', () => {
    expect(route.getInitialData).not.toHaveBeenCalled();
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledTimes(1);
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledWith(routes, {
      assetUri: undefined,
      bbcOrigin: 'https://www.bbc.co.uk',
      pageData: initialData.pageData,
      toggles: initialData.toggles,
      error: undefined,
      errorCode: undefined,
      id: undefined,
      isAmp: false,
      isApp: false,
      isLite: false,
      pageType: 'article',
      service: 'ukchina',
      status: undefined,
      pathname: 'pathnameOne',
      showAdsBasedOnLocation: false,
      variant: 'simp',
      timeOnServer: initialData.timeOnServer,
    });
    expect(container).toMatchInlineSnapshot(`
      <div>
        <h1>
          Some initial data
        </h1>
      </div>
    `);
  });

  describe('componentDidUpdate', () => {
    describe('same location', () => {
      it('should not call set state with new data', async () => {
        reactRouterConfig.renderRoutes.mockClear();

        await act(async () => {
          await rerender(
            <App
              location="pathnameOne"
              initialData={initialData}
              bbcOrigin="https://www.bbc.co.uk"
            />,
          );
        });

        expect(route.getInitialData).not.toHaveBeenCalled();
        expect(getToggles).not.toHaveBeenCalled();
      });
    });
  });
});
