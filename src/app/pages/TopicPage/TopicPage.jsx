// render whatever data we get from getinitialdata i.e hello world

import React from 'react';

const TopicPage = ({ pageData }) => {
  return (
    <div>
      {pageData.thisIsA} {pageData.randoMoji}
    </div>
  );
};

TopicPage.propTypes = {
  pageData: {},
};

TopicPage.defaultProps = {
  pageData: {},
};

export default TopicPage;
