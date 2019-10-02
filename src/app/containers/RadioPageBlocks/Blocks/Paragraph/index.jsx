import React, { useContext } from 'react';
import { string } from 'prop-types';
import ParagraphComponent from '@bbc/psammead-paragraph';
import { ServiceContext } from '#contexts/ServiceContext';

const ParagraphContainer = ({ idAttr, text }) => {
  const { script, service } = useContext(ServiceContext);

  if (!text) return null;

  return (
    <ParagraphComponent script={script} service={service} id={idAttr}>
      {text}
    </ParagraphComponent>
  );
};

ParagraphContainer.propTypes = {
  idAttr: string,
  text: string.isRequired,
};

ParagraphContainer.defaultProps = {
  idAttr: null,
};

export default ParagraphContainer;
