import { bool, shape, string, number } from 'prop-types';
import { cpsAssetPageMetadataPropTypes } from '../metadata';
import { cpsAssetPagePromoPropTypes } from '../promo';
import mainContentPropTypes from '../mainContent';
import relatedContentPropTypes from '../relatedContent';

export const cpsAssetPageDataPropTypes = shape({
  metadata: shape(cpsAssetPageMetadataPropTypes).isRequired,
  content: shape({
    model: shape(mainContentPropTypes).isRequired,
  }).isRequired,
  promo: shape(cpsAssetPagePromoPropTypes),
  relatedContent: shape(relatedContentPropTypes).isRequired,
});

const cpsAssetPagePropTypes = {
  isAmp: bool,
  isLow: bool,
  data: cpsAssetPageDataPropTypes,
  service: string,
  status: number,
};

export default cpsAssetPagePropTypes;
