import React, { useContext } from 'react';
import { string } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';

const CopyrightContainer = ({ children }) => {
  const { dir, imageCopyrightOffscreenText, lang } = useContext(ServiceContext);
  const copyrightProps = {
    position: dir === 'rtl' ? 'right' : 'left',
  };

  return <p>Copyright</p>;
};

CopyrightContainer.propTypes = {
  children: string.isRequired,
};

export default CopyrightContainer;
