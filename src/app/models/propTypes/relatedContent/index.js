import { shape, array } from 'prop-types';
import sectionPropTypes from '../frontPageSection';
import sitePropTypes from '../frontPageSite';

const relatedContentPropTypes = {
  section: shape(sectionPropTypes).isRequired,
  site: shape(sitePropTypes).isRequired,
  groups: array,
};

export default relatedContentPropTypes;
