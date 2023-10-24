import React from 'react';
import { render } from '../../react-testing-library-with-providers';

import EmbedAmp, { OEmbedAmpProps } from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import {
  RequestContext,
  RequestContextProps,
} from '../../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import { Services } from '../../../models/types/global';

const Component = ({
  props,
  isAmp,
  service = 'pidgin',
}: {
  props: OEmbedAmpProps;
  isAmp: boolean;
  service?: Services;
}) => (
  <RequestContext.Provider
    value={
      {
        id: 'c0000000000o',
        isAmp,
        isApp: false,
        pageType: ARTICLE_PAGE,
        pathname: '/pathname',
        service,
        statusCode: 200,
        canonicalLink: 'canonical_link',
      } as unknown as RequestContextProps
    }
  >
    <ServiceContextProvider service={service}>
      <EmbedAmp {...props} />
    </ServiceContextProvider>
  </RequestContext.Provider>
);

const sampleRiddleProps = {
  isVDJEmbed: false,
  canonicalLink: 'canonical_link',
  parameters: undefined,
  url: 'https://www.riddle.com/view/SAVstNdh',
};

const sampleFlourishProps = {
  isVDJEmbed: false,
  canonicalLink: 'canonical_link',
  parameters: undefined,
  url: undefined,
};

const sampleVJProps = {
  isVDJEmbed: true,
  canonicalLink: 'canonical_link',
  parameters: {
    'amp-clickable': true,
    'amp-image-height': 360,
    'amp-image-width': 640,
    'amp-image':
      'https://news.files.bbci.co.uk/include/vjassets/img/app-launcher.png',
  },
  url: 'https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/develop/pidgin/app/amp?version=1.0.0',
};

describe('EmbedAmp', () => {
  describe('Error Message', () => {
    it('Riddle Embed - Should show a translated error message with a link to the canonical page', () => {
      const { container, getByText } = render(
        <Component props={sampleRiddleProps} service="afrique" isAmp />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
      );
      const linkToRiddle = container.querySelector('a[href="canonical_link"]');
      const errorMessage = getByText(
        'Consultez la version complète de la page pour voir tout le contenu.',
      );

      expect(iFrameElement).toBe(null);
      expect(linkToRiddle).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });

    it('Flourish Embed - Should show a translated error message with a link to the canonical page', () => {
      const { container, getByText } = render(
        <Component props={sampleFlourishProps} service="afrique" isAmp />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://flo.uri.sh/visualisation/8809119/embed"]',
      );
      const linkToFlourish = container.querySelector(
        'a[href="canonical_link"]',
      );
      const errorMessage = getByText(
        'Consultez la version complète de la page pour voir tout le contenu.',
      );

      expect(iFrameElement).toBe(null);
      expect(linkToFlourish).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });

    it('VJ Embed - Should show amp iframe', () => {
      const { container } = render(<Component props={sampleVJProps} isAmp />);
      const actual = container.querySelector(
        'amp-iframe[src="https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/develop/pidgin/app/amp?version=1.0.0"]',
      );
      expect(actual).toBeInTheDocument();
    });
  });
});
