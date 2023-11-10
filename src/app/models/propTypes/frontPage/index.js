import { arrayOf, bool, shape, string, number } from 'prop-types';
import { cpsFrontPageMetadataPropTypes } from '../metadata';
import { cpsFrontPagePromoPropTypes } from '../promo';
import groupsPropTypes from '../frontPageGroup';
import relatedContentPropTypes from '../relatedContent';

export const frontPageDataPropTypes = shape({
  metadata: shape(cpsFrontPageMetadataPropTypes).isRequired,
  content: shape({
    groups: arrayOf(shape(groupsPropTypes)).isRequired,
  }).isRequired,
  promo: shape(cpsFrontPagePromoPropTypes),
  relatedContent: shape(relatedContentPropTypes).isRequired,
});

const frontPagePropTypes = {
  isAmp: bool,
  isLow?: bool,
  data: frontPageDataPropTypes,
  service: string,
  status: number,
};

export default frontPagePropTypes;
