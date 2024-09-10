import React, { useContext } from 'react';
import { Headline } from '#psammead/psammead-headings/src';
import Paragraph from '#psammead/psammead-paragraph/src';
import RadioScheduleContainer from '#containers/RadioSchedule';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import MediaLoader from '#app/components/MediaLoader';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import LinkedData from '../../components/LinkedData';

const LiveRadioPage = ({ pageData }) => {
  const {
    language,
    name,
    summary,
    heading,
    bodySummary,
    radioScheduleData,
    mediaLoaderBlock,
  } = pageData;
  const { script, service } = useContext(ServiceContext);

  const hasRadioScheduleData = Boolean(radioScheduleData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics
        mediaPageType="Radio"
        title={name}
        contentType={pageData?.contentType}
      />
      <ComscoreAnalytics />
      <MetadataContainer
        title={name}
        lang={language}
        description={summary}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData type="RadioChannel" seoTitle={name} />

      <GelPageGrid
        as="main"
        role="main"
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
          <Headline
            script={script}
            service={service}
            id="content"
            tabIndex="-1"
          >
            {heading}
          </Headline>
          <Paragraph script={script} service={service}>
            {bodySummary}
          </Paragraph>
          <MediaLoader blocks={mediaLoaderBlock} />
        </Grid>
      </GelPageGrid>
      {hasRadioScheduleData && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

export default LiveRadioPage;
