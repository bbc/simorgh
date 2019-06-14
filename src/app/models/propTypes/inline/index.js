import { string, arrayOf, oneOf, shape } from 'prop-types';
import fragmentBlockPropTypes from '../fragment';

const inlineBlockPropTypes = shape({
  type: 'inline',
  model: shape({
    text: string.isRequired,
    blocks: arrayOf(oneOf([fragmentBlockPropTypes])),
    language: string.isRequired,
  }),
});

export default inlineBlockPropTypes;
