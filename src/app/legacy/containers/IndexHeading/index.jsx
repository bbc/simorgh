import React, { use } from 'react';
import IndexHeading from '#psammead/psammead-heading-index/src';
import { ServiceContext } from '../../../contexts/ServiceContext';

const IndexHeadingContainer = ({ children = null, ...props }) => {
  const { script, service, dir } = use(ServiceContext);

  return (
    <IndexHeading 
      script={script} 
      service={service} 
      dir={dir} 
      className="pb-triple group-3:py-triple group-3:pb-full group-4:pt-triple group-4:pb-0 group-5:w-full group-5:mx-auto group-5:max-w-[80rem]"
      {...props}
    >
      {children}
    </IndexHeading>
  );
};

export default IndexHeadingContainer;
