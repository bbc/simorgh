import React from 'react';
import ParagraphComponent from '@bbc/psammead-paragraph';
import FragmentContainer from '../../Fragment';

/* eslint-disable */ 
// TO DO figure out prop type warnings
const ParagraphContainer = ({
  uuid,
  script,
  service,
  idAttr,
  textBlocks,
}) => (
  <ParagraphComponent key={uuid} script={script} service={service} id={idAttr}>
    {textBlocks.map(({ text, attributes }) => (
      <FragmentContainer text={text} attributes={attributes} />
    ))}
  </ParagraphComponent>
);

export default ParagraphContainer;
