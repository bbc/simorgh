import React, { useContext } from 'react';
import { string, shape } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';

import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';

const MediaPageMain = props => {
  const { service, match } = props;
  const { brandName, script } = useContext(ServiceContext);

  return (
    <main role="main">
      <Grid>
        <GridItemConstrainedMedium>
          <Headline script={script} service={service}>
            {brandName} - Live Radio
          </Headline>
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
    </main>
  );
};

MediaPageMain.propTypes = {
  service: string.isRequired,
  match: shape({
    params: shape({
      serviceId: string,
      mediaId: string,
    }),
  }).isRequired,
};

export default MediaPageMain;
