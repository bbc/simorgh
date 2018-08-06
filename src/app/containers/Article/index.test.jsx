import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  describe('Component', () => {
    shouldMatchSnapshot('should render correctly', <ArticleContainer />);
  });

  describe('getInitialProps', () => {
    const defaultIdParam = 'scenario-01';
    const defaultContext = { match: { params: { id: defaultIdParam } } };
    const mockSuccessfulResponse = { data: '12345' };

    const mockFetchSuccess = () =>
      fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

    const mockFetchFailure = () =>
      fetch.mockReject(JSON.stringify({ error: true }));

    const callGetInitialProps = async (
      context = defaultContext,
      mockFetch = mockFetchSuccess,
    ) => {
      mockFetch();
      const response = await ArticleContainer.getInitialProps(context);
      return response;
    };

    beforeEach(() => {
      fetch.resetMocks();
    });

    it('should return the fetch response', async () => {
      const response = await callGetInitialProps();
      expect(response).toEqual({ data: mockSuccessfulResponse });
    });

    describe('On client', () => {
      it('should call fetch with a relative URL', () => {
        callGetInitialProps();
        expect(fetch.mock.calls[0][0]).toEqual(`/data/${defaultIdParam}.json`);
      });
    });

    describe('Route parameter', () => {
      it('should check the id is invalid before returning an empty object', async () => {
        const invalidIdParam = 'route-21';
        const invalidContext = { match: { params: { id: invalidIdParam } } };
        jest.spyOn(global.console, 'log');
        const response = await callGetInitialProps(invalidContext);

        expect(fetch).not.toHaveBeenCalled();

        expect(console.log).toBeCalledWith(
          new Error(
            `Invalid route parameter: ${invalidIdParam}. Id parameter must be in format 'scenario-[xx]', where [xx] could be 01 to 99.`,
          ),
        );

        expect(response).toEqual({});
      });
    });

    describe('On Server', () => {
      const BASE_PATH = 'https://test.com';
      const serverContext = { req: { exists: true }, ...defaultContext };
      process.env.RAZZLE_BASE_PATH = BASE_PATH;

      it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
        callGetInitialProps(serverContext);
        expect(fetch.mock.calls[0][0]).toEqual(
          `${BASE_PATH}/data/${defaultIdParam}.json`,
        );
      });
    });

    describe('Rejected fetch', () => {
      it('should return an empty object', async () => {
        const response = await callGetInitialProps({}, mockFetchFailure);
        expect(response).toEqual({});
      });
    });
  });
});
