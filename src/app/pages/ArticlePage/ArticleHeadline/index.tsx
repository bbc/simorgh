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
import { ComponentToRenderProps } from '../types';
import styles from './index.styles';

const ArticleHeadline = (props: ComponentToRenderProps) => {
  const { pathname, isLite } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);
  const eventTrackingData = { componentName: 'canonical-lite-cta' };
  const { enabled: showCTA } = useToggle('liteSiteCTA');
  const viewTracker = useViewTracker(eventTrackingData);

  const articleDataSavingLinkText =
    translations?.liteSite?.articleDataSavingLinkText ?? 'Data saving version';

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
          <div css={styles.liteCTAContainer} data-e2e="to-lite-site-loading" />
          <div
            css={styles.liteCTAContainer}
            {...viewTracker}
            data-e2e="to-lite-site"
          >
            <CallToActionLinkWithChevron
              eventTrackingData={eventTrackingData}
              href={`${pathname}.lite`}
              css={styles.liteCTA}
            >
              {articleDataSavingLinkText}
            </CallToActionLinkWithChevron>
          </div>
        </>
      )}
    </>
  );
};

export default ArticleHeadline;
