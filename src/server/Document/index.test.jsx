import React from 'react';
import renderDocument from '.';
import { shallowRender } from '../../testHelpers';

jest.mock('./component', () => jest.fn());
jest.mock('../../app/containers/App', () => jest.fn());

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
    await expect(
      renderDocument({
        bbcOrigin: 'https://www.test.bbc.co.uk',
        data: { test: 'data' },
        isAmp: false,
        routes: ['someRoute'],
        service: 'news',
        url: '/',
      }),
    ).toEqual('hello');
  });
});
