import equals from 'ramda/src/equals';
import either from 'ramda/src/either';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';

const hasList = pipe(
  path(['model', 'blocks', 0, 'type']),
  either(equals('unorderedList'), equals('orderedList')),
);
const getListItems = path(['model', 'blocks', 0, 'model', 'blocks']);
const hasLink = pipe(
  path(['model', 'blocks', 0, 'model', 'blocks', 0, 'type']),
  equals('urlLink'),
);
const isListWithLink = block => {
  if (hasList(block)) {
    const listItems = getListItems(block);
    const listItemsContainLink = listItems.some(hasLink);

    return listItemsContainLink;
  }

  return false;
};

export default isListWithLink;
