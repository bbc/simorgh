import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const isDisclaimerToggledOn = pathEq(['disclaimer', 'enabled'], true);
const disclaimerBlock = {
  type: 'disclaimer',
  model: {},
};

const getDisclaimerInsertionPoint = pageData =>
  getBlocks(pageData).findIndex(block => block.type === 'timestamp') + 1;

const insertDisclaimer = pageData =>
  setBlocks(
    insert(
      getDisclaimerInsertionPoint(pageData),
      disclaimerBlock,
      getBlocks(pageData),
    ),
    pageData,
  );

export default toggles => pageData =>
  isDisclaimerToggledOn(toggles) ? insertDisclaimer(pageData) : pageData;
