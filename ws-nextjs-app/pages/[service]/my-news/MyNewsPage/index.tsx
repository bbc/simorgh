import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';
import { use } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';

import ATIAnalytics from '#app/components/ATIAnalytics';
import MetadataContainer from '#app/components/Metadata';
import styles from './styles';
import { MyNewsPageProps } from '../types';
import MyNewsPageGuest from './MyNewsPageGuest';
import MyNewsPageLoading from './MyNewsPageLoading';
import GenericMessage from '../../send/[id]/GenericMessage';
import fallbackTranslations from '../../send/[id]/fallbackTranslations';

export const MyNewsPageLoadingFallback = ({
  error,
  isLoading,
}: DynamicOptionsLoadingProps) =>
  error && !isLoading ? <MyNewsPageGuest /> : <MyNewsPageLoading />;

const MyNewsPageContent = dynamic(
  () => loadQueryConsumer(import('./MyNewsPageContent')),
  {
    ssr: false,
    loading: props => <MyNewsPageLoadingFallback {...props} />,
  },
);

const MyNewsPage = ({ page }: MyNewsPageProps) => {
  const isHydrated = useHydrationDetection();
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

  if (!isPersonalizationAvailable || !translations?.myNews) return null;

  const renderContent = () => {
    if (!isHydrated) return <MyNewsPageLoading />;
    if (!isPersonalizationEnabled) return <MyNewsPageGuest />;

    return (
      <MyNewsPageContent
        page={page}
        showSavedArticles={isArticlePersonalizationEnabled}
        showFollowedTopics={isTopicPersonalizationEnabled}
      />
    );
  };

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
        <div css={styles.innerContent}>{renderContent()}</div>
      </div>
    </main>
  );
};

export default MyNewsPage;
