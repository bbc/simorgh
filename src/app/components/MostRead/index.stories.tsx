import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
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
  columnLayout = 'twoColumn',
  size = 'default',
}: Props) => (
  <ThemeProvider service={service} variant={variant}>
    <ToggleContextProvider>
      <RequestContextProvider
        isAmp={false}
        pageType={ARTICLE_PAGE}
        service={service}
        statusCode={200}
        pathname={`/${service}`}
        variant={variant}
      >
        <ServiceContextProvider service={service} variant={variant}>
          <MostReadContainer
            mostReadEndpointOverride={staticMostReadURL(service, variant)}
            size={select('Size', ['default', 'small'], size)}
            columnLayout={select(
              'Column Layout',
              ['oneColumn', 'twoColumn', 'multiColumn'],
              columnLayout,
            )}
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

export const HomePage2Columns = ({ service, variant }: Props) => (
  <Component
    service={service}
    variant={variant}
    size="default"
    columnLayout="twoColumn"
  />
);

export const ArticlePage5Columns = ({ service, variant }: Props) => (
  <Component
    service={service}
    variant={variant}
    size="default"
    columnLayout="multiColumn"
  />
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
  <Component
    service="japanese"
    columnLayout="oneColumn"
    variant={variant}
    size="default"
  />
);

export const Arabic1Column = ({ variant }: Props) => (
  <Component
    service="arabic"
    columnLayout="oneColumn"
    variant={variant}
    size="default"
  />
);
