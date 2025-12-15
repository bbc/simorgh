import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';
import { Article, OptimoBlock } from '#app/models/types/optimo';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const disclaimerBlock = {
  type: 'disclaimer',
  model: {},
};

export const isSfv = (article: Article) =>
  article?.metadata?.consumableAsSFV ?? false;

const getDisclaimerInsertionPoint = (
  pageData: Article,
  positionFromTimestamp: number,
) =>
  getBlocks(pageData).findIndex(
    (block: OptimoBlock) => block.type === 'timestamp',
  ) + positionFromTimestamp;

const insertDisclaimer = (
  pageData: Article,
  positionFromTimestamp: number,
): Article =>
  setBlocks(
    insert(
      getDisclaimerInsertionPoint(pageData, positionFromTimestamp),
      disclaimerBlock,
      getBlocks(pageData),
    ),
    pageData,
  );

export default ({ positionFromTimestamp }: { positionFromTimestamp: number }) =>
  (pageData: Article): Article =>
    !isSfv(pageData)
      ? insertDisclaimer(pageData, positionFromTimestamp)
      : pageData;
