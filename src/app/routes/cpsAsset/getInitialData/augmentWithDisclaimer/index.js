import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const isDisclaimerToggledOn = pathEq(true, ['disclaimer', 'enabled']);
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
