import { eea, gbOrUnknown } from '#app/lib/utilities/cookieCountries';
import {
  VIEW_EVENT,
  VIEWABILITY_CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import {
  ATI_PAGE_VIEW,
  ATI_PAGE_VIEW_REVERB,
  getATIParamsFromURL,
  interceptATIAnalyticsBeacons,
  getExpectedAtiDestination,
} from '../helpers';
import environment from '../../../../support/helpers/getAppEnv';
import envs, { EnvironmentConfigType } from '../../../../support/config/envs';

const usesReverbViewabilityModel = applicationType =>
  !['lite', 'amp'].includes(applicationType);

const usesResonance = applicationType =>
  !['lite', 'amp'].includes(applicationType);

const getAppName = service => {
  const customServiceAppName = {
    ws: '[news]',
    romania: '[news-romanian]',
  }[service];

  if (customServiceAppName) {
    return customServiceAppName;
  }

  return ['archive', 'news', 'newsround', 'scotland', 'sport'].includes(service)
    ? `[${service}]`
    : `[news-${service}]`;
};

const getResonanceAppName = service => {
  const customServiceAppName = {
    ws: 'news',
    romania: 'news-romanian',
  }[service];

  if (customServiceAppName) {
    return customServiceAppName;
  }

  return `news-${service}`;
};

const getATIParamsFromInterception = request => {
  const queryParams = request?.query as Record<string, string | string[]>;

  if (!queryParams || typeof queryParams !== 'object') {
    return getATIParamsFromURL(request?.url || '');
  }

  return Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
};

const assertATIPageViewEventParamsExist = ({
  params,
  contentType,
  applicationType,
}) => {
  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('s2'); // Level 2 Site / Producer ID
  expect(params).to.have.property('p'); // page identifier
  expect(params).to.have.property('x2'); // application type
  expect(params).to.have.property('x3'); // application name
  expect(params).to.have.property('x4'); // language
  expect(params).to.have.property('x7'); // content type
  expect(params).to.have.property('x8'); // library version
  expect(params).to.have.property('x9'); // page title

  if (['responsive', 'amp'].includes(applicationType)) {
    expect(params).to.have.property('r'); // screen resolution & colour depth
    expect(params).to.have.property('re'); // browser/viewport resolution
    expect(params).to.have.property('hl'); // timestamp
    expect(params).to.have.property('lng'); // device language
    expect(params).to.have.property('x5'); // url
  }

  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params).to.have.property('idclient');
  }

  if (!['list-datadriven', 'static'].includes(contentType)) {
    expect(params).to.have.property('x1'); // content ID
  }

  if (contentType === 'article') {
    expect(params).to.have.property('x11'); // first published
    expect(params).to.have.property('x12'); // last published
    expect(params).to.have.property('x13'); // ldp things
    expect(params).to.have.property('x17'); // category
  }
};

const assertResonancePageViewEventParamsExist = ({
  metadata,
  event,
  contentType,
}) => {
  expect(metadata).to.have.property('client_name');
  expect(metadata).to.have.property('collection_library_name');
  expect(metadata).to.have.property('collection_library_version');
  expect(metadata).to.have.property('event_category');
  expect(metadata).to.have.property('id');
  expect(metadata).to.have.property('request_time');

  expect(event).to.have.property('app_name');
  expect(event).to.have.property('browser_language');
  expect(event).to.have.property('content_type');
  expect(event).to.have.property('destination');
  expect(event).to.have.property('event_id');
  expect(event).to.have.property('event_time');
  expect(event).to.have.property('event_name');
  expect(event).to.have.property('event_ts'); // timestamp
  expect(event).to.have.property('language');
  expect(event).to.have.property('page_name');
  expect(event).to.have.property('page_title');
  expect(event).to.have.property('producer');
  expect(event).to.have.property('site_id'); // Level 1 Site ID. Different from 's2' Level 2 Site ID
  expect(event).to.have.property('url');

  if (!['list-datadriven', 'static'].includes(contentType)) {
    expect(event).to.have.property('content_id');
  }
};

