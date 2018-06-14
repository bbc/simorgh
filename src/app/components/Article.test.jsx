import React from 'react';
import renderer from 'react-test-renderer';
import Article from './Article';

describe('Article', () => {
  describe('Component', () => {
    describe('with no props', () => {
      it('should render correctly', () => {
        const tree = renderer.create(<Article />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('with a passed model prop containing blocks', () => {
      const modelData = {
        blocks: [
          {
            type: 'headline',
            blockId: '1',
          },
          {
            type: 'test',
            blockId: '2',
          },
        ],
      };
      it('should render correctly', () => {
        const tree = renderer.create(<Article model={modelData} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('getInitialProps', () => {
    const mockSuccessfulResponse = { data: '12345' };

    const mockFetchSuccess = () =>
      fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

    const mockFetchFailure = () =>
      fetch.mockReject(JSON.stringify({ error: true }));

    const callGetInitialProps = async (
      context,
      mockFetch = mockFetchSuccess,
    ) => {
      mockFetch();
      const response = await Article.getInitialProps(context);
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
      const context = { req: { exists: true } };
      process.env.RAZZLE_BASE_PATH = BASE_PATH;

      it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
        callGetInitialProps(context);
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
