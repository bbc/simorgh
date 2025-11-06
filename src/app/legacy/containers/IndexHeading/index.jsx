import React, { use } from 'react';
import IndexHeading from '#psammead/psammead-heading-index/src';
import { ServiceContext } from '../../../contexts/ServiceContext';

const IndexHeadingContainer = ({ children = null, ...props }) => {
  const { dir } = use(ServiceContext);

  return (
    <IndexHeading dir={dir} {...props}>
      {children}
    </IndexHeading>
  );
};

export default IndexHeadingContainer;
