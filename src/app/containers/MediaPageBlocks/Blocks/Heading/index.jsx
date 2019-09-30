import React, { useContext } from 'react';
import { string } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import { ServiceContext } from '#contexts/ServiceContext';

const HeadingContainer = ({ idAttr, text }) => {
  const { script, service } = useContext(ServiceContext);

  if (!text) return null;

  return (
    <Headline script={script} service={service} id={idAttr} tabIndex="-1">
      {text}
    </Headline>
  );
};

HeadingContainer.propTypes = {
  idAttr: string,
  text: string.isRequired,
};

HeadingContainer.defaultProps = {
  idAttr: null,
};

export default HeadingContainer;
