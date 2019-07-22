/* eslint-disable */
import React from 'react';

const MediaPageContainer = ({ service, match }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export default MediaPageContainer;
