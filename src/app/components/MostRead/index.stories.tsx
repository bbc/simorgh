import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import MostReadContainer from '.';
import ThemeProvider from '../../components/ThemeProvider';
import { Services } from '../../models/types/global';
import { StoryProps } from '../../models/types/storybook';

const staticMostReadURL = (service: Services, variant: string) =>
  variant !== 'default'
    ? `./data/${service}/mostRead/${variant}.json`
    : `./data/${service}/mostRead/index.json`;

interface Props extends StoryProps {
  columnLayout: 'oneColumn' | 'twoColumn' | 'multiColumn';
}

const Component = ({ service, variant, columnLayout }: Props) => (
  <ThemeProvider service={service}>
    <ToggleContextProvider>
      <RequestContextProvider
        bbcOrigin={`http://localhost/${service}/articles/c0000000000o`}
        id="c0000000000o"
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

export const FrontPage2Columns = (props: Props) => (
  <Component {...props} columnLayout="twoColumn" />
);

export const ArticlePage5Columns = (props: Props) => (
  <Component {...props} columnLayout="multiColumn" />
);

export const StoryPage1Column = (props: Props) => (
  <Component {...props} columnLayout="oneColumn" />
);
