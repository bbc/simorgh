import { blocksWithTypes } from '../general';
import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
]);

export default mainContentPropTypes;
