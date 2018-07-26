import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import { imagePropTypes, videoPropTypes } from '../index';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
  imagePropTypes,
  videoPropTypes,
]);

export default mainContentPropTypes;
