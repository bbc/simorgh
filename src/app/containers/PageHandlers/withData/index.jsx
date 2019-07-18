import React from 'react';
import { shape, element, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import articlePropTypes from '../../../models/propTypes/article';
import ErrorMain from '../../ErrorMain';
import getPassportHome from '../../../lib/utilities/getPassportHome';

// checks for data, status, setting default status if not found
const constructRenderObject = data => ({
  status: pathOr(null, ['status'], data) || 500,
  pageData: pathOr(null, ['pageData'], data),
});

const isValidPassportHome = (passportHome, service) =>
  passportHome ? passportHome === service : true;

// checks for pageData, 200 status and if home service from article data fits the service locale
const shouldRender = (data, service) => {
  const { status, pageData } = constructRenderObject(data);

  let statusCode = status;
  let isCorrectService;

  const hasDataAnd200Status = pageData && status === 200;
  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    isCorrectService = isValidPassportHome(passportHome, service);
    statusCode = !isCorrectService ? 404 : status;
  }

  return {
    hasData200StatusAndCorrectService: hasDataAnd200Status && isCorrectService,
    status: statusCode,
    pageData,
  };
};

const WithData = Component => {
  const DataContainer = ({ data, ...props }) => {
    const { service } = props;
    const {
      hasData200StatusAndCorrectService,
      status,
      pageData,
    } = shouldRender(data, service);

    if (hasData200StatusAndCorrectService) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorMain status={status} />;
  };

  DataContainer.propTypes = {
    data: shape(articlePropTypes),
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
