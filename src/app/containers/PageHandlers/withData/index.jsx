import React, { useContext } from 'react';
import { element, string, number } from 'prop-types';
import { pageDataPropType } from '../../../models/propTypes/data';
import ErrorPage from '#pages/ErrorPage';
import { ServiceContext } from '../../../contexts/ServiceContext';
import shouldRender from './shouldRender';

const WithData = Component => {
  const DataContainer = ({ pageData, status, ...props }) => {
    const { service } = props;
    const { passportHomes } = useContext(ServiceContext) || {};
    const {
      hasData200StatusAndCorrectService,
      status: statusCode,
    } = shouldRender({ pageData, status }, service, passportHomes);

    if (hasData200StatusAndCorrectService) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorPage errorCode={statusCode} />;
  };

  DataContainer.propTypes = {
    pageData: pageDataPropType,
    status: number.isRequired,
    service: string,
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
