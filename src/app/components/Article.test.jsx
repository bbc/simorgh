import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';

const expectElementTextToEqual = (element, value) => {
  const component = shallow(<Article />);
  expect(component.find(element).text()).toEqual(value);
};

describe('Article', () => {
  it('renders the headline in an h1', () => {
    expectElementTextToEqual("h1", "Article Headline");
  });

  it('renders the title', () => {
    expectElementTextToEqual("title", "Article Headline");
  });
});
