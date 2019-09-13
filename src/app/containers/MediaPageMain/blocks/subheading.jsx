import React from 'react';
import { SubHeading } from '@bbc/psammead-headings';

// eslint-disable-next-line react/prop-types
const SubheadingContainer = ({ uuid, script, service, idAttr, text }) => (
  <SubHeading key={uuid} script={script} service={service} id={idAttr}>
    {text}
  </SubHeading>
);

export default SubheadingContainer;
