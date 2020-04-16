import React, { useContext } from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import styled from 'styled-components';
import path from 'ramda/src/path';
import ATIAnalytics from '../../containers/ATIAnalytics';
import MetadataContainer from '../../containers/Metadata';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '../../containers/LinkedData';
import RadioPageBlocks from '../../containers/RadioPageBlocks';
import { ServiceContext } from '../../contexts/ServiceContext';

const StyledGelPageGrid = styled(GelPageGrid)`
  width: 100%;
`;

const LiveRadioPage = ({ pageData }) => {
  const { language, name, summary, content } = pageData;
  const blocks = path(['blocks'], content);
  const { dir } = useContext(ServiceContext);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={name}
        lang={language}
        description={summary}
        openGraphType="website"
      />
      <LinkedData type="RadioChannel" seoTitle={name} />

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
          <RadioPageBlocks blocks={blocks} />
        </Grid>
      </StyledGelPageGrid>
    </>
  );
};

LiveRadioPage.propTypes = {
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
    }),
    language: string,
    name: string,
    summary: string,
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

export default LiveRadioPage;
