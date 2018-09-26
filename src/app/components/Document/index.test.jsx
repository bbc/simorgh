import React from 'react';
import { shallowRender } from '../../helpers/tests/testHelpers';
import Document from './index';

describe('Document', () => {
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
        href="https://www.bbc.com/news/articles/c0000000025o"
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
  const styleTags = <style>{'html { color: red; }'}</style>;

  const shallowDocument = shallowRender(
    <Document
      assets={assets}
      app={'<h1>App!</h1>'}
      data={data}
      helmet={helmet}
      styleTags={styleTags}
    />,
  );

  it('should render correctly', () => {
    expect(shallowDocument).toMatchSnapshot();
  });
});
