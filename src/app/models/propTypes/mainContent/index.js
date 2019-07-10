import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import { imageBlockPropTypes } from '../image';
import audioVideoBlockPropTypes from '../audioVideo';
import timestampBlockPropTypes from '../timestamp';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
  imageBlockPropTypes,
  timestampBlockPropTypes,
  audioVideoBlockPropTypes,
]);

export default mainContentPropTypes;
