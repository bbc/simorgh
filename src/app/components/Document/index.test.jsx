import React from 'react';
import { shallowRender } from '../../helpers/tests/testHelpers';
import Document from './index';

const assets = ['http://example.com/file.js'];
const data = { test: 'data' };

const mockHelmet = element => ({
  toComponent: jest.fn().mockImplementation(() => element),
  toString: jest.fn().mockImplementation(() => String(element)),
});

const helmet = {
  link: mockHelmet(
    <link
      rel="canonical"
      href="https://www.bbc.com/news/articles/c0000000025o"
    />,
  ),
  meta: mockHelmet(
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1"
    />,
  ),
  title: mockHelmet(<title>Test title</title>),
};

const helmetWithOutAmp = {
  htmlAttributes: mockHelmet({
    lang: 'test',
  }),
  ...helmet,
};

const helmetWithAmp = {
  htmlAttributes: mockHelmet('amp'),
  ...helmet,
};

const styleTags = <style>{'html { color: red; }'}</style>;

const shallowDocument = helmetValue =>
  shallowRender(
    <Document
      assets={assets}
      app={'<h1>App!</h1>'}
      data={data}
      helmet={helmetValue}
      styleTags={styleTags}
    />,
  );

describe('Document', () => {
  it('should render correctly', () => {
    expect(shallowDocument(helmetWithOutAmp)).toMatchSnapshot();
  });

  it('should add amp <script> if "amp" in helmet HTML htmlAttributes', () => {
    expect(shallowDocument(helmetWithAmp)).toMatchSnapshot();
  });
});
