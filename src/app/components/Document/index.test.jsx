import React from 'react';
import { shallowRender } from '../../helpers/tests/testHelpers';
import Document from './index';

describe('Document', () => {
  const assets = { client: { js: 'http://example.com/file.js' } };
  const data = {};
  const helmet = {
    htmlAttributes: {
      toComponent: jest.fn().mockImplementation(() => ({
        lang: 'test',
      })),
    },
    title: {
      toComponent: jest
        .fn()
        .mockImplementation(() => <title>Test title</title>),
    },
  };

  const shallowDocument = shallowRender(
    <Document assets={assets} data={data} helmet={helmet} />,
  );

  it('should render correctly', () => {
    expect(shallowDocument).toMatchSnapshot();
  });
});
