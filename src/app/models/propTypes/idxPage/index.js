import { arrayOf, shape } from 'prop-types';
import { cpsFrontPageMetadataPropTypes } from '#models/propTypes/metadata';
import groupsPropTypes from '#models/propTypes/frontPageGroup';

const idxPageDataPropTypes = shape({
  metadata: shape(cpsFrontPageMetadataPropTypes).isRequired,
  content: shape({
    groups: arrayOf(shape(groupsPropTypes)).isRequired,
  }).isRequired,
});

export default idxPageDataPropTypes;
