import React from 'react';
import { string } from 'prop-types';
import Copyright from '../../components/Figure/Copyright';
import { ServiceContextConsumer } from '../../components/ServiceContext';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';

const CopyrightContainer = ({ children }) => (
  <Copyright>
    <ServiceContextConsumer>
      {({ imageCopyrightOffscreenText }) =>
        imageCopyrightOffscreenText ? (
          <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
        ) : null
      }
    </ServiceContextConsumer>
    {children}
  </Copyright>
);

CopyrightContainer.propTypes = {
  children: string.isRequired,
};

export default CopyrightContainer;
