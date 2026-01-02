import Cookie from 'js-cookie';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import onClient from '#lib/utilities/onClient';
import getUUID from '#lib/utilities/getUUID';
import isOperaProxy from '#lib/utilities/isOperaProxy';
import {
  MEDIUM_CAMPAIGN_IDENTIFIER,
  XTOR_CAMPAIGN_IDENTIFIER,
  SUPPORTED_MEDIUM_CAMPAIGN_TYPES,
} from './analytics.const';
import getAmpDestination from './getAmpDestination';

export const getDestination = (platform, statsDestination) => {
  const destinationIDs = {
    DEFAULT: 596068,
    DEFAULT_TEST: 596068,
    NEWS_PS: 598285,
    NEWS_LANGUAGES_PS: 598291,
    NEWS_GNL: 598287,
    NEWS_LANGUAGES_GNL: 598289,
    NEWS_PS_TEST: 598286,
    NEWS_LANGUAGES_PS_TEST: 598292,
    NEWS_LANGUAGES_GNL_TEST: 598290,
    NEWS_GNL_TEST: 598288,
    WS_NEWS_LANGUAGES: 598342,
    WS_NEWS_LANGUAGES_TEST: 598343,
    HOMEPAGE_PS: 598273,
    HOMEPAGE_PS_TEST: 598274,
    BBC_ARCHIVE_PS: 605565,
    BBC_ARCHIVE_PS_TEST: 605566,
    NEWSROUND: 598293,
    NEWSROUND_TEST: 598294,
    SPORT_GNL: 598308,
    SPORT_GNL_TEST: 598309,
    SPORT_PS: 598310,
    SPORT_PS_TEST: 598311,
  };

  const geoVariants = {
    NEWS_PS: {
      PS: destinationIDs.NEWS_PS,
      GNL: destinationIDs.NEWS_GNL,
    },
    NEWS_PS_TEST: {
      PS: destinationIDs.NEWS_PS_TEST,
      GNL: destinationIDs.NEWS_GNL_TEST,
    },
    SPORT_PS: {
      PS: destinationIDs.SPORT_PS,
      GNL: destinationIDs.SPORT_GNL,
    },
    SPORT_PS_TEST: {
      PS: destinationIDs.SPORT_PS_TEST,
      GNL: destinationIDs.SPORT_GNL_TEST,
    },
    NEWS_LANGUAGES_PS: {
      PS: destinationIDs.NEWS_LANGUAGES_PS,
      GNL: destinationIDs.NEWS_LANGUAGES_GNL,
    },
    NEWS_LANGUAGES_PS_TEST: {
      PS: destinationIDs.NEWS_LANGUAGES_PS_TEST,
      GNL: destinationIDs.NEWS_LANGUAGES_GNL_TEST,
    },
  };

  if (platform === 'amp' && geoVariants[statsDestination]) {
    return getAmpDestination(geoVariants[statsDestination]);
  }

  return destinationIDs[statsDestination] || destinationIDs.NEWS_PS;
};

export const enforceLegacyDestinationForJapanese = reverbTrackingURL =>
  reverbTrackingURL?.replace('s=646753&', `s=598289&`);

export const getAppType = platform => {
  switch (platform) {
    case 'amp':
      return 'amp';
    case 'app':
      return 'mobile-app';
    case 'lite':
      return 'lite';
    case 'canonical':
      return 'responsive';
    default:
      return 'responsive';
  }
};

export const isLocServeCookieSet = platform => {
  if (platform === 'amp') {
    return false;
  }

  if (onClient()) {
    return !!Cookie.get('loc_serve');
  }

  return null;
};

export const getHref = platform => {
  if (platform === 'amp') {
    return `\${sourceUrl}`;
  }

  if (onClient() && window.location.href) {
    const { href } = window.location;
    return href;
  }

  return null;
};

export const getReferrer = platform => {
  if (platform === 'amp') {
    /* On AMP, `\${documentReferrer}` is an amp analytics variable that resolves
       to a `document.referrer` equivalent as the window document is undefined on amp pages.
       https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#document-referrer
    */
    return `\${documentReferrer}`;
  }

  if (onClient() && document.referrer) {
    return document.referrer;
  }

  return null;
};

export const sanitise = initialString =>
  initialString ? initialString.trim().replace(/\s/g, '%20') : null;

export const LIBRARY_VERSION = 'simorgh';

export const onOnionTld = () =>
  onClient() ? window.location.host.endsWith('.onion') : false;
