/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { use } from 'react';
import { Curation } from '#app/models/types/curationData';
import LiveTVCuration from '#app/components/Curation';
import { data as liveTvFixture } from '#data/dari/watch/bbc_afghan_tv/live.json';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import MetadataContainer from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { LiveTVPageProps } from './types';
import styles from './styles';
// import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
// import ATIAnalytics from '#app/components/ATIAnalytics';

export default function LiveTvLayout({ pageData }: LiveTVPageProps) {
  const { lang } = use(ServiceContext);
  if (!pageData) {
    // @ts-expect-error liveTvFixture used for development purposes only
    // eslint-disable-next-line no-param-reassign
    pageData = liveTvFixture;
  }

  const renderCuration = ({ curation }: { curation: Curation }) => {
    const {
      summaries,
      curationId,
      title: curationTitle,
      link,
      position,
      ...curationProps
    } = curation;
    return (
      <React.Fragment key={`${curationId}-${position}`}>
        <LiveTVCuration
          summaries={summaries || []}
          title={curationTitle}
          position={position}
          link={link}
          // curationLength={curations.length}
          renderVisuallyHiddenH2Title={position === 0}
          curationId={curationId}
          {...curationProps}
        />
      </React.Fragment>
    );
  };

  const { curations, description, title } = pageData;

  const mediaCollectionCuration = curations?.find(
    curation => curation.mediaCollection,
  );

  const radioScheduleCuration = curations?.find(
    curation => curation.radioSchedule,
  );

  return (
    <>
      {/* <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} /> */}
      <MetadataContainer
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <main role="main" css={styles.main}>
        <div css={styles.inner}>
          <div css={styles.margins}>
            {mediaCollectionCuration &&
              renderCuration({ curation: mediaCollectionCuration })}
            <Heading id="content" level={1}>
              Live TV Page with schedule
            </Heading>
            <Text>{description}</Text>
            {radioScheduleCuration &&
              renderCuration({ curation: radioScheduleCuration })}
          </div>
        </div>
      </main>
    </>
  );
}
