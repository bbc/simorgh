import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { string, bool } from 'prop-types';
import DocumentComponent from './component';

describe('Document Component', () => {
  const assetOrigins = ['http://example.com'];
  const data = { test: 'data' };

  const mockHelmetToComponent = element => ({
    toComponent: jest.fn().mockImplementation(() => element),
  });

  const scripts = (
    <>
      <script src="main.js" />
      <script src="vendor.js" />
      <script src="igbo.js" />
    </>
  );

  const helmet = {
    htmlAttributes: mockHelmetToComponent({
      lang: 'test',
    }),
    link: mockHelmetToComponent(
      <link
        rel="canonical"
        href="https://www.bbc.com/news/articles/c6v11qzyv8po"
      />,
    ),
    meta: mockHelmetToComponent(
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />,
    ),
    script: mockHelmetToComponent(<script type="application/ld+json" />),
    title: mockHelmetToComponent(<title>Test title</title>),
  };
  const styleTags = (
    <style data-styled-components="abc">{'html { color: red; }'}</style>
  );
  const styleTagsAmp = <style amp-custom="">{'html { color: red; }'}</style>;

  const testDocumentComponent = ({ service, isAmp }) => (
    <DocumentComponent
      assetOrigins={assetOrigins}
      app={'<h1>App!</h1>'}
      data={{ ...data }}
      helmet={helmet}
      styleTags={isAmp ? styleTagsAmp : styleTags}
      scripts={scripts}
      service={service}
      isAmp={isAmp}
    />
  );

  testDocumentComponent.propTypes = {
    service: string.isRequired,
    isAmp: bool.isRequired,
  };

  shouldMatchSnapshot(
    'should render correctly',
    testDocumentComponent('news', false),
  );

  shouldMatchSnapshot(
    'should render AMP version correctly',
    testDocumentComponent('news', true),
  );
});
