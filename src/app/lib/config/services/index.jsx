/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/
import React from 'react';
import Loadable from 'react-loadable';
import { ServiceContext } from '../../../contexts/ServiceContext';

const createLoadable = loader =>
  Loadable({
    loader,
    loading: () => null,
    render(loaded, { children }) {
      return (
        <ServiceContext.Provider value={loaded.default}>
          {children}
        </ServiceContext.Provider>
      );
    },
  });

export default {
  default: {
    brandName: 'Default Brand Name',
    externalLinkText: ', default external link suffix',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    imageCopyrightOffscreenText: 'Default image copyright text, ',
    service: 'default',
    themeColor: '#000',
  },
  news: createLoadable(() =>
    import(/* webpackChunkName: 'news' */ `./news.js`),
  ),
  persian: createLoadable(() =>
    import(/* webpackChunkName: 'persian' */ `./persian.js`),
  ),
  igbo: createLoadable(() =>
    import(/* webpackChunkName: 'igbo' */ `./igbo.js`),
  ),
  pidgin: createLoadable(() =>
    import(/* webpackChunkName: 'pidgin' */ `./pidgin.js`),
  ),
  thai: createLoadable(() =>
    import(/* webpackChunkName: 'thai' */ `./thai.js`),
  ),
  yoruba: createLoadable(() =>
    import(/* webpackChunkName: 'yoruba' */ `./yoruba.js`),
  ),
};
