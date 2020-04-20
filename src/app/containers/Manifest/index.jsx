import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';

const ManifestContainer = () => {
  const { manifestPath, service } = useContext(ServiceContext);

  if (!manifestPath) {
    return null;
  }

  return (
    <Helmet>
      <link rel="manifest" href={`/${service}${manifestPath}`} />
    </Helmet>
  );
};

export default ManifestContainer;
