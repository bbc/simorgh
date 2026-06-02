import type { MediaBlock } from '#app/components/MediaLoader/types';
import type { Curation, Summary } from '#app/models/types/curationData';
import type { Services, Variants } from '#app/models/types/global';
import type { Article } from '#app/models/types/optimo';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import {
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import getPageData from '../pageRequests/getPageData';

type ArticleMediaBlock = {
  type?: string;
  model?: {
    blocks?: MediaBlock[];
  };
};

type ArticleWithPromoMedia = Article & {
  promo?: Article['promo'] & {
    media?: {
      blocks?: ArticleMediaBlock[];
    };
  };
};

type Props = {
  curations?: Curation[] | null;
  service: Services;
  variant?: Variants | null;
  rendererEnv?: string;
};

const getOptimoArticleId = (link?: string) =>
  link?.match(/\/articles\/(c[a-zA-Z0-9]{10,}o)/)?.[1] ?? null;

const isHierarchicalGrid = ({ visualStyle, visualProminence }: Curation) =>
  visualStyle === VISUAL_STYLE.COLLECTION &&
  visualProminence === VISUAL_PROMINENCE.HIGH;

const isLeadingMapPromoCandidate = (promo?: Summary) =>
  promo?.type === 'video' && Boolean(getOptimoArticleId(promo.link));

const getNestedMediaBlocks = (mediaBlock?: ArticleMediaBlock) => {
  const mediaBlocks = mediaBlock?.model?.blocks;

  return mediaBlocks?.length ? mediaBlocks : null;
};

const getArticleMediaBlocks = (article?: ArticleWithPromoMedia) => {
  if (!article?.metadata?.consumableAsSFV) {
    return null;
  }

  const promoMediaBlock = article?.promo?.media?.blocks?.find(
    ({ type }) => type === 'video',
  );
  const contentMediaBlock = (
    article?.content?.model?.blocks as ArticleMediaBlock[] | undefined
  )?.find(({ type }) => type === 'video');

  return (
    getNestedMediaBlocks(promoMediaBlock) ??
    getNestedMediaBlocks(contentMediaBlock)
  );
};

const fetchArticleMediaBlocks = async ({
  articleId,
  rendererEnv,
  service,
  variant,
}: Props & { articleId: string }) => {
  const articlePath = `/${service}/articles/${articleId}`;
  const { data } = await getPageData({
    id: articlePath,
    service,
    variant,
    rendererEnv,
    resolvedUrl: articlePath,
    pageType: ARTICLE_PAGE,
  });

  return getArticleMediaBlocks(data?.pageData?.article);
};

const enrichCuration = async ({
  curation,
  rendererEnv,
  service,
  variant,
}: Props & { curation: Curation }) => {
  const [firstPromo, ...remainingPromos] = curation.summaries ?? [];

  if (
    !isHierarchicalGrid(curation) ||
    !isLeadingMapPromoCandidate(firstPromo)
  ) {
    return curation;
  }

  const articleId = getOptimoArticleId(firstPromo.link);

  if (!articleId) {
    return curation;
  }

  const inSituMedia = await fetchArticleMediaBlocks({
    articleId,
    rendererEnv,
    service,
    variant,
  });

  if (!inSituMedia?.length) {
    return curation;
  }

  return {
    ...curation,
    summaries: [{ ...firstPromo, inSituMedia }, ...remainingPromos],
  };
};

const enrichCurationsWithInSituPlayback = async ({
  curations,
  rendererEnv,
  service,
  variant,
}: Props) => {
  if (!curations?.length) {
    return curations ?? null;
  }

  return Promise.all(
    curations.map(curation =>
      enrichCuration({ curation, rendererEnv, service, variant }),
    ),
  );
};

export default enrichCurationsWithInSituPlayback;
