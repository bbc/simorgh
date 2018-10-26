import { string, arrayOf, oneOf } from 'prop-types';
import { blockOfValidTypeAndModel } from '../general';

const fragmentBlockPropTypes = blockOfValidTypeAndModel(['fragment'], {
  text: string.isRequired,
  attributes: arrayOf(oneOf(['bold', 'italic'])).isRequired,
});

export default fragmentBlockPropTypes;
