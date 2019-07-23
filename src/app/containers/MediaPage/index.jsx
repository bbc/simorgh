/* eslint-disable */
import React, { Fragment } from 'react';

const MediaPageContainer = ({ service, match }) => (
  <Fragment>
    <h1>Media Page</h1>
    <ul>
      <li>
        <strong>Service</strong>: {service}
      </li>
      <li>
        <strong>Brand</strong>: {match.params.serviceId}
      </li>
      <li>
        <strong>MediaId</strong>: {match.params.mediaId}
      </li>
    </ul>
  </Fragment>
);

export default MediaPageContainer;
