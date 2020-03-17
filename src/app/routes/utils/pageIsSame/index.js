import path from 'ramda/src/path';

const getPageId = path(['pageData', 'metadata', 'id']);

export default (prevProps, nextProps) =>
  getPageId(prevProps) === getPageId(nextProps);
