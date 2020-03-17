import { memo } from 'react';
import path from 'ramda/src/path';
import { RadioPage } from '#pages';
import { liveRadioPath } from '../utils/regex';
import getInitialData from './getInitialData';

const getPageId = path(['pageData', 'metadata', 'id']);

const pageIsSame = (prevProps, nextProps) =>
  getPageId(prevProps) === getPageId(nextProps);

export default {
  path: liveRadioPath,
  exact: true,
  component: memo(RadioPage, pageIsSame),
  getInitialData,
  pageType: 'media',
};
