import React from 'react';
import { Helmet } from 'react-helmet';
import * as Amp from 'react-amphtml';
import styled from 'styled-components';
// import MostRead fro

const Headline = styled.h1`
  color: red;
  ${({ text }) => text && `color: blue;`}
  font-size: 100px
  display: block; /* Explicitly set */
`;

const AMP_ACCESS_DATA = endpoint => ({
  authorization: endpoint,
  noPingback: true,
});
const AMP_ACCESS_FETCH = endpoint => (
  <script id="amp-access" type="application/json">
    {JSON.stringify(AMP_ACCESS_DATA(endpoint))}
  </script>
);
const HeadlineWrapper = ({ records }) => {
  return <Headline>{records}</Headline>;
};

const ArticleMain = ({ articleData: data }) => {
  return (
    <>
      <Helmet>
        <script
          async
          custom-element="amp-script"
          src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
        ></script>
        <script
          async
          custom-element="amp-list"
          src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
        ></script>
        <script
          async
          custom-template="amp-mustache"
          src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
        ></script>
        <script
          async
          custom-element="amp-access"
          src="https://cdn.ampproject.org/v0/amp-access-0.1.js"
        ></script>
        {AMP_ACCESS_FETCH(
          'http://localhost:7080/amp-script/mostReadLocal.json',
        )}

        <meta name="simorghstuff" content="Helmet khoaphanmetadata" />
      </Helmet>

      <section amp-access="totalRecords > 0">
        <h2>totalRecods exists and is available</h2>
        <Amp.Template
          specName="default"
          type="amp-mustache"
          amp-access-template="true"
        >
          <Headline text="{{lastRecordTimeStamp}}">
            lastRecordTimeStamp: {typeof '{{lastRecordTimeStamp}}'}
          </Headline>

          <HeadlineWrapper records="{{records}}" />
          <Headline>generated: {'{{generated}}'}</Headline>
        </Amp.Template>
      </section>
      <amp-script
        layout="container"
        data-ampdevmode="true" // bypasses amp checks such as is on https and js size
        sandbox="allow-forms" // allows form input like buttons
        src={`http://localhost:7080/amp-script/testingFetch.js`}
      >
        <button>testing my lazers</button>
        {/* Root Div for react app to render into */}
        <div id="root"></div>
      </amp-script>
    </>
  );
};

export default ArticleMain;
