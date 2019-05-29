import { arrayOf, bool, shape, string, number } from 'prop-types';
import metadataPropTypes from '../frontPageMetadata';
import groupsPropTypes from '../frontPageGroup';
import relatedContentPropTypes from '../frontPageRelatedContent';

export const frontPageDataPropTypes = {
  metadata: shape(metadataPropTypes).isRequired,
  content: shape({
    groups: arrayOf(shape(groupsPropTypes)).isRequired,
  }).isRequired,
  promo: null,
  relatedContent: shape(relatedContentPropTypes).isRequired,
};

const frontPagePropTypes = {
  isAmp: bool,
  data: shape(frontPageDataPropTypes),
  service: string,
  status: number,
};

export default frontPagePropTypes;
