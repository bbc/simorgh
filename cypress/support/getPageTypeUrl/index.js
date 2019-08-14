import path from 'ramda/src/path';
import servicesConfig from '../config/services';

const getPageTypeUrl = pageType => service =>
  path([service, 'pageTypes', pageType, 'path'], servicesConfig);

export const getFrontPageUrl = getPageTypeUrl('frontPage');

export const getArticleUrl = getPageTypeUrl('articles');

export const getLiveRadioUrl = getPageTypeUrl('liveRadio');

export const getErrorPageUrl = getPageTypeUrl('errorPage404');
