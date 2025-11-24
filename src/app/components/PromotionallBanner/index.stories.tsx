import React from 'react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import PromotionalBannerComponent from '.';
import services from '#server/utilities/serviceConfigs';
import { StoryProps } from '../../models/types/storybook';
import metadata from './metadata.json';
import readme from './README.md';

const ComponentWithContext = ({
  service = 'mundo',
  variant = 'default',
}: StoryProps) => {
  const bannerConfig = services[service]?.[variant]?.promotionalBanner;
  const { title, description, primaryButton, secondaryButton } = bannerConfig;
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <PromotionalBannerComponent
        title={title}
        description={description}
        primaryButton={{
          text: primaryButton?.text,
          longText: primaryButton?.longText,
          onClick: () => console.log('Primary clicked'),
        }}
        orText={bannerConfig.orText}
        secondaryButton={{
          text: secondaryButton?.text,
          onClick: () => console.log('Secondary clicked'),
        }}
        isDismissible
        handleClose={() => console.log('Banner closed')}
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
