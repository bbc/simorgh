import React from 'react';
import * as server from 'react-dom/server';
import renderDocument from '.';
import { ServerApp } from '../../app/containers/App';
import DocumentComponent from './component';
import * as assets from '../assets';
import * as styles from '../styles';

const { ServerStyleSheet } = jest.requireActual('styled-components');
const mockSheet = new ServerStyleSheet();

jest.mock('../assets', () => ({
  getAssetsArray: jest.fn(),
  getAssetOrigins: jest.fn(),
}));
jest.mock('../styles', () => ({
  getStyleTag: jest.fn(),
}));
jest.mock('styled-components', () => {
  return {
    ServerStyleSheet: () => mockSheet,
    StyleSheetManager: jest.fn(),
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

jest.mock('react-dom/server', () => ({
  renderToString: jest.fn().mockImplementation(() => 'no'),
  renderToStaticMarkup: jest
    .fn()
    .mockImplementation(() => '<html lang="en-GB"></html>'),
}));

jest.spyOn(mockSheet, 'collectStyles');
jest.spyOn(server, 'renderToString');
jest.spyOn(server, 'renderToStaticMarkup');
jest.spyOn(assets, 'getAssetsArray');

ServerApp.mockImplementation(() => <div />);
DocumentComponent.mockImplementation(() => <html lang="en-GB" />);

describe('Render Document', () => {
  it('should render correctly', done => {
    renderDocument({
      bbcOrigin: 'https://www.test.bbc.co.uk',
      data: { test: 'data' },
      isAmp: false,
      routes: ['someRoute'],
      service: 'news',
      url: '/',
    }).then(document => {
      expect(document).toEqual('<!doctype html><html lang="en-GB"></html>');
      expect(mockSheet.collectStyles).toHaveBeenCalledWith(
        <ServerApp
          bbcOrigin="https://www.test.bbc.co.uk"
          context={{}}
          data={{ test: 'data' }}
          isAmp={false}
          location="/"
          routes={['someRoute']}
          service="news"
        />,
      );
      expect(server.renderToStaticMarkup.mock.calls[0][0].props).toStrictEqual({
        app: 'no',
        assetOrigins: undefined,
        assets: undefined,
        data: { test: 'data' },
        helmet: undefined,
        isAmp: false,
        service: 'news',
        styleTags: undefined,
      });
      expect(
        server.renderToString.mock.calls[0][0].props.children.props,
      ).toStrictEqual({
        bbcOrigin: 'https://www.test.bbc.co.uk',
        context: {},
        data: { test: 'data' },
        isAmp: false,
        location: '/',
        routes: ['someRoute'],
        service: 'news',
      });
      expect(
        server.renderToString.mock.calls[0][0].props.sheet.constructor.name,
      ).toBe('StyleSheet');
      expect(assets.getAssetsArray).toHaveBeenCalledWith('news');
      expect(styles.getStyleTag).toHaveBeenCalledWith(mockSheet, false);
      done();
    });
  });
});

// getStyleTag
