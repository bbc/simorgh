import React from 'react';
import { objectOf, any } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

// const renderText = block => {
//   const textBlocks = block.model.blocks[0].model.blocks[0].model.blocks;
//   return <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />;
// };

// const renderText = block => {
//   const textBlocks = block.model.blocks[0].model.blocks;
//   const blockArray = [];
//   for (let i = 0; i < textBlocks.length; i += 1) {
//     blockArray.push(
//       <Blocks
//         blocks={textBlocks[i].model.blocks}
//         componentsToRender={componentsToRender}
//       />,
//     );
//   }
//   return blockArray;
// };

const renderText = textBlocks => (
  <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />
);

const renderCaption = (block, imageCaptionOffscreenText) => (
  <Caption>
    {imageCaptionOffscreenText ? (
      <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
    ) : null}
    {renderText(block)}
  </Caption>
);

const renderMultipleCaptions = (block, imageCaptionOffscreenText) => {
  const { blocks } = block.model.blocks[0].model.blocks[0].model;
  const caption = renderCaption(blocks, imageCaptionOffscreenText);
  return caption;
};

const CaptionContainer = ({ block }) => (
  <ServiceContext.Consumer>
    {({ imageCaptionOffscreenText }) =>
      renderMultipleCaptions(block, imageCaptionOffscreenText)
    }
  </ServiceContext.Consumer>
);

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
};

export default CaptionContainer;
