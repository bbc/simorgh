import { bool, shape, string, number, any } from 'prop-types';
import mainContentPropTypes from '../mainContent';
import cpsAssetPagePromoPropTypes from '../cpsAssetPagePromo';
import relatedContentPropTypes from '../frontPageRelatedContent'; // TODO: check is relatedContent is consistent on frontpage and CpsAsset

export const cpsAssetPageDataPropTypes = shape({
  metadata: any, // TODO: define metadata props for CPS Asset
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
