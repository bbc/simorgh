import React, { useContext } from 'react';
import { shape, element } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import { getArticleHomeService } from '../PageViewAnalytics/labelHelpers/article';

const logger = nodeLogger(__filename);

// checks for data, status & home keys, setting default status if not found
const constructRenderObject = data => ({
  status: deepGet(['status'], data) || 500,
  pageData: deepGet(['pageData'], data),
  home: deepGet(['pageData', 'metadata', 'passport', 'home'], data),
});

// checks for pageData, 200 status and if home service from article data fits the service locale
const shouldRender = data => {
  const { status, pageData } = constructRenderObject(data);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { service } = useContext(ServiceContext);

  const hasDataAnd200Status = pageData && status === 200;
  const homeService = pageData && getArticleHomeService(pageData);

  const isValidHome = pageData && homeService === service;

  return {
    hasDataAnd200Status,
    isValidHome,
    status,
    pageData,
  };
};

const WithData = Component => {
  const DataContainer = ({ data, ...props }) => {
    const { hasDataAnd200Status, isValidHome, status, pageData } = shouldRender(
      data,
    );
    if (hasDataAnd200Status && isValidHome) {
      try {
        return <Component pageData={pageData} {...props} />;
      } catch (err) {
        logger.error(err);
      }
    }

    const statusCode = hasDataAnd200Status && !isValidHome ? 404 : status;

    return <ErrorMain status={statusCode} />;
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
