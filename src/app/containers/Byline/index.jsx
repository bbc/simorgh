import React, { useContext } from 'react';
import Byline from '@bbc/psammead-byline';
import { ServiceContext } from '#contexts/ServiceContext';
import bylineBlockPropTypes from '#models/propTypes/byline';

const BylineContainer = ({ blocks }) => {
  const { service } = useContext(ServiceContext);

  if (!blocks) {
    return null;
  }

  const { name, title } = blocks[0];

  if (name && title) {
    return <Byline service={service} name={name} title={title} />;
  }
  return null;
};

BylineContainer.propTypes = bylineBlockPropTypes;

export default BylineContainer;
