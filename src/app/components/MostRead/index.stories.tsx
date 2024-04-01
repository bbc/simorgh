import React, { useEffect, useState } from 'react';
import Url from 'url-parse';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import withServicesDecorator from '#app/utilities/withServicesDecorator';
import metadata from './metadata.json';
import readme from './README.md';
import MostRead from '.';
import { StoryProps, UnusedFirstArg } from '../../models/types/storybook';
import { ColumnLayout, MostReadData, Size } from './types';

interface Props extends StoryProps {
  columnLayout?: ColumnLayout;
  size?: Size;
}

const Component = ({
  service,
  variant,
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

  return (
    <ToggleContextProvider>
      <MostRead
        data={pageData as MostReadData}
        size={size}
        columnLayout={columnLayout}
      />
    </ToggleContextProvider>
  );
};

export default {
  title: 'Components/Most Read',
  component: Component,
  decorators: [withServicesDecorator],
  parameters: {
    chromatic: {
      viewports: [1280],
    },
    metadata,
    docs: { readme },
  },
  args: {
    columnLayout: 'multiColumn',
    size: 'default',
  },
  argTypes: {
    columnLayout: {
      control: { type: 'select' },
      options: ['oneColumn', 'twoColumn', 'multiColumn'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default'],
    },
  },
};

export const Example = (
  { columnLayout, size }: Props,
  { service, variant }: StoryProps,
) => (
  <Component
    service={service}
    variant={variant}
    columnLayout={columnLayout}
    size={size}
  />
);

export const TwoColumns = (_: UnusedFirstArg, { service, variant }: Props) => (
  <Component service={service} variant={variant} columnLayout="twoColumn" />
);

export const SmallOneColumn = (
  _: UnusedFirstArg,
  { service, variant }: Props,
) => (
  <Component
    service={service}
    variant={variant}
    size="small"
    columnLayout="oneColumn"
  />
);

export const Japanese1Column = (_: UnusedFirstArg, { variant }: Props) => (
  <Component service="japanese" variant={variant} columnLayout="oneColumn" />
);

export const Persian1Column = (_: UnusedFirstArg, { variant }: Props) => (
  <Component service="persian" variant={variant} columnLayout="oneColumn" />
);