const assertLocationSpecificPianoDestinationExists = ({ service }) => {
  cy.get(
    'head script[src*="https://cdn.ampproject.org/v0/amp-geo-0.1.js"]',
  ).should('exist');

  cy.get('amp-geo script[type="application/json"]').should(script => {
    const ampGeoContent = JSON.parse(script.text());

    expect(ampGeoContent).to.eql({
      AmpBind: true,
      ISOCountryGroups: {
        eea,
        gbOrUnknown,
      },
    });
  });

  cy.get(
    '[data-e2e="ati-amp-analytics"] script[type="application/json"]',
  ).should(script => {
    const ampAnalyticsContent = script.text();

    expect(ampAnalyticsContent).to.contain(
      `s=${getExpectedAtiDestination({ service, applicationEnv: environment() })}`,
    );
  });
};

const assertReverbViewabilityComponentEventParamsExist = ({
  params,
  applicationType,
}) => {
  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params).to.have.property('idclient');
  }

  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('events'); // event details
  expect(params).to.have.property('context');

  const eventContext = JSON.parse(params.context);

  expect(eventContext[0].data.page).to.have.property('$');
  expect(eventContext[0].data.site).to.have.property('level2_id');
};

const fieldIsValidString = field =>
  typeof field === 'string' && field.trim().length > 0;

// Temporary debug - identify if long localised item text is producing invalid JSON.
const assertEventsPayloadNotTruncated = (payload: string) => {
  const trimmedPayload = payload.trim();
  const lastChar = trimmedPayload[trimmedPayload.length - 1];

  if (lastChar !== ']' && lastChar !== '}') {
    throw new Error(
      `ATI events payload appears truncated (length=${payload.length})`,
    );
  }
};

const validateViewabilityEventDetails = ({ payload, actionType }) => {
  assertEventsPayloadNotTruncated(payload);
  const arr = JSON.parse(payload);

  return arr.some(event => {
    if (event.name !== `viewability.${actionType}`) return false;

    const group = event.data?.group ?? {};
    const ev = event.data?.event ?? {};
    const item = event.data?.item ?? {};

    // strict checks
    if (ev.category !== 'viewability' || ev.action !== actionType) return false;

    // required fields in Group
    const groupNameOk = fieldIsValidString(group.name);

    const groupTypeOk = fieldIsValidString(group.type);

    // optional fields in Group
    const groupLinkOk = !group.link || fieldIsValidString(group.link);

    const groupItemCountOk =
      !group.item_count || Number.isInteger(group.item_count);

    const groupResourceOk =
      !group.resource_id || fieldIsValidString(group.resource_id);

    const groupPositionOk = !group.position || Number.isInteger(group.position);

    // required fields in Item
    const itemNameOk = fieldIsValidString(item.name);

    // optional fields in Item
    const itemLinkOk = !item.link || fieldIsValidString(item.link);

    const itemAdvertiserIdOk =
      !item.advertiser_id || fieldIsValidString(item.advertiser_id);

    const itemTypeOk = !item.type || fieldIsValidString(item.type);

    const itemTextOk = !item.text || fieldIsValidString(item.text);

    const itemPositionOk = !item.position || Number.isInteger(item.position);

    const itemDurationOk = !item.duration || Number.isInteger(item.duration);

    const itemMediaTypeOk =
      !item.media_type || fieldIsValidString(item.media_type);

    const itemLabelOk = !item.label || fieldIsValidString(item.label);

    const itemResourceIdOk =
      !item.resource_id || fieldIsValidString(item.resource_id);

    return (
      groupNameOk &&
      groupTypeOk &&
      groupLinkOk &&
      groupItemCountOk &&
      groupResourceOk &&
      groupPositionOk &&
      itemNameOk &&
      itemLinkOk &&
      itemAdvertiserIdOk &&
      itemTypeOk &&
      itemTextOk &&
      itemPositionOk &&
      itemDurationOk &&
      itemMediaTypeOk &&
      itemLabelOk &&
      itemResourceIdOk
    );
  });
};

