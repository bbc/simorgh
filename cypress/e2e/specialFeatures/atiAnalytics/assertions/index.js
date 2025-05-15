import {
  VIEW_EVENT,
  VIEWABILITY_CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import {
  ATI_PAGE_VIEW,
  ATI_PAGE_VIEW_REVERB,
  getATIParamsFromURL,
  interceptATIAnalyticsBeacons,
} from '../helpers';

const assertATIPageViewEventParamsExist = ({
  params,
  contentType,
  applicationType,
}) => {
  expect(params).to.have.property('s'); // destination
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

  if (contentType !== 'list-datadriven') {
    expect(params).to.have.property('x1'); // content ID
  }

  if (contentType === 'article') {
    expect(params).to.have.property('x11'); // first published
    expect(params).to.have.property('x12'); // last published
    expect(params).to.have.property('x13'); // ldp things
    expect(params).to.have.property('x17'); // category
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
}) => {
  it(`should send a page view event with service = ${service}, page identifier = ${pageIdentifier}, application type = ${applicationType} and content type = ${contentType}`, () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path, { retryOnStatusCodeFailure: true });

    const atiPageViewAlias = useReverb ? ATI_PAGE_VIEW_REVERB : ATI_PAGE_VIEW;

    cy.wait(`@${atiPageViewAlias}`).then(({ request }) => {
      const params = getATIParamsFromURL(request.url);

      assertATIPageViewEventParamsExist({
        params,
        contentType,
        applicationType,
      });

      expect(params.p).to.equal(pageIdentifier, 'params.p (page identifier)');
      expect(params.x2).to.equal(
        `[${applicationType}]`,
        'params.x2 (application type)',
      );
      expect(params.x3).to.equal(
        `[news-${service}]`,
        'params.x3 (application name)',
      );
      expect(params.x7).to.equal(
        `[${contentType}]`,
        'params.x7 (content type)',
      );
    });
  });
};

const assertViewabilityModelViewEvent = ({
  component,
  pageIdentifier,
  contentType,
  params,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({
    params,
  });

  expect(params.events).to.match(
    getViewabilityEventDetailsRegex({
      contentType,
      component,
      actionType: VIEW_EVENT,
    }),
    'params.events (publisher impression)',
  );

  expect(eventContext[0].data.page.$).to.equal(pageIdentifier);
};

export const assertATIComponentViewEvent = ({
  component,
  pageIdentifier,
  contentType,
}) => {
  cy.wait(`@${component}-viewability-view`)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);

      assertViewabilityModelViewEvent({
        component,
        pageIdentifier,
        contentType,
        params,
      });
    });
};

const assertViewabilityModelClickEvent = ({
  component,
  contentType,
  pageIdentifier,
  params,
}) => {
  const eventContext = JSON.parse(params.context);

  assertReverbViewabilityComponentEventParamsExist({
    params,
  });

  expect(params.events).to.match(
    getViewabilityEventDetailsRegex({
      contentType,
      component,
      actionType: VIEWABILITY_CLICK_EVENT,
    }),
    'params.events (publisher click)',
  );

  expect(eventContext[0].data.page.$).to.equal(pageIdentifier);
};

export const assertATIComponentClickEvent = ({
  component,
  contentType,
  pageIdentifier,
}) => {
  cy.wait(`@${component}-viewability-click`)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);

      assertViewabilityModelClickEvent({
        component,
        contentType,
        pageIdentifier,
        params,
      });
    });
};
