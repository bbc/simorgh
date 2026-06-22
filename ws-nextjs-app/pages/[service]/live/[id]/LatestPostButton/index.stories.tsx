import LivePostButton from '.';
import metadata from './metadata.json';


const Component = () => {
  return (
    <LivePostButton
      isFirstPostVisible={false}
      hasPendingUpdate={true}
      streamRef={null}
      pendingUpdateTime={Date.now()}
      pageId="test-page-id"
      newPostCount={3}
    />
  );
};

export default {
  title: 'Components/Latest Post Button',
  Component,
  parameters: {
    metadata
  },
};

export const LatestPostButton = () => <Component />;
