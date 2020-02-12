import { memo } from 'react';
import path from 'ramda/src/path';
import getInitialData from '../getInitialData';
import RadioPage from '#pages/RadioPage';
import { radioAndTvPath } from '../regex';

const getPageId = path(['pageData', 'metadata', 'id']);

const pageIsSame = (prevProps, nextProps) =>
  getPageId(prevProps) === getPageId(nextProps);

const MemoizedRadioPage = memo(RadioPage, pageIsSame);

export default {
  path: radioAndTvPath,
  exact: true,
  component: MemoizedRadioPage,
  getInitialData,
  pageType: 'media',
};
