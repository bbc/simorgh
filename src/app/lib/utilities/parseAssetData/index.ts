/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ArticlePageProps } from '#app/models/types/optimo';
import path from 'ramda/src/path';

const getISOStringDate = (date: number) => new Date(date).toISOString();

export const getArticleId = path<string>(['metadata', 'id']);

export const getHeadline = path<string>(['promo', 'headlines', 'seoHeadline']);

export const getSummary = path<string>([
  'promo',
  'summary',
  'blocks',
  '0',
  'model',
  'blocks',
  '0',
  'model',
  'blocks',
  '0',
  'model',
  'text',
]);

export const getFirstPublished = (articleData: ArticlePageProps) =>
  getISOStringDate(path<number>(['metadata', 'firstPublished'], articleData)!);

export const getLastPublished = (articleData: ArticlePageProps) =>
  getISOStringDate(path<number>(['metadata', 'lastPublished'], articleData)!);

export const getAboutTags = path<object[]>(['metadata', 'tags', 'about']);

export const getArticleSection = path<string>([
  'metadata',
  'passport',
  'genre',
]);

export const getMentions = path<object[]>(['metadata', 'tags', 'mentions']);

export const getLang = path<string>(['metadata', 'language']);
