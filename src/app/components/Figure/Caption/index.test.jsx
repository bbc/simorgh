import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import { ServiceContext } from '../../ServiceContext';
import Caption from './index';

const CaptionWithContext = (captionText, contextStub) => (
  <ServiceContext.Provider value={contextStub}>
    <Caption>{captionText}</Caption>
  </ServiceContext.Provider>
);

const newsServiceContextStub = {
  imageCaptionOffscreenText: 'Image caption, ',
};
const persianServiceContextStub = {
  imageCaptionOffscreenText: ' ، عنوان تصویر',
};

shouldMatchSnapshot(
  'should render Caption with news service context',
  CaptionWithContext('This is some Caption text', newsServiceContextStub),
);

shouldMatchSnapshot(
  'should render Caption with persian service context',
  CaptionWithContext('توصیف چیزی که اتفاق می افتد', persianServiceContextStub),
);
