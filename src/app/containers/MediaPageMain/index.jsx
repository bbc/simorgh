import React, { useContext } from 'react';
import { string, shape, object } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';

import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';

const renderBlock = ({ script, service }) => block => {
  const Component = {
    heading: Headline,
    paragraph: Paragraph,
  }[block.type];

  if (!Component) {
    return null;
  }

  const props = {
    script,
    service,
    key: block.text,
  };

  if (block.type === 'heading') {
    props.id = 'content';
  }

  return <Component {...props}>{block.text}</Component>;
};

const MediaPageMain = props => {
  const { pageData, service, match } = props;
  const { serviceId, mediaId } = match.params;
  const { script } = useContext(ServiceContext);
  const {
    content: { blocks },
    promo,
    metadata,
  } = pageData;

  return (
    <>
      <ATIAnalytics data={pageData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        <Grid>
          <GridItemConstrainedMedium>
            {blocks.map(renderBlock({ script, service }))}
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
    </>
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
