import { LRUCache } from 'lru-cache';
import { Article } from '#app/models/types/optimo';
import { ArticleEndPreview } from '#app/components/EndOfArticlePreview/types';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import getEnvironment from '#app/routes/utils/getEnvironment';
import getAgent from '#utilities/getAgent';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import extractPromoImage from '#app/lib/utilities/extractPromoImage';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { getBlockText } from '#app/utilities/blocksToMarkdown';
import nodeLogger from '#lib/logger.node';
import { DATA_FETCH_ERROR } from '#lib/logger.const';

const logger = nodeLogger(__filename);
const cache = new LRUCache<string, ArticleEndPreview>({
  max: 100,
  ttl: 300000,
});
const FETCH_TIMEOUT_MS = 2000;
const MAX_WORDS = 120;

type ContentNode = {
  type: string;
  model: {
    text?: string;
    blocks?: ContentNode[];
    locator?: string;
    consumableAsSFV?: boolean;
  };
};

type Candidate = {
  id: string;
  href: string;
  relationship: ArticleEndPreview['relationship'];
};

const contentId = (value: string) =>
  value.match(/c[a-z0-9]{10,}o(?=$|[/?#])/i)?.[0];

const articlePath = (value: string) => {
  try {
    const url = new URL(value, 'https://www.bbc.com');
    if (
      url.protocol !== 'https:' ||
      !['www.bbc.com', 'www.bbc.co.uk', 'www.test.bbc.com'].includes(
        url.hostname,
      ) ||
      !/^\/mundo\/articles\/c[a-z0-9]{10,}o\/?$/i.test(url.pathname)
    )
      return null;
    return url.pathname.replace(/\/$/, '');
  } catch {
    return null;
  }
};

const descendants = (block: ContentNode): ContentNode[] => [
  block,
  ...(block.model?.blocks || []).flatMap(descendants),
];

const authoredLinks = (block: ContentNode): Candidate[] => {
  if (
    block.type === 'link' &&
    descendants(block).some(node => node.model?.consumableAsSFV)
  )
    return [];

  if (block.type === 'urlLink') {
    const href = block.model.locator && articlePath(block.model.locator);
    const id = href && contentId(href);
    return href && id ? [{ id, href, relationship: 'authored' }] : [];
  }
  return (block.model?.blocks || []).flatMap(authoredLinks);
};

const getCandidates = (article: Article): Candidate[] => {
  const blocks = (article.content?.model?.blocks || []) as ContentNode[];
  const orderedBlocks = [
    ...blocks.filter(block => block.type === 'relatedContent'),
    ...blocks.filter(block => block.type === 'links' || block.type === 'text'),
  ];
  const seen = new Set([contentId(article.metadata.id)]);
  return orderedBlocks.flatMap(authoredLinks).filter(candidate => {
    if (seen.has(candidate.id)) return false;
    seen.add(candidate.id);
    return true;
  });
};

const plainText = (block: ContentNode) =>
  getBlockText(block).replace(/\s+/gu, ' ').trim();

// Keep the opening contiguous, favouring complete Spanish sentences. Only a
// single sentence longer than the entire budget needs a marked word-boundary cut.
const boundParagraphs = (paragraphs: string[]) => {
  const selected: string[] = [];
  let remaining = MAX_WORDS;
  const segmenter = new Intl.Segmenter('es', { granularity: 'sentence' });

  paragraphs.slice(0, 2).some(paragraph => {
    const words = paragraph.split(/\s+/u);
    if (words.length <= remaining) {
      selected.push(paragraph);
      remaining -= words.length;
      return false;
    }

    let shortened = '';
    Array.from(segmenter.segment(paragraph)).some(({ segment }) => {
      const sentence = segment.trim();
      const wordCount = sentence.split(/\s+/u).length;
      if (wordCount > remaining) return true;
      shortened += `${shortened ? ' ' : ''}${sentence}`;
      remaining -= wordCount;
      return false;
    });
    if (shortened) selected.push(shortened);
    else if (selected.length === 0) {
      selected.push(`${words.slice(0, MAX_WORDS).join(' ')}…`);
    }
    return true;
  });
  return selected;
};

const getExcerpt = (article: Article) => {
  const body = (article.content?.model?.blocks || []) as ContentNode[];
  const opening = body
    .filter(block => block.type === 'text')
    .flatMap(block => block.model.blocks || [])
    .filter(block => block.type === 'paragraph')
    .map(plainText)
    .filter(paragraph => paragraph.split(/\s+/u).length >= 5);
  if (opening.length > 0)
    return {
      paragraphs: boundParagraphs(opening),
      excerptSource: 'opening' as const,
    };

  const summary = article.promo?.summary;
  const summaryText =
    typeof summary === 'string'
      ? summary.replace(/\s+/gu, ' ').trim()
      : ((summary?.blocks || []) as ContentNode[])
          .map(plainText)
          .filter(Boolean)
          .join(' ');
  return summaryText
    ? {
        paragraphs: boundParagraphs([summaryText]),
        excerptSource: 'summary' as const,
      }
    : { paragraphs: [], excerptSource: 'unavailable' as const };
};

const createPreview = (
  article: Article | undefined,
  candidate: Candidate,
): ArticleEndPreview | null => {
  if (
    !article ||
    article.metadata?.type !== ARTICLE_PAGE ||
    article.metadata.consumableAsSFV ||
    contentId(article.metadata.id) !== candidate.id
  )
    return null;

  const headline = (article.content.model.blocks as ContentNode[]).find(
    block => block.type === 'headline',
  );
  const title =
    (headline && plainText(headline)) || article.promo?.headlines?.seoHeadline;
  if (!title) return null;

  const { rawBlock, altText } = extractPromoImage(
    article.promo?.images?.defaultPromoImage?.blocks || [],
  );
  const readTime = article.metadata.stats?.readTime;
  const { firstPublished } = article.metadata;

  return {
    ...candidate,
    title,
    ...getExcerpt(article),
    ...(rawBlock?.model.locator && {
      imageUrl: buildIChefURL({ ...rawBlock.model, resolution: 800 }),
      imageAlt: altText,
    }),
    ...(typeof readTime === 'number' &&
      Number.isFinite(readTime) &&
      readTime > 0 && { readTime }),
    ...(Number.isFinite(firstPublished) &&
      firstPublished > 0 && { firstPublished }),
  };
};

export default async function getArticleEndPreview(
  article: Article,
  pathname: string,
): Promise<ArticleEndPreview | null> {
  const environment = getEnvironment(pathname);
  const requestedEnvironment = new URL(
    pathname,
    'https://www.bbc.com',
  ).searchParams.get('renderer_env');
  const rendererQuery = ['live', 'test'].includes(requestedEnvironment || '')
    ? `?renderer_env=${requestedEnvironment}`
    : '';
  const withRenderer = (preview: ArticleEndPreview) => ({
    ...preview,
    href: `${preview.href}${rendererQuery}`,
  });
  const key = `${environment}:${article.metadata.id}:${article.metadata.lastPublished}`;
  const cached = cache.get(key);
  if (cached) return withRenderer(cached);

  const candidates = getCandidates(article).slice(0, 2);
  if (candidates.length === 0) return null;

  const results = await Promise.all(
    candidates.map(async candidate => {
      try {
        const destinationPath = `${candidate.href}${rendererQuery}`;
        const agent = certsRequired(destinationPath)
          ? await getAgent()
          : undefined;
        const path = constructPageFetchUrl({
          pathname: destinationPath,
          pageType: ARTICLE_PAGE,
          service: 'mundo',
        }).toString();
        // @ts-expect-error - Existing declaration describes the old positional API.
        const { json } = await fetchPageData({
          path,
          timeout: FETCH_TIMEOUT_MS,
          agent,
          optHeaders: { 'ctx-service-env': environment },
          cache: undefined,
          shouldLogFetchTime: false,
        });
        const destination = json?.data?.article as Article | undefined;
        if (!destination?.metadata || !destination.content?.model?.blocks)
          throw new Error('Destination article data is incomplete');
        return {
          preview: createPreview(destination, candidate),
          degraded: false,
        };
      } catch (error) {
        logger.warn(DATA_FETCH_ERROR, {
          service: 'mundo',
          componentName: 'article-end-preview',
          articleId: candidate.id,
          error: error instanceof Error ? error.message : 'Preview unavailable',
        });
        return { preview: null, degraded: true };
      }
    }),
  );
  const preview = results.find(result => result.preview)?.preview;
  if (!preview) return null;
  if (
    preview.excerptSource !== 'unavailable' &&
    !results.some(result => result.degraded)
  )
    cache.set(key, preview);
  return withRenderer(preview);
}
