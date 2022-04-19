/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import { template, templateStyles } from '#lib/joinUsTemplate';
import loggerNode from '#lib/logger.node';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';

const logger = loggerNode();
const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');
const isModernBrowser = 'noModule' in document.createElement('script');
const bundleToExecute = isModernBrowser ? 'modern' : 'legacy';

if (module.hot) {
  module.hot.accept();
}
