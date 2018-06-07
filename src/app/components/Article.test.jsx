import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';

const HEADLINE = 'Article Headline';

const expectElementTextToEqual = (element, value) => {
  const component = shallow(<Article />);
  expect(component.find(element).text()).toEqual(value);
};

const testElementTextValue = (testTitle, element, value) => {
  it(testTitle, () => {
    expectElementTextToEqual(element, value);
  });
};

describe('Article', () => {
  testElementTextValue('renders the headline in an h1', 'h1', HEADLINE);
  testElementTextValue('renders the title', 'title', HEADLINE);

  describe('getInitialProps', () => {
    const callGetInitialProps = async context => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
      const response = await Article.getInitialProps(context);
      return response;
    };

    const testGetInitialProps = (testTitle, testAssertion, context = {}) => {
      it(testTitle, async () => {
        callGetInitialProps(context);
        testAssertion();
      });
    };

    beforeEach(() => {
      fetch.resetMocks();
    });

    describe('On client', () => {
      testGetInitialProps('should call fetch with a relative URL', () => {
        expect(fetch.mock.calls[0][0]).toEqual('/data/scenario-01.json');
      });
    });

    describe('On Server', () => {
      const context = { req: { exists: true } };
      testGetInitialProps(
        'should call fetch with an absolute URL',
        () => {
          expect(fetch.mock.calls[0][0]).toEqual('http://localhost:7080/data/scenario-01.json');
        },
        context,
      );
    });
  });
});
