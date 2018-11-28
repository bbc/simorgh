import React from 'react';
import { node, string } from 'prop-types';
import Caption from '../../components/Figure/Caption';
import Text from '../../components/Text';
import { ServiceContext } from '../../components/ServiceContext';

const CaptionWithOffscreenText = ({ children }) => (
  <ServiceContext.Consumer>
    {({ imageCaptionOffscreenText }) => (
      <Caption offscreenTextPrefix={imageCaptionOffscreenText}>
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
