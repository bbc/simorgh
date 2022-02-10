// render whatever data we get from getinitialdata i.e hello world

import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import TopicGrid from './TopicGrid';

const TopicPage = ({ pageData }) => {
  return (
    <>
      <div>{pageData.title}</div>
      <TopicGrid promos={pageData.promos} />
    </>
  );
};

TopicPage.propTypes = {
  pageData: shape({
    title: string.isRequired,
    promos: arrayOf(shape({})).isRequired,
  }).isRequired,
};

export default TopicPage;
