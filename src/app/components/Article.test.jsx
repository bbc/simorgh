import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';

const HEADLINE = 'Article Headline';

const expectElementTextToEqual = (element, value) => {
  const component = shallow(<Article />);
  expect(component.find(element).text()).toEqual(value);
};

describe('Article', () => {
  it('renders the headline in an h1', () => {
    expectElementTextToEqual('h1', HEADLINE);
  });

  it('renders the title', () => {
    expectElementTextToEqual('title', HEADLINE);
  });
});
