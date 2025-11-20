/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { use } from 'react';
import { Curation as CurationType } from '#app/models/types/curationData';
import Curation from '#app/components/Curation';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import MetadataContainer from '#app/components/Metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import LinkedData from '#app/components/LinkedData';
import { LiveTVPageProps } from './types';
import styles from './styles';

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
  const {
    curations,
    description,
    title,
    seoTitle,
    seoDescription,
    metadata: { atiAnalytics },
  } = pageData;

  const metadataTitle = seoTitle || title;
  const metadataDescription = seoDescription || description || title;

  const mediaCollectionCuration = curations?.find(
    curation => curation.mediaCollection,
  );

  const filteredCurations = curations?.filter(
    curation => curation !== mediaCollectionCuration,
  );

  return (
    <div css={styles.pageWrapper}>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={title} />
      <MetadataContainer
        title={metadataTitle}
        lang={lang}
        description={metadataDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData
        type="TelevisionChannel"
        seoTitle={metadataTitle}
        description={seoDescription}
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
