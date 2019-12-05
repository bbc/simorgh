/* eslint-disable jsx-a11y/html-has-lang */
import React from 'react';
import { mount, render } from 'enzyme';
import Helmet from 'react-helmet';
import NoJsContainer from '.';

describe('NoJsContainer', () => {
  it('should return a mounted component with the html class attribute as js', () => {
    const wrapper = mount(<NoJsContainer />);
    const { htmlAttributes } = Helmet.peek();
    expect(htmlAttributes.class).toBe('js');
    expect(wrapper).toMatchSnapshot();
  });

  it('should return the markup with the html class attribute as no-js', () => {
    render(<NoJsContainer />);
    const { htmlAttributes } = Helmet.peek();
    expect(htmlAttributes.class).toBe('no-js');
  });
});
