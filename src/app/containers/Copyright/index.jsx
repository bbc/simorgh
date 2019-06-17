import React, { useContext } from 'react';
import { string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Copyright from '@bbc/psammead-copyright';
import { ServiceContext } from '../../contexts/ServiceContext';

const CopyrightContainer = ({ children }) => {
  const { imageCopyrightOffscreenText, dir } = useContext(ServiceContext);
  const copyrightProps = {
    position: dir === 'rtl' ? 'right' : 'left',
  };

  return (
    <Copyright {...copyrightProps}>
      {imageCopyrightOffscreenText ? (
        <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
      ) : null}
      {children}
    </Copyright>
  );
};

CopyrightContainer.propTypes = {
  children: string.isRequired,
};

export default CopyrightContainer;
