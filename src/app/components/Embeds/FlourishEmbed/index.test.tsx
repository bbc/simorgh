import React from 'react';
import { Helmet } from 'react-helmet';
import FlourishEmbed from '.';
import { render } from '#components/react-testing-library-with-providers';
import { OEmbedData } from '../types';

describe('EmbedIFrame', () => {
  it('should render an iFrame', async () => {
    const props = {
      width: '100px',
      height: '100px',
      iFrameSrc: 'https://flo.uri.sh/visualisation/8809119/embed?auto=1',
      iFrameTitle: 'Visual Content',
      iFrameId: 'iFrame id',
      sizeAdjustScript: 'script to adjust size',
    } satisfies OEmbedData;

    const { container } = render(<FlourishEmbed {...props} />);
    const actual = container.querySelector(
      'iframe[src="https://flo.uri.sh/visualisation/8809119/embed?auto=1"]',
    );
    expect(actual).toBeInTheDocument();
  });

  it('should add the resize script', async () => {
    const props = {
      width: '100px',
      height: '100px',
      iFrameSrc: 'https://flo.uri.sh/visualisation/8809119/embed?auto=1',
      iFrameTitle: 'Visual Content',
      iFrameId: 'iFrame id',
      sizeAdjustScript: 'script to adjust size',
    } satisfies OEmbedData;

    render(<FlourishEmbed {...props} />);

    const helmet = Helmet.peek();
    expect(helmet.scriptTags[0]).toEqual({
      innerHTML: 'script to adjust size',
    });
  });

  it('should not render when no iframe src is provided', async () => {
    const props = {} satisfies OEmbedData;

    const { container } = render(<FlourishEmbed {...props} />);

    expect(container).toBeEmptyDOMElement();
  });
});
