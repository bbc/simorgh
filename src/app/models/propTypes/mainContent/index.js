import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import { videoPropTypes } from '../index';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
  videoPropTypes,
]);

export default mainContentPropTypes;
