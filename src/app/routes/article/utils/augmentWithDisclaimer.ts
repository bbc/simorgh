import { pathOr, pathEq, assocPath, insert } from 'rambda';
import { Article, OptimoBlock } from '#app/models/types/optimo';
import { Toggles } from '#app/models/types/global';
import { isSfv } from './paramChecks';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const isDisclaimerToggledOn = pathEq(['disclaimer', 'enabled'], true);
const disclaimerBlock = {
  type: 'disclaimer',
  model: {},
};

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

export default ({
    toggles,
    positionFromTimestamp,
  }: {
    toggles?: Toggles;
    positionFromTimestamp: number;
  }) =>
  (pageData: Article): Article =>
    isDisclaimerToggledOn(toggles) && !isSfv(pageData)
      ? insertDisclaimer(pageData, positionFromTimestamp)
      : pageData;
