import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';
import { createContext, use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton, { SAVE_BUTTON_VARIANTS } from '#app/components/SaveButton';
import FollowTopicButtonGuest from '../FollowTopicButtonGuest';
import type { FollowTopicButtonProps } from '../index';

const noop = () => undefined;

export const FollowTopicButtonTopicIdContext = createContext<
  string | undefined
>(undefined);

export const FollowTopicButtonLoadingFallback = ({
  error,
  isLoading,
}: DynamicOptionsLoadingProps) => {
  const { translations } = use(ServiceContext);
  const topicId = use(FollowTopicButtonTopicIdContext);
  const loadingLabel = translations?.followTopicButton?.loading ?? '';

  if (error && !isLoading) return <FollowTopicButtonGuest topicId={topicId} />;

  return (
    <SaveButton
      variant={SAVE_BUTTON_VARIANTS.FOLLOW}
      onClick={noop}
      isLoading
      visualLabel={loadingLabel}
      accessibleLabel={loadingLabel}
      testId="follow-topic-btn-loading"
    />
  );
};

const LazyFollowTopicButtonAuthenticated = dynamic<FollowTopicButtonProps>(
  () =>
    loadQueryConsumer(
      import(
        /* webpackChunkName: "follow_topic_button_authenticated" */
        '.'
      ),
    ),
  {
    ssr: false,
    loading: props => <FollowTopicButtonLoadingFallback {...props} />,
  },
);

const FollowTopicButtonAuthenticated = ({
  topicData,
}: FollowTopicButtonProps) => (
  <FollowTopicButtonTopicIdContext value={topicData.topicId}>
    <LazyFollowTopicButtonAuthenticated topicData={topicData} />
  </FollowTopicButtonTopicIdContext>
);

export default FollowTopicButtonAuthenticated;
