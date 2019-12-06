import React from 'react';
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
        <meta name="simorghstuff" content="Helmet khoaphanmetadata" />

        <style type="text/css" amp-custom>{`
          .khoaphan {
              background-color: blue;
          }
        `}</style>
        <script></script>
      </Helmet>

      <amp-script
        layout="container"
        data-ampdevmode="true" // bypasses amp checks such as is on https and js size
        sandbox="allow-forms" // allows form input like buttons
        src={`http://localhost:7080/amp-script/testingStyledComp.js`}
      >
        <button>testing my lazers</button>
        {/* Root Div for react app to render into */}
        <div id="root"></div>
      </amp-script>
    </>
  );
};

export default ArticleMain;
