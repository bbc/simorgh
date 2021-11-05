import { string, shape, arrayOf } from 'prop-types';

const bylineBlockPropTypes = {
  blocks: arrayOf(
    shape({
      title: string.isRequired,
      name: string.isRequired,
    }),
  ),
  className: string,
};

export default bylineBlockPropTypes;
