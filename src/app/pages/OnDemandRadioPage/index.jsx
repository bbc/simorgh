import React, { useContext } from 'react';
import { string, shape } from 'prop-types';
import styled from 'styled-components';
import MetadataContainer from '../../containers/Metadata';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';

import HeadingBlock from '#containers/RadioPageBlocks/Blocks/Heading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';

const SKIP_LINK_ANCHOR_ID = 'content';

const OnDemandRadioPage = ({ pageData }) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    language,
    brandTitle,
    episodeTitle,
    headline,
    summary,
    shortSynopsis,
  } = pageData;

  const { dir } = useContext(ServiceContext);
  const StyledGelPageGrid = styled(GelPageGrid)`
    flex-grow: 1;
  `;
  return (
    <>
      <MetadataContainer
        title={headline}
        lang={language}
        description={shortSynopsis}
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
    brandTitle: string,
    episodeTitle: string,
    headline: string,
    summary: string,
    metadata: shape({
      language: string,
      id: string,
    }),
  }).isRequired,
};

export default OnDemandRadioPage;
