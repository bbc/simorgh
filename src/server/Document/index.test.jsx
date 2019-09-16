import React from 'react';
import * as server from 'react-dom/server';
import renderDocument from '.';
import { ServerApp } from '../../app/containers/App';
import DocumentComponent from './component';

const mockServerStyleSheet = {
  collectStyles: jest.fn(),
  getStyleElement: () => {
    jest.fn();
  },
};

jest.mock('styled-components', () => {
  return {
    ServerStyleSheet: () => mockServerStyleSheet,
  };
});
jest.mock('./component', () => jest.fn());
jest.mock('../../app/containers/App', () => ({
  ServerApp: jest.fn(),
}));
jest.mock('react-helmet', () => ({
  Helmet: {
    renderStatic: jest.fn(),
  },
}));

const { ServerStyleSheet } = require('styled-components');

jest.mock('react-dom/server', () => ({
  renderToString: jest.fn().mockImplementation(() => 'no'),
  renderToStaticMarkup: jest
    .fn()
    .mockImplementation(() => '<html lang="en-GB"></html>'),
}));

const sheet = new ServerStyleSheet();
jest.spyOn(sheet, 'collectStyles');
jest.spyOn(server, 'renderToString');
jest.spyOn(server, 'renderToStaticMarkup');

ServerApp.mockImplementation(() => <div />);
DocumentComponent.mockImplementation(() => <html lang="en-GB" />);

describe('Render Document', () => {
  it('should render corretly', done => {
    renderDocument({
      bbcOrigin: 'https://www.test.bbc.co.uk',
      data: { test: 'data' },
      isAmp: false,
      routes: ['someRoute'],
      service: 'news',
      url: '/',
    }).then(document => {
      expect(document).toEqual('<!doctype html><html lang="en-GB"></html>');
      console.log(document);
      expect(sheet.collectStyles).toHaveBeenCalledWith(
        <mockConstructor
          bbcOrigin="https://www.test.bbc.co.uk"
          context={{}}
          data={{ test: 'data' }}
          isAmp={false}
          location="/"
          routes={['someRoute']}
          service="news"
        />,
      );
      expect(server.renderToStaticMarkup).toHaveBeenCalledWith(
        <mockConstructor
          assetOrigins={[
            'https://ichef.bbci.co.uk',
            'https://gel.files.bbci.co.uk',
            undefined,
            undefined,
          ]}
          assets={[
            'http://localhost.bbc.com:7080/static/js/news-12345.12345.js',
            'http://localhost.bbc.com:7080/static/js/vendor-54321.12345.js',
            'http://localhost.bbc.com:7080/static/js/vendor-12345.12345.js',
            'http://localhost.bbc.com:7080/static/js/main-12345.12345.js',
          ]}
          data={{ test: 'data' }}
          isAmp={false}
          service="news"
        />,
      );
      expect(server.renderToString).toHaveBeenCalledWith('no');
      done();
    });
  });
});
