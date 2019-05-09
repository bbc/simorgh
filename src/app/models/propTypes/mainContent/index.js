import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import timestampBlockPropTypes from '../timestamp';
import { imageBlockPropTypes } from '../image';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  timestampBlockPropTypes,
  textBlockPropTypes,
  imageBlockPropTypes,
]);

export default mainContentPropTypes;
