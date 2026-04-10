import LivePostButton from '.';
import metadata from './metadata.json';


const Component = () => {
  return (
    <LivePostButton isFirstPostVisible={false} hasPendingUpdate={true} streamRef={null}      
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
