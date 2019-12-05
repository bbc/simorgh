/* eslint-disable jsx-a11y/html-has-lang */
import React from 'react';
import { render as mount } from '@testing-library/react';
import { render } from 'enzyme';
import Helmet from 'react-helmet';
import HtmlClassNameModifier from '.';

describe('HtmlClassNameModifier', () => {
  it('should return a mounted component with the html class attribute as js', () => {
    mount(<HtmlClassNameModifier />);
    const { htmlAttributes } = Helmet.peek();
    expect(htmlAttributes.class).toBe('js');
  });

  it('should return the markup with the html class attribute as no-js', () => {
    render(<HtmlClassNameModifier />);
    const { htmlAttributes } = Helmet.peek();
    expect(htmlAttributes.class).toBe('no-js');
  });
});
