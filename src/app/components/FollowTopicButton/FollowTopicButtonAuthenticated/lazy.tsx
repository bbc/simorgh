import dynamic from 'next/dynamic';
import FollowTopicButtonGuest from '../FollowTopicButtonGuest';

export default dynamic(
  () =>
    import(
      /* webpackChunkName: "follow_topic_button_authenticated" */
      '.'
    ),
  {
    ssr: false,
    loading: () => <FollowTopicButtonGuest />,
  },
);
