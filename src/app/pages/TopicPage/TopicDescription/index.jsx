import React, { use } from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';

const TopicDescription = ({ children }) => {
  const { service, script } = use(ServiceContext);

  return (
    <p className="text-great-primer font-sans font-normal text-grey-10 pt-double m-0 group-3:pt-triple group-4:w-1/2 group-4:pr-full">
      {children}
    </p>
  );
};

export default TopicDescription;
