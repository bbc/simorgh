import { shape, string, arrayOf, oneOf } from 'prop-types';
import aresBlockPropTypes from './aresBlock';

const versionPropTypes = {
  id: string.isRequired,
  type: string.isRequired,
  format: string.isRequired,
  title: string.isRequired,
  caption: string.isRequired,
  versions: arrayOf(
    shape({
      versionId: string.isRequired,
    }),
  ),
};

const mediaPageContentPropTypes = {
  content: shape({
    blocks: arrayOf(oneOf([versionPropTypes, aresBlockPropTypes])).isRequired,
  }),
};

export default mediaPageContentPropTypes;
