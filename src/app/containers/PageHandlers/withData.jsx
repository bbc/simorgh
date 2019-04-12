import React from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';

const WithData = Component => {
  return function WithDataComponent({ data }) {
    if (data) {
      const { data: articleData, status } = data;
      try {
        return status === 200 && articleData ? (
          <Component articleData={articleData} />
        ) : (
          <ErrorMain status={status} />
        );
      } catch {
        return <ErrorMain status={status} />;
      }
    }

    return <ErrorMain status={status} />;
  };
};

WithData.propTypes = {
  data: shape(articlePropTypes),
};

WithData.defaultProps = {
  data: null,
};

export default WithData;
