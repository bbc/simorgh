import {
  ServiceContextProvider,
  ServiceContext,
} from '#app/contexts/ServiceContext';
import PromotionalBannerComponent from '.';
import { StoryProps } from '../../models/types/storybook';
import metadata from './metadata.json';
import readme from './README.md';
import { PromotionalBannerConfig } from './index.types';

const ComponentWithContext = ({
  service = 'mundo',
  variant = 'default',
}: StoryProps) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <ServiceContext.Consumer>
        {({ promotionalBanner }) => (
          <PromotionalBannerComponent
            onPrimaryClick={() => console.log('Primary clicked')}
            onSecondaryClick={() => console.log('Secondary clicked')}
            onClose={() => console.log('Banner closed')}
            isDismissible
            {...(promotionalBanner as PromotionalBannerConfig)}
          />
        )}
      </ServiceContext.Consumer>
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
