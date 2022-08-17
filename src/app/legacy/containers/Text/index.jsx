import React from 'react';
import { arrayOf, shape, string, objectOf, elementType } from 'prop-types';
import paragraph from '../Paragraph';
import unorderedList from '../BulletedList';
import Blocks from '../Blocks';

const TextContainer = ({ blocks, componentsToRender }) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

export const TextPropTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
    }),
  ).isRequired,
};

TextContainer.propTypes = {
  ...TextPropTypes,
  componentsToRender: objectOf(elementType),
};

TextContainer.defaultProps = {
  componentsToRender: {
    paragraph,
    unorderedList,
    orderedList: unorderedList,
  },
};

export default TextContainer;
