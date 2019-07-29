import React, { useContext } from 'react';
import { string, shape } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import pathOr from 'ramda/src/pathOr';

import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';

const MediaPageMain = props => {
  const { service, match } = props;
  const { serviceId, mediaId } = match.params;
  const { script, translations } = useContext(ServiceContext);

  const { title, subtitle } = pathOr(null, ['media', serviceId], translations);

  return (
    <main role="main">
      <Grid>
        <GridItemConstrainedMedium>
          <Headline script={script} service={service}>
            {title}
          </Headline>
          <Paragraph script={script} service={service}>
            {subtitle}
          </Paragraph>
          <ul>
            <li>
              <strong>Service</strong>: {service}
            </li>
            <li>
              <strong>Brand</strong>: {serviceId}
            </li>
            <li>
              <strong>MediaId</strong>: {mediaId}
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
