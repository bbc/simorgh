/** @jsxRuntime classic */
/** @jsx  jsx  */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '#app/legacy/containers/InlineContainer';
import Blocks from '#app/legacy/containers/Blocks';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { OptimoBlock } from '#app/models/types/optimo';
import { TypographyScript } from '#app/models/types/theming';
import styles from './index.style';

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
  script: TypographyScript,
  service: string,
  dir: string,
) => (
  <figcaption
    css={styles.captionStyles}
    script={script}
    service={service}
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

  return renderCaption(
    paragraphBlocks,
    offscreenText,
    script as TypographyScript,
    service,
    dir,
  );
};

type Props = {
  block: OptimoBlock;
  type: string;
};

export default CaptionContainer;