export const assertPageView = ({
  pageIdentifier,
  applicationType,
  contentType,
  service,
  path,
  siteId,
}) => {
  it(`should send a page view event with service = ${service}, page identifier = ${pageIdentifier}, site ID = ${siteId}, application type = ${applicationType} and content type = ${contentType}`, () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path, { retryOnStatusCodeFailure: true });

    const useViewabilty = usesReverbViewabilityModel(applicationType);
    const atiPageViewAlias = useViewabilty
      ? ATI_PAGE_VIEW_REVERB
      : ATI_PAGE_VIEW;

    cy.wait(`@${atiPageViewAlias}`).then(({ request }) => {
      const params = getATIParamsFromURL(request.url);

      assertATIPageViewEventParamsExist({
        params,
        contentType,
        applicationType,
      });

      expect(params.p).to.equal(pageIdentifier, 'params.p (page identifier)');
      expect(parseInt(params.s2, 10)).to.equal(
        siteId,
        'params.s2 (Level 2 site / Producer ID)',
      );
      expect(params.x2).to.equal(
        `[${applicationType}]`,
        'params.x2 (application type)',
      );
      expect(params.x3).to.equal(
        getAppName(service),
        'params.x3 (application name)',
      );
      expect(params.x7).to.equal(
        `[${contentType}]`,
        'params.x7 (content type)',
      );
    });

    if (applicationType === 'amp') {
      assertLocationSpecificPianoDestinationExists({ service });
    }
  });
};

export const assertResonancePageView = ({
  pageIdentifier,
  applicationType,
  contentType,
  service,
  path,
  siteId,
  isServiceResonanceEnabled = true,
}) => {
  const sendsResonanceEvents =
    usesResonance(applicationType) && isServiceResonanceEnabled;

  const testDescription = sendsResonanceEvents
    ? `should send a Resonance page view event with service = ${service}, page identifier = ${pageIdentifier}, producer ID = ${siteId}, application type = ${applicationType} and content type = ${contentType}`
    : `should not send a Resonance page view event with service = ${service}, application type = ${applicationType}`;

  it(testDescription, () => {
    const resonanceBagBaseUrl = (envs as EnvironmentConfigType).resonanceBagUrl;
    const resonanceBagEventUrlPattern = new RegExp(
      `${resonanceBagBaseUrl}/v[0-9]+/event`,
    );

    cy.intercept('POST', resonanceBagEventUrlPattern, request => {
      request.reply({ statusCode: 200 });
    }).as('resonance-page-view');

    cy.visit(path, { retryOnStatusCodeFailure: true });

    if (!sendsResonanceEvents) {
      cy.get('body').should('be.visible');
      cy.get('@resonance-page-view.all').should('have.length', 0);
      return;
    }

    cy.wait('@resonance-page-view').then(({ request }) => {
      expect(request.body).to.have.property('bag_metadata');
      expect(request.body).to.have.property('events');

      const metadata = request.body.bag_metadata;
      const event = request.body.events[0];

      assertResonancePageViewEventParamsExist({
        metadata,
        event,
        contentType,
      });

      expect(event).to.have.property('app_name', getResonanceAppName(service));
      expect(event).to.have.property('content_type', contentType);
      expect(event).to.have.property('event_name', 'page.display');
      expect(event).to.have.property('page_name', pageIdentifier);
    });
  });
};

