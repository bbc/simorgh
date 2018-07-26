import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import { imagePropTypes } from '../index';
import { videoPropTypes } from '../index';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
  imagePropTypes,
  videoPropTypes,
]);

export default mainContentPropTypes;
