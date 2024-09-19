import React from 'react';
import Amp from './index';
import { act, render } from '../../react-testing-library-with-providers';

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

  it('should render amp-img placeholder', async () => {
    let container;

    await act(async () => {
      ({ container } = render(<Amp src={mockAmpIframeUrl} />));
    });

    const ampImg = (container as unknown as HTMLElement).querySelector(
      'amp-img',
    );

    expect(ampImg).toBeInTheDocument();
  });
});
