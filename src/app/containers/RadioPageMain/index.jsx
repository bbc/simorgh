import React, { useContext } from 'react';
import { string, shape, any, arrayOf } from 'prop-types';
import styled from 'styled-components';
// import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import Grid, { GelPageGrid } from '#app/components/Grid';
import LinkedData from '../LinkedData';
import RadioPageBlocks from '../RadioPageBlocks';
import { ServiceContext } from '../../contexts/ServiceContext';

const RadioPageMain = ({ pageData }) => {
  const { title, language, description, blocks } = pageData;
  const { dir } = useContext(ServiceContext);
  const StyledGelPageGrid = styled(GelPageGrid)`
    flex-grow: 1;
  `;

  return (
    <>
      {/* <ATIAnalytics data={pageData} /> */}
      <MetadataContainer
        title={title}
        lang={language}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="RadioChannel" seoTitle={title} />

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

RadioPageMain.propTypes = {
  pageData: shape({
    title: string,
    language: string,
    description: string,
    blocks: arrayOf(any),
  }).isRequired,
};

export default RadioPageMain;
