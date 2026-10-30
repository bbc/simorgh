import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import { Article, SecondaryColumn } from '#app/models/types/optimo';
import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import { getArticleId } from '#app/routes/utils/constructPageFetchUrl';
import { PageTypes } from '#app/models/types/global';

const { WEB_CDN_URL } = getEnvConfig();

type OnwardJourneyData = {
  topStoriesAndFeatures?: Partial<
    Pick<SecondaryColumn, 'topStories' | 'features'>
  > | null;
  mostRead?: Article['mostRead'] | null;
  latestMedia?: SecondaryColumn['latestMedia'] | null;
  portraitVideo?: Article['portraitVideoItems'] | null;
  countryCuration?: Article['countryCuration'] | null;
  videoCuration?: SecondaryColumn['mediaCuration'] | null;
};

const ARTICLE_PAGE_TYPES: PageTypes[] = [
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
];

const ArticleOnwardJourneysContext = createContext<Article | null>(null);

const getOnwardJourneyUrl = ({
  onwardJourney,
  service,
  variant,
  country,
  id,
}: {
  onwardJourney: string;
  service: string;
  variant: string | null;
  country?: string | null;
  id?: string;
}) => {
  const url = new URL(`${WEB_CDN_URL}/fd/simorgh-bff`);

  url.searchParams.set('onwardJourney', onwardJourney);
  url.searchParams.set('service', service);

  if (variant) url.searchParams.set('variant', variant);
  if (country) url.searchParams.set('country', country);
  if (id) url.searchParams.set('id', id);

  return url;
};

const fetchOnwardJourney = async <T,>({
  onwardJourney,
  service,
  variant,
  country,
  id,
  signal,
}: {
  onwardJourney: string;
  service: string;
  variant: string | null;
  country?: string | null;
  id?: string;
  signal: AbortSignal;
}): Promise<T | null> => {
  const response = await fetch(
    getOnwardJourneyUrl({
      onwardJourney,
      service,
      variant,
      country,
      id,
    }).toString(),
    { signal },
  );

  if (!response.ok) return null;

  const { data } = await response.json();
  return data;
};

const safelyFetchOnwardJourney = async <T,>(
  request: Promise<T | null>,
): Promise<T | null | undefined> => {
  try {
    return await request;
  } catch {
    return undefined;
  }
};

const getCountryTopicIdToReorder = ({
  topics,
  countryCuration,
  countryTopicIdToReorder,
}: {
  topics: Article['metadata']['topics'];
  countryCuration: Article['countryCuration'] | null | undefined;
  countryTopicIdToReorder: Article['countryTopicIdToReorder'];
}) => {
  if (countryCuration === undefined) return countryTopicIdToReorder;

  return topics?.[0]?.topicId === countryCuration?.topicId
    ? countryCuration.topicId
    : null;
};

const mergeOnwardJourneyData = ({
  article,
  onwardJourneyData,
}: {
  article: Article;
  onwardJourneyData: OnwardJourneyData;
}): Article => {
  const {
    topStoriesAndFeatures,
    mostRead,
    latestMedia,
    portraitVideo,
    countryCuration,
    videoCuration,
  } = onwardJourneyData;

  const hasSecondaryColumnData = Boolean(
    article.secondaryColumn ||
    topStoriesAndFeatures ||
    latestMedia ||
    videoCuration,
  );
  const secondaryColumn: SecondaryColumn | undefined = hasSecondaryColumnData
    ? {
        topStories:
          topStoriesAndFeatures?.topStories ??
          article.secondaryColumn?.topStories ??
          [],
        features:
          topStoriesAndFeatures?.features ??
          article.secondaryColumn?.features ??
          [],
        ...article.secondaryColumn,
        ...(latestMedia && { latestMedia }),
        ...(videoCuration && { mediaCuration: videoCuration }),
      }
    : undefined;

  const countryTopicIdToReorder = getCountryTopicIdToReorder({
    topics: article.metadata.topics,
    countryCuration,
    countryTopicIdToReorder: article.countryTopicIdToReorder,
  });

  return {
    ...article,
    ...(secondaryColumn && { secondaryColumn }),
    ...(mostRead && { mostRead }),
    ...(portraitVideo && { portraitVideoItems: portraitVideo }),
    ...(countryCuration && { countryCuration }),
    countryTopicIdToReorder,
  };
};

