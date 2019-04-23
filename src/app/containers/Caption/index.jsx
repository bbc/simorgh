import React from 'react';
import { objectOf, any, string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import nanoid from 'nanoid';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const chooseOffscreenText = (mediaType, videoCaption, imageCaption) => {
  let offscreenText = '';
  if (mediaType === 'video') {
    offscreenText = videoCaption;
  } else if (mediaType === 'image') {
    offscreenText = imageCaption;
  } else {
    offscreenText = false;
  }
  return offscreenText;
};

const renderText = textBlocks => (
  <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />
);

const renderCaption = (block, captionOffscreenText, key) => (
  <Caption key={key}>
    {captionOffscreenText ? (
      <VisuallyHiddenText>{captionOffscreenText}</VisuallyHiddenText>
    ) : null}
    {renderText(block)}
  </Caption>
);

const renderMultipleCaptions = (blocks, type) => {
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
    renderCaption(deepGet(['model', 'blocks'], block), offscreenText, nanoid()),
  );
};

const CaptionContainer = ({ block, type }) =>
  renderMultipleCaptions(
    deepGet(['model', 'blocks', 0, 'model', 'blocks'], block),
    type,
  );

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
  type: string,
};

CaptionContainer.defaultProps = {
  type: '',
};

export default CaptionContainer;
