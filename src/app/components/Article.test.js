import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';

describe('Article', () => {
  it('renders the headline in an h1', () => {
    const component = shallow(<Article />);
    expect(component.find('h1').text()).toEqual('Article Headline');
  });
});
