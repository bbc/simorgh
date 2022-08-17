import { shape } from 'prop-types';
import sizesPropTypes from './sizes';

const groupPropTypes = {
  groupA: shape(sizesPropTypes).isRequired,
  groupB: shape(sizesPropTypes).isRequired,
  groupD: shape(sizesPropTypes).isRequired,
};

export default groupPropTypes;
