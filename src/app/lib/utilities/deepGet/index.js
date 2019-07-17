import pathOr from 'ramda/src/pathOr';

export default (path, object) => pathOr(null, path, object);
