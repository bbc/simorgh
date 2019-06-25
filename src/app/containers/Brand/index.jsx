import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = props => {
  const { brandName, brandSVG, service } = useContext(ServiceContext);

  return (
    <Brand
      product={brandName}
      svg={brandSVG}
      serviceLocalisedName={service}
      svgHeight={24}
      maxWidth={280}
      minWidth={180}
      url={`/${service}`}
      {...props}
    />
  );
};

export default BrandContainer;
