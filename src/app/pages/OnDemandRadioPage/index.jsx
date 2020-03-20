import React, { useContext } from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import styled from 'styled-components';
import path from 'ramda/src/path';
import MetadataContainer from '../../containers/Metadata';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';

import HeadingBlock from '#containers/RadioPageBlocks/Blocks/Heading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';

const SKIP_LINK_ANCHOR_ID = 'content';

const OnDemandRadioPage = ({ pageData }) => {
  const blocks = path(['content', 'blocks'], pageData);
  const episodeTitle = path(['0', 'title'], blocks);
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const promo = path(['promo'], pageData);
  const metadata = path(['metadata'], pageData);
  const brandTitle = path(['title'], metadata);
  const summary = path(['0', 'synopses', 'short'], blocks);
  const { dir } = useContext(ServiceContext);
  const StyledGelPageGrid = styled(GelPageGrid)`
    flex-grow: 1;
  `;
  return (
    <>
      <MetadataContainer
        title={promo.headlines.headline}
        lang={metadata.language}
        description={promo.media.synopses.short}
        openGraphType="website"
      />

      <StyledGelPageGrid
        forwardedAs="main"
        role="main"
        dir={dir}
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        enableGelGutters
      >
        <Grid
          item
          dir={dir}
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 2,
            group5: 5,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
          margins={{ group0: true, group1: true, group2: true, group3: true }}
        >
          <HeadingBlock idAttr={idAttr} text={brandTitle} />
          <ParagraphBlock text={episodeTitle} />
          <ParagraphBlock text={summary} />
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandRadioPage.propTypes = {
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
      title: string.isRequired,
    }),
    content: shape({
      blocks: arrayOf(
        shape({
          id: string,
          title: string.isRequired,
          synopses: shape({
            short: string,
            medium: string,
          }).isRequired,
        }),
      ),
    }),
  }).isRequired,
};

export default OnDemandRadioPage;
