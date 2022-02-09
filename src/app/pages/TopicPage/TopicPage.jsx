// render whatever data we get from getinitialdata i.e hello world

import React from 'react';
import { string } from 'prop-types';
import TopicGrid from './TopicGrid';

const TopicPage = ({ pageData, promos }) => {
  return (
    <>
      <div>{pageData.title}</div>
      <TopicGrid promos={promos} />
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
