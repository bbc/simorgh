import React, { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useToggle from '#hooks/useToggle';
import CallToActionLink from '#app/components/CallToActionLink';
import { ServiceContext } from '#contexts/ServiceContext';
import Headings from '#containers/Headings';
import { ComponentToRenderProps } from '../types';
import styles from './index.styles';

const ArticleHeadline = (props: ComponentToRenderProps) => {
  const { pathname, isLite, isAmp, isApp } = use(RequestContext);
  const { translations } = use(ServiceContext);
  const eventTrackingData = {
    componentName: 'article-lite-site-link',
  };
  const { enabled: articleLiteSiteLinkEnabled } = useToggle(
    'articleLiteSiteLink',
  );
  const viewTracker = useViewTracker(eventTrackingData);

  const articleDataSavingLinkText =
    translations?.liteSite?.articleDataSavingLinkText ?? 'Data saving version';

  const isCanonical = !(isLite || isAmp || isApp);

  const showArticleLiteSiteLink = isCanonical && articleLiteSiteLinkEnabled;

  return (
    <>
      <Headings
        className={`article-heading ${showArticleLiteSiteLink ? styles.reducePadding : ''}`}
        {...props}
      />
      {showArticleLiteSiteLink && (
        <div
          className={styles.liteSiteLinkContainer}
          {...viewTracker}
          data-e2e="article-lite-site-link"
        >
          <CallToActionLink
            url={`${pathname}.lite`}
            eventTrackingData={eventTrackingData}
            className={styles.liteSiteLink}
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
