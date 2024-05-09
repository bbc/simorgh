import React from 'react';
import PageWrapper from '../../../../components/PageLayoutWrapper';

const WithPageWrapper = Component => {
  const PageWrapperContainer = props => (
    <PageWrapper {...props}>
      <Component {...props} />
    </PageWrapper>
  );

  return PageWrapperContainer;
};

export default WithPageWrapper;
