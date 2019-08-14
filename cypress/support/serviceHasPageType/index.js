import pathSatisfies from 'ramda/src/pathSatisfies';
import servicesConfig from '../config/services';

const serviceHasPageType = pageType => service =>
  pathSatisfies(
    Boolean,
    [service, 'pageTypes', pageType, 'path'],
    servicesConfig,
  );

export const hasFrontPage = serviceHasPageType('frontPage');

export const hasArticlePage = serviceHasPageType('articles');

export const hasLiveRadioPage = serviceHasPageType('liveRadio');

export const hasErrorPage = serviceHasPageType('errorPage404');
