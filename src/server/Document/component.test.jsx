import React from 'react';
import { shallowRender } from '../../app/helpers/tests/testHelpers';
import DocumentComponent from './component';

describe('Document Component', () => {
  const assets = ['http://example.com/file.js'];
  const data = { test: 'data' };

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
        href="https://www.bbc.com/news/articles/cl55zn0w0l4o"
      />,
    ),
    meta: mockHelmetToComponent(
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />,
    ),
    title: mockHelmetToComponent(<title>Test title</title>),
  };
  const styleTags = (
    <style data-styled-components="abc">{'html { color: red; }'}</style>
  );
  const styleTagsAmp = <style amp-custom="">{'html { color: red; }'}</style>;

  const shallowDocument = ({ isAmp }) =>
    shallowRender(
      <DocumentComponent
        assets={assets}
        app={'<h1>App!</h1>'}
        data={{ ...data, isAmp }}
        helmet={helmet}
        styleTags={isAmp ? styleTagsAmp : styleTags}
      />,
    );

  it('should render correctly', () => {
    expect(shallowDocument({ isAmp: false })).toMatchSnapshot();
  });

  it('should render AMP version correctly', () => {
    expect(shallowDocument({ isAmp: true })).toMatchSnapshot();
  });
});
