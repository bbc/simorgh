import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import sampleTelescopeProps from './fixtures';
import UnsupportedEmbed from '.';

describe('Unsupported Embed', () => {
  describe('Canonical', () => {
    it('Returns null', () => {
      const { container } = render(
        <UnsupportedEmbed {...sampleTelescopeProps} />,
        {
          isAmp: false,
          isApp: false,
          service: 'news',
          id: 'c0000000000o',
          pageType: ARTICLE_PAGE,
          pathname: '/pathname',
          statusCode: 200,
        },
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('AMP', () => {
    it('Renders Embed Error message with a link to the canonical page', () => {
      const { container, getByText } = render(
        <UnsupportedEmbed {...sampleTelescopeProps} />,
        {
          isAmp: true,
          isApp: false,
          service: 'news',
          id: 'c0000000000o',
          pageType: ARTICLE_PAGE,
          pathname: '/pathname',
          statusCode: 200,
        },
      );

      const linktoCanonical = container.querySelector(
        'a[href="https://www.test.bbc.com/pathname"]',
      );
      const errorMessage = getByText(
        'View the full version of the page to see all the content.',
      );

      expect(linktoCanonical).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
