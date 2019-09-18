import React from 'react';
import { string } from 'prop-types';

/* eslint-disable react/no-danger */
const UnknownBlockContainer = () => (
  <div
    dangerouslySetInnerHTML={{ __html: `<!-- unknown block -->` }}
  />
);

export default UnknownBlockContainer;
