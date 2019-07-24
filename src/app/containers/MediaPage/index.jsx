import React, { Fragment } from 'react';
import { string, shape } from 'prop-types';

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

MediaPageContainer.propTypes = {
  service: string.isRequired,
  match: shape({
    params: shape({
      serviceId: string,
      mediaId: string,
    }),
  }).isRequired,
};

export default MediaPageContainer;
