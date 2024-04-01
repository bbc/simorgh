import React, { PropsWithChildren } from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';

import Uploader from '.';
import { uploader, uploaderNonLatin, uploaderRTL } from './fixtures';
import metadata from './metadata.json';

interface ComponentProps {
  blocks: object[];
}

const Component = ({ blocks }: PropsWithChildren<ComponentProps>) => (
  <div
    style={{
      backgroundColor: '#f6f6f6',
      padding: '1rem',
    }}
  >
    <ToggleContextProvider>
      <Uploader blocks={blocks} />
    </ToggleContextProvider>
  </div>
);

export default {
  title: 'Components/Embeds/Uploader',
  Component,
  parameters: {
    metadata,
    backgrounds: {
      default: 'Optimo',
    },
  },
};

export const Example = () => {
  return <Component blocks={uploader} />;
};

export const BurmeseExample = () => {
  return <Component blocks={uploaderNonLatin} />;
};

export const ArabicExample = () => {
  return <Component blocks={uploaderRTL} />;
};
