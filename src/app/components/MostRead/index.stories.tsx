import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import metadata from './metadata.json';
import md from './README.md';
import MostRead from '.';
import { data as defaultData } from '../../../../data/pidgin/mostRead/index.json';
import { data as japaneseData } from '../../../../data/japanese/mostRead/index.json';
import { data as persianData } from '../../../../data/persian/mostRead/index.json';
import ThemeProvider from '../ThemeProvider';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { StoryProps } from '../../models/types/storybook';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { ColumnLayout, MostReadData, Size } from './types';

interface Props extends StoryProps {
  columnLayout?: ColumnLayout;
  size?: Size;
  data: MostReadData;
}

const Component = ({
  service,
  variant,
  columnLayout = 'multiColumn',
  size = 'default',
  data,
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
          <MostRead data={data} size={size} columnLayout={columnLayout} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </ThemeProvider>
);

export default {
  title: 'New Components/Most Read',
  Component,
  decorators: [withKnobs, withServicesKnob({ defaultService: 'pidgin' })],
  parameters: {
    chromatic: {
      viewports: [1280],
    },
    metadata,
    docs: {
      page: md,
    },
  },
};

export const ArticlePage5Columns = ({ service, variant }: Props) => (
  <Component service={service} variant={variant} data={defaultData} />
);

export const HomePage2Columns = ({ service, variant }: Props) => (
  <Component
    service={service}
    variant={variant}
    columnLayout="twoColumn"
    data={defaultData}
  />
);

export const StoryPage1Column = ({ service, variant }: Props) => (
  <Component
    service={service}
    variant={variant}
    size="small"
    columnLayout="oneColumn"
    data={defaultData}
  />
);

export const Japanese1Column = ({ variant }: Props) => (
  <Component
    service="japanese"
    variant={variant}
    columnLayout="oneColumn"
    data={japaneseData}
  />
);

export const Persian1Column = ({ variant }: Props) => (
  <Component
    service="persian"
    variant={variant}
    columnLayout="oneColumn"
    data={persianData}
  />
);
