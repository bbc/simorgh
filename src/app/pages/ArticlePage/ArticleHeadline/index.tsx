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
  const eventTrackingData = {
    componentName: 'article-lite-site-link',
    optimizely,
  };
  const { enabled: articleLiteSiteLinkEnabled } = useToggle(
    'articleLiteSiteLink',
  );
  const viewTracker = useViewTracker(eventTrackingData);
  const titleVariation = useOptimizelyVariation(OPTIMIZELY_CONFIG.flagKey);

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
            <OptimizelyPageViewTracking />
          </div>
        </>
      )}
    </>
  );
};

export default ArticleHeadline;
