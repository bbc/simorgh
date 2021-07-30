import React from 'react';
import { oneOfType, shape, oneOf, string, arrayOf } from 'prop-types';
import paragraph from '../Paragraph';
import Blocks from '../Blocks';
import unorderedList, { ListPropTypes } from '../BulletedList';
import { ParagraphPropTypes } from '../BulletedListItem';

const componentsToRender = {
  paragraph,
  unorderedList,
  orderedList: unorderedList,
};

const TextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

TextContainer.propTypes = {
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

export default TextContainer;
