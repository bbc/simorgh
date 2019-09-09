import React from 'react';
import Helmet from 'helmet';
import renderDocument from '.';
import { ServerApp } from '../../app/containers/App';
import DocumentComponent from './component';

jest.mock('./component', () => jest.fn());
jest.mock('../../app/containers/App', () => ({
  ServerApp: jest.fn(),
}));
jest.mock('Helmet', () => jest.fn());
Helmet.renderStatic = jest.fn();
ServerApp.mockImplementation(() => <div />);
DocumentComponent.mockImplementation(() => <div />);

describe('render document', () => {
  it('resolves', () => {
    expect(
      renderDocument({
        bbcOrigin: 'https://www.test.bbc.co.uk',
        data: { test: 'data' },
        isAmp: false,
        routes: ['someRoute'],
        service: 'news',
        url: '/',
      }),
    ).rejects.toEqual('hello');
  });
});
