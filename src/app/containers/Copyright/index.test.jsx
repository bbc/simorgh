import React from 'react';
import CopyrightContainer from './index';
import { ServiceContext } from '../../components/ServiceContext';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

const CopyrightWithContext = (copyrightText, contextStub) => (
  <ServiceContext.Provider value={contextStub}>
    <CopyrightContainer>{copyrightText}</CopyrightContainer>
  </ServiceContext.Provider>
);

const newsServiceContextStub = {
  imageCopyrightOffscreenText: 'Image source, ',
};
const persianServiceContextStub = {
  imageCopyrightOffscreenText: ' ، منبع تصویر',
};

shouldMatchSnapshot(
  'should render Copyright with news service context',
  CopyrightWithContext('This is some copyright text', newsServiceContextStub),
);

shouldMatchSnapshot(
  'should render Copyright with persian service context',
  CopyrightWithContext(
    'توصیف چیزی که اتفاق می افتد',
    persianServiceContextStub,
  ),
);
