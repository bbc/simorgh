import { string, arrayOf, oneOf } from 'prop-types';
import { blockOfSpecificTypeAndModel } from '../general';

const fragmentBlockPropTypes = blockOfSpecificTypeAndModel(['fragment'], {
  text: string.isRequired,
  attributes: arrayOf(oneOf(['bold', 'italic'])).isRequired,
});

export default fragmentBlockPropTypes;
