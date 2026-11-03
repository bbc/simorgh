import HierarchicalGrid from './index';
import {
  pidginPromos,
  pidginPromosWithMedia,
  pidginVideoPromos,
} from './fixtures';

const Component = ({
  promoCount,
  promosToRender,
  isVideoCollection,
}: {
  promoCount: number;
  promosToRender: string;
  isVideoCollection?: boolean;
}) => {
  const fixtureData = isVideoCollection
    ? pidginVideoPromos
    : promosToRender === 'default'
      ? pidginPromos
      : pidginPromosWithMedia;

  const eventTrackingData = {
    componentName: isVideoCollection
      ? 'hierarchical-curation-grid-video'
      : 'hierarchical-curation-grid',
  };
  return (
    <HierarchicalGrid
      headingLevel={2}
      summaries={fixtureData.slice(0, promoCount)}
      eventTrackingData={eventTrackingData}
      isVideoCollection={isVideoCollection}
    />
  );
};

export default {
  title: 'Components/Curation/Grid - Hierarchical',
  component: Component,
  args: {
    promoCount: 12,
    promosToRender: 'default',
  },
  argTypes: {
    promoCount: {
      control: {
        type: 'range',
        min: 3,
        max: 12,
        step: 1,
      },
    },
    promosToRender: {
      control: {
        type: 'select',
      },
      options: ['default', 'withMedia'],
    },
  },
};

export const Example = args => <Component {...args} />;

export const WithMedia = {
  args: {
    promoCount: 12,
    promosToRender: 'withMedia',
    isVideoCollection: false,
  },
};

export const VideoCollection = {
  args: {
    promoCount: 12,
    promosToRender: 'default',
    isVideoCollection: true,
  },
};
