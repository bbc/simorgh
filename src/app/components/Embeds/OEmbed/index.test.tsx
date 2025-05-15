import React, { useMemo } from 'react';
import { render } from '../../react-testing-library-with-providers';
import { OEmbedProps } from '../types';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import {
  RequestContext,
  RequestContextProps,
} from '../../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import { Services } from '../../../models/types/global';
import {
  sampleRiddleProps,
  sampleFlourishStoryProps,
  sampleFlourishVisualisationProps,
  sampleVJAmpProps,
  sampleVJAmpPropsWithoutParams,
  sampleVJCanonicalProps,
  sampleNullProps,
} from './fixtures';
import OEmbedLoader from '.';

const Component = ({
  props,
  isAmp,
  isLite,
  service = 'pidgin',
}: {
  props: OEmbedProps;
  isAmp: boolean;
  isLite?: boolean;
  service?: Services;
}) => {
  const OEmbedValue = useMemo(
    () =>
      ({
        id: 'c0000000000o',
        isAmp,
        isLite,
        isApp: false,
        pageType: ARTICLE_PAGE,
        pathname: '/pathname',
        service,
        statusCode: 200,
        canonicalLink: 'canonical_link',
      }) as unknown as RequestContextProps,
    [isAmp, isLite, service],
  );
  return (
    <RequestContext.Provider value={OEmbedValue}>
      <ServiceContextProvider service={service}>
        <OEmbedLoader {...props} />
      </ServiceContextProvider>
    </RequestContext.Provider>
  );
};

describe('OEmbed', () => {
  describe('Canonical', () => {
    it('Riddle Embed - Should show an iframe with the appropriate link', () => {
      const { container } = render(
        <Component props={sampleRiddleProps} isAmp={false} />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
      );
      expect(iFrameElement).toBeInTheDocument();
    });

    it('Flourish Story Embed - Should show an iframe with the appropriate link', () => {
      const { container } = render(
        <Component props={sampleFlourishStoryProps} isAmp={false} />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://flo.uri.sh/story/2070814/embed?auto=1"]',
      );
      expect(iFrameElement).toBeInTheDocument();
    });

    it('Flourish Visualisation Embed - Should show an iframe with the appropriate link', () => {
      const { container } = render(
        <Component props={sampleFlourishVisualisationProps} isAmp={false} />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://flo.uri.sh/visualisation/15506675/embed?auto=1"]',
      );
      expect(iFrameElement).toBeInTheDocument();
    });

    it('VJ Embed - Should render an embed', () => {
      const { container, getByText } = render(
        <Component props={sampleVJCanonicalProps} isAmp={false} />,
      );
      const embedContent = container.querySelector(
        'div[id="responsive-embed-newsspec-36430-optimo-deployments-app"]',
      );
      expect(embedContent).toBeInTheDocument();
      expect(getByText('This is an example of an embed')).toBeInTheDocument();
    });

    it('should return null if no HTML is provided', () => {
      const { container } = render(
        <Component props={sampleNullProps} isAmp={false} />,
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('AMP', () => {
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

    it('Flourish Visualisation Embed - Should show a translated error message with a link to the canonical page', () => {
      const { container, getByText } = render(
        <Component
          props={sampleFlourishVisualisationProps}
          service="afrique"
          isAmp
        />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://flo.uri.sh/visualisation/15506675/embed?auto=1"]',
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

    it('Flourish Story Embed - Should show a translated error message with a link to the canonical page', () => {
      const { container, getByText } = render(
        <Component props={sampleFlourishStoryProps} service="afrique" isAmp />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://flo.uri.sh/story/2070814/embed?auto=1"]',
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

    it('VJ Embed - Should show an amp iframe with the appropriate link', () => {
      const { container } = render(
        <Component props={sampleVJAmpProps} isAmp />,
      );
      const actual = container.querySelector(
        'amp-iframe[src="https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/develop/pidgin/app/amp?version=1.0.0"]',
      );
      expect(actual).toBeInTheDocument();
    });

    it('VJ Embed - Should show an error message if parameters are missing', () => {
      const { container, getByText } = render(
        <Component props={sampleVJAmpPropsWithoutParams} isAmp />,
      );
      const iFrameElement = container.querySelector(
        'amp-iframe[src="https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/develop/pidgin/app/amp?version=1.0.0"]',
      );
      const errorMessage = getByText(
        'Sorry, we can’t display this part of the story on this lightweight mobile page.',
      );

      expect(iFrameElement).toBe(null);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Lite', () => {
    it('Should return null if isLite is true', () => {
      const { container } = render(
        <Component props={sampleRiddleProps} isAmp={false} isLite />,
      );
      expect(container).toBeEmptyDOMElement();
    });
  });
});
