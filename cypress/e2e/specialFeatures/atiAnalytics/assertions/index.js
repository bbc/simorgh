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
  applicationType !== 'lite';

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

const assertATIComponentViewEventParamsExist = ({ params, useReverb }) => {
  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('idclient');
  expect(params).to.have.property('ati'); // view event
  expect(params).to.have.property('type');
  expect(params.type).to.equal('AT', 'params.type');

  if (!useReverb) {
    expect(params).to.have.property('p'); // page identifier
  }
};

const assertATIComponentClickEventParamsExist = ({ params, useReverb }) => {
  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('idclient');
  expect(params).to.have.property('atc'); // click event
  expect(params).to.have.property('type');
  expect(params.type).to.equal('AT', 'params.type');

  if (useReverb) {
    expect(params).to.have.property('patc'); // page identifier
  } else {
    expect(params).to.have.property('p'); // page identifier
  }
};

const assertReverbViewabilityComponentEventParamsExist = ({ params }) => {
  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('events'); // event details
  expect(params).to.have.property('context');

  const eventContext = JSON.parse(params.context);

  expect(eventContext[0].data.page).to.have.property('$');
  expect(eventContext[0].data.site).to.have.property('level2_id');
};

const getViewClickDetailsRegex = ({ contentType, component, pageIdentifier }) =>
  new RegExp(
    `PUB-\\[${contentType}(.*)?\\]-\\[${component}(.*)?\\]-\\[(.*)?\\]-\\[(.*)?\\]-\\[${pageIdentifier}\\]-\\[(.*)?\\]-\\[(.*)?\\]-\\[(.*)?\\]`,
    'g',
  );

const getViewabilityEventDetailsRegex = ({
  contentType,
  component,
  actionType,
}) =>
  new RegExp(
    `\\[\\{"name":"viewability\\.${actionType}","data":\\{"group":\\{"name":"${contentType}(.*)?"\\},"event":\\{"category":"viewability","action":"${actionType}"\\}(?:.*)?"item":\\{(?:.*)?"name":"${component}(.*)?"(?:.*)?\\}\\}\\}\\]`,
    'g',
  );

export const assertPageView = ({
  useReverb,
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

    const atiPageViewAlias =
      useReverb && applicationType !== 'amp'
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
      expect(params.s2).to.equal(
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

const assertClickPerViewModelViewEvent = ({
  component,
  pageIdentifier,
  contentType,
  useReverb,
  params,
  applicationType,
  siteId,
}) => {
  assertATIComponentViewEventParamsExist({ params, useReverb });

  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params.idclient).to.equal(
      ATI_USER_ID_COOKIE,
      'params.idclient (atuserid cookie value)',
    );
  }

  if (!useReverb) {
    expect(params.p).to.equal(pageIdentifier, 'params.p (page identifier)');
  }

  expect(params.s2).to.equal(siteId, 'params.s2 (Level 2 site / Producer ID)');

  expect(params.app_type).to.equal(applicationType, 'params.app_type');

  expect(params.ati).to.match(
    getViewClickDetailsRegex({
      contentType,
      component,
      pageIdentifier,
    }),
    'params.ati (publisher impression)',
  );
};

const assertViewabilityModelViewEvent = ({
  component,
  pageIdentifier,
  contentType,
  params,
  applicationType,
  siteId,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({
    params,
  });

  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params.idclient).to.equal(
      ATI_USER_ID_COOKIE,
      'params.idclient (atuserid cookie value)',
    );
  }

  expect(params.events).to.match(
    getViewabilityEventDetailsRegex({
      contentType,
      component,
      actionType: VIEW_EVENT,
    }),
    'params.events (publisher impression)',
  );

  expect(eventContext[0].data.page.$).to.equal(pageIdentifier);
  expect(eventContext[0].data.site.level2_id).to.equal(siteId);
};

export const assertATIComponentViewEvent = ({
  component,
  pageIdentifier,
  contentType,
  useReverb,
  applicationType,
  siteId,
}) => {
  const useViewabilty = usesReverbViewabilityModel(applicationType);
  const requestAlias = useViewabilty
    ? `@${component}-viewability-view`
    : `@${component}-ati-view`;

  cy.wait(requestAlias)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);

      if (useViewabilty) {
        assertViewabilityModelViewEvent({
          component,
          pageIdentifier,
          contentType,
          params,
          siteId,
        });
      } else {
        assertClickPerViewModelViewEvent({
          component,
          pageIdentifier,
          contentType,
          useReverb,
          params,
          applicationType,
          siteId,
        });
      }
    });
};

const assertClickPerViewModelClickEvent = ({
  component,
  contentType,
  pageIdentifier,
  applicationType,
  useReverb,
  params,
}) => {
  assertATIComponentClickEventParamsExist({
    params,
    useReverb,
    applicationType,
  });

  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params.idclient).to.equal(
      ATI_USER_ID_COOKIE,
      'params.idclient (atuserid cookie value)',
    );
  }

  expect(params.app_type).to.equal(applicationType, 'params.app_type');

  if (useReverb) {
    expect(params.patc).to.equal(
      pageIdentifier,
      'params.patc (page identifier)',
    );
  } else {
    expect(params.p).to.equal(pageIdentifier, 'params.p (page identifier)');
  }

  expect(params.atc).to.match(
    getViewClickDetailsRegex({
      contentType,
      pageIdentifier,
      component,
    }),
    'params.atc (publisher click)',
  );
};

const assertViewabilityModelClickEvent = ({
  component,
  contentType,
  pageIdentifier,
  params,
  applicationType,
  siteId,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({
    params,
  });

  if (['responsive', 'lite'].includes(applicationType)) {
    expect(params.idclient).to.equal(
      ATI_USER_ID_COOKIE,
      'params.idclient (atuserid cookie value)',
    );
  }

  expect(params.events).to.match(
    getViewabilityEventDetailsRegex({
      contentType,
      component,
      actionType: VIEWABILITY_CLICK_EVENT,
    }),
    'params.events (publisher click)',
  );

  expect(eventContext[0].data.page.$).to.equal(pageIdentifier);
  expect(eventContext[0].data.site.level2_id).to.equal(siteId);
};

export const assertATIComponentClickEvent = ({
  component,
  contentType,
  pageIdentifier,
  applicationType,
  useReverb,
  siteId,
}) => {
  const useViewabilty = usesReverbViewabilityModel(applicationType);
  const requestAlias = useViewabilty
    ? `@${component}-viewability-click`
    : `@${component}-ati-click`;

  cy.wait(requestAlias)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);

      if (useViewabilty) {
        assertViewabilityModelClickEvent({
          component,
          contentType,
          pageIdentifier,
          params,
          siteId,
        });
      } else {
        assertClickPerViewModelClickEvent({
          component,
          contentType,
          pageIdentifier,
          applicationType,
          useReverb,
          params,
          siteId,
        });
      }
    });
};
