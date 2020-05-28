import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import ATIAnalytics from '../../containers/ATIAnalytics';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import Grid, { GelPageGrid } from '#app/components/Grid';
import MediaMessage from '../MediaAssetPage/MediaMessage';
import MetadataContainer from '../../containers/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import OnDemandHeadingBlock from '#containers/RadioPageBlocks/Blocks/OnDemandHeading';
import ParagraphBlock from '#containers/RadioPageBlocks/Blocks/Paragraph';

const SKIP_LINK_ANCHOR_ID = 'content';

const StyledGelWrapperGrid = styled.div`
  padding-top: ${GEL_SPACING_TRPL};
`;

const getGroups = (zero, one, two, three, four, five) => ({
  group0: zero,
  group1: one,
  group2: two,
  group3: three,
  group4: four,
  group5: five,
});

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
  flex-grow: 1; /* needed to ensure footer positions at bottom of viewport */
`;

const OnDemandTvPage = ({ pageData }) => {
  const idAttr = SKIP_LINK_ANCHOR_ID;
  const {
    language,
    headline,
    shortSynopsis,
    brandTitle,
    releaseDateTimeStamp,
  } = pageData;

  const { dir } = useContext(ServiceContext);

  return (
    <>
      <ATIAnalytics data={pageData} />
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
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
      >
        <Grid
          item
          dir={dir}
          startOffset={getGroups(1, 1, 1, 1, 2, 5)}
          columns={getGroups(6, 6, 6, 6, 6, 12)}
          margins={getGroups(true, true, true, true, false, false)}
        >
          <StyledGelWrapperGrid
            columns={getGroups(6, 6, 6, 6, 6, 6)}
            enableGelGutters
          >
            <MediaMessage />
          </StyledGelWrapperGrid>
          <OnDemandHeadingBlock
            idAttr={idAttr}
            brandTitle={brandTitle}
            releaseDateTimeStamp={releaseDateTimeStamp}
          />
          <ParagraphBlock text={shortSynopsis} />
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandTvPage.propTypes = {
  pageData: shape({
    brandTitle: string,
  }).isRequired,
};

export default OnDemandTvPage;
