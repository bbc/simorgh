// Hooks
import { useContext } from 'react';
import useWebVitals from '@bbc/web-vitals';
import useToggle from '#hooks/useToggle';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import {
  CPS_LONG_ARTICLE_WITH_PNG_AND_VISJO,
  CPS_LONG_ARTICLE_YOUTUBE_EMBED,
  CPS_MEDIUM_ARTICLE,
  CPS_SHORT_ARTICLE_YOUTUBE_EMBED,
  CPS_SHORT_ARTICLE,
  HOMEPAGE_LONG,
  HOMEPAGE_SHORT,
  MEDIA_ASSET_AUDIO,
  MEDIA_ASSET_VIDEO,
  RADIO_PAGE,
  PODCAST_PAGE,
} from './pageTypes';

// Contexts
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';

const getPageType = ({ pathname, pageType }) => {
  if (typeof pathname === 'string') {
    if (pathname.includes('mundo/noticias-58794908')) {
      return CPS_LONG_ARTICLE_WITH_PNG_AND_VISJO;
    }
    if (pathname.includes('mundo/noticias-internacional-58438104')) {
      return CPS_LONG_ARTICLE_YOUTUBE_EMBED;
    }
    if (pathname.includes('afrique/monde-58789009')) {
      return CPS_MEDIUM_ARTICLE;
    }
    if (pathname.includes('azeri/region-58669082')) {
      return CPS_SHORT_ARTICLE_YOUTUBE_EMBED;
    }
    if (pathname.includes('tigrinya/news-58783556')) {
      return CPS_SHORT_ARTICLE;
    }
    if (pathname.includes('arabic') && pageType === FRONT_PAGE) {
      return HOMEPAGE_LONG;
    }
    if (pathname.includes('kyrgyz') && pageType === FRONT_PAGE) {
      return HOMEPAGE_SHORT;
    }
    if (pathname.includes('igbo/afirika-57779401')) {
      return MEDIA_ASSET_AUDIO;
    }
    if (pathname.includes('mundo/noticias-58743232')) {
      return MEDIA_ASSET_VIDEO;
    }
    if (pathname.includes('pashto/bbc_pashto_radio/w172y3g04r45lx2')) {
      return RADIO_PAGE;
    }
    if (pathname.includes('persian/podcasts/p0703hz7')) {
      return PODCAST_PAGE;
    }
  }
  return pageType;
};

const WebVitals = () => {
  const { personalisationEnabled } = useContext(UserContext);
  const requestContextData = useContext(RequestContext);
  const { enabled, value: toggleSampleRate } = useToggle('webVitalsMonitoring');
  // Checks if readers have opted into performance tracking and if the feature toggle is enabled
  const isWebVitalsEnabled = personalisationEnabled && enabled;

  const sampleRate = Number(
    toggleSampleRate || process.env.SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE,
  );

  const webVitalsConfig = {
    enabled: isWebVitalsEnabled,
    reportingEndpoint: process.env.SIMORGH_WEBVITALS_REPORTING_ENDPOINT,
    sampleRate,
    reportParams: { pageType: getPageType(requestContextData) },
  };

  useWebVitals(webVitalsConfig);
  return null;
};

export default WebVitals;
