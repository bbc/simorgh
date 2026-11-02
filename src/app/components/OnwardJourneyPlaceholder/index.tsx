import { useEffect, useState } from 'react';
import {
  OnwardJourney,
  useOnwardJourneyRequest,
} from '#app/contexts/ArticleOnwardJourneysContext';
import useNearViewport from '#app/hooks/useNearViewport';
import styles from './index.module.scss';

type Props = {
  onwardJourney: OnwardJourney;
};

const getPlaceholderId = (onwardJourney: OnwardJourney) =>
  `onward-journey-placeholder-${onwardJourney}`;

const OnwardJourneyPlaceholder = ({ onwardJourney }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const context = useOnwardJourneyRequest();
  const placeholderId = getPlaceholderId(onwardJourney);
  const isNearViewport = useNearViewport({
    elementId: placeholderId,
    rootMargin: isMounted ? '0px 0px 200px 0px' : undefined,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isResolved || !isNearViewport || !context?.isEnabled) return;

    context.requestOnwardJourney(onwardJourney).finally(() => {
      setIsResolved(true);
    });
  }, [context, isNearViewport, isResolved, onwardJourney]);

  if (!isMounted || !context?.isEnabled || isResolved) return null;

  return (
    <div
      id={placeholderId}
      className={styles.placeholder}
      data-testid={`onward-journey-skeleton-${onwardJourney}`}
      aria-hidden="true"
    >
      <span className={styles.title} />
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  );
};

export default OnwardJourneyPlaceholder;