type Props = {
  pageData?: Article;
  pageType: PageTypes;
};

export const ArticleOnwardJourneysProvider = ({
  children,
  pageData,
  pageType,
}: PropsWithChildren<Props>) => {
  const { service, variant, country, pathname, isAmp, isApp, isLite } =
    use(RequestContext);
  const [articlePageData, setArticlePageData] = useState(pageData);
  const shouldFetchOnwardJourneys =
    Boolean(pageData) &&
    ARTICLE_PAGE_TYPES.includes(pageType) &&
    !isAmp &&
    !isApp &&
    !isLite;
  const articleId = getArticleId(pathname);

  useEffect(() => {
    if (!shouldFetchOnwardJourneys) return undefined;

    const abortController = new AbortController();
    const commonParams = {
      service,
      variant,
      signal: abortController.signal,
    };

    const fetchOnwardJourneys = async () => {
      const topStoriesAndFeaturesRequest = safelyFetchOnwardJourney(
        fetchOnwardJourney<OnwardJourneyData['topStoriesAndFeatures']>({
          onwardJourney: 'topStoriesAndFeatures',
          ...commonParams,
        }),
      );
      const mostReadRequest = safelyFetchOnwardJourney(
        fetchOnwardJourney<OnwardJourneyData['mostRead']>({
          onwardJourney: 'mostRead',
          ...commonParams,
        }),
      );
      const portraitVideoRequest = safelyFetchOnwardJourney(
        fetchOnwardJourney<OnwardJourneyData['portraitVideo']>({
          onwardJourney: 'portraitVideo',
          ...commonParams,
        }),
      );
      const videoCurationRequest = safelyFetchOnwardJourney(
        fetchOnwardJourney<OnwardJourneyData['videoCuration']>({
          onwardJourney: 'videoCuration',
          ...commonParams,
        }),
      );
      const countryCurationRequest = country
        ? safelyFetchOnwardJourney(
            fetchOnwardJourney<OnwardJourneyData['countryCuration']>({
              onwardJourney: 'countryCuration',
              country,
              ...commonParams,
            }),
          )
        : Promise.resolve(undefined);
      const latestMediaRequest =
        articlePageData?.metadata.consumableAsSFV && articleId
          ? safelyFetchOnwardJourney(
              fetchOnwardJourney<OnwardJourneyData['latestMedia']>({
                onwardJourney: 'latestMedia',
                id: articleId,
                ...commonParams,
              }),
            )
          : Promise.resolve(undefined);

      const [
        topStoriesAndFeatures,
        mostRead,
        portraitVideo,
        videoCuration,
        countryCuration,
        latestMedia,
      ] = await Promise.all([
        topStoriesAndFeaturesRequest,
        mostReadRequest,
        portraitVideoRequest,
        videoCurationRequest,
        countryCurationRequest,
        latestMediaRequest,
      ] as const);

      if (abortController.signal.aborted) return;

      setArticlePageData(currentArticle =>
        currentArticle
          ? mergeOnwardJourneyData({
              article: currentArticle,
              onwardJourneyData: {
                topStoriesAndFeatures,
                mostRead,
                portraitVideo,
                videoCuration,
                countryCuration,
                latestMedia,
              },
            })
          : currentArticle,
      );
    };

    fetchOnwardJourneys();

    return () => {
      abortController.abort();
    };
  }, [
    articleId,
    articlePageData?.metadata.consumableAsSFV,
    country,
    service,
    shouldFetchOnwardJourneys,
    variant,
  ]);

  const value = useMemo(() => articlePageData ?? null, [articlePageData]);

  return (
    <ArticleOnwardJourneysContext.Provider value={value}>
      {children}
    </ArticleOnwardJourneysContext.Provider>
  );
};

export const useArticleOnwardJourneys = <T extends object>(pageData: T) =>
  (use(ArticleOnwardJourneysContext) ?? pageData) as Article & T;
