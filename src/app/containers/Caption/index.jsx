import React from 'react';
import { objectOf, any } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '@bbc/psammead-caption';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import Fragment from '../Fragment';
import InlineLink from '../InlineLink';

const componentsToRender = { fragment: Fragment, urlLink: InlineLink };

const renderText = block => {
  const textBlocks = block.model.blocks[0].model.blocks[0].model.blocks;

  return <Blocks blocks={textBlocks} componentsToRender={componentsToRender} />;
};

const CaptionContainer = ({ block }) => (
  <ServiceContextConsumer>
    {({ imageCaptionOffscreenText, script }) => (
      <Caption script={script}>
        {imageCaptionOffscreenText ? (
          <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
        ) : null}
        {renderText(block)}
      </Caption>
    )}
  </ServiceContextConsumer>
);

CaptionContainer.propTypes = {
  block: objectOf(any).isRequired,
};

export default CaptionContainer;
