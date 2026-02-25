import LivePostButton from '.';
import metadata from './metadata.json';


const Component = () => {
  return (
    <LivePostButton isFirstPostVisible={false} hasPendingUpdate={true} streamRef={null}      
    />
  );
};

export default {
  title: 'Components/Live Post Button',
  Component,
  parameters: {
    metadata
  },
};

export const ShareButtonComponent = () => <Component />;
