import { memo } from 'react';
import { RadioPage } from '#pages';
import pageIsSame from '../utils/pageIsSame';
import { liveRadioPath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: liveRadioPath,
  exact: true,
  component: memo(RadioPage, pageIsSame),
  getInitialData,
  pageType: 'media',
};
