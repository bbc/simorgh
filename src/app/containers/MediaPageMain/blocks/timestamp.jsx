import React from 'react';
import Timestamp from '../../ArticleTimestamp';

// eslint-disable-next-line react/prop-types
const TimestampContainer = props => (
  <Timestamp {...props} withGridWrapper={false} />
);

export default TimestampContainer;
