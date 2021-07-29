import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import paragraph from '../Paragraph';
import unorderedList from '../BulletedList';
import Blocks from '../Blocks';

const CpsTextContainer = ({ blocks, componentsToRender }) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

export const CpsTextPropTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
    }),
  ).isRequired,
};

CpsTextContainer.propTypes = {
  ...CpsTextPropTypes,
  componentsToRender: shape(),
};

CpsTextContainer.defaultProps = {
  componentsToRender: {
    paragraph,
    unorderedList,
    orderedList: unorderedList,
  },
};

export default CpsTextContainer;
