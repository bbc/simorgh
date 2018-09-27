import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';

jest.mock('../../../helpers/contextHelpers', () => ({
  default: {
    imageCaptionOffscreenText: 'Default image caption prefix, ',
  },
  news: {
    imageCaptionOffscreenText: 'Image caption, ',
  },
  persian: {
    imageCaptionOffscreenText: ' ، عنوان تصویر',
  },
}));

const component = captionText => <Caption>{captionText}</Caption>;

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render correctly with news ServiceContext',
    component('This is some Caption text'),
  );

  shouldMatchSnapshot(
    'should render correctly with persian ServiceContext',
    component('توصیف چیزی که اتفاق می افتد'),
  );
});
