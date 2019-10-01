import { bool, shape, string, number } from 'prop-types';
import { mediaMetadataPropTypes } from '../metadata';
import { mediaPromoPropTypes } from '../promo';
import radioPageContentPropTypes from './content';

export const radioPageDataPropTypes = shape({
  metadata: shape(mediaMetadataPropTypes).isRequired,
  content: shape(radioPageContentPropTypes).isRequired,
  promo: shape(mediaPromoPropTypes).isRequired,
});

const radioPagePropTypes = {
  isAmp: bool,
  data: radioPageDataPropTypes,
  service: string,
  status: number,
};

export default radioPagePropTypes;
