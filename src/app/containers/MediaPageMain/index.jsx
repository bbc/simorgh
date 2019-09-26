import React from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import path from 'ramda/src/path';
import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import { Grid, GridItemConstrainedMedium } from '#lib/styledGrid';
import Blocks from '../Blocks';
import headings from '../Headings';
import text from '../Text';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
};

const MediaPageMain = ({ pageData }) => {
  const blocks = path(['content', 'blocks'], pageData);
  const promo = path(['promo'], pageData);
  const metadata = path(['metadata'], pageData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <Grid as="main" role="main">
        <GridItemConstrainedMedium>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GridItemConstrainedMedium>
      </Grid>
    </>
  );
};

MediaPageMain.propTypes = {
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
    }),
    promo: shape({
      subtype: string,
      name: string,
    }),
    content: shape({
      blocks: arrayOf(
        shape({
          uuid: string,
          id: string,
          externalId: string,
          text: string,
          type: string,
        }),
      ),
    }),
  }).isRequired,
};

export default MediaPageMain;
