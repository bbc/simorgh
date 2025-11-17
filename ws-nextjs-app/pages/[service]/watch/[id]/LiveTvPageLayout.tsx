import React, { use } from 'react';
import { Curation as CurationType } from '#app/models/types/curationData';
import Curation from '#app/components/Curation';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import MetadataContainer from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { LiveTVPageProps } from './types';
import styles from './styles';
// import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
// import ATIAnalytics from '#app/components/ATIAnalytics';

const renderCuration = ({ curation }: { curation: CurationType }) => {
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
      <Curation
        summaries={summaries || []}
        title={curationTitle}
        position={position}
        link={link}
        renderVisuallyHiddenH2Title={position === 0}
        curationId={curationId}
        {...curationProps}
      />
    </React.Fragment>
  );
};

export default function LiveTvLayout({ pageData }: LiveTVPageProps) {
  const { lang } = use(ServiceContext);
  const { curations, description, title } = pageData;

  const mediaCollectionCuration = curations?.find(
    curation => curation.mediaCollection,
  );

  const filteredCurations = curations?.filter(
    curation => curation !== mediaCollectionCuration,
  );

  return (
    <div css={styles.pageWrapper}>
      {/* <ATIAnalytics atiData={atiAnalytics} /> */}
      {/* <ChartbeatAnalytics title={pageTitle} /> */}
      <MetadataContainer
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <main role="main" css={styles.main}>
        <div css={styles.inner}>
          <div css={styles.padding}>
            {mediaCollectionCuration &&
              renderCuration({ curation: mediaCollectionCuration })}
            <Heading id="content" level={1} css={styles.title}>
              {title}
            </Heading>
            <Text css={styles.description}>{description}</Text>
            <div css={styles.curationStyles}>
              {filteredCurations.map(curation => renderCuration({ curation }))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
