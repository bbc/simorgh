import React from 'react';
import { objectOf, any, bool } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const renderText = textBlocks => (
  <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />
);

const renderCaption = (block, captionOffscreenText) => (
  <Caption>
    {captionOffscreenText ? (
      <VisuallyHiddenText>{captionOffscreenText}</VisuallyHiddenText>
    ) : null}
    {renderText(block)}
  </Caption>
);

const renderMultipleCaptions = (blocks, captionOffscreenText) =>
  blocks.map(block =>
    renderCaption(deepGet(['model', 'blocks'], block), captionOffscreenText),
  );

const CaptionContainer = ({ block, video }) => (
  <ServiceContext.Consumer>
    {video
      ? ({ videoCaptionOffscreenText }) =>
          renderMultipleCaptions(
            deepGet(['model', 'blocks', 0, 'model', 'blocks'], block),
            videoCaptionOffscreenText,
          )
      : ({ imageCaptionOffscreenText }) =>
          renderMultipleCaptions(
            deepGet(['model', 'blocks', 0, 'model', 'blocks'], block),
            imageCaptionOffscreenText,
          )}
  </ServiceContext.Consumer>
);

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
  video: bool,
};

CaptionContainer.defaultProps = {
  video: false,
};

export default CaptionContainer;
