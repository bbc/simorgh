import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import AmpIframeEmbed from '.';

const sampleAmpIframeParams = {
  'amp-clickable': true,
  'amp-image-height': 360,
  'amp-image-width': 640,
  'amp-image':
    'https://news.files.bbci.co.uk/include/vjassets/img/app-launcher.png',
};

const sampleAmpIframeUrl =
  'https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/develop/pidgin/app/amp?version=1.0.0';

describe('AmpIframeEmbed', () => {
  it('should render AmpIframe with correct width and height params', async () => {
    const { container } = render(
      <AmpIframeEmbed
        parameters={sampleAmpIframeParams}
        url={sampleAmpIframeUrl}
      />,
    );

    const iFrameElement = container.querySelector('amp-iframe');
    expect(iFrameElement).toBeInTheDocument();
    expect(iFrameElement).toHaveAttribute('height', '360');
    expect(iFrameElement).toHaveAttribute('width', '640');
  });
  it('should render AmpIframe with the correct url', async () => {
    const { container } = render(
      <AmpIframeEmbed
        parameters={sampleAmpIframeParams}
        url={sampleAmpIframeUrl}
      />,
    );

    const iFrameElement = container.querySelector(
      'amp-iframe[src="https://news.test.files.bbci.co.uk/include/newsspec/36430-optimo-deployments/develop/pidgin/app/amp?version=1.0.0"]',
    );
    expect(iFrameElement).toBeInTheDocument();
  });
});
