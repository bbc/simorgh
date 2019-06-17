import React from 'react';
import { shape, element } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../lib/logger.node';
import deepGet from '../../lib/utilities/deepGet';

const logger = nodeLogger(__filename);

// checks for data and status keys, setting default status if not found
const constructRenderObject = data => ({
  status: deepGet(['status'], data) || 500,
  pageData: deepGet(['pageData'], data),
});

// checks for pageData and 200 status
const shouldRender = data => {
  const { status, pageData } = constructRenderObject(data);

  const hasDataAnd200Status = pageData && status === 200;

  return { hasDataAnd200Status, status, pageData };
};

const WithData = Component => {
  const DataContainer = ({ data, ...props }) => {
    const { hasDataAnd200Status, status, pageData } = shouldRender(data);
    if (hasDataAnd200Status) {
      try {
        return <Component pageData={pageData} {...props} />;
      } catch (err) {
        logger.error(err);
      }
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
