import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeProvider from '../ThemeProvider';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { Services } from '../../models/types/global';
import { StoryProps } from '../../models/types/storybook';
import MostReadContainer from '../../legacy/containers/MostRead';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';

const staticMostReadURL = (service: Services, variant: string) =>
  variant !== 'default'
    ? `./data/${service}/mostRead/${variant}.json`
    : `./data/${service}/mostRead/index.json`;

interface Props extends StoryProps {
  columnLayout?: 'oneColumn' | 'twoColumn' | 'multiColumn';
  size?: 'default' | 'small';
}

const Component = ({
  service,
  variant,
  columnLayout = 'multiColumn',
  size = 'default',
}: Props) => (
  <ThemeProvider service={service} variant={variant}>
    <ToggleContextProvider>
      <RequestContextProvider
        isAmp={false}
        isApp={false}
        pageType={ARTICLE_PAGE}
        service={service}
        statusCode={200}
        pathname={`/${service}`}
        variant={variant}
      >
        <ServiceContextProvider service={service} variant={variant}>
          <MostReadContainer
            mostReadEndpointOverride={staticMostReadURL(service, variant)}
            size={size}
            columnLayout={columnLayout}
          />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </ThemeProvider>
);

export default {
  title: 'New Components/Most Read',
  Component,
  decorators: [withKnobs, withServicesKnob({ defaultService: 'pidgin' })],
};

export const ArticlePage5Columns = ({ service, variant }: Props) => (
  <Component service={service} variant={variant} />
);

export const HomePage2Columns = ({ service, variant }: Props) => (
  <Component service={service} variant={variant} columnLayout="twoColumn" />
);

export const StoryPage1Column = ({ service, variant }: Props) => (
  <Component
    service={service}
    variant={variant}
    size="small"
    columnLayout="oneColumn"
  />
);

export const Japanese1Column = ({ variant }: Props) => (
  <Component service="japanese" variant={variant} columnLayout="oneColumn" />
);

export const Persian1Column = ({ variant }: Props) => (
  <Component service="persian" variant={variant} columnLayout="oneColumn" />
);
