import React, { useContext } from 'react';
import { any, arrayOf, shape, string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import deepGet from '../../lib/utilities/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const chooseOffscreenText = (
  mediaType,
  videoCaption,
  imageCaption,
  audioCaption,
  defaultText,
) => {
  switch (mediaType) {
    case 'video':
      return videoCaption;
    case 'image':
      return imageCaption;
    case 'audio':
      return audioCaption;
    default:
      return defaultText;
  }
};
const renderParagraph = paragraphBlock => {
  return (
    <p key={deepGet(['0', 'id'], paragraphBlock)}>
      <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
    </p>
  );
};

const renderCaption = (paragraphBlocks, offscreenText, script) => (
  <Caption script={script}>
    {offscreenText && <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>}
    {paragraphBlocks.map(block => {
      const paragraphBlock = deepGet(['model', 'blocks'], block);
      return renderParagraph(paragraphBlock);
    })}
  </Caption>
);

const CaptionContainer = ({ block, type }) => {
  const {
    script,
    imageCaptionOffscreenText,
    videoCaptionOffscreenText,
    defaultCaptionOffscreenText,
    audioCaptionOffscreenText,
  } = useContext(ServiceContext);
  const offscreenText = chooseOffscreenText(
    type,
    videoCaptionOffscreenText,
    imageCaptionOffscreenText,
    audioCaptionOffscreenText,
    defaultCaptionOffscreenText,
  );

  const paragraphBlocks = deepGet(
    ['model', 'blocks', 0, 'model', 'blocks'],
    block,
  );

  return renderCaption(paragraphBlocks, offscreenText, script);
};

CaptionContainer.propTypes = {
  block: shape({
    model: shape({
      blocks: arrayOf(any).isRequired,
    }).isRequired,
  }).isRequired,
  type: string.isRequired,
};

export default CaptionContainer;
