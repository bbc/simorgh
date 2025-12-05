import { Fragment, use, useState } from 'react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import ATIAnalytics from '../../components/ATIAnalytics';
import {
  Curation,
  VisualProminence,
  VisualStyle,
} from '../../models/types/curationData';
import { ATIData } from '../../components/ATIAnalytics/types';
import HomeCuration from '../../components/Curation';
import Ad from '../../components/Ad';
import MPU from '../../components/Ad/MPU';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import MetadataContainer from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import getItemList from '../../lib/seoUtils/getItemList';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import getNthCurationByStyleAndProminence from '../utils/getNthCurationByStyleAndProminence';
import getIndexOfFirstNonBanner from '../utils/getIndexOfFirstNonBanner';
import reorderCurations from './utils/reorderCurations';

export interface HomePageProps {
  pageData: {
    id?: string;
    title: string;
    curations: Curation[];
    description: string;
    seoTitle?: string;
    seoDescription?: string;
    metadata: {
      atiAnalytics: ATIData;
      type: string;
    };
  };
}

const isBillboard = (curation?: Curation) =>
  curation?.visualStyle === 'BANNER' &&
  curation?.visualProminence === 'MAXIMUM';

const applyPinnedCurationOrder = ({
  curations,
  pinnedCurationId,
  isPinningEnabled,
}: {
  curations: Curation[];
  pinnedCurationId?: string | null;
  isPinningEnabled: boolean;
}): Curation[] => {
  if (!isPinningEnabled || !pinnedCurationId) {
    return curations;
  }

  const pinnedIndex = curations.findIndex(
    ({ curationId }) => curationId === pinnedCurationId,
  );

  if (pinnedIndex === -1) {
    return curations;
  }

  const hasBillboardAtTop = isBillboard(curations[0]);
  const targetIndex = hasBillboardAtTop ? 1 : 0;

  if (pinnedIndex === targetIndex) {
    return curations;
  }

  const reorderedCurations = [...curations];
  const [pinnedCuration] = reorderedCurations.splice(pinnedIndex, 1);
  reorderedCurations.splice(targetIndex, 0, pinnedCuration);

  return reorderedCurations.map((curation, position) => ({
    ...curation,
    position,
  }));
};

const HomePage = ({ pageData }: HomePageProps) => {
  const {
    translations,
    product,
    serviceLocalizedName,
    homePageTitle,
    lang,
    brandName,
    service,
  } = use(ServiceContext);
  const { topStoriesTitle, home } = translations;
  const {
    title,
    description,
    seoTitle,
    seoDescription,
    metadata: { atiAnalytics },
  } = pageData;
  let { curations = [] } = pageData;

  const [pinnedCurationId, setPinnedCurationId] = useState<string | null>(null);

  const metadataTitle = seoTitle || homePageTitle;
  const metadataDescription = seoDescription || description;

  // EXPERIMENT: Homepage Time of Day Adaptive Curations
  const timeOfDayExperimentName = 'newswb_ws_tod_homepage';
  const timeOfDayVariant = useOptimizelyVariation({
    experimentName: timeOfDayExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  // if variant is set to 'homepage_time_of_day_a' or 'homepage_time_of_day_b' then reorder curations
  if (
    timeOfDayVariant === 'homepage_time_of_day_a' ||
    timeOfDayVariant === 'homepage_time_of_day_b'
  ) {
    curations = reorderCurations({
      curations,
      service,
    });
  }

  const isPinningEnabled =
    service === 'portuguese' || service === 'arabic';

  const handlePinCuration = (curationId?: string) => {
    if (!isPinningEnabled || !curationId) return;
    setPinnedCurationId(previous =>
      previous === curationId ? null : curationId,
    );
  };

  const curationsForRender = applyPinnedCurationOrder({
    curations,
    pinnedCurationId,
    isPinningEnabled,
  });

  const itemList = getItemList({ curations: curationsForRender, name: brandName });

  return (
    <>
      <ChartbeatAnalytics title={title} />
      <MetadataContainer
        title={metadataTitle}
        lang={lang}
        description={metadataDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData
        type="CollectionPage"
        seoTitle={metadataTitle}
        headline={metadataTitle}
        entities={[itemList]}
      />
      <Ad slotType="leaderboard" />
      <main role="main" css={styles.main}>
        <ATIAnalytics atiData={atiAnalytics} />
        <VisuallyHiddenText id="content" tabIndex={-1} as="h1">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text">
            <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
          </span>
        </VisuallyHiddenText>
        <div css={styles.inner}>
          <div css={styles.margins}>
            {curationsForRender.map(
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
                const nthCurationByStyleAndProminence =
                  getNthCurationByStyleAndProminence({
                    curations: curationsForRender,
                    position,
                    visualStyle,
                    visualProminence,
                  });
                const indexOfFirstNonBanner =
                  getIndexOfFirstNonBanner(curationsForRender);
                return (
                  <Fragment key={`${curationId}-${position}`}>
                    <HomeCuration
                      visualStyle={visualStyle as VisualStyle}
                      visualProminence={visualProminence as VisualProminence}
                      summaries={summaries || []}
                      title={curationTitle}
                      topStoriesTitle={topStoriesTitle}
                      position={position}
                      link={link}
                      curationLength={curationsForRender?.length}
                      nthCurationByStyleAndProminence={
                        nthCurationByStyleAndProminence
                      }
                      renderVisuallyHiddenH2Title={position === 0}
                      curationId={curationId}
                      timeOfDayVariant={timeOfDayVariant}
                      pinnable={isPinningEnabled}
                      isPinned={pinnedCurationId === curationId}
                      onPinCuration={handlePinCuration}
                      {...curationProps}
                    />
                    {index === indexOfFirstNonBanner && <MPU />}
                  </Fragment>
                );
              },
            )}
          </div>
        </div>
      </main>
      {timeOfDayVariant && (
        <OptimizelyPageMetrics trackPageView trackPageDepth />
      )}
    </>
  );
};

export default HomePage;
