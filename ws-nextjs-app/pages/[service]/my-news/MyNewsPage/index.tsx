import dynamic from 'next/dynamic';
import { use } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import ATIAnalytics from '#app/components/ATIAnalytics';
import styles from '../styles';
import { MyNewsPageProps } from '../types';
import MyNewsPageGuest from './MyNewsPageGuest';
import MyNewsPageLoading from './MyNewsPageLoading';

const MyNewsPageContent = dynamic(() => import('./MyNewsPageContent'), {
  ssr: false,
  loading: () => <MyNewsPageLoading />,
});

const MyNewsPage = ({ pageData, page }: MyNewsPageProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);

  if (!isPersonalizationAvailable) return null;

  return (
    <main css={styles.main}>
      <ATIAnalytics atiData={pageData?.metadata?.atiAnalytics} />
      <div css={styles.inner}>
        {isPersonalizationEnabled ? (
          <MyNewsPageContent page={page} />
        ) : (
          <MyNewsPageGuest />
        )}
      </div>
    </main>
  );
};

export default MyNewsPage;
