import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { ServiceContext } from '../../../contexts/ServiceContext';

const ManifestContainer = () => {
  const { manifestPath } = useContext(ServiceContext);

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
