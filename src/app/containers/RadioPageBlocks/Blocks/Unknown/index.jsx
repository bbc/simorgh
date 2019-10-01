import React from 'react';

/* eslint-disable react/no-danger */
const UnknownBlockContainer = () => (
  // eslint-disable-next-line jam3/no-sanitizer-with-danger
  <div dangerouslySetInnerHTML={{ __html: `<!-- unknown block -->` }} />
);

export default UnknownBlockContainer;
