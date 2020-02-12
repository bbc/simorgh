import { string, shape, arrayOf } from 'prop-types';

const bylineBlockPropTypes = {
  blocks: arrayOf(
    shape({
      title: string,
      name: string,
    }),
  ),
  className: string,
};

export default bylineBlockPropTypes;
