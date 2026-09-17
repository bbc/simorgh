import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import type { FollowTopicData } from '#app/lib/uasApi/uasUtility';
import ErrorBoundary from '#app/components/ErrorBoundary';
import styles from './index.module.scss';
import FollowTopicButtonAuthenticated from './FollowTopicButtonAuthenticated/lazy';
import FollowTopicButtonGuest from './FollowTopicButtonGuest';

export interface FollowTopicButtonProps {
  topicData: FollowTopicData;
}

const FOLLOW_TOPIC_BUTTON_ID = 'follow-topic-button';

const FollowTopicButton = ({ topicData }: FollowTopicButtonProps) => {
  const topicId = topicData?.topicId;

  const { isTopicPersonalizationAvailable, isTopicPersonalizationEnabled } =
    use(AccountContext);

  if (!isTopicPersonalizationAvailable || !topicId) {
    return null;
  }

  return (
    <ErrorBoundary componentName="FollowTopicButton">
      <noscript>
        <style>{`#${FOLLOW_TOPIC_BUTTON_ID} { display: none; }`}</style>
      </noscript>
      <div className={styles.buttonWrapper} id={FOLLOW_TOPIC_BUTTON_ID}>
        {isTopicPersonalizationEnabled ? (
          <FollowTopicButtonAuthenticated topicData={topicData} />
        ) : (
          <FollowTopicButtonGuest topicId={topicId} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default FollowTopicButton;
