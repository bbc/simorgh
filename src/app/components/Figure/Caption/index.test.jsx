import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';ted upstream
import { ServiceContext } from '../../ServiceContext';
import Caption from './index';

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
};

shouldMatchSnapshot(
  'should render Caption with news service context',
  <ServiceContext.Provider value={newsServiceContextStub}>
    <Caption>This is some Caption text</Caption>
  </ServiceContext.Provider>,
);

shouldMatchSnapshot(
  'should render Caption with persian service context',
  <ServiceContext.Provider value={persianServiceContextStub}>
    <Caption>توصیف چیزی که اتفاق می افتد</Caption>
  </ServiceContext.Provider>,
);
