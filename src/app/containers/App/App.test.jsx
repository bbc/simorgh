/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import * as reactRouterConfig from 'react-router-config';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { App } from './App';

describe('App', () => {
  let wrapper;
  const initialData = { pageData: 'Some initial data' };
  const error = 'Error!';
  const match = { params: { service: 'news', amp: false } };

  const route = {
    getInitialData: jest.fn(),
  };

  reactRouterConfig.matchRoutes = jest.fn().mockReturnValue([{ route, match }]);

  reactRouterConfig.renderRoutes = jest
    .fn()
    .mockReturnValue(<h1>{initialData.pageData}</h1>);

  beforeAll(() => {
    wrapper = mount(
      <App
        location={{ pathname: 'pathnameOne' }}
        routes={[]}
        initialData={initialData}
        bbcOrigin="https://www.bbc.co.uk"
      />,
    );
  });

  it('should return rendered routes', () => {
    expect.assertions(4);
    expect(route.getInitialData).not.toHaveBeenCalled();
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledTimes(1);
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledWith([], {
      data: initialData,
      service: 'news',
      isAmp: false,
      error: null,
      loading: false,
      bbcOrigin: 'https://www.bbc.co.uk',
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidUpdate', () => {
    describe('same location', () => {
      it('should not call set state with new data', () => {
        reactRouterConfig.renderRoutes.mockClear();

        act(() => {
          wrapper.setProps({ location: { pathname: 'pathnameOne' } });

          expect.assertions(2);
          expect(route.getInitialData).not.toHaveBeenCalled();
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
          route.getInitialData.mockImplementation(() => Promise.reject(error));

          act(() => {
            wrapper.setProps({ location: { pathname: 'pathnameThree' } });
          });

          await route.getInitialData;

          expect.assertions(2);

          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            2,
            [],
            {
              data: null,
              service: 'news',
              isAmp: false,
              error: null,
              loading: true,
              bbcOrigin: 'https://www.bbc.co.uk',
            },
          );

          // data fetch promise rejected, set data to null, loading to false and set error
          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            3,
            [],
            {
              data: null,
              service: 'news',
              isAmp: false,
              error,
              loading: false,
              bbcOrigin: 'https://www.bbc.co.uk',
            },
          );
        });
      });

      describe('successful fetch of route, match, and initial props', () => {
        it('should call set state with new data', async () => {
          const pathname = 'pathnameFour';
          const data = 'Really cool data';

          route.getInitialData.mockImplementation(() => Promise.resolve(data));

          wrapper.setProps({ location: { pathname } });

          await route.getInitialData;

          expect.assertions(3);

          expect(route.getInitialData).toHaveBeenCalledWith(match.params);

          // start data fetch and set loading to true
          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            2,
            [],
            {
              data: null,
              service: 'news',
              isAmp: false,
              error: null,
              loading: true,
              bbcOrigin: 'https://www.bbc.co.uk',
            },
          );

          // data fetch promise resolved, set data to fetched data and loading to false
          expect(reactRouterConfig.renderRoutes).toHaveBeenNthCalledWith(
            3,
            [],
            {
              data,
              service: 'news',
              isAmp: false,
              error: null,
              loading: false,
              bbcOrigin: 'https://www.bbc.co.uk',
            },
          );
        });
      });
    });
  });
});
