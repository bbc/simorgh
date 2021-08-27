import React from 'react';
import { arrayOf, shape, string, objectOf, elementType } from 'prop-types';
import paragraph from '../Paragraph';
import unorderedList from '../BulletedList';
import Blocks from '../Blocks';

const CpsTextContainer = ({ blocks, componentsToRender }) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

CpsTextContainer.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
    }),
  ),
  componentsToRender: objectOf(elementType),
};

CpsTextContainer.defaultProps = {
  blocks: null,
  componentsToRender: {
    paragraph,
    unorderedList,
    orderedList: unorderedList,
  },
};

export default CpsTextContainer;
