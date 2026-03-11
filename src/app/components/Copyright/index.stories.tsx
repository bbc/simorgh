import {
  ServiceContext,
  ServiceContextProvider,
} from '../../contexts/ServiceContext';
import CopyrightContainer from '.';
import { StoryProps, StoryArgs } from '../../models/types/storybook';

const Component = (_: StoryArgs, { service, variant }: StoryProps) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <ServiceContext.Consumer>
        {({ imageCopyrightOffscreenText }) => (
          <CopyrightContainer>{imageCopyrightOffscreenText}</CopyrightContainer>
        )}
      </ServiceContext.Consumer>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/Copyright',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Copyright = Component;
