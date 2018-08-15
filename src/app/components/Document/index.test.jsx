import React from 'react';
import { shallowRender } from '../../helpers/tests/testHelpers';
import Document from './index';

describe('Document', () => {
  const assets = ['http://example.com/file.js'];
  const data = {};
  const helmet = {
    htmlAttributes: {
      toComponent: jest.fn().mockImplementation(() => ({
        lang: 'test',
      })),
    },
    link: {
      toComponent: jest
        .fn()
        .mockImplementation(() => (
          <link
            rel="canonical"
            href="https://www.bbc.com/news/article/scenario-25"
          />
        )),
    },
    meta: {
      toComponent: jest
        .fn()
        .mockImplementation(() => (
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
        )),
    },
    title: {
      toComponent: jest
        .fn()
        .mockImplementation(() => <title>Test title</title>),
    },
  };
  const styleTags = <style>{'html { color: red; }'}</style>;

  const shallowDocument = shallowRender(
    <Document
      assets={assets}
      data={data}
      helmet={helmet}
      styleTags={styleTags}
    />,
  );

  it('should render correctly', () => {
    expect(shallowDocument).toMatchSnapshot();
  });
});
