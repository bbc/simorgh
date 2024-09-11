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
import { LiveRadioPageData } from './types';

const LiveRadioPage = ({ pageData }: { pageData: LiveRadioPageData }) => {
  const {
    language,
    name,
    summary,
    heading,
    bodySummary,
    contentType,
    radioScheduleData,
    mediaBlock,
  } = pageData;
  const { script, service } = useContext(ServiceContext);

  const hasRadioScheduleData = Boolean(radioScheduleData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics
        mediaPageType="Radio"
        title={name}
        contentType={contentType}
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
      {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
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
        {/* @ts-expect-error: Legacy grid expects `children` to be passed as props. However, due to coding best practices, we must nest children between the opening and closing tags */}
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
            // @ts-expect-error script is an object
            script={script}
            service={service}
            id="content"
            tabIndex={-1}
          >
            {heading}
          </Headline>
          <Paragraph
            // @ts-expect-error script is an object
            script={script}
            service={service}
          >
            {bodySummary}
          </Paragraph>
          <MediaLoader blocks={mediaBlock} />
        </Grid>
      </GelPageGrid>
      {hasRadioScheduleData && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </>
  );
};

export default LiveRadioPage;
