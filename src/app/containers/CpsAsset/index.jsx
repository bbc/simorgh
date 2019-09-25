/* eslint-disable react/prop-types */
import React from 'react';
import MediaPage from '../MediaPage';
import FrontPage from '../FrontPage';

const pages = {
  MAP: MediaPage,
  FIX: FrontPage,
};

const CpsAsset = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { type } = props.data.pageData.metadata;

  const Page = pages[type];

  return <Page {...props} pageType={type} />;
};

export default CpsAsset;
