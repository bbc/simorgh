import React, { use } from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';

const TopicTitle = ({ children }) => {
  const { script, service } = use(ServiceContext);
  return (
    <h1 
      className="text-canon font-sans font-bold text-grey-10 m-0 group-4:inline-block" 
      id="content" 
      tabIndex="-1"
    >
      {children}
    </h1>
  );
};

export default TopicTitle;
