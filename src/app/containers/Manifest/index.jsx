import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { ServiceContext } from '../../contexts/ServiceContext';

const ManifestContainer = () => {
  const { manifestPath, service } = useContext(ServiceContext);
  return (
    <Helmet>
      {manifestPath ? (
        <link rel="manifest" href={`/${service}${manifestPath}`} />
      ) : (
        <link rel="manifest" href={`/${service}/articles/manifest.json`} />
      )}
    </Helmet>
  );
};

export default ManifestContainer;
