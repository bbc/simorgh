import React from 'react';

import MostReadContainer from '#containers/MostRead';

const MostReadPage = ({ pageData, mostReadEndpointOverride }) => {
  return (
    <main>
      <MostReadContainer
        mostReadEndpointOverride={mostReadEndpointOverride}
        constrainMaxWidth
        pageData={pageData}
      />
    </main>
  );
};

export default MostReadPage;
