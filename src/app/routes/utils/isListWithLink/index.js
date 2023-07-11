import equals from 'ramda/src/equals.js';
import either from 'ramda/src/either.js';
import path from 'ramda/src/path.js';
import pipe from 'ramda/src/pipe.js';

const hasList = pipe(
  path(['model', 'blocks', 0, 'type']),
  either(equals('unorderedList'), equals('orderedList')),
);
const getListItems = path(['model', 'blocks', 0, 'model', 'blocks']);
const hasUrlLink = pipe(
  path(['model', 'blocks', 0, 'model', 'blocks', 0, 'type']),
  equals('urlLink'),
);

const hasEdOjLinks = pipe(path(['type']), equals('links'));
const getEdOjLinkItems = path(['model', 'blocks']);
const hasLink = pipe(path(['type']), equals('link'));

const isListWithLink = block => {
  if (hasList(block)) {
    const listItems = getListItems(block);
    const listItemsContainLink = listItems.some(hasUrlLink);

    return listItemsContainLink;
  }

  if (hasEdOjLinks(block)) {
    const linkItems = getEdOjLinkItems(block);
    const linkItemsContainsLink = linkItems.some(hasLink);

    return linkItemsContainsLink;
  }

  return false;
};

export default isListWithLink;
