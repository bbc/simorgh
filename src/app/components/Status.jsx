import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

const Status = () => (
  <Fragment>
    <Helmet htmlAttributes={{ lang: 'en-GB' }}>
      <title>Status</title>
    </Helmet>
    <h1>200</h1>
  </Fragment>
);

export default Status;
