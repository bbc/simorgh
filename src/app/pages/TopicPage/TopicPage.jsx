// render whatever data we get from getinitialdata i.e hello world

import React from 'react';
import { string } from 'prop-types';
import TopicGrid from './TopicGrid';

const TopicPage = ({ pageData }) => {
  return (
    <>
      <div>{pageData.title}</div>
      <TopicGrid />
    </>
  );
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
