import React, { useContext } from 'react';
import ErrorPage from '#pages/ErrorPage/ErrorPage';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../contexts/RequestContext';
import shouldRender from './shouldRender';

const WithData = Component => {
  const DataContainer = ({ pageData = null, status, ...props }) => {
    const { service = 'news', location: { pathname } = {} } = props;
    const { passportHomes } = useContext(ServiceContext) || {};
    const { pageType } = useContext(RequestContext);
    const { hasRequestSucceeded, status: statusCode } = shouldRender(
      { pageData, status },
      service,
      pathname,
      pageType,
      passportHomes,
    );

    if (hasRequestSucceeded) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorPage errorCode={statusCode} />;
  };

  return DataContainer;
};

export default WithData;
