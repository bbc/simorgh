import envs from '../../../../support/config/envs';

export const getATIParamsFromURL = atiAnalyticsURL => {
  const url = new URL(atiAnalyticsURL);

  return Object.fromEntries(new URLSearchParams(url.search));
};

export const ATI_PAGE_VIEW = 'ati-page-view';

export const ATI_PAGE_VIEW_REVERB = 'ati-page-view-reverb';

const FEATURES = 'features';

export const COMPONENTS = {
  FEATURES,
};

export const interceptATIAnalyticsBeacons = () => {
  const atiUrl = new URL(envs.atiUrl).origin;

  // Component Views
  Object.values(COMPONENTS).forEach(component => {
    const viewClickEventRegex = new RegExp(
      `PUB-\\[(.*)?\\]-\\[${component}(.*)?\\]-\\[(.*)?\\]-\\[(.*)?\\]-\\[(.*)?\\]-\\[(.*)?\\]-\\[(.*)?\\]-\\[(.*)?\\]`,
      'g',
    );

    cy.intercept(
      {
        url: `${atiUrl}/*`,
        query: {
          ati: viewClickEventRegex,
        },
      },
      request => {
        request.reply({ statusCode: 200 });
      },
    ).as(`${component}-ati-view`);
    cy.log('TRYING  CLICK INTERCEPT:', component);

    // Component Clicks
    cy.intercept(
      {
        url: `${atiUrl}/*`,
        query: {
          atc: viewClickEventRegex,
        },
      },
      request => {
        request.reply({ statusCode: 200 });
      },
    ).as(`${component}-ati-click`);
  });

  // NOT REVERB - Page View (only fires once per page visit)
  cy.intercept(
    {
      url: `${atiUrl}/*`,
      query: {
        x8: '[simorgh]',
      },
    },
    request => {
      request.reply({ statusCode: 200 });
    },
  ).as(`${ATI_PAGE_VIEW}`);

  // REVERB - Page View (only fires once per page visit)
  cy.intercept(
    {
      url: `${atiUrl}/*`,
      query: {
        x8: 'simorgh',
      },
    },
    request => {
      request.reply({ statusCode: 200 });
    },
  ).as(`${ATI_PAGE_VIEW_REVERB}`);
};

export const getPathWithSuffix = ({ path, suffix = '' }) => {
  const { pathname, search } = new URL(`https://www.bbc.com${path}`);

  return `${pathname}${suffix}${search}`;
};

export const runIfToggleEnabled = ({ service, toggleName, testContext }) => {
  cy.getToggles(service);

  cy.fixture(`toggles/${service}.json`).then(toggles => {
    const { enabled } = toggles[toggleName];
    if (!enabled) {
      testContext.skip();
    }
  });
};
