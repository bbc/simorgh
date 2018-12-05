import React from 'react';
import { node, string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Caption from '../../components/Figure/Caption';
import Text from '../../components/Text';
import { ServiceContext } from '../../contexts/ServiceContext';

const CaptionWithOffscreenText = ({ children }) => (
  <ServiceContext.Consumer>
    {({ imageCaptionOffscreenText }) => (
      <Caption>
        {imageCaptionOffscreenText ? (
          <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
        ) : null}
        {children}
      </Caption>
    )}
  </ServiceContext.Consumer>
);

CaptionWithOffscreenText.propTypes = {
  children: node.isRequired,
};

const CaptionContainer = ({ captionValue }) => (
  <Text text={captionValue} paragraphOverride={CaptionWithOffscreenText} />
);

CaptionContainer.propTypes = {
  captionValue: string.isRequired,
};

export default CaptionContainer;
