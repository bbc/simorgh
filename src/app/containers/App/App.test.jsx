/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import reactRouterConfig from 'react-router-config';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { App } from './App';
import getToggles from '#app/lib/utilities/getToggles';
import routes from '#app/routes';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';

jest.mock('react-router-config');
jest.mock('#app/lib/utilities/getToggles');

describe('App', () => {
  let wrapper;
  const timeOnServer = 1582534951721;
  const initialData = {
    pageData: 'Some initial data',
    timeOnServer,
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
    getInitialData: jest.fn(),
    pageType: 'article',
  };

  reactRouterConfig.matchRoutes.mockReturnValue([{ route, match }]);

  reactRouterConfig.renderRoutes.mockReturnValue(
    <h1>{initialData.pageData}</h1>,
  );

  const updatedToggles = { mockToggle: { enabled: false } };
  getToggles.mockReturnValue(updatedToggles);

  beforeAll(() => {
    wrapper = mount(
      <App
        location={{ pathname: 'pathnameOne' }}
        initialData={initialData}
        bbcOrigin="https://www.bbc.co.uk"
        history={history}
      />,
    );
  });

  it('should return rendered routes', () => {
    const pathname = 'pathnameOne';
    const routeProps = getRouteProps(pathname);
    expect(route.getInitialData).not.toHaveBeenCalled();
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledTimes(1);
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledWith(routes, {
      ...routeProps,
      pathname,
      bbcOrigin: 'https://www.bbc.co.uk',
      pageData: initialData.pageData,
      toggles: initialData.toggles,
      loading: false,
      previousPath: null,
      timeOnServer: initialData.timeOnServer,
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidUpdate', () => {
    describe('same location', () => {
      it('should not call set state with new data', () => {
        reactRouterConfig.renderRoutes.mockClear();

        act(() => {
          wrapper.setProps({
            location: { pathname: 'pathnameOne' },
            history: { action: 'PUSH' },
          });

          expect(route.getInitialData).not.toHaveBeenCalled();
          expect(getToggles).not.toHaveBeenCalled();
          expect(reactRouterConfig.renderRoutes).not.toHaveBeenCalled();
        });
      });
    });

    describe('different location', () => {
      beforeEach(() => {
        // clear `route.getInitialData` and `reactRouterConfig.renderRoutes` mocks
        jest.clearAllMocks();
      });

      describe('rejected loadInitialData', () => {
        it('should set state to the error', async () => {
          route.getInitialData.mockImplementation(() => {
            return new Promise(resolve => {
              setTimeout(
                () =>
                  resolve({
                    pageData: null,
                    status: null,
                    error,
                    timeOnServer: null,
                  }),
                600,
              );
            });
          });

          getToggles.mockImplementation(() => updatedToggles);

          await act(async () => {
            wrapper.setProps({ location: { pathname: 'pathnameTwo' } });
          });

          await act(route.getInitialData);

          expect.assertions(2);

          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            2,
            routes,
            {
              assetUri: undefined,
              bbcOrigin: 'https://www.bbc.co.uk',
              toggles: initialData.toggles,
              pageData: null,
              status: null,
              error: null,
              errorCode: null,
              id: undefined,
              isAmp: false,
              loading: true,
              pageType: 'article',
              service: 'ukchina',
              pathname: 'pathnameTwo',
              previousPath: 'pathnameOne',
              variant: 'simp',
              timeOnServer: null,
            },
          );

          // data fetch promise rejected, set data to null, loading to false and set error
          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            3,
            routes,
            {
              assetUri: undefined,
              bbcOrigin: 'https://www.bbc.co.uk',
              pageData: null,
              toggles: updatedToggles,
              status: null,
              error,
              errorCode: null,
              id: undefined,
              isAmp: false,
              loading: false,
              pageType: 'article',
              service: 'ukchina',
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
          const pathname = 'pathnameThree';
          const data = {
            pageData: 'Really cool data',
            status: 200,
          };

          route.getInitialData.mockImplementation(() => {
            return new Promise(resolve => {
              setTimeout(() => resolve(data), 600);
            });
          });

          await act(async () => {
            wrapper.setProps({ location: { pathname } });
          });

          await act(route.getInitialData);

          expect.assertions(3);

          expect(route.getInitialData).toHaveBeenCalledWith({
            path: pathname,
            service: 'ukchina',
            variant: 'simp',
            pageType: 'article',
            toggles: {
              mockToggle: { enabled: false },
            },
          });

          // start data fetch and set loading to true
          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            2,
            routes,
            {
              assetUrl: undefined,
              bbcOrigin: 'https://www.bbc.co.uk',
              pageData: null,
              status: null,
              toggles: initialData.toggles,
              error: null,
              errorCode: null,
              id: undefined,
              isAmp: false,
              loading: true,
              pageType: 'article',
              service: 'ukchina',
              pathname: 'pathnameThree',
              previousPath: 'pathnameTwo',
              variant: 'simp',
              timeOnServer: null,
            },
          );

          // data fetch promise resolved, set data to fetched data and loading to false
          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            3,
            routes,
            {
              assetUri: undefined,
              bbcOrigin: 'https://www.bbc.co.uk',
              pageData: data.pageData,
              toggles: updatedToggles,
              status: data.status,
              error: undefined,
              errorCode: null,
              id: undefined,
              isAmp: false,
              loading: false,
              pageType: 'article',
              service: 'ukchina',
              pathname: 'pathnameThree',
              previousPath: 'pathnameTwo',
              variant: 'simp',
              timeOnServer: undefined,
            },
          );
        });
      });
    });
  });
});
