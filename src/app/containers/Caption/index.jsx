import React, { useContext } from 'react';
import { objectOf, any, string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const chooseOffscreenText = (mediaType, videoCaption, imageCaption) => {
  let offscreenText = 'Caption, ';
  if (mediaType === 'video') {
    offscreenText = videoCaption;
  }
  if (mediaType === 'image') {
    offscreenText = imageCaption;
  }

  return offscreenText;
};

const renderText = textBlocks => (
  <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />
);

const renderCaption = (block, captionOffscreenText, script) => (
  <Caption key={deepGet(['model', 'text'], block)} script={script}>
    {captionOffscreenText ? (
      <VisuallyHiddenText>{captionOffscreenText}</VisuallyHiddenText>
    ) : null}
    {renderText(block)}
  </Caption>
);

const renderMultipleCaptions = (blocks, type, script) => {
  const {
    videoCaptionOffscreenText,
    imageCaptionOffscreenText,
  } = React.useContext(ServiceContext);

  const offscreenText = chooseOffscreenText(
    type,
    videoCaptionOffscreenText,
    imageCaptionOffscreenText,
  );

  return blocks.map(block =>
    renderCaption(deepGet(['model', 'blocks'], block), offscreenText, script),
  );
};

const CaptionContainer = ({ block, type }) => {
  const { script } = useContext(ServiceContext);
  return renderMultipleCaptions(
    deepGet(['model', 'blocks', 0, 'model', 'blocks'], block),
    type,
    script,
  );
};

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
  type: string,
};

CaptionContainer.defaultProps = {
  type: '',
};

export default CaptionContainer;
