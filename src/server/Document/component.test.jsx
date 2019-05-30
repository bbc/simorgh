import React from 'react';
import { shallowRender } from '../../app/helpers/tests/testHelpers';
import DocumentComponent from './component';

describe('Document Component', () => {
  const assets = ['http://example.com/file.js'];
  const data = { test: 'data' };
  const dials = { dial: true };

  const mockHelmetToComponent = element => ({
    toComponent: jest.fn().mockImplementation(() => element),
  });

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

  const shallowDocument = ({ service, isAmp }) =>
    shallowRender(
      <DocumentComponent
        assets={assets}
        app={'<h1>App!</h1>'}
        data={{ ...data }}
        helmet={helmet}
        styleTags={isAmp ? styleTagsAmp : styleTags}
        service={service}
        isAmp={isAmp}
        dials={dials}
      />,
    );

  it('should render correctly', () => {
    expect(
      shallowDocument({ service: 'news', isAmp: false }),
    ).toMatchSnapshot();
  });

  it('should render AMP version correctly', () => {
    expect(shallowDocument({ service: 'news', isAmp: true })).toMatchSnapshot();
  });
});
