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

const assertATIComponentViewEventParamsExist = ({ params, useReverb }) => {
  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('ati'); // view event
  expect(params).to.have.property('type');
  expect(params.type).to.equal('AT', 'params.type');

  if (!useReverb) {
    expect(params).to.have.property('p'); // page identifier
  }
};

const assertATIComponentClickEventParamsExist = ({ params, useReverb }) => {
  expect(params).to.have.property('s'); // destination
  expect(params).to.have.property('atc'); // click event
  expect(params).to.have.property('type');
  expect(params.type).to.equal('AT', 'params.type');

  if (useReverb) {
    expect(params).to.have.property('patc'); // page identifier
  } else {
    expect(params).to.have.property('p'); // page identifier
  }
};

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

const getViewClickDetailsRegex = ({ contentType, component, pageIdentifier }) =>
  new RegExp(
    `PUB-\\[?${contentType}.*?\\]?-\\[?${component}.*?\\]?-\\[?.*?\\]?-\\[?.*?\\]?-\\[?${pageIdentifier}\\]?-\\[?.*?\\]?-\\[?.*?\\]?-\\[?.*?\\]?`,
    'g',
  );

export const assertATIComponentViewEvent = ({
  component,
  pageIdentifier,
  contentType,
  useReverb,
}) =>
  cy
    .wait(`@${component}-ati-view`)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);

      assertATIComponentViewEventParamsExist({ params, useReverb });

      if (!useReverb) {
        expect(params.p).to.equal(pageIdentifier, 'params.p (page identifier)');
      }

      expect(params.ati).to.match(
        getViewClickDetailsRegex({
          contentType,
          component,
          pageIdentifier,
        }),
        'params.ati (publisher impression)',
      );
    });

export const assertATIComponentClickEvent = ({
  component,
  contentType,
  pageIdentifier,
  applicationType,
  useReverb,
}) =>
  cy
    .wait(`@${component}-ati-click`)
    .its('request.url')
    .then(url => {
      const params = getATIParamsFromURL(url);

      assertATIComponentClickEventParamsExist({
        params,
        useReverb,
        applicationType,
      });

      if (applicationType === 'lite') {
        expect(params.app_type).to.equal(applicationType, 'params.app_type');
      }

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
    });
