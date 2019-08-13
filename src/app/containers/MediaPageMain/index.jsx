import React, { Fragment, useContext } from 'react';
import { string, shape, object } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import MetadataContainer from '../Metadata';
import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';

const MediaPageMain = props => {
  const { pageData, service, match } = props;
  const { serviceId, mediaId } = match.params;
  const { script } = useContext(ServiceContext);
  const {
    content: {
      blocks: [{ text: title }, { text: subtitle }],
    },
    promo,
    metadata,
  } = pageData;

  return (
    <Fragment>
      <MetadataContainer metadata={metadata} promo={promo} />
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
    </Fragment>
  );
};

MediaPageMain.propTypes = {
  service: string.isRequired,
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
    }),
    promo: shape({
      subtype: string,
      name: string,
    }),
  }).isRequired,
  match: shape({
    params: shape({
      serviceId: string,
      mediaId: string,
    }),
  }).isRequired,
};

export default MediaPageMain;
