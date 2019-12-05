/* eslint-disable jsx-a11y/html-has-lang */
import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import HtmlClassNameModifier from '.';

describe('HtmlClassNameModifier', () => {
  afterEach(() => {
    Helmet.canUseDOM = true;
  });
  it('should return a mounted component with the html class attribute as js', async () => {
    render(
      <div>
        <HtmlClassNameModifier />
      </div>,
    );

    await waitForDomChange({
      container: document.querySelector('html'),
    });

    const htmlClassName = document.querySelector('html').className;
    expect(htmlClassName).toBe('js');
  });

  it('should return the markup with the html class attribute as no-js', async () => {
    Helmet.canUseDOM = false;
    renderToStaticMarkup(
      <html>
        <HtmlClassNameModifier />
      </html>,
    );

    const htmlClassName = Helmet.renderStatic().htmlAttributes.toComponent()
      .className;
    expect(htmlClassName).toEqual('no-js');
  });
});
