import React from 'react';
import Timestamp from '../../ArticleTimestamp';

// eslint-disable-next-line react/prop-types
const TimestampContainer = props => (
  <div>
    <Timestamp {...props} withGridWrapper={false} />
  </div>
);

export default TimestampContainer;
