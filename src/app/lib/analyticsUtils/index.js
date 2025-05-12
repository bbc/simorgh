import Cookie from 'js-cookie';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import Url from 'url-parse';
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
    PS_HOMEPAGE: 598273,
    PS_HOMEPAGE_TEST: 598274,
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

export const getScreenInfo = platform => {
  if (platform === 'amp') {
    return `\${screenWidth}x\${screenHeight}x\${screenColorDepth}`;
  }

  if (onClient()) {
    const { width, height, colorDepth, pixelDepth } = window.screen;
    const orderArray = [
      width || 0,
      height || 0,
      colorDepth || 0,
      pixelDepth || 0,
    ];

    return orderArray.join('x');
  }

  return null;
};

export const getBrowserViewPort = platform => {
  if (platform === 'amp') {
    return `\${availableScreenWidth}x\${availableScreenHeight}`;
  }

  if (onClient()) {
    const { innerWidth, innerHeight } = window;

    return [innerWidth || 0, innerHeight || 0].join('x');
  }

  return null;
};

export const getCurrentTime = platform => {
  if (platform === 'amp') {
    return `\${timestamp}`;
  }

  if (onClient()) {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    return [hours, mins, secs].join('x');
  }

  return null;
};

export const getDeviceLanguage = platform => {
  if (platform === 'amp') {
    // Using browserlanguage since AMP doesn't have access to device language
    return `\${browserLanguage}`;
  }

  if (onClient() && navigator.language) {
    return navigator.language;
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

export const getAtUserId = () => {
  if (!onClient()) return null;

  // Users accessing the site on opera "extreme data saving mode" have the pages rendered by an intermediate service
  // Attempting to track these users is just tracking that proxy, causing all opera mini visitors to have the same id
  if (isOperaProxy()) return null;

  const cookieName = 'atuserid';
  let cookie = Cookie.get(cookieName);
  const expires = 397; // expires in 13 months

  if (cookie) {
    try {
      cookie = JSON.parse(cookie);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      cookie = null;
    }
  }

  const val = path(['val'], cookie) || getUUID();

  Cookie.set(cookieName, JSON.stringify({ val }), {
    expires,
    path: '/',
    secure: true,
  });

  return val;
};

export const sanitise = initialString =>
  initialString ? initialString.trim().replace(/\s/g, '%20') : null;

const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const getISODate = unixTimestamp => {
  const date = new Date(unixTimestamp);
  return date.toISOString();
};

export const getPublishedDatetime = (attribute, data) => {
  const publishedDatetime = pathOr(null, ['metadata', attribute], data);

  return publishedDatetime && isValidDateTime(publishedDatetime)
    ? getISODate(publishedDatetime)
    : null;
};

export const getContentId = pathOr(null, [
  'metadata',
  'analyticsLabels',
  'contentId',
]);

export const getAtiUrl = (data = []) => {
  const cleanedValues = data
    .filter(({ value }) => value)
    .map(item => {
      const { value, disableEncoding } = item;
      const finalValue = disableEncoding ? value : encodeURIComponent(value);
      return { ...item, value: finalValue };
    });

  const parsedAtiValues = cleanedValues.map(({ key, value, wrap }) =>
    wrap ? `${key}=[${value}]` : `${key}=${value}`,
  );

  return parsedAtiValues.join('&');
};

export const getEventInfo = ({
  pageIdentifier = '',
  componentName = '',
  campaignID = '',
  experimentVariant = '',
  format = '',
  detailedPlacement = '',
  advertiserID = '',
  url = '',
} = {}) => {
  const generalPlacement = pageIdentifier;
  const creation = componentName;

  return `PUB-[${campaignID}]-[${creation}]-[${experimentVariant}]-[${format}]-[${generalPlacement}]-[${detailedPlacement}]-[${advertiserID}]-[${url}]`;
};

export const getThingAttributes = (attribute, articleData) => {
  const things = pathOr(null, ['metadata', 'tags', 'about'], articleData);

  if (things) {
    const attributes = [];

    things.forEach(thing => {
      if (thing[attribute]) {
        attributes.push(thing[attribute].trim().replace(/\s/g, '%20'));
      }
    });

    return attributes.join('~') || null;
  }

  return null;
};

export const getCampaignType = () => {
  if (!onClient()) return null;

  // Gets the query string parameters from the current url parsing them as an object
  const { query, hash } = new Url(window.location.href, true);

  // Check for the presence of the `?at_medium` QS
  const isMediumCampaign = Object.prototype.hasOwnProperty.call(
    query,
    MEDIUM_CAMPAIGN_IDENTIFIER,
  );

  // Checks for the presence of the `?xtor` WS or anchor e.g. `#xtor`
  const isXtorCampaign =
    Object.prototype.hasOwnProperty.call(query, XTOR_CAMPAIGN_IDENTIFIER) ||
    hash.includes(XTOR_CAMPAIGN_IDENTIFIER);

  if (isMediumCampaign) {
    const isSupportedMediumCampaignType = SUPPORTED_MEDIUM_CAMPAIGN_TYPES.some(
      type => query[MEDIUM_CAMPAIGN_IDENTIFIER].includes(type),
    );

    return isSupportedMediumCampaignType
      ? query[MEDIUM_CAMPAIGN_IDENTIFIER]
      : null;
  }

  if (isXtorCampaign) return 'XTOR';

  return null;
};

/* This transforms urls with a hash param to query params
   ie. from bbc.com/mundo#some_param_1=24&some_param_2=48 to bbc.com/mundo?some_param_1=24&some_param_2=48
*/
const parameteriseHash = hash => new Url(hash.replace('#', '?'), true).query;

const getMarketingUrlParam = (href, field) => {
  const { query, hash } = new Url(href, true);

  const queryWithParams = hash ? parameteriseHash(hash) : query;

  return Object.prototype.hasOwnProperty.call(queryWithParams, field)
    ? queryWithParams[field]
    : '';
};

const buildMarketingString = marketingValues =>
  marketingValues
    .map(({ value, wrap }) => (wrap && value ? `[${value}]` : value))
    .join('-');

/*
 * RSS marketing string uses v2 full-custom campaigns which uses specifies that parameters are in the format "src_myproperty: myvalue" for each property in the campaign.
 * more information at https://developers.atinternet-solutions.com/as2-tagging-en/javascript-en/campaigns-javascript-en/marketing-campaigns-v2/?kw=at_custom#full-custom-campaigns_13
 */
const buildRSSMarketingString = href => {
  const { query, hash } = new Url(href, true);

  const queryWithParams = hash ? parameteriseHash(hash) : query;

  return Object.keys(queryWithParams).reduce((accum, currVal) => {
    if (currVal.includes('at_')) {
      const type = currVal.replace('at_', '');

      if (type === 'medium') {
        return [
          {
            key: 'src_medium',
            description: 'rss campaign prefix',
            value: 'RSS',
            wrap: false,
          },
        ];
      }

      return [
        ...accum,
        {
          key: `src_${type}`,
          description: `src_${type} field`,
          value: getMarketingUrlParam(href, currVal),
          wrap: false,
        },
      ];
    }
    return accum;
  }, []);
};

export const getRSSMarketingString = (href, campaignType) =>
  campaignType === 'RSS' ? buildRSSMarketingString(href) : [];

export const getAffiliateMarketingString = href =>
  buildMarketingString([
    {
      description: 'affiliate campaign prefix',
      value: 'al',
      wrap: false,
    },
    {
      description: 'at_campaign field',
      value: getMarketingUrlParam(href, 'at_campaign'),
      wrap: false,
    },
    {
      description: 'at_type field',
      value: getMarketingUrlParam(href, 'at_type'),
      wrap: true,
    },
    {
      description: 'at_identifier field',
      value: getMarketingUrlParam(href, 'at_identifier'),
      wrap: true,
    },
    {
      description: 'at_format field',
      value: getMarketingUrlParam(href, 'at_format'),
      wrap: true,
    },
    {
      description: 'at_creation field',
      value: getMarketingUrlParam(href, 'at_creation'),
      wrap: true,
    },
    {
      description: 'at_variant field',
      value: getMarketingUrlParam(href, 'at_variant'),
      wrap: true,
    },
  ]);

export const getSLMarketingString = href =>
  buildMarketingString([
    {
      description: 'sponsored links campaign prefix',
      value: 'SEC',
      wrap: false,
    },
    {
      description: 'at_campaign field',
      value: getMarketingUrlParam(href, 'at_campaign'),
      wrap: false,
    },
    {
      description: 'at_platform field',
      value: getMarketingUrlParam(href, 'at_platform'),
      wrap: true,
    },
    {
      description: 'at_creation field',
      value: getMarketingUrlParam(href, 'at_creation'),
      wrap: true,
    },
    {
      description: 'at_variant field',
      value: getMarketingUrlParam(href, 'at_variant'),
      wrap: true,
    },
    {
      description: 'at_network field',
      value:
        {
          search: 'F=S',
          content: 'F=C',
        }[getMarketingUrlParam(href, 'at_network')] || '',
      wrap: false,
    },
    {
      description: 'at_term field',
      value: getMarketingUrlParam(href, 'at_term'),
      wrap: true,
    },
  ]);

export const getEmailMarketingString = href =>
  buildMarketingString([
    {
      description:
        'email campaign prefix depending on value of at_emailtype param',
      value:
        {
          acquisition: 'EREC',
          retention: 'EPR',
          promotion: 'ES',
        }[getMarketingUrlParam(href, 'at_emailtype')] || '',
      wrap: false,
    },
    {
      description: 'at_campaign field',
      value: getMarketingUrlParam(href, 'at_campaign'),
      wrap: false,
    },
    {
      description: 'at_creation field',
      value: getMarketingUrlParam(href, 'at_creation'),
      wrap: true,
    },
    {
      description: 'at_send_date field',
      value: getMarketingUrlParam(href, 'at_send_date'),
      wrap: false,
    },
    {
      description: 'at_link field',
      value: getMarketingUrlParam(href, 'at_link'),
      wrap: true,
    },
    {
      description: 'at_recipient_id + @ + at_recipient_list field',
      value: `${getMarketingUrlParam(
        href,
        'at_recipient_id',
      )}@${getMarketingUrlParam(href, 'at_recipient_list')}`,
      wrap: false,
    },
  ]);

export const getDisplayMarketingString = href =>
  buildMarketingString([
    {
      description: 'display campaign prefix',
      value: 'AD',
      wrap: false,
    },
    {
      description: 'at_campaign field',
      value: getMarketingUrlParam(href, 'at_campaign'),
      wrap: false,
    },
    {
      description: 'at_creation field',
      value: getMarketingUrlParam(href, 'at_creation'),
      wrap: true,
    },
    {
      description: 'at_variant field',
      value: getMarketingUrlParam(href, 'at_variant'),
      wrap: true,
    },
    {
      description: 'at_format field',
      value: getMarketingUrlParam(href, 'at_format'),
      wrap: true,
    },
    {
      description: 'blank value (-)',
      value: '',
      wrap: false,
    },
    {
      description: 'at_general_placement field',
      value: getMarketingUrlParam(href, 'at_general_placement'),
      wrap: true,
    },
    {
      description: 'at_detail_placement field',
      value: getMarketingUrlParam(href, 'at_detail_placement'),
      wrap: true,
    },
  ]);

export const getCustomMarketingString = href =>
  buildMarketingString([
    {
      description: 'custom campaign prefix',
      value: `CS${getMarketingUrlParam(href, 'at_medium').replace(
        'custom',
        '',
      )}`,
      wrap: false,
    },
    {
      description: 'at_campaign field',
      value: getMarketingUrlParam(href, 'at_campaign'),
      wrap: false,
    },
    {
      description: 'at_custom1 field',
      value: getMarketingUrlParam(href, 'at_custom1'),
      wrap: true,
    },
    {
      description: 'at_custom2 field',
      value: getMarketingUrlParam(href, 'at_custom2'),
      wrap: true,
    },
    {
      description: 'at_custom_3 field',
      value: getMarketingUrlParam(href, 'at_custom3'),
      wrap: true,
    },
    {
      description: 'at_custom_4 field',
      value: getMarketingUrlParam(href, 'at_custom4'),
      wrap: true,
    },
  ]);

export const getXtorMarketingString = href => {
  const field = 'xtor';

  const { query, hash } = new Url(href, true);

  const hashObject = hash ? parameteriseHash(hash) : '';

  const queryWithParams = { ...query, ...hashObject };

  return queryWithParams[field] || null;
};

export const getATIMarketingString = (href, campaignType) => {
  if (!campaignType) return null;

  const supportedCampaignMappings = {
    affiliate: () => getAffiliateMarketingString(href),
    sl: () => getSLMarketingString(href),
    email: () => getEmailMarketingString(href),
    display: () => getDisplayMarketingString(href),
    custom: () => getCustomMarketingString(href),
    XTOR: () => getXtorMarketingString(href),
  };

  const isSupportedCampaign = campaignMapping =>
    campaignType.startsWith(campaignMapping);

  const selectedCampaignType = Object.keys(supportedCampaignMappings).find(
    campaignMapping => isSupportedCampaign(campaignMapping),
  );

  return supportedCampaignMappings[selectedCampaignType]
    ? supportedCampaignMappings[selectedCampaignType]()
    : null;
};

export const LIBRARY_VERSION = 'simorgh';

export const onOnionTld = () =>
  onClient() ? window.location.host.endsWith('.onion') : false;
