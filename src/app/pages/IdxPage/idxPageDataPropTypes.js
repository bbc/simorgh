import { arrayOf, bool, shape, string, number } from 'prop-types';
import { cpsFrontPageMetadataPropTypes } from '#models/propTypes/metadata';
import groupsPropTypes from '#models/propTypes/frontPageGroup';

export const idxPageDataPropTypes = shape({
  metadata: shape(cpsFrontPageMetadataPropTypes).isRequired,
  content: shape({
    groups: arrayOf(shape(groupsPropTypes)).isRequired,
  }).isRequired,
});

const frontPagePropTypes = {
  isAmp: bool,
  data: idxPageDataPropTypes,
  service: string,
  status: number,
};

export default frontPagePropTypes;
