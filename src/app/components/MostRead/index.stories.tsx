import React, { useEffect, useState } from 'react';
import Url from 'url-parse';
import { withKnobs, select } from '@storybook/addon-knobs';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import metadata from './metadata.json';
import md from './README.md';
import MostRead from '.';
import ThemeProvider from '../ThemeProvider';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { StoryProps } from '../../models/types/storybook';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ColumnLayout, MostReadData, Size } from './types';

interface Props extends StoryProps {
  columnLayout?: ColumnLayout;
  size?: Size;
}

const Component = ({
  service,
  variant = 'default',
  columnLayout = 'multiColumn',
  size = 'default',
}: Props) => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      const response = await fetch(
        new Url(
          `data/${service}/mostRead/${
            variant === 'default' ? 'index' : variant
          }.json`,
        ).toString(),
      );

      const { data } = await response.json();
      setPageData(data as MostReadData);
    };

    loadPageData();
  }, [service, variant]);

  if (Object.keys(pageData).length === 0) {
    return <>Unable to render Most Read Component for {service}</>;
  }

  const selectedColumnLayout = select(
    'Columns',
    {
      1: 'oneColumn',
      2: 'twoColumn',
      5: 'multiColumn',
    },
    columnLayout,
  );

  const selectedSize = select(
    'Size',
    { Small: 'small', Default: 'default' },
    size,
  );

  return (
    <ThemeProvider service={service} variant={variant}>
      <ToggleContextProvider>
        <RequestContextProvider
          isAmp={false}
          isApp={false}
          pageType={MOST_READ_PAGE}
          service={service}
          statusCode={200}
          pathname={`/${service}/popular`}
          variant={variant}
        >
          <ServiceContextProvider service={service} variant={variant}>
            <MostRead
              data={pageData as MostReadData}
              size={selectedSize}
              columnLayout={selectedColumnLayout}
            />
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  );
};

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

export const Example = ({ service, variant }: Props) => (
  <Component service={service} variant={variant} />
);

export const TwoColumns = ({ service, variant }: Props) => (
  <Component service={service} variant={variant} columnLayout="twoColumn" />
);

export const SmallOneColumn = ({ service, variant }: Props) => (
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
