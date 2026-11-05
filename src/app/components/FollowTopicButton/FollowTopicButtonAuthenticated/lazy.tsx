import dynamic from 'next/dynamic';
import FollowTopicButtonGuest from '../FollowTopicButtonGuest';

export default dynamic(
  () =>
    Promise.all([
      import(
        /* webpackChunkName: "query_provider" */
        '#app/contexts/QueryContext'
      ),
      import(
        /* webpackChunkName: "follow_topic_button_authenticated" */
        '.'
      ),
    ]).then(([{ withQueryProvider }, { default: Component }]) =>
      withQueryProvider(Component),
    ),
  {
    ssr: false,
    loading: () => <FollowTopicButtonGuest />,
  },
);
