import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import { imageBlockPropTypes } from '../image';
import timestampBlockPropTypes from '../timestamp';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
  imageBlockPropTypes,
  timestampBlockPropTypes,
]);

export default mainContentPropTypes;
