/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import * as reactRouterConfig from 'react-router-config';
import { App } from './App';
import * as loadInitialData from '../../routes/loadInitialData';

describe('App', () => {
  let wrapper;
  let setStateSpy;
  let loadInitialDataSpy;
  const initialData = { data: 'Some initial data' };

  reactRouterConfig.renderRoutes = jest
    .fn()
    .mockReturnValue(<h1>{initialData.data}</h1>);

  beforeAll(() => {
    // eslint-disable-next-line no-undef
    wrapper = shallow(
      <App
        location={{ pathname: 'pathnameOne' }}
        routes={[]}
        initialData={initialData}
        bbcOrigin="https://bbc.co.uk"
      />,
    );
    setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
    loadInitialDataSpy = jest.spyOn(loadInitialData, 'default');
  });

  it('should return rendered routes', () => {
    expect.assertions(4);
    expect(loadInitialDataSpy).not.toHaveBeenCalled();
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledTimes(1);
    expect(reactRouterConfig.renderRoutes).toHaveBeenCalledWith([], {
      data: initialData,
      error: null,
      loading: false,
      bbcOrigin: 'https://bbc.co.uk',
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidUpdate', () => {
    describe('same location', () => {
      it('should not call set state with new data', () => {
        wrapper.setProps({ location: { pathname: 'pathnameOne' } });

        expect.assertions(2);
        expect(loadInitialDataSpy).not.toHaveBeenCalled();
        expect(setStateSpy).not.toHaveBeenCalled();
      });
    });

    describe('different location', () => {
      describe('rejected loadInitialData', () => {
        it('should set state to the error', async () => {
          const error = 'Error!';

          loadInitialData.default = jest
            .fn()
            .mockImplementation(() => Promise.reject(error));

          wrapper.setProps({ location: { pathname: 'pathnameThree' } });

          await loadInitialData.default;

          expect.assertions(3);

          // why is state being called 3 times?
          expect(setStateSpy).toHaveBeenNthCalledWith(1, {
            data: null,
            error: null,
            loadInitialDataPromise: expect.any(Promise),
            loading: true,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            data: null,
            error,
            loadInitialDataPromise: null,
            loading: false,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(2, {
            data: null,
            error,
            loadInitialDataPromise: null,
            loading: false,
          });
        });
      });

      describe('successful fetch of route, match, and initial props', () => {
        it('should call set state with new data', async () => {
          const pathname = 'pathnameFour';
          const data = 'Really cool data';

          loadInitialData.default = jest
            .fn()
            .mockImplementation(async () => data);

          wrapper.setProps({ location: { pathname } });

          await loadInitialData.default;

          expect.assertions(4);

          expect(loadInitialData.default).toHaveBeenCalledWith(pathname, []);

          // why is state being called 3 times?
          expect(setStateSpy).toHaveBeenNthCalledWith(4, {
            data: null,
            error: null,
            loadInitialDataPromise: expect.any(Promise),
            loading: true,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(5, {
            data,
            error: null,
            loadInitialDataPromise: null,
            loading: false,
          });

          expect(setStateSpy).toHaveBeenNthCalledWith(6, {
            data,
            error: null,
            loadInitialDataPromise: null,
            loading: false,
          });
        });
      });
    });
  });
});
