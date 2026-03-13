import { Fragment, use } from 'react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import PWAPromotionalBanner from '#app/components/PWAPromotionalBanner';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import { AccountContext } from '#app/contexts/AccountContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useToggle from '#app/hooks/useToggle';
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

const HomePage = ({ pageData }: HomePageProps) => {
  const {
    translations,
    product,
    serviceLocalizedName,
    homePageTitle,
    lang,
    brandName,
  } = use(ServiceContext);
  const { topStoriesTitle, home } = translations;
  const {
    title,
    description,
    seoTitle,
    seoDescription,
    metadata: { atiAnalytics },
  } = pageData;
  const { curations } = pageData;

  const { enabled: accountEnabled } = useToggle('account');
  const { isSignedIn, isIdctaAvailable } = use(AccountContext);
  const isHydrated = useHydrationDetection();

  const metadataTitle = seoTitle || homePageTitle;
  const metadataDescription = seoDescription || description;

  const showAccountPromoBanner =
    isHydrated && accountEnabled && !isSignedIn && isIdctaAvailable;

  const itemList = getItemList({ curations, name: brandName });

  return (
    <>
      {showAccountPromoBanner && <AccountPromotionalBanner />}
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
                const nthCurationByStyleAndProminence =
                  getNthCurationByStyleAndProminence({
                    curations,
                    position,
                    visualStyle,
                    visualProminence,
                  });
                const indexOfFirstNonBanner =
                  getIndexOfFirstNonBanner(curations);
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
                      curationLength={curations?.length}
                      nthCurationByStyleAndProminence={
                        nthCurationByStyleAndProminence
                      }
                      renderVisuallyHiddenH2Title={position === 0}
                      curationId={curationId}
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
    </>
  );
};

export default HomePage;
