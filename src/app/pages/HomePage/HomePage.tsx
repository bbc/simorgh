/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use, useState } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import PromotionalBanner from '#app/components/PromotionalBanner';
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
  let { curations } = pageData;

  const metadataTitle = seoTitle || homePageTitle;
  const metadataDescription = seoDescription || description;
  const [showBanner, setShowBanner] = useState(service === 'mundo');

  const handleInstallPWA = () => {
    // eslint-disable-next-line no-console
    console.log('Install PWA clicked');
    // Native install prompt logic would go here
  };

  const handleCloseBanner = () => {
    // eslint-disable-next-line no-console
    console.log('Banner closed');
    setShowBanner(false);
  };

  const handleSecondaryAction = () => {
    // eslint-disable-next-line no-console
    console.log('Secondary button clicked');
    setShowBanner(false);
  };

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

  const itemList = getItemList({ curations, name: brandName });

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
      {showBanner && service === 'mundo' && (
        <PromotionalBanner
          title="Accede a BBC Noticias con un solo toque"
          description="Agrega un acceso directo de BBC Mundo a tu pantalla de inicio para un acceso rápido y sencillo."
          orText="or"
          primaryButton={{
            text: 'Agregar',
            longText: 'Agregar a la pantalla de inicio',
            onClick: handleInstallPWA,
          }}
          secondaryButton={{
            text: 'Ahora no',
            onClick: handleSecondaryAction,
          }}
          handleClose={handleCloseBanner}
        />
      )}
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
                  <React.Fragment key={`${curationId}-${position}`}>
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
                      timeOfDayVariant={timeOfDayVariant}
                      {...curationProps}
                    />
                    {index === indexOfFirstNonBanner && <MPU />}
                  </React.Fragment>
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
