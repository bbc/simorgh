import { string } from 'prop-types';

const aresBlockPropTypes = {
  text: string.isRequired,
  markupType: string,
  type: string.isRequired,
};

export default aresBlockPropTypes;
