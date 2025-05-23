/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useToggle from '#hooks/useToggle';
import CallToActionLink from '#app/components/CallToActionLink';
import { ServiceContext } from '#contexts/ServiceContext';
import Headings from '#containers/Headings';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import useOptimizelyVariations from '#app/hooks/useOptimizelyVariations'; // Updated import
import OptimizelyPageViewTracking from '#app/legacy/containers/OptimizelyPageViewTracking';
import { ComponentToRenderProps } from '../types';
import styles from './index.styles';

const ArticleHeadline = (props: ComponentToRenderProps) => {
  const { pathname, isLite, isAmp, isApp } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);
  // Remove useContext(OptimizelyContext): In this component, you will no longer be using the Optimizely client directly in this component, so it's removed. The tracking logic should now be handled within OptimizelyPageViewTracking.

  // Call the hook to get all variations with the flagKeys defined in OPTIMIZELY_CONFIG.experimentKeys and destructure the map to get the specific variation. Use optional chaining because the variation might not be available.
  const variations = useOptimizelyVariations(OPTIMIZELY_CONFIG.experimentKeys);

  const titleVariation =
    variations[OPTIMIZELY_CONFIG.experimentKeys.header_a_a_test]?.variationKey; // Access variation with optional chaining
  //  Get experiment instance for page view tracking if needed.  Move this into OptimizelyPageViewTracking
  //  Pass in the experimentKey as a prop if you decide to keep it here

  // To do - update tracking to take distinct event key
  const eventTrackingData = {
    componentName: 'article-lite-site-link',
  };
  const { enabled: articleLiteSiteLinkEnabled } = useToggle(
    'articleLiteSiteLink',
  );
  const viewTracker = useViewTracker(eventTrackingData);

  let articleDataSavingLinkText =
    translations?.liteSite?.articleDataSavingLinkText ?? 'Data saving version';

  const titleExperimentVariations = translations.liteSite?.experiment;

  if (titleExperimentVariations && titleVariation != null) {
    articleDataSavingLinkText =
      titleExperimentVariations[titleVariation as unknown as string] ??
      articleDataSavingLinkText;
  }

  const showArticleLiteSiteLink: boolean =
    !isLite && articleLiteSiteLinkEnabled;

  return (
    <>
      <Headings
        className="article-heading"
        {...props}
        {...(showArticleLiteSiteLink && {
          css: styles.reducePadding,
        })}
      />
      {showArticleLiteSiteLink && (
        <>
          <div
            css={[
              styles.loadingContainer,
              styles.liteSiteLinkContainer,
              titleVariation && styles.displayNone,
            ]}
            data-e2e="article-lite-site-link-loading"
          />
          <div
            css={[
              styles.liteSiteLinkContainer,
              !titleVariation && styles.displayNone,
            ]}
            {...viewTracker}
            data-e2e="article-lite-site-link"
          >
            <CallToActionLink
              url={`${pathname}.lite`}
              eventTrackingData={eventTrackingData}
              css={styles.liteSiteLink}
              alignWithMargin
              size="brevier"
            >
              <CallToActionLink.Text>
                {articleDataSavingLinkText}
              </CallToActionLink.Text>
              <CallToActionLink.Chevron />
            </CallToActionLink>
            {/* Update OptimizelyPageViewTracking: Pass in the experimentKeys as a prop so that the correct experiments will be tracked using the useExperiment hook and optimizely client. */}
            <OptimizelyPageViewTracking
              // TO DO - fix this error. Due to using AI not knowing our full optimizely set up
              experimentKeys={Object.keys(OPTIMIZELY_CONFIG.experimentKeys)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ArticleHeadline;
