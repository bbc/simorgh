import React, { useContext } from 'react';
import { element, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { dataPropType } from '../../../models/propTypes/data';
import ErrorMain from '../../ErrorMain';
import {
  getPassportHome,
  isValidPassportHome,
} from '../../../lib/utilities/passport';
import { ServiceContext } from '../../../contexts/ServiceContext';

// checks for data, status, setting default status if not found
const constructRenderObject = data => ({
  status: pathOr(null, ['status'], data) || 500,
  pageData: pathOr(null, ['pageData'], data),
});

// checks for pageData, 200 status and if home service from article data fits the service locale
export const shouldRender = (data, service, passportHomesOverride = []) => {
  const { status, pageData } = constructRenderObject(data);

  let statusCode = status;
  let isCorrectService;

  const hasDataAnd200Status = pageData && status === 200;
  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    isCorrectService = isValidPassportHome(passportHome, service);
    if (!isCorrectService) {
      (passportHomesOverride || []).forEach(serviceHome => {
        isCorrectService = isValidPassportHome(passportHome, serviceHome);
      });
    }
    statusCode = !isCorrectService ? 404 : status;
  }

  return {
    hasData200StatusAndCorrectService: hasDataAnd200Status && isCorrectService,
    status: statusCode,
    pageData,
  };
};

export const WithData = Component => {
  const DataContainer = ({ data, ...props }) => {
    const { service } = props;
    const { passportHomes } = useContext(ServiceContext) || {};
    const {
      hasData200StatusAndCorrectService,
      status,
      pageData,
    } = shouldRender(data, service, passportHomes);

    if (hasData200StatusAndCorrectService) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorMain status={status} />;
  };

  DataContainer.propTypes = {
    data: dataPropType,
    service: string,
  };

  DataContainer.defaultProps = {
    data: null,
    service: 'default',
  };

  return DataContainer;
};

WithData.propTypes = {
  Component: element,
};

export default WithData;
