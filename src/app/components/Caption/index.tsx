/* eslint-disable jsx-a11y/aria-role */
import React, { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Blocks from '#app/legacy/containers/Blocks';
import { OptimoBlock } from '#app/models/types/optimo';
import DecoratedInline from '../DecoratedInline';
import VisuallyHiddenText from '../VisuallyHiddenText';
import Fragment from '../Fragment';
import Text from '../Text';
import DecoratedInlineLink from '../DecoratedInlineLink';

const componentsToRender = {
  fragment: Fragment,
  urlLink: DecoratedInlineLink,
  inline: DecoratedInline,
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

const renderParagraph = (block: OptimoBlock) => {
  const paragraphBlock = pathOr(null, ['model', 'blocks'], block);

  if (!paragraphBlock) return null;

  return (
    <span
      data-testid="caption-paragraph"
      key={pathOr(null, ['0', 'id'], paragraphBlock)}
    >
      <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
    </span>
  );
};

const renderCaption = (
  paragraphBlocks: OptimoBlock[],
  offscreenText: string,
  dir: string,
  className?: string,
) => (
  <Text
    className={`${className || ''} text-grey-6 dark:text-grey-3 mt-full w-[calc(100%-0.5rem)] border-l-[0.0625rem] border-metal dark:border-grey-3 px-full mx-full group-2:w-[calc(100%-1.5rem)] group-2:mx-6 group-2:px-full group-4:w-full group-4:mt-full group-4:mx-0 group-4:px-full [&>span>p]:pb-triple [&>span>p]:m-0 [&>span>p:last-child]:pb-0`}
    size="longPrimer"
    fontVariant="sansRegular"
    as="figcaption"
    dir={dir}
  >
    <span role="text">
      {offscreenText && (
        <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>
      )}
      {paragraphBlocks.map((block: OptimoBlock) => renderParagraph(block))}
    </span>
  </Text>
);

const CaptionContainer = ({ block, type, className }: Props) => {
  const {
    imageCaptionOffscreenText,
    videoCaptionOffscreenText,
    defaultCaptionOffscreenText,
    audioCaptionOffscreenText,
    dir,
  } = use(ServiceContext);

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

  return renderCaption(paragraphBlocks, offscreenText, dir, className);
};

type Props = {
  block: OptimoBlock;
  type: string;
  className?: string;
};

export default CaptionContainer;
