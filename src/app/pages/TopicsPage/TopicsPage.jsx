// render whatever data we get from getinitialdata i.e hello world

import React from 'react';

const TopicsPage = ({ pageData }) => {
  return <div>{pageData.title}</div>;
};

export default TopicsPage;
