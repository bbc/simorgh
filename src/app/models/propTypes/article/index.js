import { bool, shape, string, number } from 'prop-types';
import metadataPropTypes from '../metadata';
import promoPropTypes from '../promo';
import mainContentPropTypes from '../mainContent';

export const articleDataPropTypes = shape({
  metadata: shape(metadataPropTypes).isRequired,
  content: shape({
    model: shape(mainContentPropTypes),
  }).isRequired,
  promo: shape(promoPropTypes).isRequired,
});

const articlePropTypes = {
  isAmp: bool,
  data: articleDataPropTypes,
  service: string,
  status: number,
};

export default articlePropTypes;
