import React, { useContext } from 'react';
import { oneOfType, object, arrayOf, shape, string } from 'prop-types';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import Caption from '#psammead/psammead-caption/src';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '../InlineContainer';

const componentsToRender = {
  fragment: Fragment,
  urlLink: InlineLink,
  inline: Inline,
};

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
const renderParagraph = block => {
  const paragraphBlock = pathOr(null, ['model', 'blocks'], block);
  return (
    <p key={pathOr(null, ['0', 'id'], paragraphBlock)}>
      <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
    </p>
  );
};
const renderCaption = (
  paragraphBlocks,
  offscreenText,
  script,
  service,
  dir,
) => (
  <Caption script={script} service={service} dir={dir}>
    {offscreenText && <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>}
    {paragraphBlocks.map(block => renderParagraph(block))}
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
    dir,
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

  return renderCaption(paragraphBlocks, offscreenText, script, service, dir);
};

CaptionContainer.propTypes = {
  block: shape({
    model: shape({
      blocks: arrayOf(oneOfType([string, object])).isRequired,
    }).isRequired,
  }).isRequired,
  type: string.isRequired,
};

export default CaptionContainer;
