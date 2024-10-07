import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import Amp from './index';

const mockAmpIframeUrl = 'https://www.bbc.com/news/av-embeds/123456789';

describe('Amp', () => {
  it('should render an amp-iframe with the correct attributes', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Amp src={mockAmpIframeUrl} />));
    });

    const ampIframe = (container as unknown as HTMLElement).querySelector(
      'amp-iframe',
    );

    expect(ampIframe).toBeInTheDocument();
  });

  it('should render amp-iframe placeholder', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Amp src={mockAmpIframeUrl} />));
    });

    const ampImg = (container as unknown as HTMLElement).querySelector(
      'amp-iframe > div',
    );

    expect(ampImg).toBeInTheDocument();
  });
});
