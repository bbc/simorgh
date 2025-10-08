import React, { use } from 'react';
import { Helmet } from 'react-helmet';
import { ServiceContext } from '../../../contexts/ServiceContext';

const ManifestContainer = () => {
  const { manifestPath } = use(ServiceContext);

  if (!manifestPath) {
    return null;
  }

  return (
    <Helmet>
      <link rel="manifest" href={`${manifestPath}`} />
    </Helmet>
  );
};

export default ManifestContainer;
