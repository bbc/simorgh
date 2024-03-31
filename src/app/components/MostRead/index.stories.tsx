import React, { useEffect, useState } from 'react';
import Url from 'url-parse';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import metadata from './metadata.json';
// import md from './README.md';
import MostRead from '.';
import { StoryProps } from '../../models/types/storybook';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ColumnLayout, MostReadData, Size } from './types';

interface Props extends StoryProps {
  columnLayout?: ColumnLayout;
  size?: Size;
}

const Component = ({
  service = 'news',
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

  return (
    <RequestContextProvider
      isAmp={false}
      isApp={false}
      pageType={MOST_READ_PAGE}
      service={service}
      statusCode={200}
      pathname={`/${service}/popular`}
      variant={variant}
    >
      <MostRead
        data={pageData as MostReadData}
        size={size}
        columnLayout={columnLayout}
      />
    </RequestContextProvider>
  );
};

export default {
  title: 'New Components/Most Read',
  component: Component,
  parameters: {
    chromatic: {
      viewports: [1280],
    },
    metadata,
    docs: {
      // page: md,
    },
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

export const Example = ({ service, variant, columnLayout, size }: Props) => (
  <Component
    service={service}
    variant={variant}
    columnLayout={columnLayout}
    size={size}
  />
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
