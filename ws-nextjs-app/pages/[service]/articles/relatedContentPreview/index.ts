import { LRUCache } from 'lru-cache';
import { Article } from '#app/models/types/optimo';
import { RelatedContentPreview } from '#app/components/RelatedContentSection/types';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import getEnvironment from '#app/routes/utils/getEnvironment';
import getAgent from '#utilities/getAgent';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { getBlockText } from '#app/utilities/blocksToMarkdown';
import nodeLogger from '#lib/logger.node';
import { DATA_FETCH_ERROR } from '#lib/logger.const';

const logger = nodeLogger(__filename);
const cache = new LRUCache<string, RelatedContentPreview>({
  max: 100,
  ttl: 300000,
});
const FETCH_TIMEOUT_MS = 2000;
const MAX_EXCERPT_LENGTH = 600;

type ContentNode = {
  type: string;
  model: {
    text?: string;
    blocks?: ContentNode[];
    locator?: string;
    consumableAsSFV?: boolean;
  };
};

const contentId = (value: string) =>
  value.match(/c[a-z0-9]{10,}o(?=$|[/?#])/i)?.[0];

const descendants = (block: ContentNode): ContentNode[] => [
  block,
  ...(block.model?.blocks || []).flatMap(descendants),
];

const getLeadCandidate = (article: Article) => {
  // Mirror RelatedContentSection: only the final non-advert/OJ block is shown.
  const blocks = (article.content?.model?.blocks || []) as ContentNode[];
  const relatedContent = blocks
    .filter(block => !['wsoj', 'mpu'].includes(block.type))
    .at(-1);
  if (relatedContent?.type !== 'relatedContent') return null;

  const items = relatedContent.model.blocks || [];
  const lead = items[items[0]?.type === 'title' ? 1 : 0];
  if (lead?.type !== 'link') return null;

  const nodes = descendants(lead);
  if (nodes.some(node => node.model?.consumableAsSFV)) return null;
  const locator = nodes.find(node => node.type === 'urlLink')?.model.locator;
  if (!locator) return null;

  try {
    const url = new URL(locator, 'https://www.bbc.com');
    if (
      url.protocol !== 'https:' ||
      !['www.bbc.com', 'www.bbc.co.uk', 'www.test.bbc.com'].includes(
        url.hostname,
      ) ||
      !/^\/mundo\/articles\/c[a-z0-9]{10,}o\/?$/i.test(url.pathname)
    )
      return null;

    const id = contentId(url.pathname);
    if (!id || id === contentId(article.metadata.id)) return null;
    return {
      id,
      href: `${url.origin}${url.pathname}`,
      pathname: url.pathname.replace(/\/$/, ''),
    };
  } catch {
    return null;
  }
};

const plainText = (block: ContentNode) =>
  getBlockText(block).replace(/\s+/gu, ' ').trim();

const getExcerpt = (article: Article) => {
  const opening = (article.content.model.blocks as ContentNode[])
    .filter(block => block.type === 'text')
    .flatMap(block => block.model.blocks || [])
    .filter(block => block.type === 'paragraph')
    .map(plainText)
    .find(Boolean);

  // Keep the complete authored paragraph; do not splice or clip its sentences.
  if (opening && opening.length <= MAX_EXCERPT_LENGTH) return opening;

  const summary = article.promo?.summary;
  const summaryText =
    typeof summary === 'string'
      ? summary.replace(/\s+/gu, ' ').trim()
      : ((summary?.blocks || []) as ContentNode[])
          .flatMap(block =>
            block.type === 'text' ? block.model.blocks || [] : [block],
          )
          .map(plainText)
          .filter(Boolean)
          .join(' ');

  return summaryText && summaryText.length <= MAX_EXCERPT_LENGTH
    ? summaryText
    : null;
};

export default async function getRelatedContentPreview(
  article: Article,
  pathname: string,
): Promise<RelatedContentPreview | null> {
  const candidate = getLeadCandidate(article);
  if (!candidate) return null;

  const environment = getEnvironment(pathname);
  const rendererEnv = new URL(pathname, 'https://www.bbc.com').searchParams.get(
    'renderer_env',
  );
  const rendererQuery = ['live', 'test'].includes(rendererEnv || '')
    ? `?renderer_env=${rendererEnv}`
    : '';
  const key = `${environment}:${article.metadata.id}:${article.metadata.lastPublished}:${candidate.id}`;
  const cached = cache.get(key);
  if (cached) return cached;

  try {
    const destinationPath = `${candidate.pathname}${rendererQuery}`;
    const agent = certsRequired(destinationPath) ? await getAgent() : undefined;
    const path = constructPageFetchUrl({
      pathname: destinationPath,
      pageType: ARTICLE_PAGE,
      service: 'mundo',
    }).toString();
    // @ts-expect-error - Existing declaration describes the old positional API.
    const response = await fetchPageData({
      path,
      timeout: FETCH_TIMEOUT_MS,
      agent,
      optHeaders: { 'ctx-service-env': environment },
      cache: undefined,
      shouldLogFetchTime: false,
      componentName: 'related-content-preview',
      articleId: candidate.id,
    }).catch(() => null);
    // The native wrapper logs request failures with the context above.
    if (!response) return null;

    const destination = response.json?.data?.article as Article | undefined;
    if (
      !destination?.metadata ||
      !Array.isArray(destination.content?.model?.blocks)
    )
      throw new Error('Related article data is incomplete');

    // Match the route's derived article type, excluding MAPs and photo pages.
    if (
      destination.metadata.type !== ARTICLE_PAGE ||
      destination.metadata.consumableAsSFV ||
      contentId(destination.metadata.id) !== candidate.id
    )
      return null;

    const excerpt = getExcerpt(destination);
    if (!excerpt) return null;
    const readTime = destination.metadata.stats?.readTime;
    const preview: RelatedContentPreview = {
      href: candidate.href,
      excerpt,
      ...(typeof readTime === 'number' &&
        Number.isFinite(readTime) &&
        readTime > 0 && { readTime }),
    };
    cache.set(key, preview);
    return preview;
  } catch (error) {
    logger.warn(DATA_FETCH_ERROR, {
      service: 'mundo',
      componentName: 'related-content-preview',
      articleId: candidate.id,
      error: error instanceof Error ? error.message : 'Preview unavailable',
    });
    return null;
  }
}
