import React from 'react';
import { arrayOf, oneOfType, shape, oneOf, string } from 'prop-types';
import paragraph from '../Paragraph';
import unorderedList, { ListPropTypes } from '../BulletedList';
import { ParagraphPropTypes } from '../BulletedListItem';
import Blocks from '../Blocks';

// Render orderedLists as unorderedLists for now.
const componentsToRender = {
  paragraph,
  unorderedList,
  orderedList: unorderedList,
};

const CpsTextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

export const CpsTextPropTypes = {
  blocks: arrayOf(
    oneOfType([
      shape({
        type: oneOf(['unorderedList', 'orderedList']).isRequired,
        model: shape(ListPropTypes),
      }),
      shape({
        type: oneOf(['paragraph']),
        model: shape({
          text: string,
          ...ParagraphPropTypes,
        }),
      }),
    ]).isRequired,
  ).isRequired,
};

CpsTextContainer.propTypes = {
  ...CpsTextPropTypes,
};

export default CpsTextContainer;
