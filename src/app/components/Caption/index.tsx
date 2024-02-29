/* eslint-disable import/order */
/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import Caption from '#psammead/psammead-caption/src';
import pathOr from 'ramda/src/pathOr';

import { ServiceContext } from '#app/contexts/ServiceContext';
import Fragment from '#app/legacy/containers/Fragment';
import Inline from '#app/legacy/containers/PodcastPromo/Inline';
import InlineLink from '../InlineLink';
import { InferProps } from 'prop-types';
import { textBlockPropTypes } from '#app/models/propTypes/text';
import Blocks from '#app/legacy/containers/Blocks';
import VisuallyHiddenText from '../VisuallyHiddenText';

const componentsToRender = {
  fragment: Fragment,
  urlLink: InlineLink,
  inline: Inline,
};

const chooseOffscreenText = (
  mediaType: string,
  videoCaption: string,
  imageCaption: string,
  audioCaption: string,
  defaultText: string,
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

const renderParagraph = (block: TextBlock) => {
  const paragraphBlock = pathOr(null, ['model', 'blocks'], block);

  if (!paragraphBlock) return null;

  return (
    <p key={pathOr(null, ['0', 'id'], paragraphBlock)}>
      <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
    </p>
  );
};

const renderCaption = (
  paragraphBlocks: TextBlock[],
  offscreenText: string,
  script: unknown,
  service: string,
  dir: string,
) => (
  <Caption script={script} service={service} dir={dir}>
    <span role="text">
      {offscreenText && (
        <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>
      )}
      {paragraphBlocks.map((block: TextBlock) => renderParagraph(block))}
    </span>
  </Caption>
);

const CaptionContainer = ({ block, type }: Props) => {
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

  if (!paragraphBlocks) return null;

  return renderCaption(paragraphBlocks, offscreenText, script, service, dir);
};

type TextBlock = InferProps<typeof textBlockPropTypes>;

type Props = {
  block: TextBlock[];
  type: string;
};

export default CaptionContainer;
