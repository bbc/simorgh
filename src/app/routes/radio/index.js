import { memo } from 'react';
import path from 'ramda/src/path';
import { RadioPage } from '#pages';
import { radioAndTvPath } from '../utils/regex';
import getInitialData from './getInitialData';

const getPageId = path(['pageData', 'metadata', 'id']);

const pageIsSame = (prevProps, nextProps) =>
  getPageId(prevProps) === getPageId(nextProps);

export default {
  path: radioAndTvPath,
  exact: true,
  component: memo(RadioPage, pageIsSame),
  getInitialData,
  pageType: 'media',
};
