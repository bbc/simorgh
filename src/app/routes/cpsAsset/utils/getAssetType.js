import path from 'ramda/src/path';

const getAssetType = pageData => path(['metadata', 'type'], pageData);

export default getAssetType;
