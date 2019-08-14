import { shape, arrayOf, oneOf } from 'prop-types';
import aresBlockPropTypes from './aresBlock';
import versionPropTypes from './version';

const mediaPageContentPropTypes = {
  content: shape({
    blocks: arrayOf(oneOf([versionPropTypes, aresBlockPropTypes])).isRequired,
  }),
};

export default mediaPageContentPropTypes;
