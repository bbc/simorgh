import React from 'react';
import { string, number, any } from 'prop-types';
import PageWrapper from '../../../Layouts/defaultPageWrapper';

const WithPageWrapper = Component => {
  const PageWrapperContainer = props => (
    <PageWrapper {...props}>
      <Component {...props} />
    </PageWrapper>
  );

  PageWrapperContainer.propTypes = {
    pageData: any, // eslint-disable-line
    status: number.isRequired,
    bbcOrigin: string,
  };

  PageWrapperContainer.defaultProps = {
    pageData: null,
    bbcOrigin: null,
  };

  return PageWrapperContainer;
};

export default WithPageWrapper;
