import envs, { EnvironmentConfigType } from '../../../../support/config/envs';

export { getExpectedAtiDestination } from '#app/components/ATIAnalytics/helpers/getExpectedAtiDestination';

export const getATIParamsFromURL = (atiAnalyticsURL: string) => {
  const url = new URL(atiAnalyticsURL);

  return Object.fromEntries(new URLSearchParams(url.search));
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
const LITE_SITE_SUMMARY = 'lite-site-summary';
const ARTICLE_LITE_SITE_LINK = 'article-lite-site-link';
const RECENT_AUDIO_EPISODES = 'episodes-audio';
const PODCAST_LINKS = 'third-party';
const LATEST_MEDIA = 'latest';
const RECOMMENDATIONS = 'midarticle-mostread';
const ARTICLE_LINKS_BLOCK = 'edoj';
const BILLBOARD = 'billboard';
const SOCIAL_EMBED = 'social-consent-banner';
const LIVE_MEDIA = 'live-header-media';
const SHARE = 'asset:';
const PORTRAIT_VIDEO_CAROUSEL = 'portrait-video-carousel';
const PORTRAIT_VIDEO_MODAL = 'portrait-video-modal';
const TOP_BAR_OJ = 'top-bar-oj';
const CONTINUE_READING_BUTTON = 'continue-reading-button';

export const COMPONENTS = {
  ARTICLE_LITE_SITE_LINK,
  BILLBOARD,
  DROPDOWN_NAVIGATION,
  FEATURES,
  LATEST_MEDIA,
  LITE_SITE_SUMMARY,
  LIVE_MEDIA,
  MESSAGE_BANNER,
  MOST_READ,
  PODCAST_LINKS,
  PODCAST_PROMO,
  RADIO_SCHEDULE,
  RECENT_AUDIO_EPISODES,
  RECOMMENDATIONS,
  RELATED_CONTENT,
  RELATED_TOPICS,
  SCROLLABLE_NAVIGATION,
  ARTICLE_LINKS_BLOCK,
  SHARE,
  SOCIAL_EMBED,
  TOP_STORIES,
  PORTRAIT_VIDEO_CAROUSEL,
  PORTRAIT_VIDEO_MODAL,
  TOP_BAR_OJ,
  CONTINUE_READING_BUTTON,
};

export const interceptATIAnalyticsBeacons = () => {
  const atiUrl = new URL((envs as EnvironmentConfigType).atiUrl).origin;
  const reverbAtiUrl = new URL((envs as EnvironmentConfigType).reverbAtiUrl)
    .origin;

  const viewabilityHosts = Array.from(new Set([reverbAtiUrl, atiUrl]));

  viewabilityHosts.forEach(collectionDomains => {
    Object.values(COMPONENTS).forEach(component => {
      cy.intercept('GET', `${collectionDomains}/**`, request => {
        const { query } = request;
        const viewabilityModelString = query.events as string;
        if (viewabilityModelString) {
          const isViewEvent = viewabilityModelString.includes(
            `"event":{"category":"viewability","action":"view"}`,
          );
          const isClickEvent = viewabilityModelString.includes(
            `"event":{"category":"viewability","action":"select"}`,
          );

          const containsExpectedComponent = viewabilityModelString.includes(
            `"name":"${component}`,
          );

          if (isViewEvent && containsExpectedComponent) {
            request.alias = `${component}-viewability-view`;
            request.reply({ statusCode: 200 });
          }
          if (isClickEvent && containsExpectedComponent) {
            request.alias = `${component}-viewability-click`;
            request.reply({ statusCode: 200 });
          }
        }
      });
    });
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
      url: `${reverbAtiUrl}/*`,
      query: {
        x8: 'simorgh',
      },
    },
    request => {
      request.reply({ statusCode: 200 });
    },
  ).as(`${ATI_PAGE_VIEW_REVERB}`);
};
