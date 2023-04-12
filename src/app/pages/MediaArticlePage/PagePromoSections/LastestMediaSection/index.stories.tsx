import React, { PropsWithChildren } from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { withServicesKnob } from '../../../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../../../components/ThemeProvider';
import { Services } from '../../../../models/types/global';

import LatestMediaSection from '.';
import hausaArticle from '../../../../../../data/hausa/articles/cxr0765kxlzo.json';
import tamilArticle from '../../../../../../data/tamil/articles/c84m2jl4dpzo.json';
import pidginArticle from '../../../../../../data/pidgin/articles/cw0x29n2pvqo.json';
import { LatestMedia } from './LatestMediaTypes';
import metadata from './metadata.json';

interface Props {
  service: Services;
}

interface ComponentProps extends Props {
  content: LatestMedia[];
}
const Component = ({ service, content }: PropsWithChildren<ComponentProps>) => (
  <RequestContextProvider
    isAmp={false}
    pageType={MEDIA_ARTICLE_PAGE}
    service={service}
    pathname=""
  >
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <ToggleContextProvider>
          <LatestMediaSection content={content} />
        </ToggleContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>
  </RequestContextProvider>
);

export default {
  title: 'Components/Latest Media Section',
  Component,
  parameters: {
    metadata,
  },
  decorators: [withKnobs, withServicesKnob()],
};

export const MultipleLatestMediaWithCustomAltText = ({ service }: Props) => {
  const pidginLatestMediaList = pidginArticle.data.secondaryData
    .latestMedia as LatestMedia[];
  return <Component content={pidginLatestMediaList} service={service} />;
};

export const MultipleLatestMediawithFallbackAltText = ({ service }: Props) => {
  const hausaLatestMediaList = hausaArticle.data.secondaryData
    .latestMedia as LatestMedia[];
  return <Component content={hausaLatestMediaList} service={service} />;
};

export const SingleLatestMedia = ({ service }: Props) => {
  const tamilLatestMediaList = tamilArticle.data.secondaryData
    .latestMedia as LatestMedia[];
  return <Component content={tamilLatestMediaList} service={service} />;
};
