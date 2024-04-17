import React from 'react';
import { BulletedListItem } from '#psammead/psammead-bulleted-list/src';
import { arrayOf, shape, string, oneOfType, bool, oneOf } from 'prop-types';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import inline from '../InlineContainer';

const withClickHandler = (Component, clickHandler) => props => (
  <Component {...props} onClick={clickHandler} />
);

const BulletedListItemContainer = ({ blocks, onClick }) => {
  const contentBlocks = blocks.map(block => block.model.blocks || block).flat();

  return (
    <BulletedListItem>
      <Blocks
        blocks={contentBlocks}
        componentsToRender={{
          fragment,
          inline,
          urlLink: onClick ? withClickHandler(InlineLink, onClick) : InlineLink,
        }}
      />
    </BulletedListItem>
  );
};

const FragmentPropTypes = {
  type: oneOf(['fragment']),
  model: shape({
    text: string.isRequired,
    attributes: arrayOf(string.isRequired).isRequired,
  }),
};

const InlineLinkPropTypes = {
  type: oneOf(['urlLink']),
  model: shape({
    locator: string.isRequired,
    isExternal: bool.isRequired,
    text: string,
    blocks: arrayOf(shape(FragmentPropTypes)).isRequired,
  }),
};

export const ParagraphPropTypes = {
  blocks: arrayOf(
    oneOfType([
      shape(FragmentPropTypes),
      shape(InlineLinkPropTypes),
      shape({
        type: oneOf(['inline']),
        model: shape({
          language: string.isRequired,
          text: string.isRequired,
          blocks: arrayOf(
            oneOfType([shape(FragmentPropTypes), shape(InlineLinkPropTypes)])
              .isRequired,
          ).isRequired,
        }),
      }),
    ]).isRequired,
  ).isRequired,
};

export const ListItemPropTypes = {
  blocks: arrayOf(
    shape({
      type: oneOf(['paragraph']),
      model: shape({
        text: string,
        ...ParagraphPropTypes,
      }),
    }),
  ).isRequired,
};

BulletedListItemContainer.propTypes = { ...ListItemPropTypes };

export default BulletedListItemContainer;
