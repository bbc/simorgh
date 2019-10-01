import { shape, arrayOf, oneOf } from 'prop-types';
import aresBlockPropTypes from './aresBlock';
import versionPropTypes from './version';

const radioPageContentPropTypes = {
  content: shape({
    blocks: arrayOf(oneOf([versionPropTypes, aresBlockPropTypes])).isRequired,
  }),
};

export default radioPageContentPropTypes;
