import React, { Fragment, useContext } from 'react';
import { string, shape } from 'prop-types';

import { ServiceContext } from '../../contexts/ServiceContext';

const MediaPageContainer = (props) => {
  const { service, match } = props;
  const context = useContext(ServiceContext);

  console.log('props', props);
  console.log('context', context);
  
  return (
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
  )
};

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
