import { bool, shape, string, number } from 'prop-types';
import { optimoMetadataPropTypes } from '../metadata';
import { optimoPromoPropTypes } from '../promo';
import mainContentPropTypes from '../mainContent';

export const articleDataPropTypes = shape({
  metadata: shape(optimoMetadataPropTypes).isRequired,
  content: shape({
    model: shape(mainContentPropTypes).isRequired,
  }).isRequired,
  promo: shape(optimoPromoPropTypes).isRequired,
});

const articlePropTypes = {
  isAmp: bool,
  isLow: bool,
  data: articleDataPropTypes,
  service: string,
  status: number,
};

export default articlePropTypes;
