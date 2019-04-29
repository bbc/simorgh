import React, { useContext } from 'react';
import { objectOf, any } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import Paragraph from '@bbc/psammead-paragraph';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const renderParagraph = paragraphBlock => (
  <Paragraph key={deepGet([0, 'model', 'text'], paragraphBlock)}>
    <Blocks blocks={paragraphBlock} componentsToRender={componentsToRender} />
  </Paragraph>
);

const renderCaption = (paragraphBlocks, imageCaptionOffscreenText, script) => (
  <Caption script={script}>
    {imageCaptionOffscreenText ? (
      <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
    ) : null}
    {paragraphBlocks.map(block => {
      const paragraphBlock = deepGet(['model', 'blocks'], block);
      return renderParagraph(paragraphBlock);
    })}
  </Caption>
);

const CaptionContainer = ({ block }) => {
  const { script, imageCaptionOffscreenText } = useContext(ServiceContext);
  const paragraphBlocks = deepGet(
    ['model', 'blocks', 0, 'model', 'blocks'],
    block,
  );

  return renderCaption(paragraphBlocks, imageCaptionOffscreenText, script);
};

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
};

export default CaptionContainer;
