import { Services } from '#app/models/types/global';
import envs, { EnvironmentConfigType } from '../../../../support/config/envs';

export const getATIParamsFromURL = (atiAnalyticsURL: string) => {
  const url = new URL(atiAnalyticsURL);

  return Object.fromEntries(new URLSearchParams(url.search));
};

export const ATI_PAGE_VIEW = 'ati-page-view';

export const ATI_PAGE_VIEW_REVERB = 'ati-page-view-reverb';

export const ATI_USER_ID_COOKIE = 'atuserid-cookie-value';

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
const SCROLLABLE_PROMO = 'edoj';
const BILLBOARD = 'billboard';
const SOCIAL_EMBED = 'social-consent-banner';
const LIVE_MEDIA = 'live-header-media';
const SHARE = 'asset:';
const PORTRAIT_VIDEO_CAROUSEL = 'portrait-video-carousel';
const PORTRAIT_VIDEO_MODAL = 'portrait-video-modal';

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
  SCROLLABLE_PROMO,
  SHARE,
  SOCIAL_EMBED,
  TOP_STORIES,
  PORTRAIT_VIDEO_CAROUSEL,
  PORTRAIT_VIDEO_MODAL,
};

export const interceptATIAnalyticsBeacons = () => {
  const atiUrl = new URL((envs as EnvironmentConfigType).atiUrl).origin;

  Object.values(COMPONENTS).forEach(component => {
    cy.intercept('GET', `${atiUrl}/**`, request => {
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
          `"name":"${component}"`,
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

export const setUserIDCookie = () => {
  cy.setCookie('atuserid', JSON.stringify({ val: ATI_USER_ID_COOKIE }));
};

export const getExpectedAtiDestination = ({
  service,
  applicationEnv,
}: {
  service: Services;
  applicationEnv: string;
}) => {
  const publicServiceDestinationNames = {
    news: 'NEWS_PS',
    cymrufyw: 'NEWS_LANGUAGES_PS',
    naidheachdan: 'NEWS_LANGUAGES_PS',
    scotland: 'PS_HOMEPAGE',
    newsround: 'NEWSROUND',
    sport: 'SPORT_PS',
  } as Record<Services, string>;

  const expectedAtiDestinationsForAmp = {
    WS_NEWS_LANGUAGES: '598342',
    WS_NEWS_LANGUAGES_TEST: '598343',
    NEWS_PS:
      // eslint-disable-next-line no-template-curly-in-string
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598285, 598287)',
    NEWS_PS_TEST:
      // eslint-disable-next-line no-template-curly-in-string
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598286, 598288)',
    NEWS_LANGUAGES_PS:
      // eslint-disable-next-line no-template-curly-in-string
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598291, 598289)',
    NEWS_LANGUAGES_PS_TEST:
      // eslint-disable-next-line no-template-curly-in-string
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598292, 598290)',
    PS_HOMEPAGE: '598273',
    PS_HOMEPAGE_TEST: '598274',
    NEWSROUND: '598293',
    NEWSROUND_TEST: '598294',
    SPORT_PS:
      // eslint-disable-next-line no-template-curly-in-string
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598310, 598308)',
    SPORT_PS_TEST:
      // eslint-disable-next-line no-template-curly-in-string
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598311, 598309)',
  } as Record<string, string>;

  const destinationName =
    publicServiceDestinationNames[service] ?? 'WS_NEWS_LANGUAGES';

  return expectedAtiDestinationsForAmp[
    applicationEnv === 'live' ? destinationName : `${destinationName}_TEST`
  ];
};
