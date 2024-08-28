import React, { PropsWithChildren } from 'react';

import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { MEDIA_ARTICLE_PAGE } from '#routes/utils/pageTypes';
import { StoryArgs } from '#app/models/types/storybook';
import ThemeProvider from '#components/ThemeProvider';
import { Services } from '#models/types/global';

import LatestMediaSection from '.';
import hausaArticle from '../../../../../../data/hausa/articles/cxr0765kxlzo.json';
import tamilArticle from '../../../../../../data/tamil/articles/c84m2jl4dpzo.json';
import pidginArticle from '../../../../../../data/pidgin/articles/cw0x29n2pvqo.json';
import { LatestMedia } from './types';
import metadata from './metadata.json';

interface Props {
  service: Services;
  isLite?: boolean;
}

interface ComponentProps extends Props {
  content: LatestMedia[];
}
const Component = ({
  service,
  isLite,
  content,
}: PropsWithChildren<ComponentProps>) => (
  <RequestContextProvider
    isAmp={false}
    isApp={false}
    isLite={isLite}
    pageType={MEDIA_ARTICLE_PAGE}
    service={service}
    pathname=""
    isUK
  >
    <ToggleContextProvider>
      <ThemeProvider service={service}>
        <LatestMediaSection content={content} />
      </ThemeProvider>
    </ToggleContextProvider>
  </RequestContextProvider>
);

export default {
  title: 'components/OptimoPromos/Latest Media Section',
  Component,
  parameters: {
    metadata,
    backgrounds: {
      default: 'Dark',
      values: [{ name: 'Dark', value: '#141414' }],
    },
    design: [
      {
        name: 'Group 0',
        type: 'figma',
        url: 'https://www.figma.com/file/dNAEzRgidlV50FoF10pbb4/MAP---handover?node-id=108-5501&t=C5TuViAaGwjuQr3p-0',
      },
      {
        name: 'Group 1',
        type: 'figma',
        url: 'https://www.figma.com/file/dNAEzRgidlV50FoF10pbb4/MAP---handover?node-id=108-5608&t=C5TuViAaGwjuQr3p-0',
      },
      {
        name: 'Group 2',
        type: 'figma',
        url: 'https://www.figma.com/file/dNAEzRgidlV50FoF10pbb4/MAP---handover?node-id=108-4478&t=C5TuViAaGwjuQr3p-0',
      },
      {
        name: 'Group 3',
        type: 'figma',
        url: 'https://www.figma.com/file/dNAEzRgidlV50FoF10pbb4/MAP---handover?node-id=108-4591&t=C5TuViAaGwjuQr3p-0',
      },
      {
        name: 'Group 4',
        type: 'figma',
        url: 'https://www.figma.com/file/dNAEzRgidlV50FoF10pbb4/MAP---handover?node-id=108-4675&t=C5TuViAaGwjuQr3p-0',
      },
    ],
  },
};

export const MultipleLatestMediaWithCustomAltText = (
  _: StoryArgs,
  { service, isLite }: Props,
) => {
  const pidginLatestMediaList = pidginArticle.data.secondaryData
    .latestMedia as LatestMedia[];
  return (
    <Component
      content={pidginLatestMediaList}
      service={service}
      isLite={isLite}
    />
  );
};

export const MultipleLatestMediawithFallbackAltText = (
  _: StoryArgs,
  { service, isLite }: Props,
) => {
  const hausaLatestMediaList = hausaArticle.data.secondaryData
    .latestMedia as LatestMedia[];
  return (
    <Component
      content={hausaLatestMediaList}
      service={service}
      isLite={isLite}
    />
  );
};

export const SingleLatestMedia = (_: StoryArgs, { service, isLite }: Props) => {
  const tamilLatestMediaList = tamilArticle.data.secondaryData
    .latestMedia as LatestMedia[];
  return (
    <Component
      content={tamilLatestMediaList}
      service={service}
      isLite={isLite}
    />
  );
};
