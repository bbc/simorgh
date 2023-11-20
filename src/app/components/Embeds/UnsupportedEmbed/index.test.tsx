import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import {
  RequestContext,
  RequestContextProps,
} from '../../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import { Services } from '../../../models/types/global';
import sampleTelescopeProps from './fixtures';
import UnsupportedEmbed from '.';
import { UnsupportedEmbedProps } from '../types';

const Component = ({
  props,
  isAmp,
  service = 'news',
}: {
  props: UnsupportedEmbedProps;
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
      <UnsupportedEmbed {...props} />
    </ServiceContextProvider>
  </RequestContext.Provider>
);

describe('Unsupported Embed', () => {
  describe('Canonical', () => {
    it('Returns null', () => {
      const { container } = render(
        <Component props={sampleTelescopeProps} isAmp={false} />,
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('AMP', () => {
    it('Renders Embed Error message with a link to the canonical page', () => {
      const { container, getByText } = render(
        <Component props={sampleTelescopeProps} isAmp />,
      );

      const linkToRiddle = container.querySelector('a[href="canonical_link"]');
      const errorMessage = getByText(
        'View the full version of the page to see all the content.',
      );

      expect(linkToRiddle).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
