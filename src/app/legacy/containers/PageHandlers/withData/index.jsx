import React, { useContext } from 'react';
import { element, string, number, shape } from 'prop-types';
import ErrorPage from '#pages/ErrorPage/ErrorPage';
import { pageDataPropType } from '#models/propTypes/data';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../contexts/RequestContext';
import shouldRender from './shouldRender';

const WithData = Component => {
  const DataContainer = ({ pageData, status, ...props }) => {
    const { service, location: { pathname } = {} } = props;
    const { passportHomes } = useContext(ServiceContext) || {};
    const { pageType } = useContext(RequestContext);
    const { hasData200StatusAndCorrectService, status: statusCode } =
      shouldRender(
        { pageData, status },
        service,
        pathname,
        pageType,
        passportHomes,
      );

    if (hasData200StatusAndCorrectService) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorPage errorCode={statusCode} />;
  };

  DataContainer.propTypes = {
    pageData: pageDataPropType,
    status: number.isRequired,
    service: string,
    location: shape({ pathname: string }).isRequired,
  };

  DataContainer.defaultProps = {
    pageData: null,
    service: 'default',
  };

  return DataContainer;
};

WithData.propTypes = {
  Component: element,
};

export default WithData;
