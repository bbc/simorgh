import { string, arrayOf, oneOf } from 'prop-types';
import { blockOfTypesAndModel } from '../general';

const fragmentBlockPropTypes = blockOfTypesAndModel(['fragment'], {
  text: string.isRequired,
  attributes: arrayOf(oneOf(['bold', 'italic'])).isRequired,
});

export default fragmentBlockPropTypes;
