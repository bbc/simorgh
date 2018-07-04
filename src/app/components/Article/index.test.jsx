import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import Article from './index';

describe('Article', () => {
  describe('Component', () => {
    shouldMatchSnapshot('should render correctly', <Article />);
  });

  describe('getInitialProps', () => {
    const mockSuccessfulResponse = { data: '12345' };
    const id = 'scenario-01';
    const context = { match: { params: { id } } };

    const mockFetchSuccess = () =>
      fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

    const mockFetchFailure = () =>
      fetch.mockReject(JSON.stringify({ error: true }));

    const callGetInitialProps = async (
      ctx = context,
      mockFetch = mockFetchSuccess,
    ) => {
      mockFetch();
      const response = await Article.getInitialProps(ctx);
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
        expect(fetch.mock.calls[0][0]).toEqual('/data/test/scenario-01.json');
      });
    });

    describe('On Server', () => {
      const BASE_PATH = 'https://test.com';
      const serverContext = { req: { exists: true }, ...context };
      process.env.RAZZLE_BASE_PATH = BASE_PATH;

      it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
        callGetInitialProps(serverContext);
        expect(fetch.mock.calls[0][0]).toEqual(
          `${BASE_PATH}/data/test/scenario-01.json`,
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
