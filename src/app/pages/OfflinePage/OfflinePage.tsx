import { RequestContext } from '#app/contexts/RequestContext';
import React, { useContext } from 'react';

const OfflinePage = () => {
  const { service } = useContext(RequestContext);

  return (
    <div>
      <h1>Offline Page</h1>
      {service}
      <p>This page is displayed when the user is offline.</p>
    </div>
  );
};

export default OfflinePage;
