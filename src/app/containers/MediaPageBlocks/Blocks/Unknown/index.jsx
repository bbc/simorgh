import React from 'react';

/* eslint-disable react/no-danger */
const UnknownBlockContainer = () => (
  <div dangerouslySetInnerHTML={{ __html: `<!-- unknown block -->` }} />
);

export default UnknownBlockContainer;
