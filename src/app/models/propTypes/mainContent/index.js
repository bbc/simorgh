import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import { imageBlockPropTypes } from '../image';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
  imageBlockPropTypes,
]);

export default mainContentPropTypes;