const assertViewabilityModelViewEvent = ({
  pageIdentifier,
  params,
  applicationType,
  siteId,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({ params, applicationType });

  expect(params.events).to.satisfy(
    payload =>
      validateViewabilityEventDetails({ payload, actionType: VIEW_EVENT }),
    'params.events (publisher impression)',
  );

  expect(eventContext[0].data.page.$).to.equal(pageIdentifier);
  expect(parseInt(eventContext[0].data.site.level2_id, 10)).to.equal(siteId);
};

const getMatchingViewabilityEventData = ({
  payload,
  actionType,
  component,
  expectedItemText,
}) => {
  assertEventsPayloadNotTruncated(payload);
  const arr = JSON.parse(payload);

  const matchingEvents = arr.filter(
    event =>
      event.name === `viewability.${actionType}` &&
      event.data?.item?.name === component,
  );

  // Multiple items (e.g. several stream-embedded videos) can share the same
  // componentName and land in the same beacon batch, so disambiguate using
  // the known item text when available rather than taking the first match.
  if (expectedItemText) {
    const exactMatch = matchingEvents.find(
      event => event.data?.item?.text === expectedItemText,
    );

    if (exactMatch) return exactMatch.data;
  }

  return matchingEvents[0]?.data;
};

const assertItemAndGroupTaxonomy = ({
  payload,
  actionType,
  component,
  expectedItemType,
  expectedGroupType,
  expectedItemText,
}) => {
  if (!expectedItemType && !expectedGroupType && !expectedItemText) return;

  const eventData = getMatchingViewabilityEventData({
    payload,
    actionType,
    component,
    expectedItemText,
  });

  if (expectedItemType) {
    expect(eventData?.item?.type).to.equal(
      expectedItemType,
      'eventDetails.item.type',
    );
  }

  if (expectedItemText) {
    expect(eventData?.item?.text).to.equal(
      expectedItemText,
      'eventDetails.item.text',
    );
  }

  if (expectedGroupType) {
    expect(eventData?.group?.type).to.equal(
      expectedGroupType,
      'eventDetails.group.type',
    );
  }
};

const findMatchingEventDataFromInterceptions = ({
  interceptions,
  component,
  expectedItemText,
}) => {
  let matched;

  interceptions.forEach(interception => {
    if (matched) return;

    const params = getATIParamsFromInterception(interception.request);

    if (!params.events) return;

    const eventData = getMatchingViewabilityEventData({
      payload: params.events,
      actionType: VIEW_EVENT,
      component,
      expectedItemText,
    });

    if (eventData) {
      matched = { eventData, params };
    }
  });

  return matched;
};

export const assertATIComponentViewEvent = ({
  component,
  pageIdentifier,
  applicationType,
  siteId,
  expectedItemType,
  expectedGroupType,
  expectedItemText,
}) => {
  const requestAlias = `@${component}-viewability-view`;

  if (!expectedItemText) {
    cy.wait(requestAlias).then(({ request }) => {
      const params = getATIParamsFromInterception(request);

      assertViewabilityModelViewEvent({
        pageIdentifier,
        params,
        applicationType,
        siteId,
      });

      assertItemAndGroupTaxonomy({
        payload: params.events,
        actionType: VIEW_EVENT,
        component,
        expectedItemType,
        expectedGroupType,
        expectedItemText: undefined,
      });
    });
    return;
  }

  // Multiple items can share the same componentName (e.g. several
  // stream-embedded videos), and their view events may arrive across
  // several separate beacon requests as different videos become visible
  // at different times. cy.wait() is used first to guarantee the alias
  // actually exists in Cypress's registry (it's created dynamically inside
  // the intercept handler, so cy.get('@alias.all') throws immediately
  // rather than retrying if no matching request has occurred yet). Once at
  // least one match exists, poll the full accumulated set of requests
  // under this alias until one of them contains an event matching the
  // expected item text, rather than assuming the first (or Nth) request
  // to arrive is the one we scrolled to.
  cy.wait(requestAlias, { timeout: 15000 });

  cy.get(`${requestAlias}.all`, { timeout: 15000 }).should(interceptions => {
    const matched = findMatchingEventDataFromInterceptions({
      interceptions,
      component,
      expectedItemText,
    });

    const errorMessage = `a "${component}" viewability event with item.text "${expectedItemText}"`;

    // eslint-disable-next-line no-unused-expressions
    expect(matched, errorMessage).to.exist;
  });

  cy.get(`${requestAlias}.all`).then(interceptions => {
    const matched = findMatchingEventDataFromInterceptions({
      interceptions,
      component,
      expectedItemText,
    });

    const { eventData, params } = matched;

    assertViewabilityModelViewEvent({
      pageIdentifier,
      params,
      applicationType,
      siteId,
    });

    if (expectedItemType) {
      expect(eventData?.item?.type).to.equal(
        expectedItemType,
        'eventDetails.item.type',
      );
    }

    expect(eventData?.item?.text).to.equal(
      expectedItemText,
      'eventDetails.item.text',
    );

    if (expectedGroupType) {
      expect(eventData?.group?.type).to.equal(
        expectedGroupType,
        'eventDetails.group.type',
      );
    }
  });
};

const assertViewabilityModelClickEvent = ({
  pageIdentifier,
  params,
  applicationType,
  siteId,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({
    params,
    applicationType,
  });

  expect(params.events).to.satisfy(
    payload =>
      validateViewabilityEventDetails({
        payload,
        actionType: VIEWABILITY_CLICK_EVENT,
      }),
    'params.events (publisher click)',
  );

  expect(eventContext[0].data.page.$).to.equal(pageIdentifier);
  expect(parseInt(eventContext[0].data.site.level2_id, 10)).to.equal(siteId);
};

export const assertATIComponentClickEvent = ({
  component,
  pageIdentifier,
  applicationType,
  siteId,
}) => {
  const requestAlias = `@${component}-viewability-click`;

  cy.wait(requestAlias).then(({ request }) => {
    const params = getATIParamsFromInterception(request);

    assertViewabilityModelClickEvent({
      pageIdentifier,
      params,
      applicationType,
      siteId,
    });
  });
};
