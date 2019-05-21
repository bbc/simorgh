/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import * as reactRouterConfig from 'react-router-config';
import { App } from './App';

describe('App', () => {
  let wrapper;
  let setStateSpy;
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
    // eslint-disable-next-line no-undef
    wrapper = shallow(
      <App
        location={{ pathname: 'pathnameOne' }}
        routes={[]}
        initialData={initialData}
        bbcOrigin="https://www.bbc.co.uk"
      />,
    );
    setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
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
        wrapper.setProps({ location: { pathname: 'pathnameOne' } });

        expect.assertions(2);
        expect(route.getInitialData).not.toHaveBeenCalled();
        expect(setStateSpy).not.toHaveBeenCalled();
      });
    });

    describe('different location', () => {
      afterEach(() => {
        // clear `route.getInitialData` mocks
        jest.clearAllMocks();
      });
      describe('rejected loadInitialData', () => {
        it('should set state to the error', async () => {
          route.getInitialData.mockImplementation(() => Promise.reject(error));

          wrapper.setProps({ location: { pathname: 'pathnameThree' } });

          await route.getInitialData;

          expect.assertions(2);

          // start data fetch and set loading to true
          expect(setStateSpy).toHaveBeenNthCalledWith(1, {
            data: null,
            service: 'news',
            isAmp: false,
            error: null,
            loadInitialDataPromise: expect.any(Promise),
            loading: true,
          });

          // data fetch promise rejected, set data to null, loading to false and set error
          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            data: null,
            isAmp: false,
            error,
            loadInitialDataPromise: null,
            loading: false,
            service: 'news',
          });
        });
      });

      describe('successful fetch of route, match, and initial props', () => {
        it('should call set state with new data', async () => {
          const pathname = 'pathnameFour';
          const data = 'Really cool data';

          route.getInitialData.mockImplementation(async () => data);

          wrapper.setProps({ location: { pathname } });

          await route.getInitialData;

          expect.assertions(3);

          expect(route.getInitialData).toHaveBeenCalledWith(match.params);

          // start data fetch and set loading to true
          expect(setStateSpy).toHaveBeenNthCalledWith(1, {
            data: null,
            error: null,
            isAmp: false,
            loading: true,
            loadInitialDataPromise: expect.any(Promise),
            service: 'news',
          });

          // data fetch promise resolved, set data to fetched data and loading to false
          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            data,
            error: null,
            isAmp: false,
            loading: false,
            loadInitialDataPromise: null,
            service: 'news',
          });
        });
      });
    });
  });
});
