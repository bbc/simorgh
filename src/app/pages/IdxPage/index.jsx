import React from 'react';

const IdxPage = ({ pageData }) => {
  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>
      {console.log('pageData---', pageData)}
      <div>{pageData}</div>
    </main>
  );
};

export default IdxPage;
