import React, { useContext } from 'react';
import styled from 'styled-components';
import { shape, string, number } from 'prop-types';
import MetadataContainer from '../../containers/Metadata';
import { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';

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
  const { language, headline, shortSynopsis } = pageData;

  const { dir } = useContext(ServiceContext);

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
        columns={getGroups(6, 6, 6, 6, 8, 20)}
        enableGelGutters
      >
        <h1>On Demand TV</h1>
      </StyledGelPageGrid>
    </>
  );
};

OnDemandTvPage.propTypes = {
  pageData: shape({
    brandTitle: string,
    headline: string,
    summary: string,
    language: string,
    episodeAvailableFrom: number,
    episodeAvailableUntil: number,
    releaseDateTimeStamp: number,
    imageUrl: string,
  }).isRequired,
};

export default OnDemandTvPage;
