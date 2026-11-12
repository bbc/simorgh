import {
  useCallback,
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useMemo,
  useRef,
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

export const ONWARD_JOURNEYS = [
  'topStoriesAndFeatures',
  'mostRead',
  'latestMedia',
  'portraitVideo',
  'countryCuration',
  'videoCuration',
] as const;

export type OnwardJourney = (typeof ONWARD_JOURNEYS)[number];

const ARTICLE_PAGE_TYPES: PageTypes[] = [
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
];

type ArticleOnwardJourneysContextValue = {
  article: Article | null;
  isEnabled: boolean;
  requestOnwardJourney: (onwardJourney: OnwardJourney) => Promise<void>;
};

const ArticleOnwardJourneysContext =
  createContext<ArticleOnwardJourneysContextValue | null>(null);

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
  const requestedOnwardJourneys = useRef<Set<OnwardJourney>>(new Set());
  const abortControllers = useRef<Set<AbortController>>(new Set());
  const shouldFetchOnwardJourneys =
    Boolean(pageData) &&
    ARTICLE_PAGE_TYPES.includes(pageType) &&
    !isAmp &&
    !isApp &&
    !isLite;
  const articleId = getArticleId(pathname);

  useEffect(() => {
    setArticlePageData(pageData);
    requestedOnwardJourneys.current.clear();
  }, [pageData]);

  useEffect(
    () => () => {
      abortControllers.current.forEach(abortController =>
        abortController.abort(),
      );
    },
    [],
  );

  const requestOnwardJourney = useCallback(
    async (onwardJourney: OnwardJourney) => {
      const shouldRequestLatestMedia =
        pageData?.metadata.consumableAsSFV && articleId;
      const shouldRequestCountryCuration = Boolean(country);

      if (
        !shouldFetchOnwardJourneys ||
        requestedOnwardJourneys.current.has(onwardJourney) ||
        (onwardJourney === 'latestMedia' && !shouldRequestLatestMedia) ||
        (onwardJourney === 'countryCuration' && !shouldRequestCountryCuration)
      ) {
        return;
      }

      requestedOnwardJourneys.current.add(onwardJourney);

      const abortController = new AbortController();
      abortControllers.current.add(abortController);
      const commonParams = {
        service,
        variant,
        signal: abortController.signal,
      };

      const responseParams = {
        onwardJourney,
        ...(onwardJourney === 'countryCuration' && { country }),
        ...(onwardJourney === 'latestMedia' && { id: articleId }),
        ...commonParams,
      };
      const onwardJourneyData = await safelyFetchOnwardJourney(
        fetchOnwardJourney<OnwardJourneyData[typeof onwardJourney]>(
          responseParams,
        ),
      );

      abortControllers.current.delete(abortController);
      if (abortController.signal.aborted) return;

      setArticlePageData(currentArticle =>
        currentArticle
          ? mergeOnwardJourneyData({
              article: currentArticle,
              onwardJourneyData: {
                [onwardJourney]: onwardJourneyData,
              },
            })
          : currentArticle,
      );
    },
    [
      articleId,
      country,
      pageData?.metadata.consumableAsSFV,
      service,
      shouldFetchOnwardJourneys,
      variant,
    ],
  );

  const value = useMemo(
    () => ({
      article: articlePageData ?? null,
      isEnabled: shouldFetchOnwardJourneys,
      requestOnwardJourney,
    }),
    [articlePageData, requestOnwardJourney, shouldFetchOnwardJourneys],
  );

  return (
    <ArticleOnwardJourneysContext.Provider value={value}>
      {children}
    </ArticleOnwardJourneysContext.Provider>
  );
};

export const useArticleOnwardJourneys = <T extends object>(pageData: T) =>
  (use(ArticleOnwardJourneysContext)?.article ?? pageData) as Article & T;

export const useOnwardJourneyRequest = () => use(ArticleOnwardJourneysContext);
