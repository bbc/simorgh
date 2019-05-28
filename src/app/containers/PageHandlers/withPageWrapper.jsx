import React from 'react';
import { string, shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import PageWrapper from '../../Layouts/defaultPageWrapper';

const WithPageWrapper = Component => {
  const PageWrapperContainer = ({ data, bbcOrigin, service }) => (
    <PageWrapper data={data} bbcOrigin={bbcOrigin} service={service}>
      <Component data={data} bbcOrigin={bbcOrigin} service={service} />
    </PageWrapper>
  );

  PageWrapperContainer.propTypes = {
    data: shape(articlePropTypes),
    bbcOrigin: string,
    service: string.isRequired,
  };

  PageWrapperContainer.defaultProps = {
    data: null,
    bbcOrigin: null,
  };

  return PageWrapperContainer;
};

export default WithPageWrapper;
