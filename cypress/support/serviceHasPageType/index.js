import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import servicesConfig from '../config/services';

const serviceHasPageType = pageType => service =>
  pipe(
    path([service, 'pageTypes', pageType, 'path']),
    Boolean,
  )(servicesConfig);

export const hasFrontPage = serviceHasPageType('frontPage');

export const hasArticlePage = serviceHasPageType('articles');

export const hasLiveRadioPage = serviceHasPageType('liveRadio');

export const hasErrorPage = serviceHasPageType('errorPage404');
