import { Services } from '#app/models/types/global';
import { ArticlePageProps } from '#app/models/types/optimo';
import pathOr from 'ramda/src/pathOr';

const getOptimoUrn = (articleData: ArticlePageProps) =>
  pathOr<string | null>(
    null,
    ['metadata', 'locators', 'optimoUrn'],
    articleData,
  );

export const getContentId = pathOr<string | null>(null, [
  'metadata',
  'analyticsLabels',
  'contentId',
]);

export const getOptimoId = (articleData: ArticlePageProps) => {
  const optimoUrn = getOptimoUrn(articleData);
  return optimoUrn ? optimoUrn?.split(':')?.pop() : 'unknown';
};

export const getPageIdentifier = (
  service: Services,
  articleData: ArticlePageProps,
) => {
  const optimoId = getOptimoId(articleData);
  return `${service}.articles.${optimoId}.page`;
};

export const getLanguage = (articleData: ArticlePageProps) =>
  pathOr<string | null>(null, ['metadata', 'language'], articleData);

export const getPromoHeadline = (articleData: ArticlePageProps) =>
  pathOr<string>('', ['promo', 'headlines', 'seoHeadline'], articleData);

export const getNationsProducer = (articleData: ArticlePageProps) => {
  return pathOr<string | null>(
    null,
    ['metadata', 'analyticsLabels', 'nations_producer'],
    articleData,
  );
};
