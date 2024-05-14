import React from 'react';
import PageWrapper from '../../../../components/PageLayoutWrapper';

const WithPageWrapper = Component => {
  const PageWrapperContainer = ({
    pageData = null,
    status = null,
    bbcOrigin = null,
    ...props
  }) => (
    <PageWrapper pageData={pageData} status={status} {...props}>
      <Component
        pageData={pageData}
        status={status}
        bbcOrigin={bbcOrigin}
        {...props}
      />
    </PageWrapper>
  );

  return PageWrapperContainer;
};

export default WithPageWrapper;
