import React, { useContext } from 'react';
import { objectOf, any } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const renderText = textBlocks => (
  <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />
);

const renderCaption = (block, imageCaptionOffscreenText, script) => (
  <Caption script={script}>
    {imageCaptionOffscreenText ? (
      <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
    ) : null}
    {renderText(block)}
  </Caption>
);

const renderMultipleCaptions = (blocks, imageCaptionOffscreenText, script) =>
  blocks.map(block =>
    renderCaption(
      deepGet(['model', 'blocks'], block),
      imageCaptionOffscreenText,
      script,
    ),
  );

const CaptionContainer = ({ block }) => {
  const { script, imageCaptionOffscreenText } = useContext(ServiceContext);

  return renderMultipleCaptions(
    deepGet(['model', 'blocks', 0, 'model', 'blocks'], block),
    imageCaptionOffscreenText,
    script,
  );
};

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
};

export default CaptionContainer;
