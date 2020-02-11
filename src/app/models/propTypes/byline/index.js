import { string, shape, arrayOf } from 'prop-types';

const bylineBlockPropTypes = {
  blocks: arrayOf(
    shape({
      title: string,
      name: string,
    }),
  ),
};

export default bylineBlockPropTypes;
