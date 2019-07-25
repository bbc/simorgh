import React, { useContext } from 'react';
import { string, shape } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';

import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';

const LiveRadioPage = props => {
  const { service, match } = props;
  const { brandName } = useContext(ServiceContext);

  return (
    <Grid>
      <GridItemConstrainedMedium>
        <Headline service={service}>{brandName} - Live Radio</Headline>
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
      </GridItemConstrainedMedium>
    </Grid>
  );
};

LiveRadioPage.propTypes = {
  service: string.isRequired,
  match: shape({
    params: shape({
      serviceId: string,
      mediaId: string,
    }),
  }).isRequired,
};

export default LiveRadioPage;
