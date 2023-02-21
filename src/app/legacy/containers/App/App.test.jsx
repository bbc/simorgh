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
    pageData: 'Some initial data',
    timeOnServer,
    showAdsBasedOnLocation: false,
    toggles: {
      mockToggle: { enabled: true },
    },
  };
  const error = 'Error!';
  const match = {
    params: { service: 'ukchina', amp: false, variant: '/simp' },
  };
  const history = { action: 'POP' };

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
      <App
        location={{ pathname: 'pathnameOne' }}
        initialData={initialData}
        bbcOrigin="https://www.bbc.co.uk"
        history={history}
      />,
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
      loading: false,
      pageType: 'article',
      service: 'ukchina',
      status: undefined,
      pathname: 'pathnameOne',
      showAdsBasedOnLocation: false,
      previousPath: null,
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
              location={{ pathname: 'pathnameOne' }}
              initialData={initialData}
              bbcOrigin="https://www.bbc.co.uk"
              history={{ action: 'PUSH' }}
            />,
          );
        });

        expect(route.getInitialData).not.toHaveBeenCalled();
        expect(getToggles).not.toHaveBeenCalled();
      });
    });

    describe('different location', () => {
      beforeEach(() => {
        // clear `route.getInitialData` and `reactRouterConfig.renderRoutes` mocks
        jest.clearAllMocks();
      });

      describe('rejected getInitialData', () => {
        it('should set state to the error', async () => {
          route.getInitialData.mockResolvedValue({
            pageData: null,
            status: null,
            error,
            timeOnServer: null,
          });

          getToggles.mockResolvedValue(updatedToggles);

          await act(async () => {
            await rerender(
              <App
                location={{ pathname: 'pathnameTwo' }}
                initialData={initialData}
                bbcOrigin="https://www.bbc.co.uk"
                history={{ action: 'PUSH' }}
              />,
            );
          });

          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            2,
            routes,
            {
              assetUri: undefined,
              bbcOrigin: 'https://www.bbc.co.uk',
              toggles: updatedToggles,
              pageData: null,
              status: null,
              error: 'Error!',
              errorCode: undefined,
              id: undefined,
              isAmp: false,
              loading: false,
              pageType: 'article',
              service: 'ukchina',
              showAdsBasedOnLocation: false,
              pathname: 'pathnameTwo',
              previousPath: 'pathnameOne',
              variant: 'simp',
              timeOnServer: null,
            },
          );
        });
      });

      describe('successful fetch of route, match, and initial props', () => {
        it('should call set state with new data', async () => {
          const data = {
            pageData: 'Really cool data',
            status: 200,
          };

          route.getInitialData.mockResolvedValue(data);

          await act(async () => {
            await rerender(
              <App
                location={{ pathname: 'pathnameTwo' }}
                initialData={initialData}
                bbcOrigin="https://www.bbc.co.uk"
                history={{ action: 'PUSH' }}
              />,
            );
          });

          expect(route.getInitialData).toHaveBeenCalledWith({
            path: 'pathnameTwo',
            service: 'ukchina',
            variant: 'simp',
            pageType: 'article',
            toggles: {
              mockToggle: { enabled: false },
            },
          });

          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            2,
            routes,
            {
              assetUri: undefined,
              bbcOrigin: 'https://www.bbc.co.uk',
              pageData: data.pageData,
              toggles: updatedToggles,
              status: data.status,
              error: undefined,
              errorCode: undefined,
              id: undefined,
              isAmp: false,
              loading: false,
              pageType: 'article',
              service: 'ukchina',
              pathname: 'pathnameTwo',
              previousPath: 'pathnameOne',
              showAdsBasedOnLocation: false,
              variant: 'simp',
              timeOnServer: undefined,
            },
          );
        });
      });
    });
  });
});
