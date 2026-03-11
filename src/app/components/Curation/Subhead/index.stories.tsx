import {
  ServiceContextProvider,
  ServiceContext,
} from '#app/contexts/ServiceContext';

import ThemeProvider from '../../ThemeProvider';

import Subheading from '.';
import { StoryProps, StoryArgs } from '../../../models/types/storybook';

const Component = (_: StoryArgs, { service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <ServiceContext.Consumer>
          {({ translations }) => (
            <Subheading>{translations?.relatedContent}</Subheading>
          )}
        </ServiceContext.Consumer>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const WithLink = (_: StoryArgs, { service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <ServiceContext.Consumer>
          {({ translations }) => (
            <Subheading link="https://bbc.com">
              {translations.relatedContent}
            </Subheading>
          )}
        </ServiceContext.Consumer>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Components/Curation/Subheading',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const ExampleWithLink = WithLink;
