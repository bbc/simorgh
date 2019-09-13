import React from 'react';
import ParagraphComponent from '@bbc/psammead-paragraph';

// eslint-disable-next-line react/prop-types
const ParagraphContainer = ({ uuid, script, service, idAttr, text }) => (
  <ParagraphComponent key={uuid} script={script} service={service} id={idAttr}>
    {text}
  </ParagraphComponent>
);

export default ParagraphContainer;
