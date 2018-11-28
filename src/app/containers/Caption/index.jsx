import React from 'react';
import { node, string } from 'prop-types';
import CaptionComponent from '../../components/Figure/Caption';
import Text from '../../components/Text';
import { ServiceContext } from '../../components/ServiceContext';

const CaptionWithOffscreenText = ({ children }) => (
  <ServiceContext.Consumer>
    {({ imageCaptionOffscreenText }) => (
      <CaptionComponent offscreenTextPrefix={imageCaptionOffscreenText}>
        {children}
      </CaptionComponent>
    )}
  </ServiceContext.Consumer>
);

CaptionWithOffscreenText.propTypes = {
  children: node.isRequired,
};

const Caption = ({ captionValue }) => (
  <Text text={captionValue} paragraphOverride={CaptionWithOffscreenText} />
);

Caption.propTypes = {
  captionValue: string.isRequired,
};

export default Caption;
