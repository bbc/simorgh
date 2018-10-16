import { bool, shape, string } from 'prop-types';
import metadataPropTypes from '../metadata';
import promoPropTypes from '../promo';
import mainContentPropTypes from '../mainContent';

const articlePropTypes = {
  isAmp: bool,
  data: shape({
    metadata: shape(metadataPropTypes).isRequired,
    content: shape({
      model: shape(mainContentPropTypes),
    }).isRequired,
    promo: shape(promoPropTypes).isRequired,
  }),
  service: string,
};

export default articlePropTypes;
