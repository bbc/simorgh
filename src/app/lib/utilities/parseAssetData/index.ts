import { Article } from '#app/models/types/optimo';

const getISOStringDate = (date: number) => new Date(date).toISOString();

export const getArticleId = (articleData: Article) => articleData?.metadata?.id;

export const getHeadline = (articleData: Article) =>
  articleData?.promo?.headlines?.seoHeadline;

export const getSummary = (articleData: Article) =>
  // @ts-expect-error - nested block structure
  articleData?.promo?.summary?.blocks?.[0]?.model?.blocks?.[0]?.model
    ?.blocks?.[0]?.model?.text;

export const getFirstPublished = (articleData: Article) =>
  getISOStringDate(articleData?.metadata?.firstPublished);

export const getLastPublished = (articleData: Article) =>
  getISOStringDate(articleData?.metadata?.lastPublished);

export const getAboutTags = (articleData: Article) =>
  articleData?.metadata?.tags?.about;

export const getArticleSection = (articleData: Article) =>
  articleData?.metadata?.passport?.genre;

export const getMentions = (articleData: Article) =>
  articleData?.metadata?.tags?.mentions;

export const getLang = (articleData: Article) =>
  articleData?.metadata?.language;
