import React from 'react';
import { string, shape } from 'prop-types';
import articlePropTypes from '../../../models/propTypes/article';
import PageWrapper from '../../../Layouts/defaultPageWrapper';

const WithPageWrapper = Component => {
  const PageWrapperContainer = props => (
    <PageWrapper {...props}>
      <Component {...props} />
    </PageWrapper>
  );

  PageWrapperContainer.propTypes = {
    data: shape(articlePropTypes),
    bbcOrigin: string,
  };

  PageWrapperContainer.defaultProps = {
    data: null,
    bbcOrigin: null,
  };

  return PageWrapperContainer;
};

export default WithPageWrapper;
