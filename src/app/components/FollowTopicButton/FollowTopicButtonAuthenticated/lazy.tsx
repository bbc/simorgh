import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';
import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton, { SAVE_BUTTON_VARIANTS } from '#app/components/SaveButton';
import FollowTopicButtonGuest from '../FollowTopicButtonGuest';

const noop = () => undefined;

export const FollowTopicButtonLoadingFallback = ({
  error,
  isLoading,
}: DynamicOptionsLoadingProps) => {
  const { translations } = use(ServiceContext);
  const loadingLabel = translations?.followTopicButton?.loading ?? '';

  if (error && !isLoading) return <FollowTopicButtonGuest />;

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

export default dynamic(
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
