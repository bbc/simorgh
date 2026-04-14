import React from 'react';
import { HeadToHeadV2 } from './head-to-head-v2.jsx';
import { rugbyUnionPostEvent } from './static-data/transformed/rugby-event/index.js';

export default {
  title: 'Components/Presentation/Head To Head V2/Rugby Events',
  component: HeadToHeadV2,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  globals: {
    corePalette: 'lightAlternative',
    servicePalette: 'sportLight',
    fontPalette: 'sansSimple'
  },
  args: {
    data: rugbyUnionPostEvent
  }
};

export const RugbyUnion = args => <HeadToHeadV2 {...args} isConciseView={false} />;
