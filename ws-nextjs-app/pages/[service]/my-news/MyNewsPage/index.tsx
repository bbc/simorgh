import dynamic from 'next/dynamic';
import { use } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useTemporarySavedArticles from '#app/hooks/useTemporarySavedArticles';

import ATIAnalytics from '#app/components/ATIAnalytics';
import MetadataContainer from '#app/components/Metadata';
import styles from './styles';
import { MyNewsPageProps } from '../types';
import MyNewsPageGuest from './MyNewsPageGuest';
import MyNewsPageLoading from './MyNewsPageLoading';
import MyNewsPageTemporary from './MyNewsPageTemporary';
import GenericMessage from '../../send/[id]/GenericMessage';
import fallbackTranslations from '../../send/[id]/fallbackTranslations';

const MyNewsPageContent = dynamic(() => import('./MyNewsPageContent'), {
  ssr: false,
  loading: () => <MyNewsPageLoading />,
});

const MyNewsPage = ({ page }: MyNewsPageProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);
  const { lang, translations } = use(ServiceContext);
  const { savedArticles: tempSavedArticles } = useTemporarySavedArticles();
  const hasTemporarySavedArticles = tempSavedArticles.length > 0;

  const noJsHeading =
    translations?.myNews?.title || fallbackTranslations.noJsHeading;
  const noJsDescription =
    translations?.myNews?.noJsDescription ||
    fallbackTranslations.noJsDescription;

  if (!isPersonalizationAvailable || !translations?.myNews) return null;

  // Determine which view to show
  const shouldShowTemporary =
    !isPersonalizationEnabled && hasTemporarySavedArticles;
  const shouldShowGuest =
    !isPersonalizationEnabled && !hasTemporarySavedArticles;

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
          {isPersonalizationEnabled && <MyNewsPageContent page={page} />}
          {shouldShowTemporary && <MyNewsPageTemporary />}
          {shouldShowGuest && <MyNewsPageGuest />}
        </div>
      </div>
    </main>
  );
};

export default MyNewsPage;
