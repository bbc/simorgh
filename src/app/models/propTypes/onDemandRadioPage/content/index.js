import { arrayOf } from 'prop-types';
import versionPropTypes from './version';

const onDemandRadioPageContentPropTypes = {
  blocks: arrayOf(versionPropTypes).isRequired,
};

export default onDemandRadioPageContentPropTypes;
