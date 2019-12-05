/* eslint-disable jsx-a11y/html-has-lang */
import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Helmet from 'react-helmet';
import HtmlClassNameModifier from '.';

describe('HtmlClassNameModifier', () => {
  it('should return a mounted component with the html class attribute as js', async () => {
    render(<HtmlClassNameModifier />);
    await waitForDomChange();
    const { htmlAttributes } = Helmet.peek();
    expect(htmlAttributes.class).toBe('js');
    expect(document.querySelector('html')).toMatchSnapshot();
  });

  shouldMatchSnapshot(
    'should return the markup with the html class attribute as no-js',
    <HtmlClassNameModifier />,
  );
});
