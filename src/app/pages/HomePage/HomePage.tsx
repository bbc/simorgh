/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use, useState, useEffect } from 'react';
import { jsx } from '@emotion/react';
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
import PWAUpsellBanner from '../../components/PWAUpsellBanner';

export interface HomePageProps {
  pageData: {
    id?: string;
    title: string;
    curations: Curation[];
    description: string;
    metadata: {
      atiAnalytics: ATIData;
      type: string;
    };
  };
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
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
    metadata: { atiAnalytics },
  } = pageData;
  let { curations } = pageData;

  // EXPERIMENT: Homepage Time of Day Adaptive Curations
  const timeOfDayExperimentName = 'newswb_ws_tod_homepage';
  const timeOfDayVariant = useOptimizelyVariation({
    experimentName: timeOfDayExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  // if service is Hindi or Tamil and optimizely variant is set to 'variantA' then reorder curations
  if (timeOfDayVariant === 'homepage_time_of_day_a') {
    curations = reorderCurations({
      curations,
      service,
    });
  }

  const itemList = getItemList({ curations, name: brandName });

  // PWA Upsell Banner handling
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const handleClose = (event?: React.MouseEvent) => {
    event?.preventDefault();
    setIsBannerVisible(false);
  };

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('beforeinstallprompt event captured');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  useEffect(() => {
    console.log('deferredPrompt updated:', deferredPrompt);
  }, [deferredPrompt]);

  const handleInstallPWA = async () => {
    console.log('Install PWA button clicked');
    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return;
    }

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    setDeferredPrompt(null);
    setIsBannerVisible(false);
  };

  return (
    <>
      <ChartbeatAnalytics title={title} />
      <MetadataContainer
        title={homePageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData
        type="CollectionPage"
        seoTitle={title}
        headline={title}
        entities={[itemList]}
      />
      <Ad slotType="leaderboard" />
      <main role="main" css={styles.main}>
        {serviceLocalizedName === 'Mundo' && isBannerVisible && (
          <PWAUpsellBanner
            serviceBackground="mundo"
            title="Accede a BBC Noticias con un solo toque"
            description="Agrega un acceso directo de BBC Mundo a tu pantalla de inicio para un acceso rápido y sencillo."
            handleClose={() => {
              handleClose();
            }}
            buttonPrimary={{
              shortText: 'Agregar',
              longText: 'Agregar a la pantalla de inicio',
              onClick: handleInstallPWA,
            }}
            buttonSecondary={{
              text: 'No ahora',
              onClick: handleClose,
            }}
            handleInstallPWA={handleInstallPWA}
          />
        )}
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
