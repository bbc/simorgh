import React from 'react';
import { articleDataPropTypes } from '#models/propTypes/article';

import { Helmet } from 'react-helmet';

const ArticleMain = ({ articleData: data }) => {
  return (
    <>
      <Helmet>
        <script
          async
          custom-element="amp-script"
          src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
        ></script>
      </Helmet>

      <amp-script
        layout="container"
        data-ampdevmode="true" // bypasses amp checks such as is on https and js size
        sandbox="allow-forms" // allows form input like buttons
        src={`http://localhost:7080/amp-script/testingFetch.js`}
      >
        {/* Root Div for react app to render into */}
        <div id="root">phan</div>
      </amp-script>
    </>
  );
};
ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};
export default ArticleMain;
