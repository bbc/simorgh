import { LRUCache } from 'lru-cache';
import { Article, OptimoBlock } from '#app/models/types/optimo';
import { ArticleEndPreview } from '#app/components/ArticlePreviewCard/types';
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
const cache = new LRUCache<string, ArticleEndPreview[]>({
  max: 100,
  ttl: 300000,
});
const FETCH_TIMEOUT_MS = 2000;
const MAX_PREVIEWS = 4;
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

const plainText = (block: ContentNode) =>
  getBlockText(block).replace(/\s+/gu, ' ').trim();

const previewImage = (blocks: OptimoBlock[]) => {
  const { rawBlock, altText } = extractPromoImage(blocks);
  return rawBlock?.model.locator
    ? {
        imageUrl: buildIChefURL({ ...rawBlock.model, resolution: 800 }),
        imageAlt: altText,
      }
    : {};
};

const getCandidates = (article: Article): ArticleEndPreview[] => {
  // Match the RelatedContentSection that is actually rendered, rather than
  // collecting inline links or selecting a different recommendation source.
  const blocks = (article.content?.model?.blocks || []) as ContentNode[];
  const relatedContent = blocks
    .filter(block => !['wsoj', 'mpu'].includes(block.type))
    .at(-1);
  if (relatedContent?.type !== 'relatedContent') return [];

  const items = relatedContent.model.blocks || [];
  const storyItems = items[0]?.type === 'title' ? items.slice(1) : items;
  const seen = new Set([contentId(article.metadata.id)]);
  return storyItems
    .slice(0, 6)
    .flatMap(item => {
      if (item.type !== 'link') return [];
      const nodes = descendants(item);
      if (nodes.some(node => node.model?.consumableAsSFV)) return [];
      const link = nodes.find(node => node.type === 'urlLink');
      const href = link?.model.locator && articlePath(link.model.locator);
      const id = href && contentId(href);
      const title = link && plainText(link);
      if (!id || !href || !title || seen.has(id)) return [];
      seen.add(id);

      const image = nodes.find(node => node.type === 'image');
      return [
        {
          id,
          href,
          title,
          ...previewImage(image?.model.blocks || []),
          paragraphs: [],
          excerptSource: 'unavailable',
          relationship: 'authored',
        } satisfies ArticleEndPreview,
      ];
    })
    .slice(0, MAX_PREVIEWS);
};

// Reuse D's short opening: at most two paragraphs and 120 words, favouring
// complete sentences. Only an oversized first sentence needs an ellipsis.
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
  const opening = (article.content.model.blocks as ContentNode[])
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
          .flatMap(block =>
            block.type === 'text' ? block.model.blocks || [] : [block],
          )
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
  article: Article,
  candidate: ArticleEndPreview,
): ArticleEndPreview | null => {
  if (!article?.metadata?.type || !article.metadata.id)
    throw new Error('Destination article metadata is incomplete');
  if (contentId(article.metadata.id) !== candidate.id)
    throw new Error('Destination article does not match the authored link');

  // A known media/photo destination is excluded, rather than presented as a
  // text article just because its authored URL used the articles route.
  if (
    article.metadata.type !== ARTICLE_PAGE ||
    article.metadata.consumableAsSFV
  )
    return null;
  if (!Array.isArray(article.content?.model?.blocks))
    throw new Error('Destination article content is incomplete');

  const headline = (article.content.model.blocks as ContentNode[]).find(
    block => block.type === 'headline',
  );
  const title =
    (headline && plainText(headline)) || article.promo?.headlines?.seoHeadline;
  if (!title) throw new Error('Destination article headline is unavailable');

  const readTime = article.metadata.stats?.readTime;
  const { firstPublished } = article.metadata;
  return {
    ...candidate,
    title,
    ...previewImage(article.promo?.images?.defaultPromoImage?.blocks || []),
    ...getExcerpt(article),
    ...(typeof readTime === 'number' &&
      Number.isFinite(readTime) &&
      readTime > 0 && { readTime }),
    ...(Number.isFinite(firstPublished) &&
      firstPublished > 0 && { firstPublished }),
  };
};

export default async function getArticleEndPreviews(
  article: Article,
  pathname: string,
): Promise<ArticleEndPreview[]> {
  const candidates = getCandidates(article);
  if (candidates.length === 0) return [];

  const environment = getEnvironment(pathname);
  const requestedEnvironment = new URL(
    pathname,
    'https://www.bbc.com',
  ).searchParams.get('renderer_env');
  const rendererQuery = ['live', 'test'].includes(requestedEnvironment || '')
    ? `?renderer_env=${requestedEnvironment}`
    : '';
  const withRenderer = (previews: ArticleEndPreview[]) =>
    previews.map(preview => ({
      ...preview,
      href: `${preview.href}${rendererQuery}`,
    }));
  const key = `${environment}:${article.metadata.id}:${article.metadata.lastPublished}`;
  const cached = cache.get(key);
  if (cached) return withRenderer(cached);

  // Promise.all preserves authored order even when requests finish out of order.
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
        const response = await fetchPageData({
          path,
          timeout: FETCH_TIMEOUT_MS,
          agent,
          optHeaders: { 'ctx-service-env': environment },
          cache: undefined,
          shouldLogFetchTime: false,
          componentName: 'article-end-previews',
          articleId: candidate.id,
        }).catch(() => null);
        // The native wrapper logs request failures. Keep the authored promo,
        // without invented excerpt text, and retry on the next uncached request.
        if (!response) return { preview: candidate, degraded: true };

        const destination = response.json?.data?.article as Article;
        return {
          preview: createPreview(destination, candidate),
          degraded: false,
        };
      } catch (error) {
        logger.warn(DATA_FETCH_ERROR, {
          service: 'mundo',
          componentName: 'article-end-previews',
          articleId: candidate.id,
          error: error instanceof Error ? error.message : 'Preview unavailable',
        });
        return { preview: candidate, degraded: true };
      }
    }),
  );
  const previews = results
    .map(result => result.preview)
    .filter((preview): preview is ArticleEndPreview => preview !== null);

  if (
    previews.length > 0 &&
    !results.some(result => result.degraded) &&
    previews.every(preview => preview.excerptSource !== 'unavailable')
  )
    cache.set(key, previews);
  return withRenderer(previews);
}
