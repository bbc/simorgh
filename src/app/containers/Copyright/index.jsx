import React from 'react';
import { string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Copyright from '../../components/Figure/Copyright';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

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
