import React, { useContext } from 'react';
import { any, arrayOf, shape, string } from 'prop-types';
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
  const key = paragraphBlock?.[0]?.id || null;
  return (
    <p key={key}>
      <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
    </p>
  );
};
const renderCaption = (paragraphBlocks, offscreenText, script, service) => (
  <Caption script={script} service={service}>
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
  } = useContext(ServiceContext);
  const offscreenText = chooseOffscreenText(
    type,
    videoCaptionOffscreenText,
    imageCaptionOffscreenText,
    audioCaptionOffscreenText,
    defaultCaptionOffscreenText,
  );

  const paragraphBlocks = block?.model?.blocks?.[0]?.model?.blocks || null;
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
