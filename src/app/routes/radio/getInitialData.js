import uuid from 'uuid';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import map from 'ramda/src/map';
import fetchPageData from '../fetchPageData';

const addIdToBlock = block => ({ ...block, uuid: uuid() });
const getBlocks = pipe(path(['content', 'blocks']), map(addIdToBlock));
const getTitle = path(['promo', 'name']);
const getLanguage = path(['metadata', 'language']);
const getDescription = path(['promo', 'summary']);

export default async pathname => {
  const { json, ...rest } = await fetchPageData(pathname);

  return {
    ...rest,
    pageData: {
      title: getTitle(json),
      language: getLanguage(json),
      description: getDescription(json),
      blocks: getBlocks(json),
    },
  };
};
