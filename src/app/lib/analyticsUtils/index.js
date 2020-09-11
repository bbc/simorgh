import Cookie from 'js-cookie';
import uuid from 'uuid/v4';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import Url from 'url-parse';
import onClient from '../utilities/onClient';
import {
  MEDIUM_CAMPAIGN_IDENTIFIER,
  XTOR_CAMPAIGN_IDENTIFIER,
  SUPPORTED_MEDIUM_CAMPAIGN_TYPES,
} from './analytics.const';

export const getDestination = statsDestination => {
  const destinationIDs = {
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
  };

  return destinationIDs[statsDestination] || destinationIDs.NEWS_PS;
};

export const getAppType = platform =>
  platform === 'amp' ? 'amp' : 'responsive';

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

export const getReferrer = (platform, origin, previousPath) => {
  if (platform === 'amp') {
    /* On AMP, `\${documentReferrer}` is an amp analytics variable that resolves
       to a `document.referrer` equivalent as the window document is undefined on amp pages.
       https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#document-referrer
    */
    return `\${documentReferrer}`;
  }

  if (onClient() && (document.referrer || previousPath)) {
    const referrer = previousPath
      ? `${origin}${previousPath}`
      : document.referrer;
    return referrer;
  }

  return null;
};

export const getAtUserId = () => {
  if (!onClient()) return null;

  const cookieName = 'atuserid';
  const cookie = Cookie.getJSON(cookieName);
  let val = pathOr(null, ['val'], cookie);
  const expires = 397; // expires in 13 months

  if (!cookie || !val) {
    val = uuid();
  }

  Cookie.set(cookieName, { val }, { expires, path: '/' });

  return val;
};

export const sanitise = initialString =>
  initialString ? initialString.trim().replace(/\s/g, '+') : null;

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

export const getContentId = (assetType, pageData) => {
  const curie = path(['metadata', 'locators', 'curie'], pageData);
  const guid = curie.split('/').pop();
  const contentId = `urn:bbc:${assetType}:`.concat(guid);
  return contentId;
};

export const getProducer = service => {
  const producers = {
    igbo: '53',
    news: '64',
    persian: '69',
    pidgin: '70',
    thai: '90',
    yoruba: '107',
  };

  return producers[service] || 0;
};

export const getAtiUrl = (data = []) => {
  const cleanedValues = data
    .filter(({ value }) => value)
    .map(item => {
      const { value } = item;
      const encodedValue = encodeURIComponent(value);
      return { ...item, value: encodedValue };
    });

  const parsedAtiValues = cleanedValues.map(({ key, value, wrap }) =>
    wrap ? `${key}=[${value}]` : `${key}=${value}`,
  );

  return parsedAtiValues.join('&');
};

/**
 *
 * @param pageIdentifier: the page identifier is sent in here as well as the top level
 * @param {
 *   service: The service's name
 *   componentName: The name of the container doing the action
 *   componentInfo: componentInfo object as generated by the @getComponentInfo function
 *   type: The type of event eg 'click'
 *   variantTesting: Details of any experimentation as defined by the BBC's event-tracking User Experience Keys
 *   userId: The bbc id, 0 for not signed in
 * }
 */
export const getEventInfo = (
  pageIdentifier,
  {
    service,
    componentName,
    componentInfo,
    type,
    personalisation = '',
    userId = '',
  },
) => {
  // Identifies the container the event is from
  const container = `${service}-${componentName}`;
  // The name of what caused the event (eg "navigation-home")
  const actionLabel = pathOr('', ['actionLabel'], componentInfo);
  // The result of having done the action (eg the url the user is taken to)
  const result = pathOr('', ['result'], componentInfo);
  // The source of the event at a high level. Examples include an urn, or 'responsive_web'
  const source = pathOr(
    'responsive_web~news-simorgh',
    ['source'],
    componentInfo,
  );

  const elementPositioning = componentInfo.positioning
    ? `PAR=${componentInfo.positioning.parent}~CHD=${componentInfo.positioning.child}`
    : '';
  // '~' joined 'key=value' pairs, as defined by the BBC's event-tracking Metadata Keys
  // Currently we only use the element positioning metadata in our tracking
  const metadata = elementPositioning;

  return `PUB-[${container}]-[${actionLabel}~${type}]-[${personalisation}]-[${metadata}]-[${pageIdentifier}]-[${userId}]-[${source}]-[${result}]`;
};

/**
 * @param {
 *   result: The result of having done the action (eg the url the user is taken to)
 *   componentName: The name of the component that is doing the action
 *   componentData: {
 *     source: The source of the event at a high level. Examples include an urn, or 'responsive_web'
 *     child: The specific child of the data that is doing the action - eg button::1
 *     actionLabel: The name of the action - eg navigation-home
 *   }
 * }
 *
 * @returns an object with the values required for the componentInfo argument of the
 *          above function @getEventInfo
 */
export const getComponentInfo = ({ result, componentName, componentData }) => {
  const actionLabel = componentData.actionLabel
    ? `${componentName}-${componentData.actionLabel}`
    : componentName;

  return {
    actionLabel,
    result,
    source: pathOr('', ['source'], componentData),
    positioning: {
      parent: `container-${componentName}`,
      child: pathOr('', ['child'], componentData),
    },
  };
};

export const getThingAttributes = (attribute, articleData) => {
  const things = pathOr(null, ['metadata', 'tags', 'about'], articleData);

  if (things) {
    const attributes = [];

    things.forEach(thing => {
      if (thing[attribute]) {
        attributes.push(thing[attribute].trim().replace(/\s/g, '+'));
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

  return getMarketingUrlParam(href, field) || null;
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

  const isSupportedCampaign = () => campaignMapping =>
    campaignType.startsWith(campaignMapping);

  const selectedCampaignType = Object.keys(supportedCampaignMappings).find(
    isSupportedCampaign(campaignType),
  );

  return supportedCampaignMappings[selectedCampaignType]
    ? supportedCampaignMappings[selectedCampaignType]()
    : null;
};

export const LIBRARY_VERSION = 'simorgh';
