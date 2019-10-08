import React from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import path from 'ramda/src/path';
import { Grid, GridItemConstrainedMedium } from '#lib/styledGrid';
import CpsAssetPageBlocks from '../CpsAssetPageBlocks';

const CpsAssetPageMain = ({ pageData }) => {
  const blocks = path(['content', 'blocks'], pageData);

  return (
    <>
      <Grid as="main" role="main">
        <GridItemConstrainedMedium>
          <CpsAssetPageBlocks blocks={blocks} />
        </GridItemConstrainedMedium>
      </Grid>
    </>
  );
};

CpsAssetPageMain.propTypes = {
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
      type: string,
    }),
    promo: shape({
      id: string,
      type: string,
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

export default CpsAssetPageMain;
