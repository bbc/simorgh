import React from 'react';
import { string } from 'prop-types';

/* eslint-disable react/no-danger */
const UnknownBlockContainer = ({ blockType }) => (
  <div
    dangerouslySetInnerHTML={{ __html: `<!-- unknown block ${blockType} -->` }}
  />
);

UnknownBlockContainer.propTypes = {
  blockType: string.isRequired,
};

export default UnknownBlockContainer;
