import { bool, shape, string } from 'prop-types';
import metadataPropTypes from '../metadata';
import promoPropTypes from '../promo';
import mainContentPropTypes from '../mainContent';

export const articleDataPropTypes = {
  metadata: shape(metadataPropTypes).isRequired,
  content: shape({
    model: shape(mainContentPropTypes),
  }).isRequired,
  promo: shape(promoPropTypes).isRequired,
};

const articlePropTypes = {
  isAmp: bool,
  data: shape(articleDataPropTypes),
  service: string,
};

export default articlePropTypes;
