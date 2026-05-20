/* eslint-disable import/no-relative-packages */
import { PageTypes } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  AUDIO_PAGE,
  HOME_PAGE,
  LIVE_PAGE,
  LIVE_RADIO_PAGE,
  MOST_READ_PAGE,
  TOPIC_PAGE,
  TV_PAGE,
} from '#app/routes/utils/pageTypes';
import runTestsForPage, {
  TestDataType,
} from '../../../support/helpers/runTestsForPage';
import assertPageWeight from './assertions/liteSiteWeight';

const tests = [assertPageWeight];
const headers = {
  'page-type': 'article',
};
const runforEnv = ['local'];

const testSuites = [
  {
    path: '/burmese/live/ckg19998pldt.lite',
    runforEnv,
    tests,
    pageType: LIVE_PAGE,
    service: 'burmese',
  },
  {
    path: '/hindi.lite',
    service: 'hindi',
    runforEnv,
    pageType: HOME_PAGE,
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio.lite',
    runforEnv,
    pageType: LIVE_RADIO_PAGE,
    tests,
  },
  {
    path: '/pidgin/popular/read.lite',
    runforEnv,
    pageType: MOST_READ_PAGE,
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/programmes/p0340x2m.lite',
    runforEnv,
    pageType: AUDIO_PAGE,
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w3ct7wjx.lite',
    runforEnv,
    pageType: AUDIO_PAGE,
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb.lite',
    runforEnv,
    pageType: AUDIO_PAGE,
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n.lite',
    runforEnv,
    pageType: AUDIO_PAGE,
    tests,
  },
  {
    path: '/hindi/topics/cm5m26q8qxpt.lite',
    runforEnv,
    pageType: TOPIC_PAGE,
    tests,
  },
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite',
    runforEnv,
    pageType: TV_PAGE,
    tests,
  },
  {
    path: '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n.lite',
    runforEnv,
    pageType: TV_PAGE,
    tests,
  },
] as unknown as TestDataType[];

const articleRelatedTestSuites = [
  {
    path: '/mundo/articles/cddylv9g8z0o.lite',
    runforEnv,
    pageType: ARTICLE_PAGE,
    tests,
    service: 'mundo',
  },
  {
    path: '/hausa/articles/c4nvy27mervo.lite',
    runforEnv,
    pageType: ARTICLE_PAGE,
    tests,
  },
  {
    path: '/arabic/media-53135426.lite',
    runforEnv,
    pageType: ARTICLE_PAGE,
    tests,
    headers,
  },
  {
    path: '/arabic/art-and-culture-38260491.lite',
    runforEnv,
    pageType: ARTICLE_PAGE,
    tests,
    headers,
  },
  {
    path: '/mundo/noticias-56669604.lite',
    runforEnv,
    pageType: ARTICLE_PAGE,
    tests,
    headers,
  },
] as unknown as TestDataType[];

runTestsForPage({
  testSuites,
  testIsolation: true,
  pageType: 'all' as PageTypes,
});

runTestsForPage({
  testSuites: articleRelatedTestSuites,
  testIsolation: true,
  pageType: 'all' as PageTypes,
  headers: {
    'page-type': 'article',
  },
});
