import pathOr from 'ramda/src/pathOr.js';
import pathEq from 'ramda/src/pathEq.js';
import assocPath from 'ramda/src/assocPath.js';
import insert from 'ramda/src/insert.js';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const isDisclaimerToggledOn = pathEq(['disclaimer', 'enabled'], true);
const disclaimerBlock = {
  type: 'disclaimer',
  model: {},
};

const getDisclaimerInsertionPoint = (pageData, positionFromTimestamp) =>
  getBlocks(pageData).findIndex(block => block.type === 'timestamp') +
  positionFromTimestamp;

const insertDisclaimer = (pageData, positionFromTimestamp) =>
  setBlocks(
    insert(
      getDisclaimerInsertionPoint(pageData, positionFromTimestamp),
      disclaimerBlock,
      getBlocks(pageData),
    ),
    pageData,
  );

export default ({ toggles, positionFromTimestamp }) =>
  pageData =>
    isDisclaimerToggledOn(toggles)
      ? insertDisclaimer(pageData, positionFromTimestamp)
      : pageData;
