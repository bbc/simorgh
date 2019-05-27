import React, { useContext } from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import { atiPageViewParams } from './atiUrl';
import getAmpAnalyticsJson from './ampAnalyticsJson';
// import atiQueryParamsAmpArticle from './article/amp';

const {
  getLanguage,
  getOptimoUrn,
  getPageIdentifier,
  getPromoHeadline,
  getPublishedDatetime,
  getThingAttributes,
} = require('../../lib/analyticsUtils/article');

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpPageViewAnalytics = ({ articleData }) => {
  const { service } = useContext(ServiceContext);
  const { platform, isUK } = useContext(RequestContext);

  return (
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          pageviewParams: atiPageViewParams({
            contentType: 'article',
            language: getLanguage(articleData),
            ldpThingIds: getThingAttributes('thingId', articleData),
            ldpThingLabels: getThingAttributes('thingLabel', articleData),
            optimoUrn: getOptimoUrn(articleData),
            pageIdentifier: getPageIdentifier(service, articleData),
            pageTitle: getPromoHeadline(articleData),
            timePublished: getPublishedDatetime('firstPublished', articleData),
            timeUpdated: getPublishedDatetime('lastPublished', articleData),
            isUK,
            platform,
            service,
          }),
        }),
      )}
    </amp-analytics>
  );
};
AmpPageViewAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default AmpPageViewAnalytics;
