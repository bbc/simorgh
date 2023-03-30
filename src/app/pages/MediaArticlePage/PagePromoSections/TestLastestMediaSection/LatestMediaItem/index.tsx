import React from 'react';
import { LatestMediaItemProp } from '../LatestMediaTypes';

const LatestMediaItem = ({ item }: LatestMediaItemProp) => {
  return (
    <div>
      {item.description}
      <hr />
    </div>
  );
};

export default LatestMediaItem;
