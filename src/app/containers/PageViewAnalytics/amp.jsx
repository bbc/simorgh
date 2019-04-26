import React, { useContext } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import { atiBaseUrl, atiPageViewParams } from './atiUrl';
import getAmpAnalyticsJson from './ampAnalyticsJson';
import {
  getPageIdentifier,
  getOptimoUrn,
  getLanguage,
  getPromoHeadline,
  getPublishedDatetime,
  getThingAttributes,
} from '../../lib/analyticsUtils/article';

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpPageViewAnalytics = ({ articleData }) => {
  const { platform, isUK, env } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);

  const atiPageViewUrlAmp = atiPageViewParams({
    browserViewport: `\${availableScreenWidth}x\${availableScreenHeight}`,
    contentType: 'article',
    currentTime: `\${timestamp}`,
    deviceLanguage: `\${browserLanguage}`,
    href: `\${sourceUrl}`,
    language: getLanguage(articleData),
    ldpThingIds: getThingAttributes('thingId', articleData),
    ldpThingLabels: getThingAttributes('thingLabel', articleData),
    optimoUrn: getOptimoUrn(articleData),
    pageIdentifier: getPageIdentifier(service, articleData),
    pageTitle: getPromoHeadline(articleData),
    referrer: `\${documentReferrer}`,
    screenResolution: `\${screenWidth}x\${screenHeight}x\${screenColorDepth}`,
    timePublished: getPublishedDatetime('firstPublished', articleData),
    timeUpdated: getPublishedDatetime('lastPublished', articleData),
    service,
    platform,
    isUK,
    env,
  });

  // cypress test - ati url is sending article id
  // x1=[cn7769kpk9mo]

  return (
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          baseUrl: atiBaseUrl,
          pageviewParams: atiPageViewUrlAmp,
          env,
          isUK,
          articleData,
        }),
      )}
    </amp-analytics>
  );
};

AmpPageViewAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default AmpPageViewAnalytics;
