import React from 'react';
import renderDocument from '.';

const RenderedDocument = () =>
  renderDocument({
    bbcOrigin: 'https://www.test.bbc.co.uk',
    data: { test: 'data' },
    isAmp: false,
    routes: ['someRoute'],
    service: 'news',
    url: '/',
  });

describe('render document', () => {
  it('resolves', async () => {
    await expect(<RenderedDocument />).toEqual(null);
  });
});
