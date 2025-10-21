import React from 'react';
import MediaLoader from '#app/components/MediaLoader';
import { Curation } from '#app/models/types/curationData';
import LiveTVCuration from '#app/components/Curation';
import { LiveTVPageProps } from './types';
// import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
// import ATIAnalytics from '#app/components/ATIAnalytics';
// import MetadataContainer from '#app/components/Metadata';

export default function LiveTvLayout({
  pageType,
  service,
  pageData,
}: LiveTVPageProps) {
  const { curations, mediaBlock } = pageData;
  console.log('LiveTvLayout pageData:', pageData);
  return (
    <>
      {/* <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
        lang={lang}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      /> */}
      <main role="main">
        <h1 id="content">
          HELLO WORLD pageType: {pageType} service: {service}
        </h1>
        {curations.map(
          (
            {
              visualProminence,
              summaries,
              curationId,
              title: curationTitle,
              link,
              position,
              visualStyle,
              ...curationProps
            }: Curation,
            index: number,
          ) => {
            return (
              <React.Fragment key={`${curationId}-${position}`}>
                <LiveTVCuration
                  visualProminence=""
                  summaries={summaries || []}
                  title={curationTitle}
                  position={position}
                  link={link}
                  curationLength={curations?.length}
                  renderVisuallyHiddenH2Title={position === 0}
                  curationId={curationId}
                  {...curationProps}
                />
              </React.Fragment>
            );
          },
        )}
        <MediaLoader blocks={mediaBlock} />
      </main>
    </>
  );
}
