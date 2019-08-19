import React from 'react';
import { string } from 'prop-types';
import { dataPropType } from '../../../models/propTypes/data';
import PageWrapper from '../../../Layouts/defaultPageWrapper';

const WithPageWrapper = Component => {
  const PageWrapperContainer = props => (
    <PageWrapper {...props}>
      <Component {...props} />
    </PageWrapper>
  );

  PageWrapperContainer.propTypes = {
    data: dataPropType,
    bbcOrigin: string,
  };

  PageWrapperContainer.defaultProps = {
    data: null,
    bbcOrigin: null,
  };

  return PageWrapperContainer;
};

export default WithPageWrapper;
