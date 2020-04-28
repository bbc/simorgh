import path from 'ramda/src/path';

export const getAssetType = pageData => path(['metadata', 'type'], pageData);
