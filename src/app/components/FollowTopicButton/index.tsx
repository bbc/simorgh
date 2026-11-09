import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import type { FollowTopicData } from '#app/lib/uasApi/uasUtility';
import ErrorBoundary from '#app/components/ErrorBoundary';
import styles from './index.module.scss';
import FollowTopicButtonAuthenticated from './FollowTopicButtonAuthenticated/lazy';
import FollowTopicButtonGuest from './FollowTopicButtonGuest';

export interface FollowTopicButtonProps {
  topicData: FollowTopicData;
  compact?: boolean;
}

const FOLLOW_TOPIC_BUTTON_SELECTOR = '[data-follow-topic-button]';

const FollowTopicButton = ({
  topicData,
  compact = false,
}: FollowTopicButtonProps) => {
  const topicId = topicData?.topicId;

  const { isTopicPersonalizationAvailable, isTopicPersonalizationEnabled } =
    use(AccountContext);

  if (!isTopicPersonalizationAvailable || !topicId) {
    return null;
  }

  return (
    <ErrorBoundary componentName="FollowTopicButton">
      <noscript>
        <style>{`${FOLLOW_TOPIC_BUTTON_SELECTOR} { display: none; }`}</style>
      </noscript>
      <div
        className={[styles.buttonWrapper, compact && styles.compact]
          .filter(Boolean)
          .join(' ')}
        data-follow-topic-button=""
      >
        {isTopicPersonalizationEnabled ? (
          <FollowTopicButtonAuthenticated
            topicData={topicData}
            compact={compact}
          />
        ) : (
          <FollowTopicButtonGuest topicId={topicId} compact={compact} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default FollowTopicButton;
