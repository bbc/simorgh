import React, { useContext } from 'react';
import { any, arrayOf, shape, string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import pathOr from 'ramda/src/pathOr';
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
    <p key={pathOr(null, ['0', 'id'], paragraphBlock)}>
      <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
    </p>
  );
};

const renderCaption = (paragraphBlocks, offscreenText, script, service) => (
  <Caption script={script} service={service}>
    {offscreenText ? (
      <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>
    ) : null}
    {paragraphBlocks.map(block => {
      const paragraphBlock = pathOr(null, ['model', 'blocks'], block);
      return renderParagraph(paragraphBlock);
    })}
  </Caption>
);

const CaptionContainer = ({ block, type }) => {
  const {
    script,
    service,
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

  const paragraphBlocks = pathOr(
    null,
    ['model', 'blocks', 0, 'model', 'blocks'],
    block,
  );

  return renderCaption(paragraphBlocks, offscreenText, script, service);
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
