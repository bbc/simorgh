/* eslint-disable jsx-a11y/aria-role */
/** @jsxRuntime classic */
/** @jsx  jsx  */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Blocks from '#app/legacy/containers/Blocks';
import { OptimoBlock } from '#app/models/types/optimo';
import DecoratedInline from '../DecoratedInline';
import VisuallyHiddenText from '../VisuallyHiddenText';
import styles from './index.style';
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
    className={className}
    css={styles.captionStyles}
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

  return renderCaption(paragraphBlocks, offscreenText, dir, className);
};

type Props = {
  block: OptimoBlock;
  type: string;
  className?: string;
};

export default CaptionContainer;
