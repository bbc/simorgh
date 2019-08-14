import { bool, shape, string, number } from 'prop-types';
import { mediaMetadataPropTypes } from '../metadata';
import { mediaPromoPropTypes } from '../promo';
import mediaPageContentPropTypes from './content';

export const mediaPageDataPropTypes = shape({
  metadata: shape(mediaMetadataPropTypes).isRequired,
  content: shape(mediaPageContentPropTypes).isRequired,
  promo: shape(mediaPromoPropTypes).isRequired,
});

const mediaPagePropTypes = {
  isAmp: bool,
  data: mediaPageDataPropTypes,
  service: string,
  status: number,
};

export default mediaPagePropTypes;
