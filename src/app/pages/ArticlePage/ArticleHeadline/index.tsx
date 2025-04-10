/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useToggle from '#hooks/useToggle';
import CallToActionLinkWithChevron from '#app/components/CallToActionLinkWithChevron';
import { ServiceContext } from '#contexts/ServiceContext';
import Headings from '#containers/Headings';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import OptimizelyPageViewTracking from '#app/legacy/containers/OptimizelyPageViewTracking';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { ComponentToRenderProps } from '../types';
import styles from './index.styles';

const ArticleHeadline = (props: ComponentToRenderProps) => {
  const { pathname, isLite } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);
  const eventTrackingData = { componentName: 'canonical-lite-cta', optimizely };
  const { enabled: showCTA } = useToggle('liteSiteCTA');
  const viewRef = useViewTracker(eventTrackingData);
  const titleVariation = useOptimizelyVariation(OPTIMIZELY_CONFIG.flagKey);

  let articleDataSavingLinkText =
    translations?.liteSite?.articleDataSavingLinkText ?? 'Data saving version';

  const titleExperimentVariations = translations.liteSite?.experiment;

  if (titleExperimentVariations && titleVariation != null) {
    articleDataSavingLinkText =
      titleExperimentVariations[titleVariation as unknown as string] ??
      articleDataSavingLinkText;
  }

  const showLiteCTAOnCanonical: boolean = !isLite && showCTA;

  return (
    <>
      <Headings
        className="article-heading"
        {...props}
        {...(showLiteCTAOnCanonical && {
          css: styles.headlineStylesOverride,
        })}
      />
      {showLiteCTAOnCanonical && (
        <>
          <div
            css={[
              styles.loadingContainer,
              styles.liteCTAContainer,
              titleVariation && styles.displayNone,
            ]}
            data-e2e="to-lite-site-loading"
          />
          {/* @ts-expect-error TODO need help fixing this! */}
          <div
            css={[
              styles.liteCTAContainer,
              !titleVariation && styles.displayNone,
            ]}
            {...viewRef}
            data-e2e="to-lite-site"
          >
            <CallToActionLinkWithChevron
              eventTrackingData={eventTrackingData}
              href={`${pathname}.lite`}
              css={styles.liteCTA}
            >
              {articleDataSavingLinkText}
            </CallToActionLinkWithChevron>
            <OptimizelyPageViewTracking />
          </div>
        </>
      )}
    </>
  );
};

export default ArticleHeadline;
