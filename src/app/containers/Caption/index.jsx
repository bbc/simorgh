import React, { useContext } from 'react';
import { oneOfType, object, arrayOf, shape, string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import { ServiceContext } from '#contexts/ServiceContext';
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
  const paragraphBlock = block?.model?.blocks || null;
  return (
    <p key={paragraphBlock?.[0]?.id || null}>
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

  const paragraphBlocks = block?.model?.blocks?.[0]?.model?.blocks || null;

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
