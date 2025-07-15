import React, { use } from 'react';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import MostRead from '../../components/MostRead/Canonical';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import LinkedData from '../../components/LinkedData';

const MostReadWrapper = ({ children, header }) => (
  <>
    <IndexHeading id="content">{header}</IndexHeading>
    <div className="group-3:mt-6 group-4:mt-8 group-5:mt-8">
      <GelPageGrid
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
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 1,
            group5: 3,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 11,
          }}
        >
          {children}
        </Grid>
      </GelPageGrid>
    </div>
  </>
);

const MostReadPage = ({ pageData }) => {
  const {
    brandName,
    lang,
    mostRead: { header },
  } = use(ServiceContext);

  const {
    metadata: { atiAnalytics },
  } = pageData;

  const atiData = { ...atiAnalytics, pageTitle: `${header} - ${brandName}` };

  return (
    <>
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics title={header} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={header}
        lang={lang}
        description={`${header} - ${brandName}`}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={header} />
      <main role="main" data-e2e="most-read">
        <IndexPageContainer>
          <MostReadWrapper header={header}>
            <MostRead data={pageData} columnLayout="oneColumn" size="default" />
          </MostReadWrapper>
        </IndexPageContainer>
      </main>
    </>
  );
};

export default MostReadPage;
