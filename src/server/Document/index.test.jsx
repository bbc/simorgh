import React from 'react';
import * as server from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import renderDocument from '.';
import { ServerApp } from '../../app/containers/App';
import DocumentComponent from './component';

const sheet = new ServerStyleSheet();

jest.mock('styled-components', () => {
  return {
    ServerStyleSheet: jest.fn().mockImplementation(() => ({
      collectStyles: jest.fn(),
      getStyleElement: () => {
        jest.fn();
      },
    })),
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
  renderToString: jest.fn(),
  renderToStaticMarkup: jest
    .fn()
    .mockImplementation(() => '<html lang="en-GB"></html>'),
}));

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
      expect(sheet.collectStyles).toHaveBeenCalled();
      expect(server.renderToStaticMarkup).toHaveBeenCalledWith('ha ha');
      expect(server.renderToString).toHaveBeenCalledWith('no');
      done();
    });
  });
});
