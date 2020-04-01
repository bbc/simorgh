import React from 'react';
import { string, number } from 'prop-types';
import { pageDataPropType } from '#models/propTypes/data';
import PageWrapper from '../../../Layouts/defaultPageWrapper';

const WithPageWrapper = (Component) => {
  const PageWrapperContainer = (props) => (
    <PageWrapper {...props}>
      <Component {...props} />
    </PageWrapper>
  );

  PageWrapperContainer.propTypes = {
    pageData: pageDataPropType,
    status: number,
    bbcOrigin: string,
  };

  PageWrapperContainer.defaultProps = {
    pageData: null,
    status: null,
    bbcOrigin: null,
  };

  return PageWrapperContainer;
};

export default WithPageWrapper;
