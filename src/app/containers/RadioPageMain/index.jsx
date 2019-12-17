import React from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import path from 'ramda/src/path';
import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import { Grid, GridItemConstrainedLarge } from '#lib/styledGrid';
import LinkedData from '../LinkedData';
import RadioPageBlocks from '../RadioPageBlocks';

const RadioPageMain = ({ pageData }) => {
  const blocks = path(['content', 'blocks'], pageData);
  const promo = path(['promo'], pageData);
  const metadata = path(['metadata'], pageData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <MetadataContainer
        title={promo.name}
        lang={metadata.language}
        description={promo.summary}
        openGraphType="website"
      />
      <LinkedData type="RadioChannel" seoTitle={promo.name} />

      <Grid as="main" role="main">
        <GridItemConstrainedLarge>
          <RadioPageBlocks blocks={blocks} />
        </GridItemConstrainedLarge>
      </Grid>
    </>
  );
};

RadioPageMain.propTypes = {
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

export default RadioPageMain;
