import pathOr from 'ramda/src/pathOr';
import assocPath from 'ramda/src/assocPath';
import insert from 'ramda/src/insert';

const getBlocks = pathOr([], ['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);

const getDisclaimerInsertionPoint = pageData =>
  getBlocks(pageData).findIndex(block => block.type === 'timestamp') + 1;

export default pageData =>
  setBlocks(
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
