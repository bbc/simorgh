import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';
import {
  sampleTelescopeProps,
  samplePlayerRaterProps,
  sampleTeamSelectorProps,
} from './fixtures';
import UnsupportedEmbed from '.';

describe('Unsupported Embed', () => {
  describe('Canonical', () => {
    it.each`
      embed              | props
      ${'Telescope'}     | ${sampleTelescopeProps}
      ${'Player Rater'}  | ${samplePlayerRaterProps}
      ${'Team Selector'} | ${sampleTeamSelectorProps}
    `('$embed Embed should return null', props => {
      const { container } = render(<UnsupportedEmbed {...props} />, {
        isAmp: false,
        isApp: false,
        service: 'news',
        id: 'c0000000000o',
        pageType: ARTICLE_PAGE,
        pathname: '/pathname',
        statusCode: 200,
      });
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('AMP', () => {
    it.each`
      embed              | props
      ${'Telescope'}     | ${sampleTelescopeProps}
      ${'Player Rater'}  | ${samplePlayerRaterProps}
      ${'Team Selector'} | ${sampleTeamSelectorProps}
    `(
      '$embed Embed should render Embed Error message with a link to the canonical page',
      props => {
        const { container, getByText } = render(
          <UnsupportedEmbed {...props} />,
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
      },
    );
  });
});
