import envs from '../../../../support/config/envs';

export const getATIParamsFromURL = atiAnalyticsURL => {
  const url = new URL(atiAnalyticsURL);

  const objectFromEntries = Object.fromEntries(new URLSearchParams(url.search));
  console.log(
    'objectFromEntries p value in getATIParamsFromURL',
    objectFromEntries.p,
  );
  cy.log(
    'objectFromEntries p value in getATIParamsFromURL',
    objectFromEntries.p,
  );
  return objectFromEntries;
};

export const ATI_PAGE_VIEW = 'ati-page-view';

export const ATI_PAGE_VIEW_REVERB = 'ati-page-view-reverb';

const SCROLLABLE_NAVIGATION = 'scrollable-navigation';
const DROPDOWN_NAVIGATION = 'dropdown-navigation';
const TOP_STORIES = 'top-stories';
const FEATURES = 'features';
const MOST_READ = 'most-read';
const RADIO_SCHEDULE = 'radio-schedule';
const MESSAGE_BANNER = 'message-banner';
const RELATED_CONTENT = 'related-content';
const RELATED_TOPICS = 'topics';
const PODCAST_PROMO = 'promo-podcast';
const LITE_SITE_CTA = 'lite-site-cta';
const CANONICAL_LITE_CTA = 'canonical-lite-cta';
const RECENT_AUDIO_EPISODES = 'episodes-audio';
const PODCAST_LINKS = 'third-party';
const LATEST_MEDIA = 'latest';
const RECOMMENDATIONS = 'wsoj';
const SCROLLABLE_PROMO = 'edoj';
const BILLBOARD = 'billboard';

export const COMPONENTS = {
  SCROLLABLE_NAVIGATION,
  DROPDOWN_NAVIGATION,
  TOP_STORIES,
  FEATURES,
  MOST_READ,
  RADIO_SCHEDULE,
  MESSAGE_BANNER,
  RELATED_CONTENT,
  RELATED_TOPICS,
  PODCAST_PROMO,
  LITE_SITE_CTA,
  CANONICAL_LITE_CTA,
  RECENT_AUDIO_EPISODES,
  PODCAST_LINKS,
  LATEST_MEDIA,
  RECOMMENDATIONS,
  SCROLLABLE_PROMO,
  BILLBOARD,
};

export const interceptATIAnalyticsBeacons = () => {
  const atiUrl = new URL(envs.atiUrl).origin;

  // Component Views
  Object.values(COMPONENTS).forEach(component => {
    const viewClickEventRegex = new RegExp(
      `PUB-\\[?.*?\\]?-\\[?${component}.*?\\]?-\\[?.*?\\]?-\\[?.*?\\]?-\\[?.*?\\]?-\\[?.*?\\]?-\\[?.*?\\]?-\\[?.*?\\]?`,
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
