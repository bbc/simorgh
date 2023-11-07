import React from 'react';
import OEmbedLoader from '.';
import {
  sampleRiddleProps,
  sampleFlourishStoryProps,
  sampleFlourishVisualisationProps,
  sampleVJCanonicalProps,
} from './fixtures';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import { Services } from '../../../models/types/global';
import { OEmbedProps } from '../types';

const Component = ({
  props,
  isAmp,
  service = 'pidgin',
}: {
  props: OEmbedProps;
  isAmp: boolean;
  service?: Services;
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.co.uk"
    id="c0000000000o"
    isAmp={isAmp}
    isApp={false}
    pageType={ARTICLE_PAGE}
    pathname="/pathname"
    service={service}
    statusCode={200}
  >
    <ServiceContextProvider service={service}>
      <OEmbedLoader {...props} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

export default {
  title: 'Components/Embeds/oEmbed',
  component: Component,
  parameters: { chromatic: { disable: true } },
};

export const OembedRiddle = () => (
  <Component props={sampleRiddleProps} isAmp={false} />
);

export const OembedFlourishVisualisation = () => (
  <Component props={sampleFlourishVisualisationProps} isAmp={false} />
);

export const OembedFlourishStoryEmbed = () => (
  <Component props={sampleFlourishStoryProps} isAmp={false} />
);

export const OembedVJCanonical = () => (
  <Component props={sampleVJCanonicalProps} isAmp={false} />
);
