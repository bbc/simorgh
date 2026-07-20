import dynamic from 'next/dynamic';
import { use } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';

import ATIAnalytics from '#app/components/ATIAnalytics';
import MetadataContainer from '#app/components/Metadata';
import Message from '#app/components/MediaLoader/Message';
import styles from './styles';
import { MyNewsPageProps } from '../types';
import MyNewsPageGuest from './MyNewsPageGuest';
import MyNewsPageLoading from './MyNewsPageLoading';

const MyNewsPageContent = dynamic(() => import('./MyNewsPageContent'), {
  ssr: false,
  loading: () => <MyNewsPageLoading />,
});

const MyNewsPage = ({ page }: MyNewsPageProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);
  const { lang, translations } = use(ServiceContext);

  if (!isPersonalizationAvailable || !translations?.myNews) return null;

  return (
    <main css={styles.main}>
      <MetadataContainer
        title={translations?.myNews?.title}
        lang={lang}
        openGraphType="website"
        hasAmpPage={false}
      />
      <ATIAnalytics />
      <noscript>
        <Message message={translations?.myNews?.noJsMessage} />
      </noscript>
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
