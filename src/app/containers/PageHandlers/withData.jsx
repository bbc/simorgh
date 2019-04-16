import React from 'react';
import { shape, element } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';

const logger = nodeLogger(__filename);

const WithData = Component => {
  const DataContainer = ({ data }) => {
    if (data) {
      const { data: articleData, status } = data;

      if (status && articleData && status === 200) {
        try {
          return <Component articleData={articleData} />;
        } catch (err) {
          logger.error(err);
          return <ErrorMain status={status} />;
        }
      }
    }

    DataContainer.propTypes = {
      data: shape(articlePropTypes),
    };

    DataContainer.defaultProps = {
      data: null,
    };

    return <ErrorMain status={500} />;
  };

  return DataContainer;
};

WithData.propTypes = {
  Component: element,
};

export default WithData;
