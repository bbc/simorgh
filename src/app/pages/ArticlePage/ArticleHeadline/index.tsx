/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useToggle from '#hooks/useToggle';
import CallToActionLink from '#app/components/CallToActionLinkComponent';
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
          css: styles.reducePaddingForCTA,
        })}
      />
      {showLiteCTAOnCanonical && (
        <div
          css={styles.liteCTAContainer}
          {...viewTracker}
          data-e2e="to-lite-site"
        >
          <CallToActionLink
            url={`${pathname}.lite`}
            eventTrackingData={eventTrackingData}
            css={styles.canonicalToLiteSiteCTA}
            alignWithMargin
            size="brevier"
          >
            <CallToActionLink.Text>
              {articleDataSavingLinkText}
            </CallToActionLink.Text>
            <CallToActionLink.Chevron />
          </CallToActionLink>
        </div>
      )}
    </>
  );
};

export default ArticleHeadline;
