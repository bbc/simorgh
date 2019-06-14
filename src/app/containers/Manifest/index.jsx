import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';

const ManifestContainer = ({ service }) => {
  const { manifestPath } = useContext(ServiceContext);
  return (
    <Helmet>
      <link rel="manifest" href={`/${service}/articles/manifest.json`} />
      <link rel="manifest" href={`/${service}${manifestPath}`} />
    </Helmet>
  );
};

ManifestContainer.propTypes = {
  service: string.isRequired,
};

export default ManifestContainer;
