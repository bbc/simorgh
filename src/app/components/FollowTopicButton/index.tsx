import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import type { TopicFollowData } from '#app/lib/uasApi/uasUtility';
import ErrorBoundary from '#app/components/ErrorBoundary';
import styles from './index.module.scss';
import FollowTopicButtonAuthenticated from './FollowTopicButtonAuthenticated/lazy';
import FollowTopicButtonGuest from './FollowTopicButtonGuest';

export interface FollowTopicButtonProps {
  topicData: TopicFollowData;
}

const FOLLOW_TOPIC_BUTTON_ID = 'follow-topic-button';

const FollowTopicButton = ({ topicData }: FollowTopicButtonProps) => {
  const {
    isTopicUasPersonalizationAvailable,
    isTopicUasPersonalizationEnabled,
  } = use(AccountContext);

  if (!isTopicUasPersonalizationAvailable) {
    return null;
  }

  return (
    <ErrorBoundary componentName="FollowTopicButton">
      <noscript>
        <style>{`#${FOLLOW_TOPIC_BUTTON_ID} { display: none; }`}</style>
      </noscript>
      <div className={styles.buttonWrapper} id={FOLLOW_TOPIC_BUTTON_ID}>
        {isTopicUasPersonalizationEnabled ? (
          <FollowTopicButtonAuthenticated topicData={topicData} />
        ) : (
          <FollowTopicButtonGuest topicId={topicData.topicId} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default FollowTopicButton;
