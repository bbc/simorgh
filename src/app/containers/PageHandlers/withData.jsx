import React, { useContext } from 'react';
import { shape, element } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import getPassportHome from '../../lib/utilities/getPassportHome';

// checks for data, status, setting default status if not found
const constructRenderObject = data => ({
  status: deepGet(['status'], data) || 500,
  pageData: deepGet(['pageData'], data),
});

const validatePassportHome = passportHome => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { service } = useContext(ServiceContext);

  return passportHome ? passportHome === service : true;
};

// checks for pageData, 200 status and if home service from article data fits the service locale
const shouldRender = data => {
  const { status, pageData } = constructRenderObject(data);

  let statusCode = status;
  let isCorrectService;

  const hasDataAnd200Status = pageData && status === 200;
  if (hasDataAnd200Status) {
    const passportHome = getPassportHome(pageData);
    isCorrectService = validatePassportHome(passportHome);
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
    const {
      hasData200StatusAndCorrectService,
      status,
      pageData,
    } = shouldRender(data);

    if (hasData200StatusAndCorrectService) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorMain status={status} />;
  };

  DataContainer.propTypes = {
    data: shape(articlePropTypes),
  };

  DataContainer.defaultProps = {
    data: null,
  };

  return DataContainer;
};

WithData.propTypes = {
  Component: element,
};

export default WithData;
