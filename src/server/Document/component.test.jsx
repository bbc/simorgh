import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { JSDOM } from 'jsdom';

import DocumentComponent from './component';

Helmet.canUseDOM = false;

describe('Document Component', () => {
  const data = { test: 'data' };
  const legacyScripts = (
    <>
      <script src="legacy.main.js" />
      <script src="legacy.vendor.js" />
      <script src="legacy.igbo.js" />
    </>
  );
  const modernScripts = (
    <>
      <script src="modern.main.js" />
      <script src="modern.vendor.js" />
      <script src="modern.igbo.js" />
    </>
  );
  const links = (
    <>
      <link rel="modulePreload" href="modern.main.js" />
      <link rel="modulePreload" href="modern.vendor.js" />
      <link rel="modulePreload" href="modern.igbo.js" />
    </>
  );

  const TestDocumentComponent = ({ service, isAmp, isApp, isLite }) => (
    <DocumentComponent
      app={{
        css: '.css-7prgni-StyledLink{display:inline-block;}',
        ids: ['7prgni-StyledLink'],
        html: renderToString(
          <>
            <Helmet htmlAttributes={{ lang: 'test' }}>
              <title>Test title</title>
              <link
                rel="canonical"
                href="https://www.bbc.com/news/articles/c6v11qzyv8po"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, minimum-scale=1"
              />
              <script type="application/ld+json" />
            </Helmet>
            <h1>App!</h1>
          </>,
        ),
      }}
      data={{ ...data }}
      helmet={Helmet.renderStatic()}
      legacyScripts={legacyScripts}
      modernScripts={modernScripts}
      service={service}
      isAmp={isAmp}
      isApp={isApp}
      isLite={isLite}
      links={links}
    />
  );

  it('should render correctly', () => {
    const dom = new JSDOM(
      renderToString(
        <TestDocumentComponent service="news" isAmp={false} isApp={false} />,
      ),
    );
    expect(dom.window.document.documentElement).toMatchSnapshot();
  });

  it('should render AMP version correctly', () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" isAmp />),
    );
    expect(dom.window.document.documentElement).toMatchSnapshot();
  });

  it('should not render preload links on amp', () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" isAmp />),
    );

    const head = dom.window.document.querySelector('head');
    const linksHtml = renderToStaticMarkup(links);

    expect(head).not.toContainHTML(linksHtml);
  });

  it('should render APP version correctly', () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" isApp />),
    );
    expect(dom.window.document.documentElement).toMatchSnapshot();
  });

  it('should render LITE version correctly', () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" isLite />),
    );
    expect(dom.window.document.documentElement).toMatchSnapshot();
  });

  it('should render "noindex" meta tag on APP version', () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" isApp />),
    );

    const head = dom.window.document.querySelector('head');

    expect(head).toContainHTML('<meta name="robots" content="noindex" />');
  });

  it('should render the "window.SIMORGH_DATA" object as the first script tag in the body', () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" />),
    );

    const body = dom.window.document.querySelector('body');
    const scripts = body.querySelectorAll('script');

    const firstScript = scripts[0];

    expect(firstScript.innerHTML).toBe(
      `window.SIMORGH_DATA=${JSON.stringify(data)}`,
    );
  });
});
