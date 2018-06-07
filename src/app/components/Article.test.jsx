import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';

describe('Article', () => {
  const testWrapper = (testTitle, testAssertion) => {
    it(testTitle, async () => {
      testAssertion();
    });
  };

  describe('Component', () => {
    const HEADLINE = 'Article Headline';

    const expectElementTextToEqual = (element, value) => {
      const component = shallow(<Article />);
      expect(component.find(element).text()).toEqual(value);
    };

    testWrapper('renders the headline in an h1', () => {
      expectElementTextToEqual('h1', HEADLINE);
    });

    testWrapper('renders the title', () => {
      expectElementTextToEqual('title', HEADLINE);
    });
  });

  describe('getInitialProps', () => {
    const callGetInitialProps = async context => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
      const response = await Article.getInitialProps(context);
      return response;
    };

    beforeEach(() => {
      fetch.resetMocks();
    });

    describe('On client', () => {
      testWrapper('should call fetch with a relative URL', () => {
        callGetInitialProps();
        expect(fetch.mock.calls[0][0]).toEqual('/data/scenario-01.json');
      });
    });

    describe('On Server', () => {
      const BASE_PATH = 'https://test.com';
      const context = { req: { exists: true } };
      process.env.BASE_PATH = BASE_PATH;

      testWrapper(
        'should call fetch with an absolute URL using BASE_PATH environment variable',
        () => {
          callGetInitialProps(context);
          expect(fetch.mock.calls[0][0]).toEqual(
            `${BASE_PATH}/data/scenario-01.json`,
          );
        },
      );
    });
  });
});
