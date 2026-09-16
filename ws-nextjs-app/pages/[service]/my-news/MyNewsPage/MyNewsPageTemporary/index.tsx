import { use } from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import AccountActionButtons from '#app/components/Account/AccountActionButtons';
import CurationGrid from '#app/components/Curation/CurationGrid';
import useTemporarySavedArticles from '#app/hooks/useTemporarySavedArticles';
import { css } from '@emotion/react';

const styles = {
  container: css({
    marginBottom: '2rem',
  }),
  heading: css({
    marginBottom: '1rem',
  }),
  banner: css({
    backgroundColor: '#ffe5e5',
    border: '1px solid #ffcccc',
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '2rem',
  }),
  bannerHeading: css({
    marginBottom: '0.5rem',
  }),
  actionButtons: css({
    marginTop: '1rem',
  }),
  expiryText: css({
    marginTop: '0.5rem',
    fontStyle: 'italic',
  }),
  noArticles: css({
    padding: '2rem',
    textAlign: 'center',
  }),
};

const MyNewsPageTemporary = () => {
  const { translations } = use(ServiceContext);
  const { signInUrl, registerUrl } = use(AccountContext);
  const { savedArticles, expiryDate } = useTemporarySavedArticles();

  const formatExpiryDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <div css={styles.container}>
      <Heading
        id="content"
        tabIndex={-1}
        level={1}
        css={styles.heading}
        size="paragon"
      >
        {translations?.myNews?.title || 'My News'}
      </Heading>

      <div css={styles.banner} role="alert">
        <Heading level={2} size="doublePica" css={styles.bannerHeading}>
          Temporary My News
        </Heading>
        <Text size="longPrimer">
          This is a temporary page available for 2 days. If you want to keep
          your saved articles, please register or sign in to create a permanent
          account.
        </Text>
        {expiryDate && (
          <Text size="brevier" css={styles.expiryText}>
            Expires in {formatExpiryDate(expiryDate)}
          </Text>
        )}
        {signInUrl && registerUrl && (
          <div css={styles.actionButtons}>
            <AccountActionButtons
              registerComponentName="my-news-temporary-register-link"
              signInComponentName="my-news-temporary-sign-in-link"
              onLightBackground
            />
          </div>
        )}
      </div>

      {savedArticles.length > 0 ? (
        <>
          <Heading level={2} css={styles.heading} size="doublePica">
            {translations?.myNews?.description || 'Your saved articles'}
          </Heading>
          <CurationGrid
            summaries={savedArticles.map(article => ({
              ...article,
              imageUrl: article.imageUrl || '',
              imageAlt: article.imageAlt || '',
            }))}
            headingLevel={3}
            eventTrackingData={{
              componentName: 'my-news-temporary-curation-grid',
            }}
          />
        </>
      ) : (
        <div css={styles.noArticles}>
          <Text size="doublePica" fontVariant="sansBold">
            {translations?.myNews?.noArticles ||
              'You have no saved articles yet'}
          </Text>
        </div>
      )}
    </div>
  );
};

export default MyNewsPageTemporary;
