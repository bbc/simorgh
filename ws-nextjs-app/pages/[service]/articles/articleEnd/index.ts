import { LRUCache } from 'lru-cache';
import { Article, OptimoBlock } from '#app/models/types/optimo';
import { Curation, Summary } from '#app/models/types/curationData';
import { TopicTag } from '#app/models/types/metadata';
import { ArticleEndItem } from '#app/components/EndOfArticleTreatment/types';
import { MediaBlock } from '#app/components/MediaLoader/types';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import getEnvironment from '#app/routes/utils/getEnvironment';
import getAgent from '#utilities/getAgent';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { ARTICLE_PAGE, TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import nodeLogger from '#lib/logger.node';
import { DATA_FETCH_ERROR } from '#lib/logger.const';
import studyCurations from './studyCurations.json';

// Prototype only: selections are fixed for development demo articles.
// Other articles use existing authored links and up to three topic feeds.
// Frozen topic-card images come from the leading promo in the exact topic
// feed when captured (17 November 2026), rather than unrelated stock imagery.
const cache = new LRUCache<string, ArticleEndItem[]>({ max: 100, ttl: 300000 });
const logger = nodeLogger(__filename);
const SECONDARY_TIMEOUT_MS = 2000;
const MEDIA_TYPES = [
  'aresMedia',
  'portraitClipMedia',
  'clipMedia',
  'legacyMedia',
  'liveMedia',
  'liveRadio',
];

type ContentNode = Omit<OptimoBlock, 'model'> & {
  model: {
    blocks?: ContentNode[];
    text?: string;
    locator?: string;
    originCode?: string;
    consumableAsSFV?: boolean;
    versions?: { types?: string[] }[];
    video?: { version?: { orientation?: string } };
  };
};

type TopicFetchResult = {
  items: ArticleEndItem[];
  degraded: boolean;
};

const descendants = (blocks: ContentNode[]): ContentNode[] =>
  blocks.flatMap(block => [block, ...descendants(block.model?.blocks || [])]);

const mediaFormat = (
  media: MediaBlock,
  fallback: ArticleEndItem['format'],
): ArticleEndItem['format'] => {
  const nativePortrait = descendants([media as ContentNode]).some(
    block =>
      block.type === 'portraitClipMedia' ||
      block.model?.video?.version?.orientation === 'portrait' ||
      block.model?.versions?.some(version =>
        version.types?.includes('Portrait'),
      ),
  );
  return nativePortrait ? 'portrait' : fallback;
};

export const getContentId = (value: string) =>
  value.match(/c[a-z0-9]{10,}[ot](?=$|[/?#])/)?.[0] || value;

const safeMundoHref = (value: string) => {
  try {
    const url = new URL(value, 'https://www.bbc.com');
    if (
      url.protocol !== 'https:' ||
      !['www.bbc.com', 'www.bbc.co.uk', 'www.test.bbc.com'].includes(
        url.hostname,
      ) ||
      !url.pathname.startsWith('/mundo/')
    )
      return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
};

export const getAuthoredItems = (article: Article): ArticleEndItem[] => {
  const sections =
    article.content?.model?.blocks?.filter(block =>
      ['relatedContent', 'links'].includes(block.type),
    ) || [];
  return descendants(sections as ContentNode[])
    .filter(block => block.type === 'link')
    .flatMap(block => {
      const nodes = descendants(block.model.blocks || []);
      const link = nodes.find(node => node.type === 'urlLink');
      const href = link?.model.locator && safeMundoHref(link.model.locator);
      const title = link?.model.text;
      if (!href || !title) return [];
      const rawImage = nodes.find(node => node.type === 'rawImage')?.model;
      const isMediaArticle = nodes.some(node => node.model.consumableAsSFV);
      let format: ArticleEndItem['format'] = 'article';
      if (href.includes('/watch/')) format = 'video';
      if (href.includes('/listen/')) format = 'audio';
      // consumableAsSFV also appears on landscape MAPs; classify orientation
      // only after reading native player metadata during hydration.
      if (isMediaArticle && format === 'article') format = 'video';
      return [
        {
          id: getContentId(href),
          title,
          href,
          format,
          relationship: 'Relacionado con este artículo',
          ...(rawImage?.locator && {
            imageUrl: buildIChefURL({
              originCode: rawImage.originCode,
              locator: rawImage.locator,
              resolution: 660,
            }),
          }),
        } satisfies ArticleEndItem,
      ];
    });
};

// Include events and subjects alongside people, preserving editorial tag order.
// Country-wide feeds remain too broad to use as automatic recommendations.
export const getCandidateTopics = (topics: TopicTag[]) =>
  topics.filter(topic => !topic.types?.includes('core:Place')).slice(0, 3);

export const getUniqueCandidates = (
  items: ArticleEndItem[],
  sourceId: string,
) => {
  const ids = new Set<string>([getContentId(sourceId)]);
  return items.filter(item => {
    const id = getContentId(item.id || item.href);
    if (!item.title || !safeMundoHref(item.href) || ids.has(id)) return false;
    ids.add(id);
    return true;
  });
};

export const selectDistinctItems = (
  items: ArticleEndItem[],
  sourceId: string,
) => {
  const formats = new Set<string>();
  return getUniqueCandidates(items, sourceId)
    .filter(item => {
      if (formats.has(item.format)) return false;
      formats.add(item.format);
      return true;
    })
    .slice(0, 4);
};

const fromSummary = (
  summary: Summary,
  topic: TopicTag,
  isContext = false,
): ArticleEndItem | null => {
  const href = safeMundoHref(summary.link);
  if (
    !href ||
    !summary.title ||
    !['article', 'video', 'audio'].includes(summary.type)
  )
    return null;
  return {
    id: getContentId(summary.id || href),
    title: summary.title,
    href,
    format: summary.isLive
      ? 'live'
      : (summary.type as ArticleEndItem['format']),
    relationship: `${isContext ? 'Contexto' : 'Más sobre'}: ${topic.topicName}`,
    ...(summary.imageUrl && {
      imageUrl: summary.imageUrl.replace('{width}', '660'),
    }),
    ...(summary.imageAlt && { imageAlt: summary.imageAlt }),
    ...(summary.description && { description: summary.description }),
    ...(summary.duration && { duration: summary.duration }),
    ...(summary.inSituMedia?.[0] && { media: summary.inSituMedia[0] }),
  };
};

const fetchNativePageData = async (
  pathname: string,
  pageType: typeof ARTICLE_PAGE | typeof TOPIC_PAGE,
) => {
  const agent = certsRequired(pathname) ? await getAgent() : undefined;
  const path = constructPageFetchUrl({
    pathname,
    pageType,
    service: 'mundo',
  }).toString();
  // @ts-expect-error - Existing fetchPageData declaration describes its old positional API.
  const { json } = await fetchPageData({
    path,
    timeout: SECONDARY_TIMEOUT_MS,
    agent,
    optHeaders: { 'ctx-service-env': getEnvironment(pathname) },
    cache: undefined,
    shouldLogFetchTime: false,
  });
  return json?.data;
};

const fetchTopic = async (
  topic: TopicTag,
  environment: string,
  expandFeed = false,
): Promise<TopicFetchResult> => {
  let degraded = false;
  if (expandFeed) {
    try {
      const data = await fetchNativePageData(
        `/mundo/topics/${topic.topicId}?renderer_env=${environment}`,
        TOPIC_PAGE,
      );
      // Match Topic Discovery's main stream selection. Ignore billboards and
      // other promotional collections; media can sit below the first four items.
      if (!Array.isArray(data?.curations)) {
        logger.warn(DATA_FETCH_ERROR, {
          service: 'mundo',
          componentName: 'end-of-article-treatment',
          topicId: topic.topicId,
          error: 'Topic page response is missing curations',
        });
        throw new Error('Invalid topic page response');
      }
      const stream = (data.curations as Curation[])
        ?.filter(
          curation =>
            curation.curationType === 'vivo-stream' &&
            curation.visualProminence === 'NORMAL',
        )
        .at(-1);
      const summaries = stream?.summaries?.slice(0, 24) || [];
      return {
        items: summaries
          .map(summary => fromSummary(summary, topic, true))
          .filter(Boolean) as ArticleEndItem[],
        degraded: false,
      };
    } catch {
      // fetchPageData already logs request failures. Keep the smaller feed as
      // a fallback, but retry the full feed on the next uncached page request.
      degraded = true;
    }
  }
  const host =
    environment === 'live'
      ? 'https://web-cdn.api.bbci.co.uk'
      : getEnvConfig().WEB_CDN_URL;
  let status: number | undefined;
  try {
    if (!host) throw new Error('Topic Discovery host is not configured');
    const url = new URL('/fd/simorgh-bff', host);
    url.search = new URLSearchParams({
      onwardJourney: 'topicDiscovery',
      service: 'mundo',
      id: topic.topicId,
    }).toString();
    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(SECONDARY_TIMEOUT_MS),
    });
    status = response.status;
    if (!response.ok)
      throw new Error(`Topic Discovery returned HTTP ${status}`);
    const body = await response.json();
    if (!Array.isArray(body?.data?.items))
      throw new Error('Topic Discovery response is missing items');
    return {
      items: body.data.items
        .map((summary: Summary) => fromSummary(summary, topic))
        .filter(Boolean) as ArticleEndItem[],
      degraded,
    };
  } catch (error) {
    logger.warn(DATA_FETCH_ERROR, {
      service: 'mundo',
      componentName: 'end-of-article-treatment',
      topicId: topic.topicId,
      ...(status !== undefined && { status }),
      error: error instanceof Error ? error.message : 'Topic Discovery failed',
    });
    return { items: [], degraded: true };
  }
};

const hydrateMedia = async (
  item: ArticleEndItem,
  rendererEnv?: string,
): Promise<{ item: ArticleEndItem; degraded: boolean }> => {
  if (item.media)
    return {
      item: { ...item, format: mediaFormat(item.media, item.format) },
      degraded: false,
    };
  if (item.format === 'article' || item.format === 'topic')
    return { item, degraded: false };
  const url = new URL(item.href);
  const pathname = `${url.pathname}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
  try {
    const data = await fetchNativePageData(pathname, ARTICLE_PAGE);
    const article = data?.article as Article | undefined;
    if (!article) return { item, degraded: true };
    const nodes = descendants(article.content.model.blocks as ContentNode[]);
    const media = nodes.find(node => MEDIA_TYPES.includes(node.type)) as
      | MediaBlock
      | undefined;
    if (!media) return { item, degraded: true };
    return {
      item: {
        ...item,
        format: mediaFormat(media, item.format),
        media,
      },
      degraded: false,
    };
  } catch {
    // A real destination remains useful if its inline player is unavailable.
    return { item, degraded: true };
  }
};

export default async function getArticleEndItems(
  article: Article,
  pathname: string,
  portraitBlocks: MediaBlock[] = [],
): Promise<ArticleEndItem[]> {
  const environment = getEnvironment(pathname);
  const sourceId = getContentId(article.metadata.id);
  const researchItems = (
    studyCurations as unknown as Record<string, ArticleEndItem[]>
  )[sourceId];
  // The fixture contains live media PIDs, so never attach it to test media.
  if (environment === 'live' && researchItems) return researchItems;
  const key = `${environment}:${sourceId}:${article.metadata.lastPublished}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const topics = getCandidateTopics(article.metadata.topics || []);
  // Prefer the event/subject for an onward topic journey over a person's name.
  const topic =
    topics.find(candidate => candidate.types?.includes('core:Event')) ||
    topics.find(candidate => !candidate.types?.includes('core:Person')) ||
    topics[0] ||
    article.metadata.topics?.[0];
  const topicResults = await Promise.all(
    topics.map(candidate =>
      fetchTopic(candidate, environment, candidate.topicId === topic?.topicId),
    ),
  );
  const topicCollections = topicResults.map(result => result.items);
  const topicItems = topicCollections.flat();
  const authored = getAuthoredItems(article).map(item => {
    const summary = topicItems.find(
      candidate => getContentId(candidate.id) === getContentId(item.id),
    );
    // Old authored /articles/ links do not carry a media type. Where the topic
    // feed identifies the same asset as media, keep the editorial relationship
    // and use that type so it can be hydrated for playback.
    return item.format === 'article' && summary && summary.format !== 'article'
      ? { ...summary, ...item, format: summary.format }
      : item;
  });
  const relatedCandidates = getUniqueCandidates(
    [...authored, ...topicItems],
    sourceId,
  );
  // Reuse a native player already delivered for this page only when the same
  // content ID has an authored/topic relationship. The service-wide carousel
  // by itself does not establish that a clip is relevant to this article.
  const candidates = relatedCandidates.map(item => {
    const media = portraitBlocks.find(
      block =>
        block.type === 'portraitClipMedia' &&
        getContentId(block.model.video.id) === getContentId(item.id),
    );
    if (media) return { ...item, format: 'portrait' as const, media };
    return item.media
      ? { ...item, format: mediaFormat(item.media, item.format) }
      : item;
  });
  // Only two candidate media pages are fetched, in parallel, with short timeouts.
  const mediaCandidates = candidates
    .filter(item => !item.media && !['article', 'topic'].includes(item.format))
    .slice(0, 2);
  const rendererEnv =
    new URL(pathname, 'https://www.bbc.com').searchParams.get('renderer_env') ||
    undefined;
  const hydrationResults = await Promise.all(
    mediaCandidates.map(item => hydrateMedia(item, rendererEnv)),
  );
  const mediaById = new Map(
    hydrationResults.map(({ item }) => [item.id, item]),
  );
  // The image previews the topic's leading story. It is not topic artwork,
  // and an unavailable feed leaves the topic card without invented imagery.
  const topicIndex = topics.findIndex(
    candidate => candidate.topicId === topic?.topicId,
  );
  const topicImage = topicCollections[topicIndex]?.[0];
  const topicItem: ArticleEndItem[] = topic
    ? [
        {
          id: topic.topicId,
          title: topic.topicName,
          href: `https://www.bbc.com/mundo/topics/${topic.topicId}`,
          format: 'topic',
          relationship: 'Tema de este artículo',
          description:
            'Consulta la cobertura y las últimas noticias de BBC Mundo.',
          ...(topicImage?.imageUrl && {
            imageUrl: topicImage.imageUrl,
            imageAlt: topicImage.imageAlt || '',
          }),
        },
      ]
    : [];
  const items = selectDistinctItems(
    [...candidates.map(item => mediaById.get(item.id) || item), ...topicItem],
    sourceId,
  );
  // A timeout or unavailable player must not freeze a reduced selection for
  // five minutes. Successful empty feeds remain cacheable; degraded ones retry.
  const degraded =
    topicResults.some(result => result.degraded) ||
    hydrationResults.some(result => result.degraded);
  if (!degraded) cache.set(key, items);
  return items;
}
