import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);

const getDisclaimerInsertionPoint = pageData =>
  getBlocks(pageData).findIndex(block => block.type === 'timestamp') + 1;

export default toggles => pageData => {
  if (pathEq(['disclaimer', 'enabled'], true, toggles)) {
    return setBlocks(
      insert(
        getDisclaimerInsertionPoint(pageData),
        {
          type: 'disclaimer',
          model: {},
        },
        getBlocks(pageData),
      ),
      pageData,
    );
  }

  return pageData;
};
