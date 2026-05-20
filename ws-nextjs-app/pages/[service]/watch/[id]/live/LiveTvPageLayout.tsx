import { Fragment, use } from 'react';

import ATIAnalytics from '#app/components/ATIAnalytics';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import Curation from '#app/components/Curation';
import Heading from '#app/components/Heading';
import LinkedData from '#app/components/LinkedData';
import MetadataContainer from '#app/components/Metadata';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Curation as CurationType } from '#app/models/types/curationData';
import styles from './styles';
import { LiveTVPageProps } from './types';
import 'temporal-polyfill/global';

const renderCuration = ({
  curation,
  curationLength,
}: {
  curation: CurationType;
  curationLength: number;
}) => {
  const {
    summaries,
    curationId,
    title: curationTitle,
    link,
    position,
    associatedContent: { uri } = {},
    ...curationProps
  } = curation;
  return (
    <Fragment key={`${curationId}-${position}`}>
      <Curation
        summaries={summaries || []}
        title={curationTitle}
        position={position}
        link={link || uri}
        curationLength={curationLength}
        renderVisuallyHiddenH2Title={position === 0}
        curationId={curationId}
        {...curationProps}
      />
    </Fragment>
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
  const metadataDescription = seoDescription || description;

  const mediaCollectionCuration = curations?.find(
    curation => curation.mediaCollection,
  );

  const filteredCurations = curations?.filter(
    curation => curation !== mediaCollectionCuration,
  );

  const totalCurationLength =
    (mediaCollectionCuration ? 1 : 0) + (filteredCurations?.length || 0);

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
        description={metadataDescription}
      />
      <main role="main" css={styles.main}>
        <div css={styles.inner}>
          <div
            css={[styles.padding, styles.reorderedLayout]}
            className="media-player"
          >
            <Heading
              id="content"
              level={1}
              css={styles.title}
              className="title"
            >
              {title}
            </Heading>
            <Text css={styles.description} className="description">
              {description}
            </Text>
            {mediaCollectionCuration && (
              <div role="presentation" css={styles.playerMargins}>
                {renderCuration({
                  curation: mediaCollectionCuration,
                  curationLength: totalCurationLength,
                })}
              </div>
            )}
            <div css={styles.curationStyles} className="curations">
              {filteredCurations?.map(curation =>
                renderCuration({
                  curation,
                  curationLength: totalCurationLength,
                }),
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
