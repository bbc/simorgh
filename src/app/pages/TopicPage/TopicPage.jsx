// render whatever data we get from getinitialdata i.e hello world

import React from 'react';

const TopicPage = ({ pageData }) => {
  return <div>{pageData.title}</div>;
};

export default TopicPage;
