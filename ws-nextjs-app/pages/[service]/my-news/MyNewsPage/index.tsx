import dynamic from 'next/dynamic';
import { use, useEffect, useState } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';

import ATIAnalytics from '#app/components/ATIAnalytics';
import MetadataContainer from '#app/components/Metadata';
import styles from './styles';
import { MyNewsPageProps } from '../types';
import MyNewsPageGuest from './MyNewsPageGuest';
import MyNewsPageLoading from './MyNewsPageLoading';
import GenericMessage from '../../send/[id]/GenericMessage';
import fallbackTranslations from '../../send/[id]/fallbackTranslations';

const MyNewsPageContent = dynamic(() => import('./MyNewsPageContent'), {
  ssr: false,
  loading: () => <MyNewsPageLoading />,
});

const isMockFollowedTopicsEnabled = () =>
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('mockFollowedTopics') ===
    'true';

const MyNewsPage = ({ page }: MyNewsPageProps) => {
  const {
    isArticlePersonalizationAvailable,
    isArticlePersonalizationEnabled,
    isTopicPersonalizationAvailable,
    isTopicPersonalizationEnabled,
  } = use(AccountContext);
  const { lang, translations } = use(ServiceContext);
  const noJsHeading =
    translations?.myNews?.title || fallbackTranslations.noJsHeading;
  const noJsDescription =
    translations?.myNews?.noJsDescription ||
    fallbackTranslations.noJsDescription;

  const isPersonalizationAvailable =
    isArticlePersonalizationAvailable || isTopicPersonalizationAvailable;
  const isPersonalizationEnabled =
    isArticlePersonalizationEnabled || isTopicPersonalizationEnabled;
  const [shouldShowMockFollowedTopics, setShouldShowMockFollowedTopics] =
    useState(false);

  useEffect(() => {
    setShouldShowMockFollowedTopics(isMockFollowedTopicsEnabled());
  }, []);

  if (
    (!isPersonalizationAvailable && !shouldShowMockFollowedTopics) ||
    !translations?.myNews
  ) {
    return null;
  }

  const shouldShowPageContent =
    isPersonalizationEnabled || shouldShowMockFollowedTopics;

  return (
    <main css={styles.main}>
      <MetadataContainer
        title={translations?.myNews?.title}
        lang={lang}
        openGraphType="website"
        hasAmpPage={false}
      />
      <ATIAnalytics />
      <div css={styles.inner}>
        <noscript>
          <div css={styles.heading}>
            <GenericMessage heading={noJsHeading}>
              {noJsDescription}
            </GenericMessage>
          </div>
        </noscript>
        <div css={styles.innerContent}>
          {shouldShowPageContent ? (
            <MyNewsPageContent
              page={page}
              showSavedArticles={isArticlePersonalizationEnabled}
              showFollowedTopics={
                isTopicPersonalizationEnabled || shouldShowMockFollowedTopics
              }
              mockFollowedTopics={shouldShowMockFollowedTopics}
            />
          ) : (
            <MyNewsPageGuest />
          )}
        </div>
      </div>
    </main>
  );
};

export default MyNewsPage;
