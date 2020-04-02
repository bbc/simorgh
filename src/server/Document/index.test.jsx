import React from 'react';
import * as server from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import renderDocument from '.';
import { ServerApp } from '../../app/containers/App';
import DocumentComponent from './component';
import * as styles from '../styles';

const { ServerStyleSheet } = jest.requireActual('styled-components');
const mockSheet = new ServerStyleSheet();

jest.mock('../styles', () => ({
  getStyleTag: jest.fn().mockImplementation(() => '__mock_style_tags__'),
}));

jest.mock('../utilities/getAssetOrigins', () => () => '__mock_asset_origins__');

jest.mock('@loadable/server', () => ({
  ChunkExtractor: jest.fn().mockImplementation(() => ({
    collectChunks: (arg) => arg,
    getScriptElements: () => '__mock_script_elements__',
  })),
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

ServerApp.mockImplementation(() => <div />);
DocumentComponent.mockImplementation(() => <html lang="en-GB" />);

describe('Render Document', () => {
  beforeEach(() => {
    process.env.SIMORGH_APP_ENV = 'foobar';
  });

  afterAll(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  it('should render correctly', (done) => {
    renderDocument({
      bbcOrigin: 'https://www.test.bbc.co.uk',
      data: { test: 'data' },
      isAmp: false,
      routes: ['someRoute'],
      service: 'news',
      url: '/',
    }).then((document) => {
      expect(document.html).toEqual(
        '<!doctype html><html lang="en-GB"></html>',
      );
      expect(document.redirectUrl).toBe(null);

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
        assetOrigins: '__mock_asset_origins__',
        data: { test: 'data' },
        helmet: undefined,
        isAmp: false,
        scripts: '__mock_script_elements__',
        service: 'news',
        styleTags: '__mock_style_tags__',
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

      expect(ChunkExtractor).toHaveBeenCalledWith({
        statsFile: `${__dirname}/public/loadable-stats-foobar.json`,
      });

      expect(
        server.renderToString.mock.calls[0][0].props.sheet.constructor.name,
      ).toBe('StyleSheet');

      expect(styles.getStyleTag).toHaveBeenCalledWith(mockSheet, false);

      done();
    });
  });
});
