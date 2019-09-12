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
      collectStyles: () => {
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

jest.spyOn(sheet, 'collectStyles');

jest.spyOn(server, 'renderToString');
jest.spyOn(server, 'renderToStaticMarkup');

ServerApp.mockImplementation(() => <div />);
DocumentComponent.mockImplementation(() => <html lang="en-GB" />);

describe('Render Document', () => {
  it('should render corretly', () => {
    renderDocument({
      bbcOrigin: 'https://www.test.bbc.co.uk',
      data: { test: 'data' },
      isAmp: false,
      routes: ['someRoute'],
      service: 'news',
      url: '/',
    }).then(document => {
      expect(document).toEqual('<!doctype html><html lang="en-GB"></html>');
      expect(sheet.collectStyles).toHaveBeenCalledWith('lol');
      expect(server.renderStatic).toHaveBeenCalledWith('ha ha');
      expect(server.renderToString).toHaveBeenCalledWith('no');
    });
  });
});
