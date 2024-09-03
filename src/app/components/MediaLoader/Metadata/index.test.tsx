import React from 'react';
import { Helmet } from 'react-helmet';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import Metadata from '.';
import { aresMediaBlocks } from '../fixture';
import { MediaBlock } from '../types';

describe('Media Loader - Metadata', () => {
  const embedSource =
    'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB';

  it('should not render Metadata when aresMedia has no metadata block ', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Metadata blocks={[]} embedURL={embedSource} />));
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
      );
    });

    const container = Helmet.peek();
    expect(container).toMatchSnapshot();
  });
});
