import { bool, shape, string, number, any } from 'prop-types';
// import { cpsMetadataPropTypes } from '../metadata';
import mainContentPropTypes from '../mainContent';
import cpsAssetPagePromoPropTypes from '../cpsAssetPagePromo';

// if we can reuse `frontPageRelatedContent` then change it to be `cpsAssetPageRelatedContent`
import relatedContentPropTypes from '../frontPageRelatedContent';

export const cpsAssetPageDataPropTypes = shape({
  // metadata: shape(cpsMetadataPropTypes).isRequired,
  metadata: any,
  content: shape({
    model: shape(mainContentPropTypes).isRequired,
  }).isRequired,
  promo: cpsAssetPagePromoPropTypes,
  relatedContent: shape(relatedContentPropTypes).isRequired,
});

const cpsAssetPagePropTypes = {
  isAmp: bool,
  data: cpsAssetPageDataPropTypes,
  service: string,
  status: number,
};

export default cpsAssetPagePropTypes;
