import React from 'react';
import * as server from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import renderDocument from '.';
import { ServerApp } from '../../app/legacy/containers/App';
import DocumentComponent from './component';

jest.mock('@loadable/server', () => ({
  ChunkExtractor: jest.fn().mockImplementation(() => ({
    collectChunks: arg => arg,
    getScriptElements: () => '__mock_script_elements__',
    getLinkElements: () => '__mock_link_elements__',
  })),
  ChunkExtractorManager: jest.fn(),
}));

jest.mock('./component', () => jest.fn());

jest.mock('../../app/legacy/containers/App', () => ({
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

  it('should render correctly', done => {
    renderDocument({
      bbcOrigin: 'https://www.test.bbc.co.uk',
      data: { test: 'data' },
      isAmp: false,
      isApp: false,
      isLite: false,
      routes: ['someRoute'],
      service: 'news',
      url: '/',
    }).then(document => {
      expect(document.html).toEqual(
        '<!doctype html><html lang="en-GB"></html>',
      );
      expect(document.redirectUrl).toBe(null);

      expect(server.renderToStaticMarkup.mock.calls[0][0].props).toStrictEqual({
        app: {
          css: '',
          html: 'no',
          ids: [],
        },
        data: { test: 'data' },
        helmet: undefined,
        isAmp: false,
        isApp: false,
        isLite: false,
        legacyScripts: '__mock_script_elements__',
        modernScripts: '__mock_script_elements__',
        links: '__mock_link_elements__',
      });

      expect(
        server.renderToString.mock.calls[0][0].props.children.props.children
          .props,
      ).toStrictEqual({
        bbcOrigin: 'https://www.test.bbc.co.uk',
        context: {},
        data: { test: 'data' },
        isAmp: false,
        isApp: false,
        isLite: false,
        location: '/',
        routes: ['someRoute'],
        service: 'news',
      });

      const [[legacyChunkExtractor], [modernChunkExtractor]] =
        ChunkExtractor.mock.calls;

      expect(legacyChunkExtractor).toEqual({
        namespace: 'legacy',
        statsFile: `${__dirname}/public/legacy-loadable-stats-foobar.json`,
      });

      expect(modernChunkExtractor).toEqual({
        namespace: 'modern',
        statsFile: `${__dirname}/public/modern-loadable-stats-foobar.json`,
      });

      done();
    });
  });
});
