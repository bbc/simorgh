import React from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';

const logger = nodeLogger(__filename);

const WithData = Component => ({ data }) => {
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

  return <ErrorMain status={500} />;
};

WithData.propTypes = {
  data: shape(articlePropTypes),
};

WithData.defaultProps = {
  data: null,
};

export default WithData;
