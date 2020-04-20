import { memo } from 'react';
import { LiveRadioPage } from '#pages';
import pageIsSame from '../utils/pageIsSame';
import { liveRadioPath } from '../utils/regex';
import getInitialData from './getInitialData';

export default {
  path: liveRadioPath,
  exact: true,
  component: memo(LiveRadioPage, pageIsSame),
  getInitialData,
  pageType: 'media',
};
