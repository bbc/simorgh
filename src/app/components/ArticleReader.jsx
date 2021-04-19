import React from 'react';

const ArticleReader = ({ service, assetUri }) => {
  return (
    <audio
      controls
      src={`add-endpoint-here?service=${service}&assetUri=${assetUri}`}
    />
  );
};

export default ArticleReader;
