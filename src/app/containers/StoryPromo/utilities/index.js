import pathOr from 'ramda/src/pathOr';

export const isMap = item => {
  const isCpsTypeMap = pathOr(null, ['cpsType'], item) === 'MAP';
  const hasMedia = pathOr(false, ['media'], item);

  return isCpsTypeMap || Boolean(hasMedia);
};

export const isPgl = item => pathOr(null, ['cpsType'], item) === 'PGL';
