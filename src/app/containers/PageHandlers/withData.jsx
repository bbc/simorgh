import React from 'react';
import { shape, element } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';

const logger = nodeLogger(__filename);

const WithData = Component => {
  const DataContainer = ({ data, ...props }) => {
    if (data) {
      const { status } = data;

      if (status && data.data && status === 200) {
        try {
          return <Component assetData={data.data} {...props} />;
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
