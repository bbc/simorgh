import React from 'react';
import { objectOf, any } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

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

const renderMultipleCaptions = (blocks, imageCaptionOffscreenText) =>
  blocks.map(block =>
    renderCaption(block.model.blocks, imageCaptionOffscreenText),
  );

const CaptionContainer = ({ block }) => (
  <ServiceContext.Consumer>
    {({ imageCaptionOffscreenText }) =>
      renderMultipleCaptions(
        block.model.blocks[0].model.blocks,
        imageCaptionOffscreenText,
      )
    }
  </ServiceContext.Consumer>
);

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
};

export default CaptionContainer;
