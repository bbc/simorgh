import React, { useContext } from 'react';
import Byline from '#legacy/psammead-byline/src';
import { ServiceContext } from '#contexts/ServiceContext';
import bylineBlockPropTypes from '#models/propTypes/byline';
import { GridItemMedium } from '#app/components/Grid';

const BylineContainer = ({ blocks, className }) => {
  const { service, script } = useContext(ServiceContext);

  if (!blocks) {
    return null;
  }

  const { name, title } = blocks[0];

  return (
    <GridItemMedium className={className}>
      <Byline service={service} name={name} title={title} script={script} />
    </GridItemMedium>
  );
};

BylineContainer.propTypes = {
  ...bylineBlockPropTypes,
};

export default BylineContainer;
