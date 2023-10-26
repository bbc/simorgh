import React from 'react';
// check post merge
import OEmbedLoader, { OEmbedProps } from '.';
import { sampleRiddleProps, sampleFlourishProps } from './fixture';
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
  title: 'Components/Embed Optimo',
  component: Component,
};

export const RiddleOEmbed = () => (
  <Component props={sampleRiddleProps} isAmp={false} />
);

export const FlourishOEmbed = () => (
  <Component props={sampleFlourishProps} isAmp={false} />
);
