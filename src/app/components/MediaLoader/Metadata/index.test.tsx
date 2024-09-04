import React from 'react';
import { Helmet } from 'react-helmet';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import { ARTICLE_PAGE, MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import Metadata from '.';
import { aresMediaBlocks } from '../fixture';
import { MediaBlock } from '../types';

describe('Media Loader - Metadata', () => {
  const embedSource =
    'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB';

  it('should not render Metadata when aresMedia has no metadata block ', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Metadata blocks={[]} embedURL={embedSource} />, {
        pageType: ARTICLE_PAGE,
      }));
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('should render Metadata correctly when aresMedia has a metadata block', async () => {
    await act(async () => {
      render(
        <Metadata
          blocks={aresMediaBlocks as MediaBlock[]}
          embedURL={embedSource}
        />,
        {
          pageType: ARTICLE_PAGE,
        },
      );
    });

    const container = Helmet.peek();
    expect(container).toMatchSnapshot();
  });

  it('should render meta og:url tag if the Metadata is on an "embedded" page', async () => {
    await act(async () => {
      render(
        <Metadata
          blocks={aresMediaBlocks as MediaBlock[]}
          embedURL={embedSource}
        />,
        {
          pageType: ARTICLE_PAGE,
        },
      );
    });

    const container = Helmet.peek();
    expect(container).toMatchSnapshot();
  });

  it('should not render metadata component when pageType is not supported', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Metadata blocks={[]} />, {
        pageType: MEDIA_PAGE,
      }));
    });

    expect(container).toBeEmptyDOMElement();
  });
});
