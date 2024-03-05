/* eslint-disable jsx-a11y/aria-role */
/** @jsxRuntime classic */
/** @jsx  jsx  */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Inline from '#app/legacy/containers/InlineContainer';
import Blocks from '#app/legacy/containers/Blocks';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { OptimoBlock } from '#app/models/types/optimo';
import styles from './index.style';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

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

const renderParagraph = (block: OptimoBlock) => {
  const paragraphBlock = pathOr(null, ['model', 'blocks'], block);

  if (!paragraphBlock) return null;

  return (
    <p key={pathOr(null, ['0', 'id'], paragraphBlock)}>
      <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
    </p>
  );
};

const renderCaption = (
  paragraphBlocks: OptimoBlock[],
  offscreenText: string,
  dir: string,
) => (
  <figcaption
    css={[
      styles.captionStyles,
      dir === 'rtl' ? styles.rtlStyles : styles.ltrStyles,
    ]}
    dir={dir}
  >
    <span role="text">
      {offscreenText && (
        <VisuallyHiddenText>{offscreenText}</VisuallyHiddenText>
      )}
      {paragraphBlocks.map((block: OptimoBlock) => renderParagraph(block))}
    </span>
  </figcaption>
);

const CaptionContainer = ({ block, type }: Props) => {
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

  return renderCaption(paragraphBlocks, offscreenText, dir);
};

type Props = {
  block: OptimoBlock;
  type: string;
};

export default CaptionContainer;
