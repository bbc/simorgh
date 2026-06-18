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
import buildReverbParams from '#app/components/ATIAnalytics/params';
import {
  ATIData,
  ReverbBeaconConfig,
} from '#app/components/ATIAnalytics/types';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  MOST_READ_PAGE,
} from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import setBBCPage from '#app/lib/analyticsUtils/setBBCPage';
import getEnrichedArticleATIData from './getEnrichedArticleATIData';
import getEnrichedMostReadATIData from './getEnrichedMostReadATIData';
import getEnrichedMediaArticleATIData from './getEnrichedMediaArticleATIData';

type ReverbParamsContextProps = ReverbBeaconConfig;

export const ReverbParamsContext = createContext<ReverbParamsContextProps>(
  {} as ReverbParamsContextProps,
);

type ReverbParamsProviderProps = {
  metadata?: {
    type: PageTypes;
    atiAnalytics?: ATIData;
  };
};

const getEnrichedATIData = ({ pageMetadata, serviceContext, pageType }) =>
  ({
    [ARTICLE_PAGE]: getEnrichedArticleATIData,
    [MOST_READ_PAGE]: getEnrichedMostReadATIData,
    [MEDIA_ARTICLE_PAGE]: getEnrichedMediaArticleATIData,
  })[pageType]({ pageMetadata, serviceContext }) ||
  pageMetadata?.atiAnalytics ||
  {};

const ReverbParamsContextProviderComponent = ({
  children,
  metadata,
}: PropsWithChildren<ReverbParamsProviderProps>) => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const { isSignedIn, hashedUserId: hashedId } = use(AccountContext);

  const enrichedAtiData = getEnrichedATIData({
    pageMetadata: metadata,
    serviceContext,
    pageType: requestContext?.pageType,
  });

  const reverbParams = buildReverbParams({
    requestContext,
    serviceContext,
    atiData: enrichedAtiData,
    isSignedIn,
    hashedId,
  });

  const {
    params: { page, user },
  } = reverbParams;

  useEffect(() => {
    setBBCPage({ page, user });
  }, [page, user]);

  const value = useMemo(() => reverbParams, [reverbParams]);

  return (
    <ReverbParamsContext.Provider value={value}>
      {children}
    </ReverbParamsContext.Provider>
  );
};

export const ReverbParamsContextProvider = withOptimizelyProvider(
  ReverbParamsContextProviderComponent,
);
