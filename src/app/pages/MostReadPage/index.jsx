import React, { useContext } from 'react';
import { string } from 'prop-types';
import MostRead from '../../containers/MostRead';
import { ServiceContext } from '#contexts/ServiceContext';

const MostReadContainer = ({ mostReadEndpointOverride }) => {
  const { mostRead } = useContext(ServiceContext);
  console.log(mostRead);
  return (
    <div style={{ maxWidth: '1280px', margin: '32px auto' }}>
      <MostRead mostReadEndpointOverride={mostReadEndpointOverride} />
    </div>
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
};

export default MostReadContainer;
