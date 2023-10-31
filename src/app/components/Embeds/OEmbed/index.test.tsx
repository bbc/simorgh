import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import { OEmbedProps } from '../types';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import {
  RequestContext,
  RequestContextProps,
} from '../../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import { Services } from '../../../models/types/global';
import sampleRiddleProps, { sampleFlourishProps } from './fixture';
import OEmbedLoader from '.';

const Component = ({
  props,
  isAmp,
  service = 'pidgin',
}: {
  props: OEmbedProps;
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
      <OEmbedLoader {...props} />
    </ServiceContextProvider>
  </RequestContext.Provider>
);

describe('OEmbed', () => {
  describe('Canonical', () => {
    it('Riddle Embed - Should show an iframe with the appropriate link', () => {
      const { container } = render(
        <Component props={sampleRiddleProps} isAmp={false} />,
      );
      const actual = container.querySelector(
        'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
      );
      expect(actual).toBeInTheDocument();
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
  });
});
