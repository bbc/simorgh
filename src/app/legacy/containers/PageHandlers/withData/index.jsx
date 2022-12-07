import React, { useContext } from 'react';
import { element, string, number, bool } from 'prop-types';
import ErrorPage from '#pages/ErrorPage/ErrorPage';
import { pageDataPropType } from '#models/propTypes/data';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import shouldRender from './shouldRender';

const WithData = Component => {
  const DataContainer = ({ pageData, status, ...props }) => {
    const { service, isNextJs } = props;
    const { passportHomes } = useContext(ServiceContext) || {};
    const { hasData200StatusAndCorrectService, status: statusCode } =
      shouldRender({ pageData, status }, service, passportHomes);

    // TODO: Remove boolean check for NextJS when we have real data coming back
    if (hasData200StatusAndCorrectService || isNextJs) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorPage errorCode={statusCode} />;
  };

  DataContainer.propTypes = {
    pageData: pageDataPropType,
    status: number.isRequired,
    service: string,
    isNextJs: bool,
  };

  DataContainer.defaultProps = {
    pageData: null,
    service: 'default',
    isNextJs: false,
  };

  return DataContainer;
};

WithData.propTypes = {
  Component: element,
};

export default WithData;
