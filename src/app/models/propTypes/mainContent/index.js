import { headlineBlockPropTypes } from '../headline';
import { textBlockPropTypes } from '../text';
import { blocksWithTypes } from '../general';

const mainContentPropTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
]);

export default mainContentPropTypes;
