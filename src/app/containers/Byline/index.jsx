import React, { useContext } from 'react';
import Byline from '@bbc/psammead-byline';
import { ServiceContext } from '#contexts/ServiceContext';
import { string } from 'prop-types';

const BylineContainer = ({ blocks }) => {
  if (!blocks) {
    return null;
  }

  const { service } = useContext(ServiceContext);

  const { name, title } = blocks[0];

  if (name && title) {
    return <Byline service={service} name={name} title={title} />;
  }
  return null;
};

BylineContainer.propTypes = {
  name: string,
  title: string,
};

export default BylineContainer;
