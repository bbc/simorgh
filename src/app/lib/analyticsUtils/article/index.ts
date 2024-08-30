import { Services } from '#app/models/types/global';
import { Article } from '#app/models/types/optimo';
import pathOr from 'ramda/src/pathOr';

const getOptimoUrn = (articleData: Article) =>
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

export const getOptimoId = (articleData: Article) => {
  const optimoUrn = getOptimoUrn(articleData);
  return optimoUrn ? optimoUrn?.split(':')?.pop() : 'unknown';
};

export const getPageIdentifier = (service: Services, articleData: Article) => {
  const optimoId = getOptimoId(articleData);
  return `${service}.articles.${optimoId}.page`;
};

export const getLanguage = (articleData: Article) =>
  pathOr<string | null>(null, ['metadata', 'language'], articleData);

export const getPromoHeadline = (articleData: Article) =>
  pathOr<string>('', ['promo', 'headlines', 'seoHeadline'], articleData);

export const getNationsProducer = (articleData: Article) => {
  return pathOr<string | null>(
    null,
    ['metadata', 'analyticsLabels', 'nations_producer'],
    articleData,
  );
};
