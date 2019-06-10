import React, { Fragment, useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = () => {
  const { brandName, brandSVG } = useContext(ServiceContext);
  const defaultBrandName = 'BBC News';
  let localisedBrandName;

  if (brandName !== defaultBrandName) {
    localisedBrandName = (
      <Fragment>
        <span lang="en_GB">{defaultBrandName}</span>
        {brandName.substring(
          brandName.indexOf(defaultBrandName) + defaultBrandName.length,
        )}
      </Fragment>
    );
  }

  return <Brand brandName={localisedBrandName || brandName} svg={brandSVG} />;
};

export default BrandContainer;
