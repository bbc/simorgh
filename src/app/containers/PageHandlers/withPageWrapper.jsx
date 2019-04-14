import React from 'react';
import PageWrapper from '../Layouts';

const WithPageWrapper = Component => props => {
  return (
    <PageWrapper {...props}>
      <Component {...props} />
    </PageWrapper>
  );
};

export default WithPageWrapper;
