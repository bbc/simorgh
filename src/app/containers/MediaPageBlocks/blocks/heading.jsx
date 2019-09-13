import React from 'react';
import { Headline } from '@bbc/psammead-headings';

// eslint-disable-next-line react/prop-types
const HeadingContainer = ({ uuid, script, service, idAttr, text }) => {
  if (!text) return null;

  return (
    <Headline key={uuid} script={script} service={service} id={idAttr}>
      {text}
    </Headline>
  );
};

export default HeadingContainer;
