import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import PromotionalBannerComponent from '.';
import services from '#server/utilities/serviceConfigs';
import { StoryProps } from '../../models/types/storybook';
import metadata from './metadata.json';
import readme from './README.md';
import { PromotionalBannerConfig } from './index.types';

const ComponentWithContext = ({
  service = 'mundo',
  variant = 'default',
}: StoryProps) => {
  const bannerConfig = services[service]?.[variant]
    ?.promotionalBanner as PromotionalBannerConfig;

  return (
    <ServiceContextProvider service={service} variant={variant}>
      <PromotionalBannerComponent
        onPrimaryClick={() => console.log('Primary clicked')}
        onSecondaryClick={() => console.log('Secondary clicked')}
        onClose={() => console.log('Banner closed')}
        isDismissible
        {...bannerConfig}
      />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/PromotionalBanner',
  component: ComponentWithContext,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const PromotionalBanner = ComponentWithContext;
