import { eea, gbOrUnknown } from '#app/lib/utilities/cookieCountries';
import {
  VIEW_EVENT,
  VIEWABILITY_CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import {
  ATI_PAGE_VIEW,
  ATI_PAGE_VIEW_REVERB,
  ATI_USER_ID_COOKIE,
  getATIParamsFromURL,
  interceptATIAnalyticsBeacons,
  getExpectedAtiDestination,
} from '../helpers';
import environment from '../../../../support/helpers/getAppEnv';

const usesReverbViewabilityModel = applicationType =>
  !['lite', 'amp'].includes(applicationType);

const getAppName = service => {
  if (service === 'ws') {
    return '[news]';
  }

  return ['archive', 'news', 'newsround', 'scotland', 'sport'].includes(service)
    ? `[${service}]`
    : `[news-${service}]`;
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

const assertReverbViewabilityComponentEventParamsExist = ({ params }) => {
  // if (['responsive', 'lite'].includes(applicationType)) {
  //   expect(params).to.have.property('idclient');
  // }

  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('events'); // event details
  expect(params).to.have.property('context');

  const eventContext = JSON.parse(params.context);

  expect(eventContext[0].data.page).to.have.property('$');
  expect(eventContext[0].data.site).to.have.property('level2_id');
};

const fieldIsValidString = field =>
  typeof field === 'string' && field.trim().length > 0;

const validateViewabilityEventDetails = ({ payload, actionType }) => {
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

      if (['responsive', 'lite'].includes(applicationType)) {
        expect(params.idclient).to.equal(
          ATI_USER_ID_COOKIE,
          'params.idclient (atuserid cookie value)',
        );
      }

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

const assertViewabilityModelViewEvent = ({
  pageIdentifier,
  params,
  // applicationType,
  siteId,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({ params });

  expect(params.events).to.satisfy(
    payload =>
      validateViewabilityEventDetails({ payload, actionType: VIEW_EVENT }),
    'params.events (publisher impression)',
  );

  expect(eventContext[0].data.page.$).to.equal(pageIdentifier);
  expect(parseInt(eventContext[0].data.site.level2_id, 10)).to.equal(siteId);
};

export const assertATIComponentViewEvent = ({
  component,
  pageIdentifier,
  contentType,
  siteId,
}) => {
  const requestAlias = `@${component}-viewability-view`;

  cy.wait(requestAlias)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);

      assertViewabilityModelViewEvent({
        component,
        pageIdentifier,
        contentType,
        params,
        siteId,
      });
    });
};

const assertViewabilityModelClickEvent = ({
  pageIdentifier,
  params,
  // applicationType,
  siteId,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({
    params,
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
  contentType,
  pageIdentifier,
  siteId,
}) => {
  const requestAlias = `@${component}-viewability-click`;

  cy.wait(requestAlias)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);
      assertViewabilityModelClickEvent({
        component,
        contentType,
        pageIdentifier,
        params,
        siteId,
      });
    });
};
