// render whatever data we get from getinitialdata i.e hello world

import React from 'react';
import { string } from 'prop-types';

const TopicPage = ({ pageData }) => {
  return <div>{pageData.title}</div>;
};

TopicPage.propTypes = {
  pageData: {},
  title: string,
};

TopicPage.defaultProps = {
  pageData: {},
  title: '',
};

export default TopicPage;
