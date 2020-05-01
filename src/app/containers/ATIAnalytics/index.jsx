import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';
import { buildArticleATIUrl } from './params/article/buildParams';
import { buildFrontPageATIUrl } from './params/frontpage/buildParams';
import { buildRadioATIUrl } from './params/radioPage/buildParams';
import { buildCpsAssetPageATIUrl } from './params/cpsAssetPage/buildParams';
import { buildMostReadATIUrl } from './params/mostReadPage/buildParams';

import { pageDataPropType } from '#models/propTypes/data';

const ATIAnalytics = ({ data }) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { pageType, isAmp } = requestContext;

  const pageTypeHandlers = {
    article: buildArticleATIUrl,
    frontPage: buildFrontPageATIUrl,
    media: buildRadioATIUrl,
    mostRead: buildMostReadATIUrl,
    MAP: () =>
      buildCpsAssetPageATIUrl(
        data,
        requestContext,
        serviceContext,
        'article-media-asset',
      ),
    PGL: () =>
      buildCpsAssetPageATIUrl(
        data,
        requestContext,
        serviceContext,
        'article-photo-gallery',
      ),
    STY: () =>
      buildCpsAssetPageATIUrl(data, requestContext, serviceContext, 'article'),
  };

  const isValidPageType = Object.keys(pageTypeHandlers).includes(pageType);
  if (!isValidPageType) {
    return null;
  }

  const pageviewParams = pageTypeHandlers[pageType](
    data,
    requestContext,
    serviceContext,
  );

  return isAmp ? (
    <AmpATIAnalytics pageviewParams={pageviewParams} />
  ) : (
    <CanonicalATIAnalytics pageviewParams={pageviewParams} />
  );
};

ATIAnalytics.propTypes = {
  data: pageDataPropType.isRequired,
};

export default ATIAnalytics;
