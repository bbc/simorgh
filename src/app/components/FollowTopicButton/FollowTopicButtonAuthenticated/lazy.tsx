import dynamic from 'next/dynamic';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';
import FollowTopicButtonGuest from '../FollowTopicButtonGuest';

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
    loading: () => <FollowTopicButtonGuest />,
  },
);
