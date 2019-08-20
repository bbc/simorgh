import React, { Fragment, useContext } from 'react';
import { string, shape, object } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';

import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';
import aresBlockPropTypes from '../../models/propTypes/mediaPage/content/aresBlock';

const renderBlock = ({ block, script, service, key }) => {
  const Component = {
    heading: Headline,
    paragraph: Paragraph,
  }[block.type];

  if (!Component) {
    return null;
  }

  return (
    <Component script={script} service={service} key={key}>
      {block.text}
    </Component>
  );
};

renderBlock.propTypes = {
  block: aresBlockPropTypes.isRequired,
  script: string.isRequired,
  service: string.isRequired,
  key: string.isRequired,
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
    <Fragment>
      <ATIAnalytics data={pageData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        <Grid>
          <GridItemConstrainedMedium>
            {blocks.map(block => {
              return renderBlock({ block, script, service, key: block.text });
            })}
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
