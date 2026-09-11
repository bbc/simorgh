import { use } from 'react';
import Heading from '#app/components/Heading';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Spinner from '#app/components/Spinner';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './styles';

const MyNewsPageLoading = () => {
  const { translations } = use(ServiceContext);
  const loadingText = translations?.myNews?.loading;

  return (
    <>
      <Heading level={1} css={styles.heading}>
        {translations?.myNews?.title}
      </Heading>
      <div css={styles.spinnerWrapper} data-testid="my-news-page-spinner">
        <VisuallyHiddenText aria-live="polite">
          {loadingText}
        </VisuallyHiddenText>
        <Spinner css={styles.spinner} />
      </div>
    </>
  );
};

export default MyNewsPageLoading;
