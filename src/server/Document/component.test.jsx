import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { JSDOM } from 'jsdom';

import DocumentComponent from './component';

Helmet.canUseDOM = false;

describe('Document Component', () => {
  const assetOrigins = ['http://example.com'];
  const data = { test: 'data' };
  const scripts = (
    <>
      <script src="main.js" />
      <script src="vendor.js" />
      <script src="igbo.js" />
    </>
  );
  const styleTags = (
    <style data-styled-components="abc">{'html { color: red; }'}</style>
  );
  const styleTagsAmp = <style amp-custom="">{'html { color: red; }'}</style>;

  // eslint-disable-next-line react/prop-types
  const TestDocumentComponent = ({ service, isAmp }) => (
    <DocumentComponent
      assetOrigins={assetOrigins}
      app={renderToString(
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
      )}
      data={{ ...data }}
      helmet={Helmet.renderStatic()}
      styleTags={isAmp ? styleTagsAmp : styleTags}
      scripts={scripts}
      service={service}
      isAmp={isAmp}
    />
  );

  it('should render correctly', async () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" isAmp={false} />),
    );
    expect(dom.window.document.documentElement).toMatchSnapshot();
  });

  it('should render AMP version correctly', async () => {
    const dom = new JSDOM(
      renderToString(<TestDocumentComponent service="news" isAmp />),
    );
    expect(dom.window.document.documentElement).toMatchSnapshot();
  });
});
