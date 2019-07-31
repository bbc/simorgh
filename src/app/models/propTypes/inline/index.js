import { string, arrayOf, oneOfType, shape } from 'prop-types';
import fragmentBlockPropTypes from '../fragment';
import { inlineLinkBlockPropTypes } from '../inlineLink';
import { blockOfTypesAndModel } from '../general';

const inlineBlockPropTypes = blockOfTypesAndModel(['inline'], {
  type: 'inline',
  model: shape({
    text: string.isRequired,
    blocks: arrayOf(
      oneOfType([fragmentBlockPropTypes, inlineLinkBlockPropTypes]),
    ),
    language: string.isRequired,
  }),
});

export default inlineBlockPropTypes;
