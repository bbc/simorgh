import React from 'react';
import AmpIframeEmbed from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';
import { Services } from '#models/types/global';
import { ampParams } from '../types';

const Component = ({
  url,
  parameters,
  service = 'pidgin',
}: {
  url: string;
  parameters: ampParams;
  service?: Services;
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.co.uk"
    id="c0000000000o"
    isAmp
    isApp={false}
    pageType={ARTICLE_PAGE}
    pathname="/pathname"
    service={service}
    statusCode={200}
  >
    <ServiceContextProvider service={service}>
      <AmpIframeEmbed parameters={parameters} url={url} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

export default {
  title: 'Components/Embeds/Amp Iframe Embed',
  component: AmpIframeEmbed,
  parameters: { chromatic: { disable: true } },
};

export const VJAmp = () => (
  <Component
    parameters={{
      'amp-clickable': true,
      'amp-image-height': 360,
      'amp-image-width': 640,
      'amp-image':
        'https://news.files.bbci.co.uk/include/vjassets/img/app-launcher.png',
    }}
    url="https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/develop/pidgin/app/amp?version=1.0.0"
  />
);
