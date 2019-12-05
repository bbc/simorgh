import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

const NoJsContainer = () => {
  const [htmlClassName, setHtmlClassName] = useState('no-js');

  useEffect(() => {
    setHtmlClassName('js');
  }, []);

  return (
    <Helmet
      htmlAttributes={{
        class: htmlClassName,
      }}
    />
  );
};

export default NoJsContainer;
