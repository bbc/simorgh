import React, { useContext } from 'react';
import { string } from 'prop-types';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import Copyright from '#psammead/psammead-copyright/src';
import { ServiceContext } from '../../../contexts/ServiceContext';

const CopyrightContainer = ({ children }) => {
  const { dir, imageCopyrightOffscreenText, lang } = useContext(ServiceContext);
  const copyrightProps = {
    position: dir === 'rtl' ? 'right' : 'left',
  };

  return (
    <Copyright {...copyrightProps}>
      {imageCopyrightOffscreenText ? (
        <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
      ) : null}
      {lang === 'en-GB' ? children : <span lang="en-GB">{children}</span>}
    </Copyright>
  );
};

CopyrightContainer.propTypes = {
  children: string.isRequired,
};

export default CopyrightContainer;
