import { includeBlock } from '#app/models/blocks';

const convertInclude = ({ tile, href, platform }) => {
  return includeBlock(tile, href, platform);
};

export default convertInclude;
