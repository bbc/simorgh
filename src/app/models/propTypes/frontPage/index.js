import { arrayOf, bool, shape, string, number } from 'prop-types';
import { cpsMetadataPropTypes } from '../metadata';
import groupsPropTypes from '../frontPageGroup';
import relatedContentPropTypes from '../frontPageRelatedContent';

export const frontPageDataPropTypes = shape({
  metadata: shape(cpsMetadataPropTypes).isRequired,
  content: shape({
    groups: arrayOf(shape(groupsPropTypes)).isRequired,
  }).isRequired,
  promo: null,
  relatedContent: shape(relatedContentPropTypes).isRequired,
});

const frontPagePropTypes = {
  isAmp: bool,
  data: shape(frontPageDataPropTypes),
  service: string,
  status: number,
};

export default frontPagePropTypes;
