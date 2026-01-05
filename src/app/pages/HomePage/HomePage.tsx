import { Fragment, use, useEffect, useState } from 'react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import PWAPromotionalBanner from '#app/components/PWAPromotionalBanner';
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

const getBookmarkedStorageKey = (service?: string) =>
  service ? `homepageBookmarkedCuration:${service}` : null;

const readBookmarkedCurationId = ({
  service,
  curations,
  isBookmarkingEnabled,
}: {
  service: string;
  curations: Curation[];
  isBookmarkingEnabled: boolean;
}) => {
  if (!isBookmarkingEnabled || typeof window === 'undefined') {
    return null;
  }

  const storageKey = getBookmarkedStorageKey(service);
  if (!storageKey) return null;

  const storedId = window.localStorage.getItem(storageKey);
  if (
    storedId &&
    curations.some(({ curationId }) => curationId === storedId)
  ) {
    return storedId;
  }

  if (storedId) {
    window.localStorage.removeItem(storageKey);
  }

  return null;
};

const applyBookmarkedCurationOrder = ({
  curations,
  bookmarkedCurationId,
  isBookmarkingEnabled,
}: {
  curations: Curation[];
  bookmarkedCurationId?: string | null;
  isBookmarkingEnabled: boolean;
}): Curation[] => {
  if (!isBookmarkingEnabled || !bookmarkedCurationId) {
    return curations;
  }

  const bookmarkedIndex = curations.findIndex(
    ({ curationId }) => curationId === bookmarkedCurationId,
  );

  if (bookmarkedIndex === -1) {
    return curations;
  }

  const hasBillboardAtTop = isBillboard(curations[0]);
  const targetIndex = hasBillboardAtTop ? 1 : 0;

  if (bookmarkedIndex === targetIndex) {
    return curations;
  }

  const reorderedCurations = [...curations];
  const [bookmarkedCuration] = reorderedCurations.splice(bookmarkedIndex, 1);
  reorderedCurations.splice(targetIndex, 0, bookmarkedCuration);

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

  const [bookmarkedCurationId, setBookmarkedCurationId] = useState<string | null>(null);

  const metadataTitle = seoTitle || homePageTitle;
  const metadataDescription = seoDescription || description;

  // EXPERIMENT: Homepage Time of Day Adaptive Curations
  const timeOfDayExperimentName = 'newswb_ws_tod_homepage';
  const timeOfDayVariant = useOptimizelyVariation({
    experimentName: timeOfDayExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  // EXPERIMENT: PWA Promotional Banner
  const pwaPromoBannerExperimentName = 'newswb_ws_pwa_promo_prompt';
  const pwaPromoBannerVariant = useOptimizelyVariation({
    experimentName: pwaPromoBannerExperimentName,
    experimentType: ExperimentType.SERVER_SIDE,
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

  const isBookmarkingEnabled =
    service === 'portuguese' || service === 'arabic';

  useEffect(() => {
    const initialBookmarkedId = readBookmarkedCurationId({
      service,
      curations,
      isBookmarkingEnabled,
    });
    if (initialBookmarkedId) {
      setBookmarkedCurationId(initialBookmarkedId);
    }
  }, [service, curations, isBookmarkingEnabled]);

  useEffect(() => {
    if (!isBookmarkingEnabled || !bookmarkedCurationId) return;
    const exists = curations.some(
      ({ curationId }) => curationId === bookmarkedCurationId,
    );
    if (!exists) {
      setBookmarkedCurationId(null);
      const storageKey = getBookmarkedStorageKey(service);
      if (storageKey && typeof window !== 'undefined') {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, [curations, isBookmarkingEnabled, bookmarkedCurationId, service]);

  const handleBookmarkCuration = (curationId?: string) => {
    if (!isBookmarkingEnabled || !curationId) return;
    setBookmarkedCurationId(previous => {
      const nextBookmarkedId = previous === curationId ? null : curationId;
      const storageKey = getBookmarkedStorageKey(service);
      if (storageKey && typeof window !== 'undefined') {
        if (nextBookmarkedId) {
          window.localStorage.setItem(storageKey, nextBookmarkedId);
        } else {
          window.localStorage.removeItem(storageKey);
        }
      }
      return nextBookmarkedId;
    });
  };

  const curationsForRender = applyBookmarkedCurationOrder({
    curations,
    bookmarkedCurationId,
    isBookmarkingEnabled,
  });

  const itemList = getItemList({ curations: curationsForRender, name: brandName });

  return (
    <>
      {/* EXPERIMENT: PWA Promotional Banner */}
      <PWAPromotionalBanner />
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
                      bookmarkable={isBookmarkingEnabled}
                      isBookmarked={bookmarkedCurationId === curationId}
                      onBookmarkCuration={handleBookmarkCuration}
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
      {(timeOfDayVariant || pwaPromoBannerVariant) && (
        <OptimizelyPageMetrics trackPageView trackPageDepth />
      )}
    </>
  );
};

export default HomePage;
