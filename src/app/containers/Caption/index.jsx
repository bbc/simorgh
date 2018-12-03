import React from 'react';
import { node } from 'prop-types';
import Caption from '../../components/Figure/Caption';
import { ServiceContext } from '../../components/ServiceContext';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';

const CaptionContainer = ({ captionValue }) => (
  <ServiceContext.Consumer>
    {({ imageCaptionOffscreenText }) => (
      <Caption>
        {imageCaptionOffscreenText ? (
          <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
        ) : null}
        {captionValue}
      </Caption>
    )}
  </ServiceContext.Consumer>
);

CaptionContainer.propTypes = {
  captionValue: node.isRequired,
};

export default CaptionContainer;
