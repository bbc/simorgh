import React from 'react';

/* eslint-disable react/prop-types, react/no-danger */
const UnknownBlockContainer = ({ blockType }) => (
  <div
    dangerouslySetInnerHTML={{ __html: `<!-- unknown block ${blockType} -->` }}
  />
);

export default UnknownBlockContainer;
