import React from 'react';
import Helmet from 'react-helmet';
import onClient from '#lib/utilities/onClient';

const NoJsContainer = () => {
  const htmlAttributes = {
    class: onClient() ? 'js' : 'no-js',
  };
  return <Helmet htmlAttributes={htmlAttributes} />;
};

export default NoJsContainer;
