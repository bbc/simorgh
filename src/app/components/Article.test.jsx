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
});
