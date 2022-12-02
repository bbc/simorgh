import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CopyrightContainer from './index';

const CopyrightWithContext = (copyrightText, contextStub) => (
  <ServiceContext.Provider value={contextStub}>
    <CopyrightContainer>{copyrightText}</CopyrightContainer>
  </ServiceContext.Provider>
);

const newsServiceContextStub = {
  dir: 'ltr',
  lang: 'en-GB',
  imageCopyrightOffscreenText: 'Image source, ',
};

const persianServiceContextStub = {
  dir: 'rtl',
  lang: 'fa',
  imageCopyrightOffscreenText: ' ، منبع تصویر',
};

shouldMatchSnapshot(
  'should render Copyright with news service context',
  CopyrightWithContext('This is some copyright text', newsServiceContextStub),
);

shouldMatchSnapshot(
  'should render Copyright with persian service context',
  CopyrightWithContext('Getty Images', persianServiceContextStub),
);
