import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useMemo,
} from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import buildAnalyticsParams from '#app/components/ATIAnalytics/params';
import {
  ATIData,
  ReverbBeaconConfig,
  ResonanceBeaconConfig,
} from '#app/components/ATIAnalytics/types';
import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  HOME_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  MOST_READ_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import { ComponentExperimentProps, PageTypes } from '#app/models/types/global';
import setBbcPage from '#app/lib/analyticsUtils/setBbcPage';
import getEnrichedArticleATIData from './getEnrichedArticleATIData';
import getEnrichedMostReadATIData from './getEnrichedMostReadATIData';
import getEnrichedMediaArticleATIData from './getEnrichedMediaArticleATIData';
import getEnrichedHomePageATIData from './getEnrichedHomePageATIData';

type ReverbParamsContextProps = {
  reverbParams: ReverbBeaconConfig;
  resonanceParams: ResonanceBeaconConfig | null;
  experimentProps?: ComponentExperimentProps;
};

export const ReverbParamsContext = createContext<ReverbParamsContextProps>(
  {} as ReverbParamsContextProps,
);

export type PageMetadata = {
  type: PageTypes;
  atiAnalytics?: ATIData;
};

type ReverbParamsProviderProps = {
  metadata?: PageMetadata;
};

const getPageTypeHandler = pageType => {
  switch (pageType) {
    case ARTICLE_PAGE:
    case CORRESPONDENT_STORY_PAGE:
    case PHOTO_GALLERY_PAGE:
    case STORY_PAGE:
      return getEnrichedArticleATIData;
    case MEDIA_ARTICLE_PAGE:
    case MEDIA_ASSET_PAGE:
      return getEnrichedMediaArticleATIData;
    case MOST_READ_PAGE:
      return getEnrichedMostReadATIData;
    case HOME_PAGE:
      return getEnrichedHomePageATIData;
    default:
      return null;
  }
};

const getEnrichedATIData = ({ pageMetadata, serviceContext, pageType }) => {
  const pageTypeHandler = getPageTypeHandler(pageType);

  return pageTypeHandler
    ? pageTypeHandler({ pageMetadata, serviceContext })
    : pageMetadata?.atiAnalytics || {};
};

const ReverbParamsContextProviderComponent = ({
  children,
  metadata,
}: PropsWithChildren<ReverbParamsProviderProps>) => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const {
    isSignedIn,
    hashedUserId: hashedId,
    isPersonalisationOn,
  } = use(AccountContext);

  const enrichedAtiData = getEnrichedATIData({
    pageMetadata: metadata,
    serviceContext,
    pageType: requestContext?.pageType,
  });

  const { reverbParams, resonanceParams } = buildAnalyticsParams({
    requestContext,
    serviceContext,
    atiData: enrichedAtiData,
    isSignedIn,
    hashedId,
    isPersonalisationOn,
  });

  const {
    params: { page, user },
  } = reverbParams;

  useEffect(() => {
    setBbcPage({ page, user });
  }, [page, user]);

  const value = useMemo(
    () => ({
      reverbParams,
      resonanceParams,
      ...(enrichedAtiData?.experimentProps && {
        experimentProps: enrichedAtiData.experimentProps,
      }),
    }),
    [reverbParams, resonanceParams, enrichedAtiData?.experimentProps],
  );

  return (
    <ReverbParamsContext.Provider value={value}>
      {children}
    </ReverbParamsContext.Provider>
  );
};

export const ReverbParamsContextProvider = withOptimizelyProvider(
  ReverbParamsContextProviderComponent,
);
