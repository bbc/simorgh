import dynamic from 'next/dynamic';
import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton, { SAVE_BUTTON_VARIANTS } from '#app/components/SaveButton';

const noop = () => undefined;

export const FollowTopicButtonLoadingFallback = () => {
  const { translations } = use(ServiceContext);
  const loadingLabel = translations?.followTopicButton?.loading ?? '';

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
    import(
      /* webpackChunkName: "follow_topic_button_authenticated" */
      '.'
    ),
  {
    ssr: false,
    loading: () => <FollowTopicButtonLoadingFallback />,
  },
);
