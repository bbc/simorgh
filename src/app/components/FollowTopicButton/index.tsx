import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import type { TopicFollowData } from '#app/lib/uasApi/uasUtility';
import styles from './index.styles';
import FollowTopicButtonAuthenticated from './FollowTopicButtonAuthenticated/lazy';
import FollowTopicButtonGuest from './FollowTopicButtonGuest';

export interface FollowTopicButtonProps {
  topicData: TopicFollowData;
}

const FOLLOW_TOPIC_BUTTON_ID = 'follow-topic-button';

const FollowTopicButton = ({ topicData }: FollowTopicButtonProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);

  if (!isPersonalizationAvailable) return null;

  return (
    <>
      <noscript>
        <style>{`#${FOLLOW_TOPIC_BUTTON_ID} { display: none; }`}</style>
      </noscript>
      <div css={styles.buttonWrapper} id={FOLLOW_TOPIC_BUTTON_ID}>
        {isPersonalizationEnabled ? (
          <FollowTopicButtonAuthenticated topicData={topicData} />
        ) : (
          <FollowTopicButtonGuest topicId={topicData.topicId} />
        )}
      </div>
    </>
  );
};

export default FollowTopicButton;
