import React from 'react';
import { StyleSheetManager } from 'styled-components';
import stylisRTLPlugin from 'stylis-rtl';
import { ServiceContext } from '../../../contexts/ServiceContext';

const StyledComponentsSheetManager = () => {
  const { dir } = React.useContext(ServiceContext);
  let props = {};

  if (dir === 'rtl') {
    props = { stylisPlugins: [stylisRTLPlugin] };
  }
  return <StyleSheetManager {...props} />;
};

export default StyledComponentsSheetManager;
