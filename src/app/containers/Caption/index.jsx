import React from 'react';
import { objectOf, any, bool } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const renderText = block => {
  const textBlocks = block.model.blocks[0].model.blocks[0].model.blocks;

  return <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />;
};

const renderVisuallyHiddenText = (imageCaption, video, videoCaption) => {
  let rendered = null;
  if (video) {
    rendered = <VisuallyHiddenText>{videoCaption}</VisuallyHiddenText>;
  }

  if (!video && imageCaption) {
    rendered = <VisuallyHiddenText>{imageCaption}</VisuallyHiddenText>;
  }

  return rendered;
};

const CaptionContainer = ({ block, video }) => (
  <ServiceContext.Consumer>
    {({ imageCaptionOffscreenText, videoCaptionOffscreenText }) => (
      <Caption>
        {renderVisuallyHiddenText(
          imageCaptionOffscreenText,
          video,
          videoCaptionOffscreenText,
        )}
        {renderText(block)}
      </Caption>
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
