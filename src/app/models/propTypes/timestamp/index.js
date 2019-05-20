import { number, shape, string } from 'prop-types';

const timestampBlockPropTypes = shape({
  model: shape({
    firstPublished: number.isRequired,
    lastPublished: number.isRequired,
  }),
  type: string.isRequired,
});

export default timestampBlockPropTypes;
